import { cn } from "@lib/utils/tailwindUtils";

import { PixelFrame } from "./PixelFrame";

type TMsgBoxProps = React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "aside";
  /** small uppercase heading inside the box */
  title?: string;
  titleId?: string;
};

/** Classic 16-bit dialog box: navy fill, white inner ring, dark outline. */
export function MsgBox({ as = "div", title, titleId, className, children, ...props }: TMsgBoxProps) {
  return (
    <PixelFrame as={as} variant="msg" className={cn("p-5 md:p-7", className)} {...props}>
      {title && (
        <p id={titleId} className="px-hud-text text-[12px] text-px-coin mt-0 mb-5">
          {title}
        </p>
      )}
      {children}
    </PixelFrame>
  );
}
