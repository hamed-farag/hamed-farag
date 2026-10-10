import { Sprite } from "@components/pixel/Sprite";
import { getPosts } from "@services/post";
import { getWorks } from "@services/work";
import { siteMetadata } from "@configs/siteMetadata";

import { Hud } from "./Hud";
import { Ground } from "./Ground";

/** Shared frame for every level: HUD on top, the page in the middle, ground at the bottom. */
export function LevelShell({ children }: { children: React.ReactNode }) {
  const stats = {
    articles: getPosts().length,
    projects: getWorks().length,
    years: new Date().getFullYear() - siteMetadata.careerStartYear,
  };

  return (
    <div className="level">
      <a href="#level-main" className="lv-skip px-frame px-btn px-btn--secondary">
        Skip to content
      </a>
      <Hud
        stats={stats}
        coin={<Sprite sheet="ui/coin" tag="spin" scale={2} still />}
        head={
          // eslint-disable-next-line @next/next/no-img-element -- 16x16 pixel art, next/image can't keep it crisp
          <img
            src="/game/hero/hero-head.png"
            alt=""
            width={32}
            height={32}
            className="px-pixelated"
          />
        }
      />
      <main id="level-main" className="mx-auto w-11/12 max-w-[72rem] pb-16 pt-10 xl:w-3/4">
        {children}
      </main>
      <Ground />
    </div>
  );
}
