import { FileTextIcon } from "@radix-ui/react-icons";

import { Card, CardContent } from "@components/ui/Card";
import React from "react";

type TEmptyCardProps = {
  title: string;
  placeholder: string;
  height?: number;
};

export function EmptyCard(props: TEmptyCardProps) {
  const { title, placeholder, height } = props;

  return (
    <Card>
      <CardContent
        className={`flex flex-col items-center justify-center py-10 px-2 h-[${
          height || 450
        }px] shrink-0`}
      >
        <FileTextIcon className="h-20 w-20 mb-3" />
        <h3 className="mb-3 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{placeholder}</p>
      </CardContent>
    </Card>
  );
}
