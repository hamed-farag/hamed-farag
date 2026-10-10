import { getLevel } from "@configs/levels";

/** Fixed sky + tiled parallax layers behind a level's content (decorative). */
export function LevelScene({ id }: { id: string }) {
  const level = getLevel(id);

  return (
    <div className="lv-scene" aria-hidden="true">
      {level.layers.map((layer) => (
        <div
          key={layer.src}
          className="lv-layer"
          style={
            {
              "--layer-src": `url(${layer.src})`,
              "--layer-w": `calc(${layer.width}px * var(--px-scale))`,
              "--layer-h": `calc(${layer.height}px * var(--px-scale))`,
              "--layer-repeat": layer.repeat ?? "repeat-x",
              "--layer-y": layer.top ?? "0px",
              "--layer-depth": layer.depth,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
