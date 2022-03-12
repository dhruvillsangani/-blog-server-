import mongoose from "mongoose";
import { Schema, Types, model, connect } from "mongoose";

interface blog {
  title: string;
  description: string;
  imageUrl: string;
  tags: Types.Array<string>;
  comments: [
    {
      userName: string;
      comment: string;
    }
  ];
  author: string;
}

const blogSchema = new Schema<blog>({
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

const Blog = mongoose.model<blog>("Blog", blogSchema);

export default Blog;
