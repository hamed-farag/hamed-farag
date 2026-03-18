import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

import { IUser } from "@/interfaces/user";

type TSocialIconsProps = {
  user: IUser | null;
};

export function SocialIcons(props: TSocialIconsProps) {
  const { user } = props;

  return (
    <section className="flex justify-center space-x-5 mb-4">
      <Link
        target="_blank"
        href={user?.github || "#"}
        className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 hover:-translate-y-1"
      >
        <Github className="w-5 h-5" />
      </Link>
      <Link
        target="_blank"
        href={user?.linkedIn || "#"}
        className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 hover:-translate-y-1"
      >
        <Linkedin className="w-5 h-5" />
      </Link>
      <Link
        target="_blank"
        href={user?.twitter || "#"}
        className="text-muted-foreground hover:text-primary transition-all duration-500 hover:scale-125 hover:-translate-y-1"
      >
        <Twitter className="w-5 h-5" />
      </Link>
    </section>
  );
}
