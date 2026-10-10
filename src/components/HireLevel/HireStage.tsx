"use client";

import { useHireLevel } from "./HireLevelContext";

import "./hireStage.css";

type THireStageProps = {
  /** server-rendered sprites (they read their Aseprite JSON at build time) */
  walker: React.ReactNode;
  suitIdle: React.ReactNode;
  suitVictory: React.ReactNode;
};

/**
 * Item Shop stage: the hero slides out of a side pipe, walks under a giant
 * magnifier, and the lens shows him magnified in a suit. Decorative, never
 * blocks the content; under reduced motion it starts in the final pose.
 */
export function HireStage({ walker, suitIdle, suitVictory }: THireStageProps) {
  const { cleared } = useHireLevel();

  return (
    <div
      className="hw-stage"
      data-cleared={cleared ? "" : undefined}
      role="img"
      aria-label="Hamed steps out of a pipe and stands under a giant magnifier, which shows him in a suit"
    >
      <div className="hw-scene" aria-hidden="true">
        <div className="hw-spot" />
        <div className="hw-walker">{walker}</div>
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel art, next/image can't keep it crisp */}
        <img className="hw-pipe" src="/game/objects/pipe-side.png" alt="" />
        <div className="hw-lens">
          <span className="hw-suit hw-suit--idle">{suitIdle}</span>
          <span className="hw-suit hw-suit--victory">{suitVictory}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel art, next/image can't keep it crisp */}
        <img className="hw-magnifier" src="/game/levels/magnifier.png" alt="" />
        <div className="hw-floor" />
      </div>
    </div>
  );
}
