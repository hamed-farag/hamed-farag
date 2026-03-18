import { Hand } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/Avatar";
import { SocialIcons } from "@components/SocialIcons";

import { getUser } from "@services/user";

export async function AboutCard() {
  const user = await getUser();

  if (!user) throw new Error("about.mdx not found");

  return (
    <section className="py-8 animate-reveal-delay-3">
      <h2 className="font-display gradient-text inline-block mb-6">
        About Me <Hand className="inline-block h-5 w-5 ml-1" />
      </h2>
      <div className="card-whimsy border border-border/50 p-8 md:p-10">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="flex flex-col items-center">
            <div className="relative mb-5 group">
              <div
                className="absolute -inset-2 rounded-full opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--gradient-primary)" }}
              />
              <Avatar className="h-32 w-32 relative">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="font-display text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <article className="whitespace-nowrap text-center mb-3">
              <h3 className="block font-display font-bold gradient-text">
                {user.name}
              </h3>
              <span className="block text-sm text-muted-foreground">
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
      </div>
    </section>
  );
}
