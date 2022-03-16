import express from "express";
import blogController from "../controllers/blog";
import { Routes, Image } from "../utils/constants/enum/authEnum";
import {
  upload,
  storage,
  fileFilter,
  uploadStorage,
} from "../config/image_upload";

const router = express.Router();

router.get(Routes.BLOG, blogController.getBlog);

router.post(
  Routes.POST_BLOG,
  //TODO: change multi to enum or const
  // uploadStorage.array("multi", 5),
  upload.single(Image.IMAGE_NAME),
  blogController.postBlog
);

router.get(Routes.GET_BLOG, blogController.getBlogById);

router.put(
  Routes.EDIT_BLOG,
  upload.single(Image.IMAGE_NAME),
  blogController.editBlog
);

router.post(Routes.DELETE_BLOG, blogController.deleteBlog);

router.put("/comments/:blogId", blogController.postComments);

router.get("/blogpdf/:blogId", blogController.blogToPdf);

export { router, storage, upload, fileFilter, uploadStorage };
