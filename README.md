# connolly.cloud

The Connolly family homepage — a simple, fast directory of the family and their projects.

Built as a single static page with no build step. All content lives in **[`data.json`](data.json)**.

## Editing content

Open `data.json` and edit. Nothing else to touch.

```jsonc
{
  "site": {
    "title": "connolly.cloud",
    "welcome": "Short greeting shown at the top.",
    "about": "Optional longer line (leave \"\" to hide)."
  },
  "family": [
    {
      "id": "alex",                     // stable id — used for the profile URL + posts
      "name": "Full Name",
      "avatar": "assets/alex.png",      // repo path or any image URL (optional)
      "role": "Optional short role/title",
      "description": "A sentence or two about this person.",
      "projects": [
        { "name": "Project", "url": "https://...", "description": "What it is." }
      ],
      "links": [
        { "label": "GitHub", "url": "https://github.com/..." }
      ]
    }
  ]
}
```

- `avatar`, `role`, `description`, `projects`, and `links` are all optional; `id` and `name` are required.
- Each person gets a profile page at `profile.html?u=<id>` with their post feed.
- Add a family member by copying an object in the `family` array (give them a unique `id`).

## Posts (micro-blog)

Each person has a feed of Markdown posts on their profile page. To add one:

1. Create a Markdown file at `posts/<id>/YYYY-MM-DD-slug.md`, e.g. `posts/alex/2026-07-09-hello-world.md`:

   ```markdown
   ---
   title: Hello, world
   date: 2026-07-09
   ---

   Write the post in **Markdown**. Supports headings, lists, links,
   images, `code`, quotes, and fenced code blocks.
   ```

2. Add the filename to that person's list in [`posts.json`](posts.json):

   ```json
   { "alex": ["2026-07-09-hello-world.md"] }
   ```

Posts are sorted newest-first by `date`. If you omit the front-matter `date`, the
`YYYY-MM-DD` prefix in the filename is used. Each post has a permalink at
`profile.html?u=<id>#slug`. Markdown is rendered client-side by
[`assets/markdown.js`](assets/markdown.js) — no build step, no dependencies.

## Local preview

Because the page fetches `data.json`, open it through a local server (not `file://`):

```sh
python -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushing to `main` triggers the [GitHub Pages workflow](.github/workflows/deploy.yml), which publishes the site automatically.

Custom domain `connolly.cloud` is set via the [`CNAME`](CNAME) file. In the repo's **Settings → Pages**, set the source to **GitHub Actions**.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Home page — family directory |
| `profile.html` | Per-person profile + post feed (`?u=<id>`) |
| `assets/markdown.js` | Tiny dependency-free Markdown renderer |
| `style.css` | Styling (light/dark aware) |
| `data.json` | **Family + projects content** |
| `posts.json` | Which post files belong to whom |
| `posts/<id>/*.md` | The posts themselves (Markdown) |
| `assets/` | Images (avatars, etc.) |
| `CNAME` | Custom domain |
| `.github/workflows/deploy.yml` | Auto-deploy on push |
