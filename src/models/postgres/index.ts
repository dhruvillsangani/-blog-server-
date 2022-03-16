import { Dialect, Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { init as userInit, User } from "./user";
import { mongo, mongo_credentials } from "./mongodbcredentials";
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
mongo(sequelize);

export { sequelize, User, mongo_credentials };
