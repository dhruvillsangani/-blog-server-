import * as dotenv from "dotenv";
import { logger } from "../../../config/logger_config";
import { mongo_credentials } from "../../../models/postgres/index";
import mongoose from "mongoose";
dotenv.config();

const fetchMongoCredentials = async () => {
  const mongoUsername = await mongo_credentials.findOne({
    where: { key: "mongo_user_name" },
  });
  const mongodbPassword = await mongo_credentials.findOne({
    where: { key: "mongo_password" },
  });
  const mongoDbname = await mongo_credentials.findOne({
    where: { key: "mongo_db_name" },
  });

  return mongoose.connect(
    `mongodb+srv://${mongoUsername.value}:${mongodbPassword.value}@cluster0.ldpbz.mongodb.net/${mongoDbname.value}?retryWrites=true&w=majority`
  );
};

export { fetchMongoCredentials };
