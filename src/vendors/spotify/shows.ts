import { getToken } from "./token";

import { IShow, IEpisodes } from "./IShows";

export async function getShowById(showId: string) {
  // let myShow: Show;
  const token = await getToken();
  const response = await fetch(
    `${process.env.SPOTIFY_BASE_API_URL}/shows/${showId}"`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return (await response.json()) as Promise<IShow>;
}

export async function getEpisodesByShowId(
  showId: string,
  pageSize: number = 10,
  pageOffset: number = 0
) {
  // let myShow: Show;
  const token = await getToken();
  const response = await fetch(
    `${process.env.SPOTIFY_BASE_API_URL}/shows/${showId}/episodes?limit=${pageSize}&offset=${pageOffset}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token.access_token}` },
    }
  );

  return (await response.json()) as Promise<IEpisodes>;
}
