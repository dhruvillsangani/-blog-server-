"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStorage = exports.fileFilter = exports.upload = exports.storage = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const blog_1 = __importDefault(require("../controllers/blog"));
const authEnum_1 = require("../utils/constants/enum/authEnum");
const image_upload_1 = require("../config/image_upload");
Object.defineProperty(exports, "upload", { enumerable: true, get: function () { return image_upload_1.upload; } });
Object.defineProperty(exports, "storage", { enumerable: true, get: function () { return image_upload_1.storage; } });
Object.defineProperty(exports, "fileFilter", { enumerable: true, get: function () { return image_upload_1.fileFilter; } });
Object.defineProperty(exports, "uploadStorage", { enumerable: true, get: function () { return image_upload_1.uploadStorage; } });
const router = express_1.default.Router();
exports.router = router;
router.get(authEnum_1.Routes.BLOG, blog_1.default.getBlog);
router.post(authEnum_1.Routes.POST_BLOG, 
//TODO: change multi to enum or const
// uploadStorage.array("multi", 5),
image_upload_1.upload.single(authEnum_1.Image.IMAGE_NAME), blog_1.default.postBlog);
router.get(authEnum_1.Routes.GET_BLOG, blog_1.default.getBlogById);
router.put(authEnum_1.Routes.EDIT_BLOG, image_upload_1.upload.single(authEnum_1.Image.IMAGE_NAME), blog_1.default.editBlog);
router.post(authEnum_1.Routes.DELETE_BLOG, blog_1.default.deleteBlog);
router.put("/comments/:blogId", blog_1.default.postComments);
