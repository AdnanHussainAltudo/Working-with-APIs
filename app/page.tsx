import { FetchPosts } from "@/lib/actions";
import AllPosts from "./components/AllPosts";
import { PostType } from "@/lib/types";

export default async function Home() {
  const allPosts: PostType[] = await FetchPosts();
  return <AllPosts allPosts={allPosts} />;
}
