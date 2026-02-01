# Update Documentation

Update CLAUDE.md and docs based on changes made in this session.

## Step 1: Analyze Session Changes

Run these commands to understand what changed:

```bash
git diff --stat
git diff
git status
```

Identify changes in these categories:
- **Tech stack** - New dependencies, frameworks, tools
- **Screens** - New/modified screens or components
- **Architecture** - Data flow, state management, file structure
- **Conventions** - Coding patterns, naming, styling
- **Business rules** - Timer behavior, session logic, user flows

Summarize findings to the user before proceeding.

## Step 2: Read Current Documentation

Read ALL documentation files BEFORE making any edits:

1. `CLAUDE.md` - Project conventions and structure
2. `docs/focus-journey-project-outline.md` - Architecture and design decisions
3. `docs/CTO_instructions.md` - Tech stack reference

Understanding current content prevents duplicating or contradicting existing documentation.

## Step 3: Update Each File

For each file, follow this process:
1. **Remove outdated content FIRST** - Delete or modify anything that's now incorrect
2. **Add new content SECOND** - Add information about changes from this session

### CLAUDE.md Updates

Update when:
- Project structure changes (new folders, moved files)
- New conventions established (naming, patterns)
- Interfaces/types modified
- Screens added/removed/renamed
- Store actions added
- Business rules changed
- "What's Built" checklist items completed

### docs/focus-journey-project-outline.md Updates

Update when:
- Architecture decisions made
- Design system changes (colors, typography, spacing)
- User flow modifications
- Phase milestones completed
- Technical approach changes

### docs/CTO_instructions.md Updates

Update when:
- Dependencies added/removed
- Build configuration changed
- Development workflow modified
- Testing approach established

## Step 4: Style Guidelines

- **Concise** - Use bullet points, code blocks, tables
- **Accurate** - Match actual implementation
- **Consistent** - Follow existing doc formatting
- **No redundancy** - Don't duplicate between files

## Step 5: Report Changes

After editing, report:
- Files modified
- Sections updated (removed/added)
- Summary of documentation changes

Example output:
```
Documentation updated:

CLAUDE.md:
- Removed: Old screen list (4 screens)
- Added: Updated screen list (6 screens)
- Added: useJigsawPuzzle hook documentation

docs/focus-journey-project-outline.md:
- No changes needed

docs/CTO_instructions.md:
- Added: New dependency (zustand)
```
