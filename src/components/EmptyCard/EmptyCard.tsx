import { FileText } from "lucide-react";

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
    <Card className="card-whimsy border border-border/50">
      <CardContent
        className="flex flex-col items-center justify-center py-10 px-2 shrink-0"
        style={{ minHeight: height || 450 }}
      >
        <div className="rounded-2xl p-5 mb-5 animate-float" style={{ background: "var(--gradient-card)" }}>
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h3 className="font-display font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{placeholder}</p>
      </CardContent>
    </Card>
  );
}
