import { NextResponse } from "next/server";

import { getPosts } from "@services/post";

import { sortPostsByDate } from "@lib/utils/post";
import { IMiniPost } from "@interfaces/post";

export async function GET() {
  const allPosts = sortPostsByDate(getPosts());
  const miniPosts: Array<IMiniPost> = allPosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
  }));

  return NextResponse.json(
    { data: miniPosts, totalCount: miniPosts.length },
    { status: 200 }
  );
}
