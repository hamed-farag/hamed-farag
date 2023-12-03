import Link from "next/link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import { IUser } from "@/interfaces/user";

type TSocialIconsProps = {
  user: IUser | null;
};

export function SocialIcons(props: TSocialIconsProps) {
  const { user } = props;

  return (
    <section className="flex justify-center space-x-4 mb-4 text-gray-500 dark:text-gray-400">
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
  );
}
