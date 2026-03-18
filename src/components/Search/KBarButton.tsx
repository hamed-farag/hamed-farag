import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useKBar } from "kbar";

export const KBarButton = ({
  children,
}: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const { query } = useKBar();

  return (
    <button
      className="island-btn"
      onClick={() => query.toggle()}
      aria-label="Search"
    >
      {children}
    </button>
  );
};
