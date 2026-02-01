---
allowed-tools: Bash, Glob, Grep, Read, Edit, Write, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_console_messages, mcp__playwright__browser_close
description: End-of-session checklist - update docs, review changes, prepare for commit
---

# End Session Checklist

Run this command at the end of a coding session to ensure everything is documented, reviewed, and ready.

## Step 1: Session Summary

Analyze what changed this session:

```bash
git status
git diff --stat
```

Summarize to the user:
- Files modified
- Files added
- General nature of changes (features, fixes, refactors, docs)

## Step 2: Update CHANGELOG

If there were meaningful code changes, update the CHANGELOG following the /document process:

1. Read the actual code changes (don't trust existing docs)
2. Add entry under "Unreleased" section in CHANGELOG.md
3. Use categories: Added, Changed, Fixed, Security, Removed
4. Be concise, user-facing language

Skip if: Only non-code files changed (e.g., screenshots, assets)

## Step 3: Update Project Documentation

If changes affect project structure, conventions, or architecture:

1. Analyze changes for documentation impact (tech stack, screens, architecture, conventions, business rules)
2. Read current docs: `CLAUDE.md`, `docs/focus-journey-project-outline.md`, `docs/CTO_instructions.md`
3. Update docs as needed following the /update-docs process
4. Report what was updated

Skip if: Changes don't affect project conventions or architecture

## Step 4: Visual Review (Conditional)

**Only if front-end/UI files were modified:**

1. Check if any of these file types changed: `.tsx`, `.jsx`, `.css`, `.scss`, `.html`, or component files
2. If yes, perform a quick visual check:
   - Navigate to affected pages using `mcp__playwright__browser_navigate`
   - Take screenshots of changed views
   - Check console for errors with `mcp__playwright__browser_console_messages`
3. Report any visual issues or console errors

Skip if: Only backend, config, or non-visual files changed

## Step 5: Test Check

Run available tests to ensure nothing broke:

```bash
npm test --passWithNoTests 2>/dev/null || echo "No test command or tests skipped"
```

Report: Tests passing, failing, or not configured

## Step 6: Git Status & Commit Suggestion

Show final state:

```bash
git status
git diff --name-only
```

If there are uncommitted changes, suggest:
- A clear, concise commit message based on the changes
- Which files to stage (warn about any sensitive files like .env)

**Do NOT commit automatically** — just suggest the commit message for user approval.

## Step 7: Session Report

Provide a final summary:

```
## Session Complete

**Changes Made:**
- [List of key changes]

**CHANGELOG:**
- [Updated / No updates needed]

**Documentation:**
- [Updated / No updates needed]

**Visual Review:**
- [Passed / Issues found / Skipped (no UI changes)]

**Tests:**
- [Passing / Failing / Not configured]

**Ready to Commit:**
- [Yes / No - reasons]

**Suggested Commit Message:**
```
[type]: [description]

[optional body]
```
```

---

Execute each step in order, skipping conditional steps as noted. Be concise in reporting.
