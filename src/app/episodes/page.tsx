import { getEpisodes } from "@services/episodes/episodes";

export default async function EpisodesPage() {
  const allPosts = await getEpisodes();

  return <div>{JSON.stringify(allPosts)}</div>;
}
