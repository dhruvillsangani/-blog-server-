import Blog from "../models/mongodb/blog";
import { Request, Response } from "express";
import { blog } from "../ENUM/authEnum";
import multer from "multer";

const blogController = {
  getBlog: async (req: Request, res: Response, next: any) => {
    let blog = await Blog.find();
    res.json(blog);
  },
  postBlog: (req: Request, res: Response, next: any) => {
    console.log(req.file);
    const blog = new Blog({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
    });

    blog
      .save()
      .then((result: any) => {
        console.log(result);
        res.json({ blog: result });
      })
      .catch((err: any) => console.log(err));
  },

  getBlogById: async (
    req: { params: { blogId: any } },
    res: Response,
    next: any
  ) => {
    let blogId = req.params.blogId;
    try {
      let blog = await Blog.findById(blogId);
      res.json(blog);
    } catch (e) {
      if (e) {
        res.json(blog.UNDEFINED);
      }
    }
  },
  editBlog: (req: Request, res: Response, next: any) => {
    let blogId = req.params.blogId;
    console.log(blogId);
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const tags = req.body.tags;

    Blog.findById(blogId)
      .then((result: any) => {
        console.log(result);
        if (!result) {
          console.log("not found");
        }

        result.title = title;
        result.description = description;
        result.imageUrl = imageUrl;
        result.tags = tags;
        // @ts-ignore
        return Blog.save();
      })
      .then((result: any) => {
        res.status(200).json({ message: blog.POST_UPDATED, post: result });
      })
      .catch((err: any) => {
        console.log(err);
      });
  },
};

export default blogController;
