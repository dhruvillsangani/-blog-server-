import express from "express";
import multer from "multer";
import blogController from "../controllers/blog";
import { Routes } from "../ENUM/authEnum";

var router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype == "image/jpg"
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
  upload.single("BlogImage"),
  blogController.postBlog
);
router.get(Routes.GET_BLOG, blogController.getBlogById);
router.put(Routes.EDIT_BLOG, blogController.editBlog);

// router.post("/upl", upload.single("BlogImage"), (req, res) => {
//   console.log(req.file);
// });
export { router, storage, upload, fileFilter };
