"use client";

import { UpdatePost } from "@/lib/actions";
import { PostType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";

export default function EditForm({
  id,
  postData,
}: {
  id: string | null;
  postData: PostType;
}) {
  const [formData, setFormData] = useState<PostType>({
    title: postData.title,
    body: postData.body,
    userId: postData.userId,
  });

  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formSubmitRes = await UpdatePost(id, formData);
      toast.info("Post has been updated successfully");
      router.push(`/posts/${formSubmitRes!.id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update the post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className="max-w-[25rem] w-full bg-zinc-800 p-8 shadow-md rounded-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-bold">Edit Post</h2>
        <hr className="mt-2 mb-8" />
        <p className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border-0 rounded-md min-h-8 text-black px-2"
          />
        </p>
        <p className="mb-4">
          <label htmlFor="body" className="block mb-2">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            className="w-full border-0 rounded-md min-h-8 text-black px-2"
          ></textarea>
        </p>
        <p className="mb-8">
          <label htmlFor="userid" className="block mb-2">
            User ID
          </label>
          <input
            type="text"
            id="userid"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="w-full border-0 rounded-md min-h-8 text-black px-2"
          />
        </p>
        <div className="flex justify-between">
          <button
            type="submit"
            className={clsx("text-black px-4 py-2 rounded-md font-semibold", {
              "bg-cyan-300 hover:bg-cyan-300/75": !isSaving,
              "bg-cyan-100 text-gray-500 cursor-not-allowed": isSaving,
            })}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
