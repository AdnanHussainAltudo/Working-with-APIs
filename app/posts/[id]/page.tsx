import PostDetails from "@/app/components/PostDetails";
import { FetchPostById } from "@/lib/actions";

export default async function PageDetails(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id: string = params.id;

  const postData = await FetchPostById(id);

  return <PostDetails id={id} post={postData} />;
}
