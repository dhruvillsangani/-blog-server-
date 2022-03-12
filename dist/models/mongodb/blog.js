"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const blogSchema = new mongoose_2.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: String,
            required: true,
        },
    ],
    author: {
        type: String,
        required: false,
    },
    comments: [
        {
            userName: {
                type: String,
                required: false,
            },
            comment: {
                type: String,
                required: false,
            },
        },
    ],
});
const Blog = mongoose_1.default.model("Blog", blogSchema);
exports.default = Blog;
