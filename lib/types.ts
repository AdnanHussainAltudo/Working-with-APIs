import mongoose from "mongoose";

export type PostType = {
  id?: string;
  title?: string;
  body?: string;
  userId?: number;
};

export type Comment = {
  id?: string;
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

export const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: Number, required: true },
  },
  { timestamps: true }
);

export const PostModel =
  mongoose.models.Post || mongoose.model("Post", PostSchema);
