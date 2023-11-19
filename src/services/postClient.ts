import { IMiniPost } from "@interfaces/post";

export async function getMiniPosts() {
  const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    method: "GET",
  });
  return (await rawResponse.json()) as {
    data: Array<IMiniPost>;
    totalCount: number;
  };
}
