import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  public id?: number;
  public email: string;
  public username: string;
  public firstname: string;
  public lastname: string;
  public password: string;
  public counter: number;
  public updatedAt?: any;
  public blocked: boolean;
  public blockedAt?: any;
}

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
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
      tableName: "users",
      sequelize, // passing the sequelize instance
    }
  );
};
