# Surya Flow website

Static promotional site for the Surya Flow iPhone app. Plain HTML, CSS and JavaScript, no build step.

- `index.html` – home page
- `privacy.html` – privacy policy (App Store **Privacy Policy URL**)
- `support.html` – forwards to the Help section on the home page (App Store **Support URL**)
- `404.html` – not-found page
- `assets/` – app icon, backgrounds and pose art, resized to WebP from `../Images`

Preview locally: open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publishing on GitHub Pages

1. Create a new **public** repository on GitHub (for example `surya-flow-website`).
2. Push the contents of this folder to its `main` branch.
3. In the repository, open **Settings → Pages**, set **Source** to *Deploy from a branch*, branch `main`, folder `/ (root)`, and save.
4. After a minute the site is live at `https://<username>.github.io/<repository>/`.

App Store URLs once live:
- Privacy Policy URL: `https://<username>.github.io/<repository>/privacy.html`
- Support URL: `https://<username>.github.io/<repository>/support.html`
- Marketing URL (optional): `https://<username>.github.io/<repository>/`

When a custom domain is ready, add it under **Settings → Pages → Custom domain**.
