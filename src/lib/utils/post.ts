import dayjs from "dayjs";

import { IPost } from "@/interfaces/post";

export function sortPosts(posts: Array<IPost>) {
  return posts.sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1));
}
