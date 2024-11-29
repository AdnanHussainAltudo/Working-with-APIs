"use server";

import mongoose from "mongoose";
import { Comment, PostType, CommentModel, PostModel } from "./types";

async function MongoConnect() {
  if (mongoose.connection.readyState === 0) {
    try {
      const mongoUri = process.env.MONGO_URI!;
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB Atlas");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw new Error("Could not connect to MongoDB");
    }
  }
}

export async function PopulateDatabase(): Promise<void> {
  try {
    await MongoConnect();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch data from JSONPlaceholder");
    }
    const posts = await response.json();

    const formattedPosts = posts.map((post: PostType) => ({
      title: post.title,
      body: post.body,
      userId: post.userId,
    }));

    await PostModel.insertMany(formattedPosts);
    console.log("Database populated successfully with JSONPlaceholder data");
  } catch (error) {
    console.error("Error populating database:", error);
    throw new Error("Could not populate database");
  }
}

export async function FetchPosts(): Promise<PostType[]> {
  try {
    await MongoConnect();
    const posts = await PostModel.find().sort({ createdAt: -1 });
    return posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      body: post.body,
      userId: post.userId,
    })) as PostType[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
}

export async function FetchPostById(id: string): Promise<PostType | null> {
  try {
    await MongoConnect();
    const post = await PostModel.findById(id);
    if (!post) return null;
    return {
      id: post._id.toString(),
      title: post.title,
      body: post.body,
      userId: post.userId,
    } as PostType;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Could not fetch post");
  }
}

export async function AddPost(postData: PostType): Promise<PostType> {
  try {
    await MongoConnect();
    const newPost = await PostModel.create({
      title: postData.title,
      body: postData.body,
      userId: postData.userId,
    });
    return {
      id: newPost._id.toString(),
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId,
    } as PostType;
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Could not add post");
  }
}

export async function UpdatePost(
  id: string | null,
  postData: PostType
): Promise<PostType | null> {
  if (!id) throw new Error("Post ID is required for updating");
  try {
    await MongoConnect();
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      {
        title: postData.title,
        body: postData.body,
        userId: postData.userId,
      },
      { new: true }
    );
    if (!updatedPost) return null;
    return {
      id: updatedPost._id.toString(),
      title: updatedPost.title,
      body: updatedPost.body,
      userId: updatedPost.userId,
    } as PostType;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Could not update post");
  }
}

export async function DeletePost(id: string | null): Promise<void> {
  if (!id) throw new Error("Post ID is required for deletion");
  try {
    await MongoConnect();

    await CommentModel.deleteMany({ postId: id });
    console.log(`All comments for post ID ${id} deleted successfully`);

    await PostModel.findByIdAndDelete(id);
    console.log(`Post with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Could not delete post and its comments");
  }
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  try {
    await MongoConnect();
    const comments = await CommentModel.find({ postId });
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
