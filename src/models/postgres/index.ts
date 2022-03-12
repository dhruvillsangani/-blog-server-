import { Dialect, Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { init as userInit, User } from "./user";
import { userPassword, user_password } from "./password_checking";
dotenv.config();

const newLocal: any = "0";
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAMES,
  process.env.DATABASE_PASS,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT as Dialect,
    operatorsAliases: newLocal,
  }
);
userInit(sequelize);
userPassword(sequelize);

export { sequelize, User, user_password };
