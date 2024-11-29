"use client";

import { DeletePost } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import clsx from "clsx";

export default function Buttons({ id }: { id: string | null }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await DeletePost(id);
      toast.warning("Post has been deleted");
      router.push(`/`);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete the post.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex justify-between">
      <Link
        className="bg-cyan-300 text-black px-4 py-2 rounded-md font-semibold hover:bg-cyan-300/75"
        href={`/posts/${id}/edit`}
      >
        Edit Post
      </Link>
      <button
        className={clsx("px-4 py-2 rounded-md font-semibold text-black", {
          "bg-red-500 hover:bg-red-500/75": !isDeleting,
          "bg-red-300 cursor-not-allowed": isDeleting,
        })}
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Post"}
      </button>
    </div>
  );
}
