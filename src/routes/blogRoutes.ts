import express from "express";
import multer, { FileFilterCallback } from "multer";
import blogController from "../controllers/blog";
import { Routes, Image } from "../ENUM/authEnum";

var router = express.Router();

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

router.get(Routes.BLOG, blogController.getBlog);
router.post(
  Routes.POST_BLOG,
  upload.single(Image.IMAGE_NAME),
  blogController.postBlog
);
router.get(Routes.GET_BLOG, blogController.getBlogById);
router.put(Routes.EDIT_BLOG, blogController.editBlog);

// router.post("/upl", upload.single("BlogImage"), (req, res) => {
//   console.log(req.file);
// });
export { router, storage, upload, fileFilter };
