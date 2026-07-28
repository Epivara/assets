# Epivara Assets

Public static site hosted on GitHub Pages — brand assets and product documentation.

## Contents

- `index.html` — landing page
- `general/` — logos and shared brand assets
- `repropath-usage-guide/` — ARTisto (QuPath extension) usage manual
- `chatgpt-business-guide/` — guide for using ChatGPT Business day to day

## Development

Plain HTML/CSS/JS — no framework, no build to run by hand. Preview locally with a
static server from the repo root:

```
python3 -m http.server
```

Then open <http://localhost:8000/>. Changes pushed to `main` publish automatically.
