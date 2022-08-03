<div class="home-page-hero">
  <a href="https://github.com/vonage/vivid-3">
    <img src="/vivid-logo.svg" style="" alt="Vivid Logo" width="120">
  </a>
  <h1>Welcome to Vivid</h1>

[![codecov][codecov-shield]][codecov-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache 2.0 License][license-shield]][license-url]


  <h6>
    Vonage's design system platform targeted to provide </br>incorporated, battery-charged web components.
  </h6>
  <a class="home-page-hero-docs-btn" href="https://vivid.deno.dev"><strong>Explore the docs</strong></a>
  <div class="home-page-hero-docs-links">
    <a href="https://github.com/Vonage/vivid-3/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    <span>|</span>    
    <a href="https://github.com/Vonage/vivid-3/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </div>
</div>

### CDN
You can import vivid components from CDN.
- https://unpkg.com/@vonage/vivid@next
- https://cdn.jsdelivr.net/npm/@vonage/vivid@next

Note that in addition to importing the JS files, you also need to add the CSS.

Example:
```
<script type="module" src="https://unpkg.com/@vonage/vivid@next"></script>
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/themes/light.css">
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/fonts/spezia.css">
```

ES Example: [Open Codepen](https://codepen.io/yonatankra/pen/yLKyaPG)

### Installation

run:

```bash
npm install @vonage/vivid
```

use:

```js
import '@vonage/vivid/button';
```

```html
<vwc-button label="Click me"></vwc-button>
```

## Roadmap

[view components status](https://github.com/orgs/Vonage/projects/6)

Follow our API planning on the [Vivid project components' view](https://github.com/orgs/Vonage/projects/3/views/13)

We publish a _next_ release on every successful merge to main, so you never need to wait for a new stable version to make use of any updates.

See the [open issues](https://github.com/vonage/vivid-3/issues) for a full list of proposed features (and known issues).
