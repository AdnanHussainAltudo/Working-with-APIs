import mongoose from "mongoose";

export type PostType = {
  id?: number;
  title?: string;
  body?: string;
  userId?: number;
};

export type Comment = {
  id?: number;
  message?: string;
  postId?: string | null;
};

export const CommentModel =
  mongoose.models.Comment ||
  mongoose.model(
    "Comment",
    new mongoose.Schema({
      message: { type: String, required: true },
      postId: { type: String, required: true },
    })
  );
