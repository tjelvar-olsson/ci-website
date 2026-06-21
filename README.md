# Cyborg Interfaces website

Source for [cyborginterfaces.com](https://cyborginterfaces.com).

## How it works

All copy lives in `site/content.yaml`. A Python build script renders
`site/template.html` with that content to produce `site/index.html`.
Everything else in `site/` (CSS, JS, images, assets) is static.

## Prerequisites

Python 3 with `pyyaml` and `jinja2`:

```
pip install pyyaml jinja2
```

## Updating content

1. Edit `site/content.yaml`.
2. Run the build:
   ```
   python3 build.py
   ```
3. Open `site/index.html` in a browser to check it locally.
4. Commit and push — GitHub Actions deploys automatically.

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that rebuilds the
site and deploys the `site/` directory to GitHub Pages.

**First-time setup:**

1. Go to the repo on GitHub → Settings → Pages.
2. Under "Build and deployment", set Source to **GitHub Actions**.
3. Push to `main` — the workflow will run and the site will be live at
   `https://tjelvar-olsson.github.io/ci-website/`.

**Custom domain (cyborginterfaces.com):**

Once ready to go live:

1. In GitHub → Settings → Pages, enter `cyborginterfaces.com` as the
   custom domain and save.
2. Add a `CNAME` file to `site/` containing just `cyborginterfaces.com`.
3. At your DNS provider, add:
   - Four `A` records pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or a `CNAME` record pointing `www` to `tjelvar-olsson.github.io`.
4. GitHub will provision an HTTPS certificate automatically (usually
   within a few minutes of DNS propagating).
