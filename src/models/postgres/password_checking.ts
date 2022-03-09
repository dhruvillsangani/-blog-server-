import { DataTypes, Model, Sequelize } from "sequelize";

export class user_password extends Model {
  public id?: number;
  public email: string;
  public username: string;
  public counter: number;
  public updatedAt?: any;
  public blocked: boolean;
  public blockedAt?: any;
}

export const userPassword = (sequelize: Sequelize) => {
  user_password.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      counter: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      blockedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "userpassword",
      sequelize, // passing the sequelize instance
    }
  );
};
