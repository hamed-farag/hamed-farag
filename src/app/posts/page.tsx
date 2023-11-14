import { getPosts } from "@services/post";

export default function PostsPage() {
  return <div>list of Posts{JSON.stringify(getPosts())}</div>;
}
