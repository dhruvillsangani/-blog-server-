import Blog from "../models/mongodb/blog";
import { NextFunction, Request, Response } from "express";
import { blog, status } from "../utils/constants/enum/authEnum";
import { logger } from "../config/logger_config";
import { deleteFile } from "../config/file";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { io } from "../app";

const blogController = {
  getBlog: async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.find();
    res.json(blog);
  },
  postBlog: (req: Request, res: Response, next: NextFunction) => {
    logger.info(req.files);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file.path,
      tags: req.body.tags,
    });

    blog
      .save()
      .then((result: any) => {
        console.log(result);
        io.emit("blogs", { action: "create", blog: result });
        res.json({ blog: result });
      })
      .catch((err: any) => console.log(err));
  },

  getBlogById: async (
    req: { params: { blogId: any } },
    res: Response,
    next: NextFunction
  ) => {
    const blogId = req.params.blogId;
    try {
      const blog = await Blog.findById(blogId);
      res.json(blog);
    } catch (e) {
      if (e) {
        res.json(blog.UNDEFINED);
      }
    }
  },
  editBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let blogId = req.params.blogId;
      console.log(req.file);

      if (!req.file) {
        const error: any = new Error();
        error.message = blog.IMAGE_NOT_FOUND;
        error.statusCode = status.VALIDATION_ERROR;
        logger.error(error);
        throw error;
      }
      // const title = req.body.title;
      // const description = req.body.description;
      const imageUrl = req.file.path;
      // const tags = req.body.tags;

      const { title, description, tags } = req.body;

      await Blog.findById(blogId).then((response) => {
        deleteFile(response.imageUrl);
      });

      await Blog.findOneAndUpdate(
        { _id: blogId },
        {
          title: title,
          description: description,
          imageUrl: imageUrl,
          tags: tags,
        },
        {
          returnOriginal: false,
        }
      )
        .then((result: any) => {
          logger.info(result);
          if (!result) {
            res.status(status.VALIDATION_ERROR).json({ msg: blog.NOTFOUND });
          }
          res
            .status(status.success)
            .json({ message: blog.POST_UPDATED, post: result });
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      logger.error(error);
      res.json({ error: error });
    }
  },

  deleteBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.blogId;
      const blogById = await Blog.findById(blogId);

      if (blogById) {
        deleteFile(blogById.imageUrl);
        await Blog.findByIdAndDelete(blogId);
        res.json({ msg: blog.IMAGE_DELETED_SUCCESSFULLY });
      }
      if (!blogById) {
        const error: any = new Error();
        error.message = blog.BLOG_NOT_FOUND;
        error.statusCode = status.VALIDATION_ERROR;
        logger.error(error);
        throw error;
      }
    } catch (error) {
      res.json({ error: error });
    }
  },

  postComments: async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId;
    logger.info(blogId);
    const { userName, comment } = req.body;
    if (!blogId) {
      const error: any = new Error();
      error.msg = "Blog not found";
      error.statusCode = 501;
    }
    const comments = [
      {
        userName: userName,
        comment: comment,
      },
    ];
    logger.info(comments);

    const updateComments = await Blog.findByIdAndUpdate(blogId, {
      $push: {
        comments: comments,
      },
    });
    logger.info(updateComments);
    res.json(updateComments);
  },

  blogToPdf: async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    const invoiceName = "blog-" + blogId + ".pdf";
    const invoicePath = path.join("blogpdf", invoiceName);
    const pdfDoc = new PDFDocument({ size: "A4" });
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   'inline; filename="' + invoiceName + '"'
    // );
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text("Blog", {
      underline: true,
      width: 410,
      align: "center",
    });
    pdfDoc.text("---------------------------------------------------");
    pdfDoc.moveDown();
    pdfDoc.fontSize(25).text(`${blog.title}`, { width: 410, align: "center" });
    pdfDoc.moveDown(1);
    pdfDoc.image(`${blog.imageUrl}`, {
      fit: [250, 300],
      align: "center",
      valign: "center",
    });
    pdfDoc.moveDown(10);
    pdfDoc.fontSize(25).text(`${blog.description} `);
    pdfDoc.end();
  },
};

export default blogController;
