import { Comment } from "@/lib/types";
import CommentForm from "./CommentForm/CommentForm";
import Comments from "./Comments/Comments";

export default function CommentPanel({
  comments,
  id,
}: {
  comments: Comment[];
  id: string | null;
}) {
  return (
    <div className="flex flex-col">
      <CommentForm id={id} />
      {comments.length !== 0 && <Comments comments={comments} />}
    </div>
  );
}
