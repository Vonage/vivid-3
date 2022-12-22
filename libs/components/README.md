
# Vivid UI

Essential UI **web components** for building modern web applications, bound to provide a **safe**, **simple** and **intuitive** interface.

![image](https://user-images.githubusercontent.com/10883919/189522882-968358df-ee7c-4256-b61b-550cf369a087.png)

## Installation

To integrate Vivid components into your project, run:

```bash
npm install @vonage/vivid # or yarn add @vonage/vivid
```

## Usage

Import components in your project via [side effect imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only):

```js
import '@vonage/vivid/button';
```

And include in HTML:

```html
<vwc-button label="Click me"></vwc-button>
```

For a full list of components and API, explore the [components docs](https://vivid.deno.dev/components/accordion/) 📚.

### Tokens (Prerequisite)

The Vivid components library rely on a set of **design tokens** (in the form of css custom properties).

Tokens should not affect the look of the application rather just provide a common set of identities (such as colors, typography, spacing etc') to be used by the components to look as intended.

As the task of loading css is not trivial, and may vary from project to project, this library does not provide any way to load the css. It is up to the author to load the css in the most appropriate manner for their project.

To **include the tokens**, its css files must be loaded into the project from the `node_modules/@vonage/vivid/styles/tokens` folder and *require a `vvd-root` class* selector to be present on a wrapping element (advisably the `:root`).

Tokens folder contains the following files:

- `theme-light.css` - Light theme

- `theme-dark.css` - Dark theme

Only one theme is required to be loaded.

### Fonts (Prerequisite) - Should we leave it for Vonage users?

Vivid uses `Montserrat` and `Roboto Mono` Google fonts.  
Learn how to load fonts into your application [with google-fonts](https://fonts.google.com/knowledge/using_type/using_web_fonts_from_a_font_delivery_service#loading-web-fonts)

** Unless explicitly stated otherwise, *Vonage products* should use the brand specified `Spezia` font families.  
Vonage teams may review guidelines at the [Spezia webfont kit](https://github.com/Vonage/spezia-webfont-kit).

Note that font files are not included within the css file, and must be copied to application assets separately (within the same parsed css folder).  
This is to allow the author to choose the most appropriate way to load the font files based on their project.

### Core (Optional)

In Addition, this library provides a set of styles (combined with the tokens and fonts) that can be used to embody the Vivid design system into an application.

These styles are not required by vivid components directly. however, native HTML tags do.

These **core styles** rely on the tokens and fonts 👆 to be loaded.

To **include the core styles**, its css files must be loaded into the project from the `node_modules/@vonage/vivid/styles/core` folder and *require a `vvd-root` class* selector to be present on a wrapping element (advisably the `:root`. When set on the `:root` (html element), typeface sizes are able to descend from the root font-size, thus comply with the [WCAG 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text)).

- `theme.css` - Sets theme related styles

- `typography.css` - Sets typography related styles

- `all.css` - Sets all the above styles

Note: scss users can simply [forward](https://sass-lang.com/documentation/at-rules/forward) the styles to their scss project:

```css
@forward 'node_modules/@vonage/vivid/styles/[path to file].css';
```

## Advanced Usage

### Scoped Elements (🧪 Alpha)

Custom elements, by browsers limitations, are registered globally, and thus may conflict when multiple versions of the library are used in the same application as all custom elements register under the same namespace.

Enforcing only a single version of the library to be used simultaneously makes it difficult to progressively migrate to newer versions of the library, as each update will require a full application update.
Also, in a micro-frontend architecture, this can be a major bottleneck as each micro-frontend may use a different version of the library.

To work around this limitation, Vivid provides a way for authors' to scope each custom element namespace by passing an argument to the `prefix` parameter when registering each custom element.

The following example will register *badge* custom element as `dashboard-badge`:

```js
import { registerBadge } from '@vonage/vivid';

registerBadge('dashboard');
```

then use it as:

```html
<dashboard-badge text="dashboard scoped badge"></dashboard-badge>
```

Remember to not include the default side-effect import (`import '@vonage/vivid/button';`) when using scoped elements as it will register the default namespace.

Even though custom elements can be registered under different namespaces, as many as needed, this approach lets you enjoy the benefits of [npm dedupe](https://docs.npmjs.com/cli/v8/commands/npm-dedupe) to ensure only a single version of the library is used in the application.

## Support

This library is open source, developed and maintained by the [Vonage Vivid team](Vonage/vivid).

For any questions, please open a [bug report](https://github.com/Vonage/vivid-3/issues/new?assignees=&labels=&template=bug_report.md&title=) or [feature request](https://github.com/Vonage/vivid-3/issues/new?assignees=&labels=&template=feature_request.md&title=).

## Roadmap

- View [components status](https://github.com/orgs/Vonage/projects/6)

- [What's on our plate](https://github.com/orgs/Vonage/projects/3/views/7)

- See the [open issues](https://github.com/vonage/vivid-3/issues) for a full list of proposed features (and known issues).

We publish a *next* release on every successful merge to main, so you never need to wait for a new stable version to make use of any updates.

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [npm page](https://www.npmjs.com/package/@vonage/vivid).

## Authors

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](LICENSE.md) file for details

<!-- ## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc -->

## Built With

- [Fast](https://www.fast.design) - to extend element classes and compile code to native web components
- [Typescript](https://www.typescriptlang.org) - for ergonomic and type-safe code
- [Sass](https://sass-lang.com) - for styles authoring extensibility and consistency

## Quickstart

Global content delivery networks can help quickly integrate content within html pages, fetching content from an URL, skipping local builds entirely.
Such practice is often used when working on POCs or reproduction environments.
Tools like [UNPKG](https://unpkg.com), [jsDeliver](https://www.jsdelivr.com), [Skypack](https://www.skypack.dev) etc' are bound to deliver any content registered in the npm registry.

The following snippet fully renders a Vivid button component

```html
<!-- import Montserrat & Roboto-Mono fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- import light theme style tokens -->
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/tokens/theme-light.css">

<!-- import Vivid button component -->
<script type="module" src="https://unpkg.com/@vonage/vivid@next/button/index.js"></script>

<!-- Part of the app (or a whole app) that contains vivid components -->
<div class="vvd-root">
  <vwc-button label="Click me" appearance="filled" connotation="cta"></vwc-button>
</div>
```
