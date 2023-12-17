export interface IShow {
  available_markets: string[];
  copyrights: any[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
  episodes: IEpisodes;
}

export interface IEpisodes {
  href: string;
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
  items: IEpisode[];
}

export interface IEpisode {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: IResumePoint;
  type: string;
  uri: string;
}

export interface IExternalUrls {
  spotify: string;
}

export interface IImage {
  url: string;
  height: number;
  width: number;
}

export interface IResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}
