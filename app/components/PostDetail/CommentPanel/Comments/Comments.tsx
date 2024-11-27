import { Comment } from "@/lib/types";

export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <div className="bg-slate-900/50 p-8 rounded-3xl mt-4">
      <h2 className="text-3xl font-semibold">Comment Panel</h2>
      <hr className="mt-2 mb-8" />
      {comments.map((comment, index) => (
        <ul key={index} className="rounded-sm my-4">
          <li className="text-base text-slate-400">{comment.message}</li>
        </ul>
      ))}
    </div>
  );
}
