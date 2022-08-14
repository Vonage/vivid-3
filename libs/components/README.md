
# Vivid UI

Essential UI **web components** for building modern web applications, bound to provide a **safe**, **simple** and **intuitive** interface.

<!-- ! TODO add visual - GIF or image reflecting an easy integration of vivid in code and page result -->
![the Vivid logo](/assets/images/vivid-cover-wide.avif)

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

### Prerequisites

The Vivid components library rely on a set of **core styles** to:

- Be present in the DOM

- Be shared across all components

- Apply common design identities (such as colors, typography, spacing etc')

- Ensure the components look as intended.

As the task of loading css is not trivial, and may vary from project to project, this library does not provide any way to load the css. It is up to the author to load the css in the most appropriate manner for their project.

To **include the styles**, css files must be loaded into the project from the `node_modules/@vonage/vivid/styles` folder.

The folder contains the following files:

- Fonts

  - `fonts/spezia.css` - Loads the *Spezia* variable font and specifies its font face definition. *Spezia* is Vonage's branded font and is required by most Vivid components

- Themes - only one theme can apply at a time. thus, only one is required to be loaded

  - `themes/light.css` - Light theme

  - `themes/dark.css` - Dark theme

Note: scss users can simply [forward](https://sass-lang.com/documentation/at-rules/forward) the styles to their scss project:

```css
@forward 'node_modules/@vonage/vivid/styles/fonts/spezia';
@forward 'node_modules/@vonage/vivid/styles/themes/light';
```

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

The following example fully renderes Vivid button component

```html preview
<!-- import spezia font -->
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/fonts/spezia.css">

<!-- import light theme style tokens -->
<link rel="stylesheet" href="https://unpkg.com/@vonage/vivid@next/styles/themes/light.css">

<!-- import Vivid button component -->
<script type="module" src="https://unpkg.com/@vonage/vivid@next/button/index.js"></script>

<vwc-button label="Click me" appearance="filled" connotation="cta"></vwc-button>
```
