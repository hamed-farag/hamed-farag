import { LevelShell } from "@components/level";

export default function LevelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LevelShell>{children}</LevelShell>;
}
