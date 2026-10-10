import { cn } from "@lib/utils/tailwindUtils";

export type TPixelFrameVariant = "paper" | "paper-2" | "msg" | "wood" | "coin" | "love";

type TPixelFrameProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article" | "aside" | "header" | "figure" | "li";
  variant?: TPixelFrameVariant;
  /** no hard drop shadow */
  flat?: boolean;
};

const VARIANT_CLASS: Record<TPixelFrameVariant, string> = {
  paper: "",
  "paper-2": "px-frame--paper-2",
  msg: "px-frame--msg",
  wood: "px-frame--wood",
  coin: "px-frame--coin",
  love: "px-frame--love",
};

/** Panel with stepped pixel corners, outline, bevel and a hard offset shadow. */
export function PixelFrame({
  as: Comp = "div",
  variant = "paper",
  flat = false,
  className,
  ...props
}: TPixelFrameProps) {
  return (
    <Comp
      className={cn("px-frame", VARIANT_CLASS[variant], flat && "px-frame--flat", className)}
      {...props}
    />
  );
}
