import fs from "fs";
import path from "path";

import { cn } from "@lib/utils/tailwindUtils";

// Server-only: reads the Aseprite "array" JSON next to each sheet at build time, so swapping in
// final art only needs the PNG + JSON (same tag names), never a code change.

type TAsepriteFrame = {
  frame: { x: number; y: number; w: number; h: number };
  duration: number;
};

type TAsepriteSheet = {
  frames: Array<TAsepriteFrame>;
  meta: {
    image: string;
    size: { w: number; h: number };
    frameTags: Array<{ name: string; from: number; to: number }>;
  };
};

const sheets = new Map<string, TAsepriteSheet>();

function loadSheet(sheet: string) {
  if (!sheets.has(sheet)) {
    const file = path.join(process.cwd(), "public", "game", `${sheet}.json`);
    sheets.set(sheet, JSON.parse(fs.readFileSync(file, "utf-8")));
  }
  return sheets.get(sheet) as TAsepriteSheet;
}

type TSpriteProps = {
  /** path under public/game without extension, e.g. "ui/coin" */
  sheet: string;
  /** Aseprite frame tag, e.g. "spin" */
  tag: string;
  scale?: 1 | 2 | 3 | 4;
  /** show the first frame only */
  still?: boolean;
  /** omit for decorative sprites */
  label?: string;
  className?: string;
};

export function Sprite({ sheet, tag, scale = 2, still = false, label, className }: TSpriteProps) {
  const data = loadSheet(sheet);
  const range = data.meta.frameTags.find((t) => t.name === tag);
  if (!range) throw new Error(`Sprite "${sheet}" has no "${tag}" tag`);

  const frames = data.frames.slice(range.from, range.to + 1);
  const first = frames[0].frame;
  // CSS steps() animation needs the tag's frames side by side on one row
  frames.forEach(({ frame }, i) => {
    if (frame.y !== first.y || frame.x !== first.x + i * first.w) {
      throw new Error(`Sprite "${sheet}" tag "${tag}" must be one row of equal frames`);
    }
  });

  const px = (n: number) => `${n * scale}px`;
  const animate = !still && frames.length > 1;
  const style = {
    "--sprite-src": `url(/game/${path.posix.dirname(sheet)}/${data.meta.image})`,
    "--sprite-w": px(first.w),
    "--sprite-h": px(first.h),
    "--sprite-sheet-w": px(data.meta.size.w),
    "--sprite-sheet-h": px(data.meta.size.h),
    "--sprite-x": px(-first.x),
    "--sprite-y": px(-first.y),
    "--sprite-x-end": px(-(first.x + frames.length * first.w)),
    "--sprite-steps": frames.length,
    "--sprite-duration": `${frames.reduce((sum, f) => sum + f.duration, 0)}ms`,
  } as React.CSSProperties;

  return (
    <span
      className={cn("px-sprite", className)}
      style={style}
      data-animate={animate ? "" : undefined}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}
