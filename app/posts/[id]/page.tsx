"use client";

import { Post } from "@/app/types";
import { useEffect, useState } from "react";

export default function PageDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [post, setPost] = useState<Post>({});

  useEffect(() => {
    const fetchId = async () => {
      const params = await props.params;
      setId(params.id);
    };

    fetchId();
  }, [props.params]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
          );
          const resData = await response.json();
          setPost(resData);
        } catch (error) {
          console.error("Failed to fetch post", error);
        }
      };

      fetchPost();
    }
  }, [id]);

  return (
    <div className="flex justify-center min-h-screen mx-10 font-[family-name:var(--font-geist-sans)] p-6">
      {post.title ? (
        <div className="w-1/2">
          <h3 className="text-3xl">Post Details</h3>
          <hr className="mt-4 mb-8" />
          <p className="text-xl text-slate-400">Title</p>
          <p>{post.title}</p>
          <p className="mt-4 text-xl text-slate-400">Body</p>
          <p>{post.body}</p>
          <div className="flex italic text-gray-500 gap-8 mt-4">
            <p>Post ID:- {id}</p>
            <p>User ID:- {post.userId}</p>
          </div>
        </div>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
}
