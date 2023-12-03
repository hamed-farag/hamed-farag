import { Card } from "@components/ui/Card";

import { SocialIcons } from "@components/SocialIcons";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";

import { getUser } from "@services/user";

export async function AboutCard() {
  const user = await getUser();

  if (!user) throw new Error("about.mdx not found");

  return (
    <Card className="p-6 w-full">
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <article>
          <Avatar className="h-32 w-32 mx-auto mb-3">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <article className="whitespace-nowrap text-center mb-3">
            <h3 className="block">{user.name}</h3>
            <span className="block text-gray-500 dark:text-gray-400">
              {user.jobTitle}
            </span>
          </article>
          <SocialIcons user={user} />
        </article>
        <article
          className="w-full lg:col-span-3 text-center lg:text-start mdx"
          dangerouslySetInnerHTML={{ __html: user.content }}
        />
      </section>
    </Card>
  );
}
