import { PostType } from "@/lib/types";
import { FormEvent, useState } from "react";

export default function PostForm({
  submitHandler,
  formData,
  handleInputChange,
  modalVisibility,
}: {
  submitHandler: (e: FormEvent) => Promise<void>;
  formData: PostType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  modalVisibility: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitHandler(e);

    setIsSubmitting(false);
  };

  return (
    <>
      <form
        className="max-w-[25rem] w-full bg-zinc-800 p-8 shadow-md rounded-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold">Add a New Post</h2>
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
            className={`${
              isSubmitting ? "bg-white/25" : "bg-white"
            } text-black px-4 py-2 rounded-md font-semibold hover:bg-white/75`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Add Post"}
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-zinc-600/75"
            onClick={modalVisibility}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
