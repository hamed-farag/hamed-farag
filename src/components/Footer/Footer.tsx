import Link from "next/link";
import {
  TwitterLogoIcon,
  LinkedInLogoIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";

import { getUser } from "@services/user";

export async function Footer() {
  const user = await getUser();

  if (!user) throw new Error("about.mdx not found");

  return (
    <footer className="flex flex-col items-center py-10">
      <section className="flex space-x-4 mb-4 text-gray-500 dark:text-gray-400">
        <Link target="_blank" href={user?.github || "#"}>
          <GitHubLogoIcon className="w-6 h-6 transition-all hover:scale-105" />
        </Link>
        <Link target="_blank" href={user?.linkedIn || "#"}>
          <LinkedInLogoIcon className="w-6 h-6 transition-all hover:scale-105" />
        </Link>
        <Link target="_blank" href={user?.twitter || "#"}>
          <TwitterLogoIcon className="w-6 h-6 transition-all hover:scale-105" />
        </Link>
      </section>
      <section className="flex space-x-2 mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{user?.name}</span>
        <span>{` • `}</span>
        <span>{`© ${new Date().getFullYear()}`}</span>
      </section>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Built with <b>Nextjs</b>
        {` • `}
        <b>Shadcn/UI</b>
        {` • `}
        <b>Tailwind</b>
        {` • `}
        <b>MDX</b>
      </span>
    </footer>
  );
}
