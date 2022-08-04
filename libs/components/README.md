
# Vivid UI

Essential UI **web components** for building modern web applications, bound to provide a **safe**, **simple** and **intuitive** interface.

![the Vivid logo](/vivid-logo.svg)

-- TODO add visual - GIF or image reflecting an easy integration of vivid in code and page result

## Installation

To integrate Vivid components into your project, run:

```bash
npm install @vonage/vivid # or yarn add @vonage/vivid
```

## Usage

Import components in your project:

```js
import '@vonage/vivid/button';
```

And include in HTML:

```html
<vwc-button label="Click me"></vwc-button>
```

[Explore the complete list of components docs](https://vivid.deno.dev/components/accordion/) 📚.

### Prerequisites

The Vivid components library rely on a set of **core styles** to be present in the DOM, be shared across all components, apply common design identities (such as colors, typography, spacing etc'), and ensure the components look as intended.

As the task of loading css is not trivial, and may vary from project to project, this library does not provide any way to load the css. It is up to the author to load the css in the most appropriate manner for their project.

To **include the styles**, css files must be loaded into the project from the `node_modules/@vonage/vivid/styles` folder.

The folder contains the following files:

- Fonts

  - `fonts/spezia.css` - Specifies the Spezia variable font resource and its font face definition. Spezia is Vonage's branded font and is required by most Vivid components

- Themes

  - `themes/light.css` - Light theme css (only one theme can apply at a time. thus, only one is required to be loaded)

  - `themes/dark.css` - Dark theme css

## Support

This library is open source, is developed and maintained mostly by the [Vonage Vivid team](Vonage/vivid).

If, for any reason, you need help with the library, please [contact the team](Vonage/vivid).

For any questions, please [open an issue](Vonage/vivid/issues), [bug report](https://github.com/Vonage/vivid-3/issues/new?assignees=&labels=&template=bug_report.md&title=) or [feature request](https://github.com/Vonage/vivid-3/issues/new?assignees=&labels=&template=feature_request.md&title=).

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
