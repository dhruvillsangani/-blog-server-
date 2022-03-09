// TODO: change to import instead of require
// create index.ts inside routes folder and put all the routes from app.ts to that folder
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import session from "express-session";
import mongoose from "mongoose";
import commonRoutes from "./routes/index";
import mongoUrl from "./ENUM/MongoURl";
import google from "./routes/googleroutes";
import { User, user_password } from "./models/postgres";
import multer from "multer";
import { logger } from "./config/logger_config";
import { storage, fileFilter } from "./routes/blogRoutes";
import passport from "passport";
import cookieSession from "express-session";
var app = express();

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(commonRoutes);
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));
// set up session cookies
app.use(
  cookieSession({
    secret: "SECRET",
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(google);

mongoose.connect(mongoUrl.MONGO_URL).then(() => {
  logger.info(mongoUrl.connected);
  app.listen(5000);
});
