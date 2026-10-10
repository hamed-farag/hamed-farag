import { cn } from "@lib/utils/tailwindUtils";

type TBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "paper" | "coin" | "msg";
};

const VARIANT_CLASS = {
  paper: "",
  coin: "px-frame--coin",
  msg: "px-frame--msg",
};

export function Badge({ variant = "paper", className, ...props }: TBadgeProps) {
  return <span className={cn("px-frame px-badge", VARIANT_CLASS[variant], className)} {...props} />;
}
