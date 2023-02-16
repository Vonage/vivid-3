
# Vivid UI

Essential UI **web components** for building modern web applications, bound to provide a **safe**, **simple** and **intuitive** interface.

![image](https://user-images.githubusercontent.com/10883919/189522882-968358df-ee7c-4256-b61b-550cf369a087.png)

## Installation

To integrate Vivid components into your project, run:

```bash
npm install @vonage/vivid
```

### Usage

Import components in your project via [side effect imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only):

```js
import '@vonage/vivid/button';
```

And include in HTML:

```html
<vwc-button label="Click me"></vwc-button>
```

For a full list of components and API, explore the [components docs](https://vivid.deno.dev) 📚.

## Prerequisite

### Tokens

To **include the tokens**, its css files must be loaded into the project from the `node_modules/@vonage/vivid/styles/tokens` folder.  

Tokens folder contains the following files:

- `theme-light.css` - Light theme

- `theme-dark.css` - Dark theme

Only one theme is required to be loaded.

#### About tokens

The Vivid components library rely on a set of **design tokens** (in the form of css custom properties).

Tokens should not affect the look of the application rather just provide a common set of identities (such as colors, typography, spacing etc') to be used by the components to look as intended.

As the task of loading css is not trivial, and may vary from project to project, this library does not provide any way to load the css. It is up to the author to load the css in the most appropriate manner for their project.

### Setting Vivid class

The Vivid tokens require a `vvd-root` class selector to be present on a wrapping element (advisably the `:root`) for it to apply its css custom properties to.    

💡 The [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) CSS pseudo-class matches the root element of a tree representing the document

```html
<html class="vvd-root">...</html>
```

You can also add it to any wrapping element if you would like to scope the styles to only a certain part of your application.

### Fonts (Prerequisite)

Vivid uses `Montserrat` and `Roboto Mono` Google fonts.
Learn how to load fonts into your application [with google-fonts](https://fonts.google.com/knowledge/using_type/using_web_fonts_from_a_font_delivery_service#loading-web-fonts)

#### Vonage authors

Unless explicitly stated otherwise, *Vonage* products should use the brand specified font families by `Spezia`.  
Vonage teams may review guidelines at the [Spezia webfont kit](https://github.com/Vonage/spezia-webfont-kit).  

💡 For more information check out [Vonage Authors](/getting-started/vonage-authors)

## Advanced Usage

For further information on **core application styles** & **scoped elements** check out [advanced usage](/getting-started/advanced)

## CDN - Quickstart

Global content delivery networks can help quickly integrate content within html pages, fetching content from an URL, skipping local builds entirely.
Such practice is often used when working on POCs or reproduction environments.
Tools like [UNPKG](https://unpkg.com), [jsDeliver](https://www.jsdelivr.com), [Skypack](https://www.skypack.dev) etc' are bound to deliver any content registered in the npm registry.

The following snippet fully renders a Vivid button component

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

## Support Matrix

This library is supported on 2 recent versions of major browsers (Chrome, Firefox, Safari, Edge).

## Support

This library is open source, developed and maintained by the [Vonage Vivid teams](https://github.com/orgs/Vonage/teams/vivid/teams).

For any questions, please open a [bug report](https://github.com/Vonage/vivid-3/issues/new?assignees=yonatankra%2C+rachelbt%2C+rinaok%2C+yinonov&labels=bug&template=bug_report.yml&title=%5BYOUR+TITLE%5D%3A+Brief+description) or [feature request](https://github.com/Vonage/vivid-3/issues/new?assignees=yonatankra%2C+rachelbt%2C+rinaok%2C+yinonov&labels=Feature+request&template=feature_request.yml&title=%5BYOUR+TITLE%5D%3A+Brief+description).

## Roadmap

- View [components status](https://github.com/orgs/Vonage/projects/6)

- [What's on our plate](https://github.com/orgs/Vonage/projects/3/views/7)

- See the [open issues](https://github.com/vonage/vivid-3/issues) for a full list of proposed features (and known issues).

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Vonage/vivid-3/blob/main/.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [npm page](https://www.npmjs.com/package/@vonage/vivid).

## Authors

See also the list of [contributors](https://github.com/Vonage/vivid-3/graphs/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](https://github.com/Vonage/vivid-3/blob/main/LICENSE.md) file for details

<!-- ## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc -->

## Built With ♡ And

- [Fast](https://www.fast.design) - to extend element classes and compile code to native web components
- [Typescript](https://www.typescriptlang.org) - for ergonomic and type-safe code
- [Sass](https://sass-lang.com) - for styles authoring extensibility and consistency
