import { Sequelize, UUIDV4, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sqlConfig";
import bcrypt from "bcrypt";

interface UserAttributes {
  user_id: string;
  username: string;
  password: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}
interface UserCreationAttributes
  extends Optional<UserAttributes, "user_id" | "created_at" | "updated_at"> {}

class UserModel
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public user_id!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public created_at?: Date;
  public updated_at?: Date;
}

UserModel.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default UserModel;