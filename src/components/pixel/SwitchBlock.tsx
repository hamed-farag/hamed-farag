import { Check } from "pixelarticons/react/Check.js";

import { cn } from "@lib/utils/tailwindUtils";

import { PixelIcon } from "./PixelIcon";

type TSwitchBlockProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> & {
  pressed: boolean;
};

/** Toggle block. Pressed shows a sunken shape and a check mark, so the state never relies on colour. */
export function SwitchBlock({ pressed, className, children, ...props }: TSwitchBlockProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn("px-frame px-btn px-btn--secondary px-switch", className)}
      {...props}
    >
      {pressed && <PixelIcon icon={Check} />}
      {children}
    </button>
  );
}
