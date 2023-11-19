export interface IPost {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: Array<string>;
  content: string;
}

export interface IMiniPost {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: Array<string>;
}

export interface ISearchParams {
  tag: string;
}
