import EditForm from "@/app/components/EditForm";
import { FetchPostById } from "@/lib/actions";
import { PostType } from "@/lib/types";

export default async function EditPost(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = await params.id;
  const postData: PostType = await FetchPostById(id);
  return (
    <>
      <EditForm id={id} postData={postData} />
    </>
  );
}
