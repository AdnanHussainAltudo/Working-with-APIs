"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { PostType } from "@/lib/types";

export default function AllPosts({ allPosts }: { allPosts: PostType[] }) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-screen md:mx-10 font-[family-name:var(--font-geist-sans)]">
        {posts.map((post) => (
          <div key={post.id} className="p-6">
            <Link href={`/posts/${post.id}`}>
              <div className="bg-slate-300 text-gray-800 p-6 rounded-md hover:scale-105 ease-in-out duration-200 h-full">
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
