What does this project do?
Why is this project useful?
How do I get started?
Where can I get more help, if I need it?
how you handle contributions, what the goals of the project are, and information about licenses and attribution

![the Vivid logo](/vivid-logo.svg)

# Vivid Web Components

Vonage's UI essentials for building modern web applications, bound to provide a **safe**, **simple** and **intuitive** interface.

## Getting Started

To integrate Vivid into your project, run:

```bash
npm install @vonage/vivid # or yarn add @vonage/vivid
```

Then, you can import the components in your project:

use:

```js
import '@vonage/vivid/button';
```

```html
<vwc-button label="Click me"></vwc-button>
```

For a complete list of components, [explore the docs](https://vivid.deno.dev).

### Prerequisites

#### Styles

The Vivid components library rely on a set of core styles to be present in the DOM, be shared across all components, apply common design identities (such as colors, typography, spacing etc'), and ensure the components look as intended.

As the task of loading css is not trivial, and may vary from project to project, this library does not provide any way to load the css. It is up to the author to load the css in the most appropriate manner for their project.

##### Usage

To include the styles, css files must be loaded into the project from the `node_modules/@vonage/vivid/styles` folder.

Folder contains the following files:

- Fonts

  - `fonts/spezia.css` - Specifies the Spezia variable font resource and its font face definition. Spezia is Vonage's branded font and is required by most Vivid components

- Themes

  - `themes/light.css` - Light theme css (only one theme can apply at a time. thus, only one is required to be loaded)

  - `themes/dark.css` - Dark theme css

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

"Cherry picking" interface

Vivid aspire to be a simple and intuitive interface for developers.

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

We publish a *next* release on every successful merge to main, so you never need to wait for a new stable version to make use of any updates.

See the [open issues](https://github.com/vonage/vivid-3/issues) for a full list of proposed features (and known issues).
