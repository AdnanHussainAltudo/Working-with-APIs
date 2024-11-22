"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "./types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const resData = await response.json();
      console.log(resData);
      setPosts(resData);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 min-h-screen mx-10 font-[family-name:var(--font-geist-sans)]">
        {posts.map((post) => (
          <div key={post.id} className="p-6">
            <Link href={`/posts/${post.id}`}>
              <div className="bg-slate-300 text-gray-800 p-6 rounded-md hover:scale-105 ease-in-out duration-200">
                <p className="font-bold text-xl">{post.title}</p>
                <p>{post.body}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
