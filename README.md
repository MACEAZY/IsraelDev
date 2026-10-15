# Waterways

A responsive creative-studio portfolio built with HTML, CSS, and vanilla JavaScript. No build step, framework, or production dependencies.

## Run locally

From this checkout:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open the server in your browser. Any static hosting service can serve these files directly; keep the `assets` directory alongside `index.html`, `style.css`, and `app.js`.

## Features

- Responsive layouts from mobile to wide desktop.
- Work filters and four keyboard-accessible project dialogs, including direct links such as `#project-paris`.
- Mobile navigation, service accordions, active section indicators, and scroll progress.
- Floating artwork, scroll reveals, animated underline, hover effects, and an animated typography strip.
- System reduced-motion support and a footer motion control.
- Validated inquiry form that prepares an email to `ajalaisrael2015@gmail.com`. Visitors review and send it in their own email app. A copy/download fallback is available. No email is sent by the website, and no personal information is stored.
- Self-hosted Manrope variable font, with its OFL license in `assets/Manrope-LICENSE.txt`.
- Original local SVG concept artwork; no image CDN dependencies.

## Design and content

The linked Figma document could not be retrieved in the development environment (access denied). This implementation develops the existing Waterways purple-and-orange identity and four project names into a new responsive design. It is not a verified pixel match to the Figma frame. Exported design assets can replace the SVG concepts later.

Case studies are explicitly presented as design explorations. They make no claims of client commissions, performance results, or shipped products. The original `IPhone13Mini2.html`, `vars.css`, and `tailwind.config.js` remain as legacy export files and are not used by the main site.

## Validation

Validate using a browser at desktop, tablet, and mobile sizes. Check that all artwork and fonts load, that category filters show the matching projects, that dialogs support Escape and return focus, and that the inquiry form prepares the correct recipient and message. Check with reduced motion enabled and JavaScript disabled. JavaScript syntax can be checked with `node --check app.js`.
