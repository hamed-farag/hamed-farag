import { cn } from "@lib/utils/tailwindUtils";

type TSignProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "p";
};

/** Wooden level sign, used for page and section headings. */
export function Sign({ as: Comp = "h2", className, ...props }: TSignProps) {
  return (
    <Comp
      className={cn("px-frame px-frame--wood px-sign px-title font-bold", className)}
      {...props}
    />
  );
}
