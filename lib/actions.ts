"use server";

import mongoose from "mongoose";
import { Comment, PostType, CommentModel } from "./types";

export async function FetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const resData = await response.json();
  return resData;
}

export async function FetchPostById(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const resData = await response.json();
  return resData;
}

export async function AddPost(postData: PostType) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ ...postData }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const resData = await response.json();
  console.log(resData);
  return resData;
}

export async function UpdatePost(id: string | null, postData: PostType) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ ...postData }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const resData = await response.json();
  console.log(resData);
  return resData;
}

export async function DeletePost(id: string | null) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      method: "DELETE",
    }
  );
  const resData = await response.json();
  console.log(resData);
}

async function MongoConnect() {
  try {
    const mongoUri = process.env.MONGO_URI!;
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.log(error);
  }
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  try {
    await MongoConnect();
    const comments = await CommentModel.find({ postId });
    // Explicitly typecast to Comment[]
    return comments.map((comment) => ({
      id: comment._id?.toString(),
      message: comment.message,
      postId: comment.postId,
    })) as Comment[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Could not fetch comments");
  }
}

export async function addComment(newComment: Comment): Promise<Comment> {
  try {
    await MongoConnect();
    const createdComment = await CommentModel.create({
      message: newComment.message,
      postId: newComment.postId,
    });
    // Explicitly typecast to Comment
    return {
      id: createdComment._id?.toString(),
      message: createdComment.message,
      postId: createdComment.postId,
    } as Comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Could not add comment");
  }
}
