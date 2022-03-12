import express from "express";
import multer, { FileFilterCallback } from "multer";
import { Image } from "../utils/constants/enum/authEnum";

const storage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype == Image.JPEG_TYPE ||
    file.mimetype === Image.PNG_TYPE ||
    file.mimetype == Image.JPG_TYPE
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

// MUltiple files

const multiFileStorage = multer.diskStorage({
  destination: (req: Express.Request, file: Express.Multer.File, cb) => {
    cb(null, "./files/");
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const uploadStorage = multer({
  storage: multiFileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

export { upload, storage, fileFilter, uploadStorage, multiFileStorage };
