import express from "express";
const userRoutes = express.Router();
import UserController from "../controllers/userControllers";
import signInValidator from "../middlewares/signinValidator";
import { authenticateToken } from "../middlewares/authToken";

userRoutes.get("/", UserController.getAll);
userRoutes.get("/id/:id", UserController.getById);
userRoutes.get("/checkAuth", authenticateToken, UserController.checkAuth);

userRoutes.post("/register", signInValidator, UserController.registerUser);
userRoutes.post("/login", UserController.login);
userRoutes.post("/logout", UserController.logout);

userRoutes.delete("/:id", UserController.deleteUser);
userRoutes.patch("/:id", UserController.updateUser);

export default userRoutes;
