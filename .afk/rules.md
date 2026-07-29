## Scope discipline
- Never create or modify build/dependency/tooling config: package.json, pnpm-lock.yaml,
  pnpm-workspace.yaml, *.config.{js,ts}, tsconfig.json.
- Do not scaffold new project structure (workspaces/monorepo) unless explicitly asked.
- Prefer editing existing files; only add files the task explicitly requires.