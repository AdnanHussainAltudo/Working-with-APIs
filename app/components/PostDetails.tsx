"use client";

import { PostType } from "@/lib/types";
import Buttons from "./Buttons";

export default function PostDetails({
  id,
  post,
}: {
  id: string | null;
  post: PostType;
}) {
  return (
    <div className="flex justify-center mx-10 font-[family-name:var(--font-geist-sans)] p-6">
      {post.title ? (
        <div className="w-1/2 bg-slate-600/25 p-8 rounded-3xl">
          <h3 className="text-3xl">Post Details</h3>
          <hr className="mt-4 mb-8" />
          <p className="text-xl text-slate-400">Title</p>
          <p>{post.title}</p>
          <p className="mt-4 text-xl text-slate-400">Body</p>
          <p>{post.body}</p>
          <div className="flex italic text-gray-500 gap-8 mt-4 mb-8">
            <p>Post ID:- {id}</p>
            <p>User ID:- {post.userId}</p>
          </div>
          <Buttons id={id} />
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
}
