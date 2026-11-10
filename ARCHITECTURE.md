# Architecture

The site is a single-page React 18 application built with Vite 5. Essential content, navigation, links, and language controls are semantic HTML; the 3D scene is supplementary.

| File | Responsibility |
| --- | --- |
| `src/content.js` | Russian and Kazakh content, including practice and skills |
| `src/App.jsx` | Page sections, navigation, language state, and links |
| `src/ScienceScene.jsx` | Lazy Three.js renderer and interactive science models |
| `src/index.css` | Editorial visual system and responsive layouts |
| `scripts/generate_cv.py` | Bilingual PDF generation from verified facts |
| `public/cv-zerde-kanat.pdf` | Static downloadable CV |

The 3D viewer contains two procedural models: a bent H₂O molecule and a schematic plant cell. It imports Three.js when its section nears the viewport, caps pixel ratio, pauses rendering out of view, stops automatic motion for reduced-motion visitors, and displays a text description when WebGL cannot initialize. Scene controls remain in the DOM and are available by keyboard.

The site has no backend or secrets. Vite copies static files from `public/` into the production build. Check `npm run lint` and `npm run build` before deployment. Published content should be reviewed by Zerde before release, especially language levels, dates, school names, contact details, and any newly supplied lesson outcomes.
