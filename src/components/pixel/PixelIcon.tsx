import { cn } from "@lib/utils/tailwindUtils";

type TIcon = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

type TPixelIconProps = {
  icon: TIcon;
  /** pixelarticons sit on a 24px grid, so only whole multiples stay crisp */
  size?: 24 | 48;
  /** omit for decorative icons */
  label?: string;
  className?: string;
};

export function PixelIcon({ icon: Icon, size = 24, label, className }: TPixelIconProps) {
  return (
    <Icon
      width={size}
      height={size}
      className={cn("px-icon", className)}
      focusable="false"
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    />
  );
}
