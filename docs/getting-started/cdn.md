# Getting Started by Using a CDN

Global content delivery networks can help quickly integrate content within HTML pages, fetching content from a URL, skipping local builds entirely.

Such practice is often used when working on POCs or reproduction environments.

Tools like [UNPKG](https://unpkg.com), [jsDeliver](https://www.jsdelivr.com), [Skypack](https://www.skypack.dev) etc. are bound to deliver any content registered in the npm registry.

The following snippet fully renders a Vivid Button component:

```html
<!-- import Montserrat & Roboto-Mono fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- import light theme style tokens -->
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@3.x/styles/tokens/theme-light.css">

<!-- import Vivid button component -->
<script type="module" src="https://unpkg.com/@vonage/vivid@3.x/button/index.js"></script>

<!-- Part of the app (or a whole app) that contains vivid components -->
<div class="vvd-root">
  <vwc-button label="Click me" appearance="filled" connotation="cta"></vwc-button>
</div>
```
