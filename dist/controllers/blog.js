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
const authEnum_1 = require("../utils/constants/enum/authEnum");
const logger_config_1 = require("../config/logger_config");
const file_1 = require("../config/file");
const pdfkit_1 = __importDefault(require("pdfkit"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app_1 = require("../app");
const blogController = {
    getBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield blog_1.default.find();
        res.json(blog);
    }),
    postBlog: (req, res, next) => {
        logger_config_1.logger.info(req.files);
        const blog = new blog_1.default({
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.file.path,
            tags: req.body.tags,
        });
        blog
            .save()
            .then((result) => {
            console.log(result);
            app_1.io.emit("blogs", { action: "create", blog: result });
            res.json({ blog: result });
        })
            .catch((err) => console.log(err));
    },
    getBlogById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const blogId = req.params.blogId;
        try {
            const blog = yield blog_1.default.findById(blogId);
            res.json(blog);
        }
        catch (e) {
            if (e) {
                res.json(authEnum_1.blog.UNDEFINED);
            }
        }
    }),
    editBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let blogId = req.params.blogId;
            console.log(req.file);
            if (!req.file) {
                const error = new Error();
                error.message = authEnum_1.blog.IMAGE_NOT_FOUND;
                error.statusCode = authEnum_1.status.VALIDATION_ERROR;
                logger_config_1.logger.error(error);
                throw error;
            }
            // const title = req.body.title;
            // const description = req.body.description;
            const imageUrl = req.file.path;
            // const tags = req.body.tags;
            const { title, description, tags } = req.body;
            yield blog_1.default.findById(blogId).then((response) => {
                (0, file_1.deleteFile)(response.imageUrl);
            });
            yield blog_1.default.findOneAndUpdate({ _id: blogId }, {
                title: title,
                description: description,
                imageUrl: imageUrl,
                tags: tags,
            }, {
                returnOriginal: false,
            })
                .then((result) => {
                logger_config_1.logger.info(result);
                if (!result) {
                    res.status(authEnum_1.status.VALIDATION_ERROR).json({ msg: authEnum_1.blog.NOTFOUND });
                }
                res
                    .status(authEnum_1.status.success)
                    .json({ message: authEnum_1.blog.POST_UPDATED, post: result });
            })
                .catch((err) => {
                console.log(err);
            });
        }
        catch (error) {
            logger_config_1.logger.error(error);
            res.json({ error: error });
        }
    }),
    deleteBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blogId = req.params.blogId;
            const blogById = yield blog_1.default.findById(blogId);
            if (blogById) {
                (0, file_1.deleteFile)(blogById.imageUrl);
                yield blog_1.default.findByIdAndDelete(blogId);
                res.json({ msg: authEnum_1.blog.IMAGE_DELETED_SUCCESSFULLY });
            }
            if (!blogById) {
                const error = new Error();
                error.message = authEnum_1.blog.BLOG_NOT_FOUND;
                error.statusCode = authEnum_1.status.VALIDATION_ERROR;
                logger_config_1.logger.error(error);
                throw error;
            }
        }
        catch (error) {
            res.json({ error: error });
        }
    }),
    postComments: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const blogId = req.params.blogId;
        logger_config_1.logger.info(blogId);
        const { userName, comment } = req.body;
        if (!blogId) {
            const error = new Error();
            error.msg = "Blog not found";
            error.statusCode = 501;
        }
        const comments = [
            {
                userName: userName,
                comment: comment,
            },
        ];
        logger_config_1.logger.info(comments);
        const updateComments = yield blog_1.default.findByIdAndUpdate(blogId, {
            $push: {
                comments: comments,
            },
        });
        logger_config_1.logger.info(updateComments);
        res.json(updateComments);
    }),
    blogToPdf: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const blogId = req.params.blogId;
        const blog = yield blog_1.default.findById(blogId);
        const invoiceName = "blog-" + blogId + ".pdf";
        const invoicePath = path_1.default.join("blogpdf", invoiceName);
        const pdfDoc = new pdfkit_1.default({ size: "A4" });
        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader(
        //   "Content-Disposition",
        //   'inline; filename="' + invoiceName + '"'
        // );
        pdfDoc.pipe(fs_1.default.createWriteStream(invoicePath));
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
    }),
};
exports.default = blogController;
