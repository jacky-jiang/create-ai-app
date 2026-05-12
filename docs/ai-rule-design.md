# AI Rule Design

The project keeps one typed rule source and renders it into multiple tool-specific instruction files.

```txt
AiRuleSet
  ├─ AGENTS.md
  ├─ CLAUDE.md
  ├─ .github/copilot-instructions.md
  └─ docs/ai-coding-guidelines.md
```

This avoids maintaining duplicated rule files by hand.
