"use client";

import { addComment } from "@/lib/actions";
import { Comment } from "@/lib/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function CommentForm({ id }: { id: string | null }) {
  const [formData, setFormData] = useState<Comment>({
    message: "",
    postId: id,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formSubmitRes = await addComment(formData);
    toast.info("Comment added to the Post");
    router.push(`/posts/${formSubmitRes.postId}`);
    setIsSubmitting(false);
  };
  return (
    <>
      <form
        className="bg-slate-900 p-8 rounded-3xl"
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl font-bold">Leave a comment</h2>
        <hr className="mt-2 mb-8" />
        <p className="mb-4">
          <label htmlFor="message" className="block mb-2">
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border-0 rounded-md min-h-8 text-black px-2"
          />
        </p>
        <div className="flex justify-between">
          <button
            className={clsx(" text-black px-4 py-2 rounded-md font-semibold ", {
              "bg-white hover:bg-white/75": !isSubmitting,
              "bg-white/25": isSubmitting,
            })}
          >
            {isSubmitting ? "Adding..." : "Add Comment"}
          </button>
        </div>
      </form>
    </>
  );
}
