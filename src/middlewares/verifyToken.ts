import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET as string ;
import jwt, { VerifyErrors, JwtPayload, JsonWebTokenError } from "jsonwebtoken";


interface AuthenticatedUser{
  user_id: string;
  username: string;
  email?: string;
  role: 'admin' | 'client';
}
interface UserRequest extends Request {
  user?: AuthenticatedUser;
}

export async function verifyToken(req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try{
    const authHeader = req.headers["authorization"]
    const token= authHeader && authHeader.split(" ")[1]
    if (!token){
      res.status(403).json({message: 'Acces not authorized'})
      return
    }
    jwt.verify(token, JWT_SECRET, (err:unknown, decoded: string | JwtPayload | undefined) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (typeof decoded === 'object' && decoded !== null && 'user_id' in decoded){
        const user = decoded as AuthenticatedUser
        req.user = user;
        next()
        return;
      }
      res.status(403).json({ message: 'Invalid token structure' });
    })  
  }catch(error){
    console.log(error)
    next()
  }
}