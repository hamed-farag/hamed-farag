import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useKBar } from "kbar";

import { Button } from "@components/ui/Button";

export const KBarButton = ({
  children,
}: DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const { query } = useKBar();

  return (
    <Button variant="outline" onClick={() => query.toggle()}>
      {children}
    </Button>
  );
};
