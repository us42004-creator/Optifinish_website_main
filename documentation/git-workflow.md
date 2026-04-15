# Git Workflow — OptiFinish Website

## Roles

| Person | Role | Branch |
|---|---|---|
| Akshay | Primary developer | `main` |
| Utkarsh | Supervisor, occasional contributor | `feat/section-name` |

---

## Akshay's Daily Flow

Work directly on `main`.

```bash
git pull
# do your work
git add .
git commit -m "what you did"
git push
```

Start every session with `git pull`. End every session with `git push`.

---

## Utkarsh's Flow

Create a branch, do the work, tell Akshay to merge.

```bash
git checkout -b feat/whatever
# do your work
git add .
git commit -m "what you did"
git push origin feat/whatever
```

Then tell Akshay — he merges it to `main` when he's at a clean stopping point.

```bash
# Akshay merges Utkarsh's branch
git checkout main
git pull origin main
git merge feat/whatever
git push origin main
```

---

## Branch Naming

| Prefix | Use for |
|---|---|
| `feat/` | new page or section |
| `fix/` | bug or correction |
| `content/` | copy or text updates only |
| `design/` | visual/UI changes only |

Examples: `feat/home`, `fix/nav-links`, `content/about-page`

---

## Rules

- Never have both of you working at the same time
- One person works → pushes → tells the other → they pull → they work → push
- If using Claude Code, say who you are at the start of the session — it will push to the right branch automatically

---

## Cloning the Project (first time on a new device)

```bash
git clone --recurse-submodules https://github.com/us42004-creator/Optifinish_website_main.git
cd Optifinish_website_main/build/ztap/source
pnpm install
```
