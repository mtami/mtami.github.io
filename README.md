# Mo Tami — portfolio

Personal portfolio of Mo Tami, Senior AI Lead. Live at **https://mtami.github.io**.

The background is a single Three.js particle field (10k points, one draw call) that morphs between five shapes as you scroll:

| Section  | Shape                                   |
|----------|-----------------------------------------|
| Hero     | Sphere of embeddings                    |
| Work     | One cluster per project (hover to light it) |
| Path     | Double helix timeline                   |
| Research | Stacked network layers                  |
| Contact  | Calm wave field                         |

No build step: plain HTML, CSS and ES modules. Three.js and fonts are vendored, so the site has no third-party requests.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

```bash
git remote add origin https://github.com/mtami/mtami.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.

## Edit content

- Text lives in `index.html`.
- Colours and type are tokens at the top of `css/style.css`.
- Particle shapes are in `buildShapes()` in `js/main.js`.
- Replace `assets/Mo-Tami-CV.pdf` to update the downloadable CV.

## Accessibility

Respects `prefers-reduced-motion`, has a "Pause the field" control, visible keyboard focus, and works without WebGL.

Fonts: Bricolage Grotesque and Newsreader (SIL Open Font License, see `fonts/`). Three.js (MIT).
