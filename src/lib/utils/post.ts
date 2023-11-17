import dayjs from "dayjs";

import { IPost, ISearchParams } from "@/interfaces/post";

export function sortPostsByDate(posts: Array<IPost>) {
  return posts.sort((a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1));
}

export function filterPosts(posts: Array<IPost>, filterBy?: ISearchParams) {
  if (!filterBy) return posts;
  if (!filterBy.tag) return posts;

  return posts.filter((post) => post.tags.includes(filterBy.tag));
}

export function calculateTagCount(posts: Array<IPost>) {
  const tagCountArray: Array<{ name: string; count: number }> = [];

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const existingTag = tagCountArray.find((obj) => obj.name === tag);

      if (existingTag) {
        existingTag.count++;
      } else {
        tagCountArray.push({ name: tag, count: 1 });
      }
    });
  });

  return tagCountArray;
}
