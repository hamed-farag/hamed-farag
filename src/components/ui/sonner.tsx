"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Toasts look like 16-bit message boxes (styles in styles/pixel.css). Custom toasts get the
// same frame and can swap its variant through their own className.
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "px-frame px-frame--msg flex w-full items-start gap-3 p-4 text-sm",
          description: "text-px-stone",
          actionButton: "px-frame px-btn px-btn--primary",
          cancelButton: "px-frame px-btn px-btn--secondary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
