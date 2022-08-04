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

<br>
<br>

> Vivid philosophy favors lock-down over white labeling strategy, utilizing high-level design tokens to customize UI systematically rather than permuting components directly (to a balanced degree). This guideline help keep integration processes ergonomic and the UI consistent.

## Quickstart

### CDN
You can import vivid components from a CDN. 

Vivid is using [unpkg](https://unpkg.com) and [jsdeliver](https://jsdeliver) to serve the package.
- [https://unpkg.com/@vonage/vivid@next](https://unpkg.com/@vonage/vivid@next)
- [https://cdn.jsdelivr.net/npm/@vonage/vivid@next](https://cdn.jsdelivr.net/npm/@vonage/vivid@next)

Note that in addition to importing the JS files, you also need to add the CSS.

Example:
```
<script type="module" src="https://unpkg.com/@vonage/vivid@next"></script>
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/themes/light.css">
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/fonts/spezia.css">
```

You can also import a specific component:

Example of importing only the button:
```
<script type="module" src="https://unpkg.com/@vonage/vivid@next/button"></script>
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

[view components status](https://github.com/orgs/Vonage/projects/3)

We publish a _next_ release on every successful merge to main, so you never need to wait for a new stable version to make use of any updates.

See the [open issues](https://github.com/vonage/vivid-3/issues) for a full list of proposed features (and known issues).

<br>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/Vonage/vivid-3/issues). You can also take a look at the [contributing guide](.github/CONTRIBUTING.md).

<br>

### Getting started

#### Generate a new component

`npx run nx g @vonage/nx-vivid:component my-component`

Will generate a new component in `libs/componnts/src/lib/my-component`

#### Test

`npx nx run components:test` or `npm test` will run unit tests for the components.

Use the `--watch` flag to develop with the tests refreshing on every change.

Use the `--coverage` flag to generate test coverage for the components.

See the [ui-tests docs](../../docs/ui-test/readme.md) for how to run visual tests.

## Show your support

Give a [⭐️](https://github.com/Vonage/vivid-3/stargazers)️ if this project helped you!

<br>

## 📝 License

This project is [Apache 2.0][license-url] licensed.

<br>

<hr>

## Credits

Vivid is powered by a lot of open source libraries and tools. The main tools and libraries we use are:
* [fast.design](https://fast.design)
* [Deno Deploy](https://deno.com/deploy)
* [unpkg](https://unpkg.com)
* [jsdeliver](https://jsdeliver)
* [floating-ui](https://floating-ui.com/)
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[codecov-shield]: https://img.shields.io/codecov/c/gh/Vonage/vivid-3?style=for-the-badge&token=74ALFP2OR2
[codecov-url]: https://codecov.io/gh/Vonage/vivid-3
[contributors-shield]: https://img.shields.io/github/contributors/vonage/vivid-3.svg?style=for-the-badge
[contributors-url]: https://github.com/vonage/vivid-3/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/vonage/vivid-3.svg?style=for-the-badge
[forks-url]: https://github.com/vonage/vivid-3/network/members
[stars-shield]: https://img.shields.io/github/stars/vonage/vivid-3.svg?style=for-the-badge
[stars-url]: https://github.com/vonage/vivid-3/stargazers
[issues-shield]: https://img.shields.io/github/issues/vonage/vivid-3.svg?style=for-the-badge
[issues-url]: https://github.com/vonage/vivid-3/issues
[license-shield]: https://img.shields.io/github/license/vonage/vivid-3.svg?style=for-the-badge
[license-url]: LICENSE.md
[license-url]: LICENSE.md
