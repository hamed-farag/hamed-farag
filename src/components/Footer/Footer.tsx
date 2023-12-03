import { SocialIcons } from "@components/SocialIcons";

import { getUser } from "@services/user";

export async function Footer() {
  const user = await getUser();

  if (!user) throw new Error("about.mdx not found");

  return (
    <footer className="flex flex-col items-center py-10">
      <SocialIcons user={user} />
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
