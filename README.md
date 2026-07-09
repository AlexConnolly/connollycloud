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
    "about": "Longer paragraph explaining the site."
  },
  "family": [
    {
      "name": "Full Name",
      "avatar": "https://...  (optional image URL)",
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

- `avatar`, `role`, `description`, `projects`, and `links` are all optional.
- Avatars can be any image URL. The default entries use [DiceBear](https://dicebear.com) auto-generated ones — swap in a real photo URL any time.
- Add a family member by copying an object in the `family` array.

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
| `index.html` | Page shell + tiny renderer script |
| `style.css` | Styling (light/dark aware) |
| `data.json` | **All content lives here** |
| `CNAME` | Custom domain |
| `.github/workflows/deploy.yml` | Auto-deploy on push |
