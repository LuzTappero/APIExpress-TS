import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

interface UserRequest extends Request {
  user?: {
    user_id: string;
    username: string;
    password: string;
    email: string;
  };
}

class UserController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await UserModel.findAll();
      if (!users) {
        return next(new Error("User not found"));
      }
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return next(new Error("User not found"));
      }
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
  static async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { username, password, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({ username, password: hashedPassword, email });
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      next(error);
    }
  }
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await UserModel.authenticate(username, password);
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );
      res.status(201).json({ message: "Login successful", token });
    } catch (error) {
      next();
    }
  }
  static async checkAuth(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const userId = req.user.user_id;
      const user = await UserModel.findByPk(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        isAuthenticated: true,
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // static async getUserInfo(
  //   req: UserRequest,
  //   res: Response,
  //   next: NextFunction
  // ){
  //   try {
  //     const userId = req.user.user_id;
  //     if (!userId) {
  //       return res.status(400).json({ message: "User ID not found" });
  //     }
  //     const user = await UserModel.findByPk(userId, {
  //       attributes: ["username", "email"],
  //     });
  //     if (!user) {
  //       res.status(404).json({ message: "User not found" });
  //       return;
  //     }
  //     res.json(user);
  //   } catch (error) {
  //     console.error("Error fetching user info:", error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  //}
  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user_id = req.params.id;
      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user_id = req.params.id;
      const { username, password, email } = req.body;
      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("User not found");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.update(
        { username, password: hashedPassword, email },
        { where: { user_id } }
      );
      res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
