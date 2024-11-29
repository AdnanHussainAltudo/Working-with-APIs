import EditForm from "@/app/components/EditForm";
import { FetchPostById } from "@/lib/actions";
import { PostType } from "@/lib/types";

export default async function EditPost(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = await params.id;
  const postData: PostType | null = await FetchPostById(id);
  return (
    <>
      {postData === null ? (
        <div className="flex justify-center min-h-screen mx-10 font-[family-name:var(--font-geist-sans)] p-6">
          <p>No Post found with given ID.</p>
        </div>
      ) : (
        <EditForm id={id} postData={postData} />
      )}
    </>
  );
}
