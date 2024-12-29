import mongoose, { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = model<TBlog>("Blog", blogSchema);

export default Blog;
