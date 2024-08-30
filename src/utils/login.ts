import UserModel from "../models/userModel";
import bcrypt, { hash } from "bcrypt";

export async function login(username:string, password:string){
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
        throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Incorrect password");
    }
    return user
}
