// Every page outside the world map is a "level". Levels share one shell (HUD, ground)
// and differ by name and scenery. More levels move here as their pages are re-skinned.

export type TLevelLayer = {
  /** file under public/game */
  src: string;
  /** art size in pixels; drawn at --px-scale */
  width: number;
  height: number;
  repeat?: "repeat" | "repeat-x";
  /** CSS length for the layer's top offset */
  top?: string;
  /** 0 = fixed, 1 = moves with the page; scroll-linked where supported */
  depth: number;
};

export type TLevel = {
  id: string;
  path: string;
  world: string;
  /** short name for the HUD, e.g. "Hire Me" */
  name: string;
  /** themed name of the level, e.g. "Item Shop" */
  title: string;
  layers: Array<TLevelLayer>;
};

export const levels: Array<TLevel> = [
  {
    id: "hire",
    path: "/hire",
    world: "4",
    name: "Hire Me",
    title: "Item Shop",
    layers: [
      { src: "/game/levels/bg-planks.png", width: 32, height: 32, repeat: "repeat", depth: 0.15 },
      { src: "/game/levels/awning.png", width: 32, height: 16, top: "calc(var(--hud-h) + 4px)", depth: 0.6 },
    ],
  },
];

export function getLevel(id: string) {
  const level = levels.find((l) => l.id === id);
  if (!level) throw new Error(`Unknown level "${id}"`);
  return level;
}

export function getLevelByPath(pathname: string) {
  return levels.find((l) => pathname === l.path || pathname.startsWith(`${l.path}/`));
}
