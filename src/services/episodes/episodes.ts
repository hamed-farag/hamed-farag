import { getEpisodesByShowId } from "@vendors/spotify/shows";

export function getEpisodes(pageSize?: number, pageOffset?: number) {
  const showId = process.env.SPOTIFY_SHOW_ID;

  if (showId === undefined) {
    throw new Error("SPOTIFY_SHOW_ID is not defined");
  }

  return getEpisodesByShowId(showId, pageSize, pageOffset);
}
