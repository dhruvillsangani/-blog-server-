import express, { NextFunction, Request, Response } from "express";
import { router as blogData } from "../routes/blogRoutes";
import auth from "../routes/authRoutes";
import multer from "multer";
var app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(auth);

app.use(blogData);

export default app;
