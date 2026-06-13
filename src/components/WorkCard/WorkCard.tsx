import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { IWork } from "@interfaces/work";

type TWorkCardProps = {
  work: IWork;
};

export function WorkCard({ work }: TWorkCardProps) {
  return (
    <a
      href={work.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group card-whimsy h-full flex flex-col overflow-hidden border border-border/50"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg mt-0 mb-2 transition-colors duration-300 group-hover:text-primary">
          {work.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed m-0 line-clamp-3 flex-1">
          {work.description}
        </p>

        {/* Visit affordance */}
        <span className="mt-4 flex items-center gap-1 text-xs font-display font-semibold text-primary">
          Visit
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
