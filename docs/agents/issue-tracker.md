# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
  - **Title**: prefix with `feat:`, `fix:`, or `chore:` (docs/tooling/maintenance work with no user-facing behavior change). `chore:` still gets the `enhancement` label and a `feat/issue-{n}` branch — there's no separate GitHub label or branch prefix for it. This prefix is for the issue/branch only — PR titles are free-form (`/ship`) since a PR can span multiple issues or conventions (e.g. `hotfix:`).
  - **Acceptance criteria**: if the task touches source code, include both `pnpm typecheck` and `pnpm lint` passing — not just one.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag — not installed in this repo currently.)_

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
