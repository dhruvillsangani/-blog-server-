"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = __importDefault(require("../models/mongodb/blog"));
const authEnum_1 = require("../ENUM/authEnum");
const blogController = {
    getBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let blog = yield blog_1.default.find();
        res.json(blog);
    }),
    postBlog: (req, res, next) => {
        console.log(req.file);
        const blog = new blog_1.default({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
        });
        blog
            .save()
            .then((result) => {
            console.log(result);
            res.json({ blog: result });
        })
            .catch((err) => console.log(err));
    },
    getBlogById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let blogId = req.params.blogId;
        try {
            let blog = yield blog_1.default.findById(blogId);
            res.json(blog);
        }
        catch (e) {
            if (e) {
                res.json(authEnum_1.blog.UNDEFINED);
            }
        }
    }),
    editBlog: (req, res, next) => {
        let blogId = req.params.blogId;
        console.log(blogId);
        const title = req.body.title;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        const tags = req.body.tags;
        blog_1.default.findById(blogId)
            .then((result) => {
            console.log(result);
            if (!result) {
                console.log("not found");
            }
            result.title = title;
            result.description = description;
            result.imageUrl = imageUrl;
            result.tags = tags;
            // @ts-ignore
            return blog_1.default.save();
        })
            .then((result) => {
            res.status(200).json({ message: authEnum_1.blog.POST_UPDATED, post: result });
        })
            .catch((err) => {
            console.log(err);
        });
    },
};
exports.default = blogController;
