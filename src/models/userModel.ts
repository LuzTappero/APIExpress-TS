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

  static async authenticate(
    username: string,
    password: string
  ): Promise<UserModel> {
    try {
      const user = await this.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
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

//En TypeScript, cuando trabajas con Sequelize, es útil definir dos tipos distintos para los atributos de un modelo:

// UserAttributes: Define todos los atributos que el modelo tendrá en la base de datos. Este tipo incluye todos los campos del modelo, tanto los obligatorios como los opcionales.

// UserCreationAttributes: Define los atributos que son necesarios al momento de crear una nueva instancia del modelo. Generalmente, no necesitas especificar atributos como el id (en caso de ser generado automáticamente) o los campos de fecha de creación/actualización, ya que estos son gestionados automáticamente por Sequelize.
