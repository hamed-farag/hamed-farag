import { cn } from "@lib/utils/tailwindUtils";

type TBlockProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** outer size in CSS px */
  size?: 48 | 64 | 72;
  /** emptied block (after it's been hit) */
  used?: boolean;
};

/** ?-style item block with corner rivets. */
export function Block({ size = 64, used = false, className, style, ...props }: TBlockProps) {
  return (
    <span
      className={cn("px-frame px-block", used && "px-block--used", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}
