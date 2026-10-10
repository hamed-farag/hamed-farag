import { Slot } from "@radix-ui/react-slot";

import { cn } from "@lib/utils/tailwindUtils";

type TPixelButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "hud";
  /** render the child element (e.g. a Link) with button styles */
  asChild?: boolean;
};

/** Pixel button: bumps up on hover, squashes on press (both off under reduced motion). */
export function PixelButton({
  variant = "secondary",
  asChild = false,
  className,
  ...props
}: TPixelButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn("px-frame px-btn", `px-btn--${variant}`, className)}
      {...props}
    />
  );
}
