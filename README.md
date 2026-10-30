# Carlos Munhos — standalone portfolio

Open **index.html** to view the portfolio. This folder is the complete website: plain HTML, CSS, JavaScript, and local images. It needs no package manager, framework, installation, compilation, CDN, or external fonts.

## GitHub Pages

1. Copy the **contents** of this folder into your GitHub Pages publishing location: the repository root, or a `docs` folder if that is your chosen publishing source. Include `.nojekyll`.
2. In the repository's **Settings → Pages**, select that branch and publishing folder.

The explicit relative `index.html` links support both `username.github.io` and `username.github.io/repository/`. No Astro workflow or build command is needed. If you use this in the current repository, publish these static files rather than its existing framework build output.

## Editing

- `index.html` and `pt-br/index.html`: English and Brazilian Portuguese homepages.
- `about/`, `research/`, `cves/`, `certifications/`: English sections and complete public reports.
- `pt-br/`: corresponding Portuguese pages, with page-specific language links.
- `projects/` and `recognition/`: preserved existing public sections.
- `assets/style.css`: all layout, responsive, light, and dark styles.
- `assets/site.js`: theme preference, mobile navigation, certification search, and code-copy controls.
- `images/`: local certification artwork and profile photo.
- `og/`: existing social sharing artwork.

Content is directly in each HTML file; JavaScript is not needed to read it. When editing content, update both languages. Theme preferences are saved in browser storage when available; the initial theme follows the operating system, with dark as the fallback. Certification search ignores case and accents. Motion respects the visitor's reduced-motion preference.

Only the existing public portfolio content is included. The original portfolio files remain separate.
