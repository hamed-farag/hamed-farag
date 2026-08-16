import { IMiniPost } from "@interfaces/post";

export async function getMiniPosts() {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "/api").replace(/\/$/, "");
  const rawResponse = await fetch(`${apiBase}/post`, {
    method: "GET",
  });

  if (!rawResponse.ok) {
    throw new Error(`Unable to load search index (${rawResponse.status})`);
  }

  return (await rawResponse.json()) as {
    data: Array<IMiniPost>;
    totalCount: number;
  };
}
