"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = exports.upload = exports.storage = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const blog_1 = __importDefault(require("../controllers/blog"));
const authEnum_1 = require("../ENUM/authEnum");
var router = express_1.default.Router();
exports.router = router;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
exports.storage = storage;
const fileFilter = (req, file, cb) => {
    if (file.mimetype == authEnum_1.Image.JPEG_TYPE ||
        file.mimetype === authEnum_1.Image.PNG_TYPE ||
        file.mimetype == authEnum_1.Image.JPG_TYPE) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.fileFilter = fileFilter;
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: fileFilter,
});
exports.upload = upload;
router.get(authEnum_1.Routes.BLOG, blog_1.default.getBlog);
router.post(authEnum_1.Routes.POST_BLOG, upload.single(authEnum_1.Image.IMAGE_NAME), blog_1.default.postBlog);
router.get(authEnum_1.Routes.GET_BLOG, blog_1.default.getBlogById);
router.put(authEnum_1.Routes.EDIT_BLOG, blog_1.default.editBlog);
