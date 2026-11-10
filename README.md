# Zerde Kanat — teaching portfolio

A bilingual (Russian/Kazakh) portfolio for schools and employers, built with React and Vite. The design follows a scientific journal: editorial typography, real classroom photography, and two interactive 3D teaching diagrams.

## Run locally

```bash
npm install
npm run dev
```

Checks:

```bash
npm run lint
npm run build
```

## Content and assets

- `src/content.js` contains Russian and Kazakh copy, school practice entries, and skill examples.
- `public/profile.jpg` and `public/practice/` contain the existing portrait and classroom photos.
- `public/illustrations/botanical-plate.webp` is a generated scientific-journal illustration used in the hero; its generation prompt is recorded in the adjacent sidecar.
- `public/certificates/turkish-b1.pdf` is the existing Turkish B1 certificate; `public/certificates/turkish-b1-preview.webp` is a preview rendered from that PDF.
- `public/cv-zerde-kanat.pdf` and `public/cv-zerde-kanat-kz.pdf` are separate one-page, black-and-white resumes without a portrait. The download button serves the selected site language. On Windows, regenerate both with `python scripts/generate_cv.py` after installing `reportlab`.
- `src/ScienceScene.jsx` renders a water molecule and a simplified plant cell with Three.js. It loads only when the scene approaches the viewport and has a text fallback if WebGL fails.

Specific lesson topics, materials, and student outcomes were not supplied. The practice stories describe only the activities documented in the original portfolio. Update them in `src/content.js` when verified details become available, then regenerate the CV if its facts change.

The GPA shown on the site and CV is 3.12, updated from a university profile screenshot supplied by the user. Student ID and group information from that screenshot are intentionally absent from the public portfolio.
