# Working instructions for this repository

## Scope and authorization

- The active project is `chatgpt-business-guide/`, a short guide for non-technical ChatGPT Business users.
- Work on the guide in the chunks and toward the outcomes the user identifies. Background notes, memories, TODOs, and an invitation to inspect the repository are context, not a request to start unrelated work.
- Once the user identifies a chunk, handle the writing, implementation details, verification, and reasonable adjacent fixes needed to complete it without requesting line-by-line permission. Stay within the expected scope and do not independently move on to other pages or backlog items.
- Do not commit, push, deploy, or discard existing changes unless the user explicitly asks.
- Preserve unrelated worktree changes. In particular, inspect the current diff before touching a file that is already modified.

## Audience and writing standard

- Write for non-technical end users. Administrative or behind-the-scenes context is for understanding unless the user specifically wants it on the page.
- Target a 30-second to 2-minute read per page. Prefer the shortest version that still teaches the task correctly.
- Write like a helpful coworker: plain, direct, slightly conversational, and free of corporate or technical jargon.
- Use ordinary office/scientist examples and natural prompts. Do not write for AI power users.
- Remove redundant riders: do not append a clause that merely restates what the action already implies.
- Reserve warnings and gotchas for genuine surprises. Do not warn about basic instructions.
- Mention cost only when it creates a real decision involving the user's own money, and verify the claim first.
- Keep company-specific names out of general copy unless meaning would be lost. Do not put `<strong>` inside captions.
- Do not turn internal uncertainty or research notes into polished-sounding claims. Mark unverified facts and verify them against current official OpenAI documentation before publication.

## Product terminology and known constraints

- Use **Plugins**, not connectors or apps, for the user-facing ChatGPT feature. Some UI labels or technical/admin source material may still use other terms; preserve exact UI wording only when needed.
- Do not present `@` tools or most plugins as exclusive ChatGPT Business benefits. The Business-specific value is primarily workspace agents, team administration, higher limits, and some premium integrations.
- Do not imply that Chat is less intelligent than Work or Codex. They may use the same model/runtime with different tools, instructions, and working patterns.
- Workspace agents currently cannot be started from Work, Codex, or the desktop app. Local-file access belongs to Work/Codex workflows, not ordinary web Chat. Treat these as changeable product facts and re-verify when editing related copy.
- Agent-owned accounts, service accounts, API triggers, and other admin implementation details belong in `note-agents-api.md`, not in end-user pages, unless the user explicitly changes that decision.
- Do not invent usage limits, token quantities, pricing, availability, or reset behavior. The usage and intelligence pages contain planned/unconfirmed material.
- The earlier free-vs-Business framing is under reconsideration. Do not propagate it into new copy without discussing it with the user; the Welcome page may eventually need revision for the same reason.

## Information sources

- Use current official OpenAI documentation for OpenAI product claims. Prefer `learn.chatgpt.com` for ChatGPT Work/Codex product guidance and use official OpenAI domains only when researching those claims.
- Treat `note.md` as useful hard-won operational context and `note2.md` as an early brief that may be stale or wrong.
- Treat root `CLAUDE.md` as historical working notes, not current authority. It contains valuable rationale but also stale status details.
- `note-agents-api.md` is intentionally admin-facing and includes claims that must be verified before use.

## Site architecture

- This is a public GitHub Pages repository using plain HTML, CSS, and JavaScript.
- `chatgpt-business-guide/_sidebar.html` is the source of truth for guide navigation. Edit it instead of editing stamped sidebar markup page by page.
- `build.mjs` stamps the shared sidebar between `<!-- SIDEBAR:START -->` and `<!-- SIDEBAR:END -->` in every guide page.
- `npm run build:nav` stamps navigation only. `npm run build` also generates the Pagefind search index.
- `chatgpt-business-guide/pagefind/` and `node_modules/` are generated/installed artifacts and must not be edited or committed.
- Each searchable page body uses `<main class="content" data-pagefind-body>`.
- `chatgpt-business-guide/app.js` owns theme switching, submenu state, current-page highlighting, sidebar scroll restoration, and Pagefind initialization.
- Collapsible nav parents use `.nav-caret` with `data-submenu`; persistence keys follow `cbg-<submenu>`. Current parents are Plugins and Desktop App.
- The guide remains manually editable plain HTML. Do not introduce a framework or new build system without discussing it with the user.

## Visual conventions

- New content images go in `chatgpt-business-guide/assets/`. Move them there; do not leave duplicates at the repository root.
- Add `class="narrow"` to each new content image unless the user deliberately chooses a wider treatment. Do not make narrow sizing the default for all `.content img` elements.
- Use `.medium` only when a wider screenshot is intentionally needed.
- Keep captions plain; no `<strong>` tags inside `.caption`.
- Callouts are for material tips, warnings, and cautions. Orientation copy should remain ordinary prose.
- Avoid heavy animation. Preserve the current light/dark design and accessible, responsive behavior.

## Current guide map

- Welcome: `index.html`
- The Basics: Signing In, Chat, Plugins (Gmail, Dropbox, Zoom, QuickBooks), Memory
- Tools: Image Generation, Presentations, Deep Research, Canvas
- Automation: Skills, Agents, GPTs, Scheduled Tasks
- Going Further: Work, Projects, Desktop App (Permissions, Plan Mode & Goals, Desktop Scheduling, Desktop Plugins, Sites), Voice Mode
- Good to Know: Usage, Intelligence, What It's Doing, Cognitive Offloading, Best Practices

Several pages are explicit stubs. Their presence is not permission to fill them in.

## Established structural decisions

- Welcome is standalone above the sidebar sections.
- Sidebar section headings are non-clickable dividers. The Basics is sequential; Tools is selective; Automation increases in complexity; Going Further is heavier or niche; Good to Know is background/reference.
- Plugins stays in The Basics and Desktop App stays a collapsible parent in Going Further.
- Do not add in-page anchor navigation.
- Shared sidebar stamping and Pagefind are intentional. Do not replace them with an SSG unless the user revisits that decision.
- Canva was intentionally removed from the guide because it is not used by the team. Pet was intentionally dropped. `what-its-doing.html` already exists despite older notes calling it open work.

## Validation for authorized changes

- For page-only content edits that do not change navigation, validate the changed HTML and inspect the diff; do not run a build merely to rewrite unrelated stamped sidebars.
- For navigation changes, edit `_sidebar.html`, run `npm run build:nav`, and review every resulting change before handing off.
- For build/search changes, run the narrowest relevant npm command, then `npm run build` when full integration verification is warranted.
- If visual layout changes, serve the repository locally and inspect the affected pages at desktop and narrow widths.
