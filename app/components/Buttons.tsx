import { DeletePost } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Buttons({ id }: { id: string | null }) {
  const router = useRouter();

  const handleDelete = async () => {
    const formSubmitRes = await DeletePost(id);
    console.log(formSubmitRes);
    toast.warning("Post has been deleted");
    toast(
      `You may still see Post ${id} as JSONPlaceholder API doesn't allow modifying its database.`
    );
    router.push(`/`);
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
        className="bg-red-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-red-500/75"
        onClick={handleDelete}
      >
        Delete Post
      </button>
    </div>
  );
}
