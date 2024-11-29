import PostDetails from "@/app/components/PostDetail/PostDetails";
import { fetchComments, FetchPostById } from "@/lib/actions";

export default async function PageDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id: string = params.id;

  const postData = await FetchPostById(id);
  const postComments = await fetchComments(id);

  return (
    <>
      {postData === null ? (
        <div className="flex justify-center min-h-screen mx-10 font-[family-name:var(--font-geist-sans)] p-6">
          <p>No Post found with given ID.</p>
        </div>
      ) : (
        <PostDetails id={id} post={postData} comments={postComments} />
      )}
    </>
  );
}
