"use server";

import { PostType } from "./types";

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
