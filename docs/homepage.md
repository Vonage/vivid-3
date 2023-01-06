
# Vivid UI

Essential UI **web components** for building modern web applications, bound to provide a **safe**, **simple** and **intuitive** interface.

![image](https://user-images.githubusercontent.com/10883919/189522882-968358df-ee7c-4256-b61b-550cf369a087.png)

## Quick start

The following steps will get you up and running in seconds.

Learn more about configuration, font usage or how to migrate from Vivid 2 by visiting the [Getting Started page](/getting-started).

1. **Install Vivid**

 ```bash
npm install @vonage/vivid@next # or yarn add @vonage/vivid@next
```

2. **Import the required components**

```js
import '[node_modules path]/@vonage/vivid/button/index.js';
import '[node_modules path]/@vonage/vivid/checkbox/index.js';
```

3. **Include the global CSS and a color theme:**

 ```html
<link rel="stylesheet" href="[node_modules path]/@vonage/vivid/styles/core/all.css">
<link rel="stylesheet" href="[node_modules path]/@vonage/vivid/styles/tokens/theme-light.css">
```

4. **Add a the root class and you're good to go!**

```html
<html class="vvd-root">
    ...
    <vwc-button label="Click me"></vwc-button>
    <vwc-checkbox label="Click me"></vwc-button>
```

## About Vivid

#### Project

Vivid is open source, developed and maintained by the [Vonage Vivid teams](https://github.com/orgs/Vonage/teams/vivid/teams). See also the list of [contributors](https://github.com/Vonage/vivid-3/graphs/contributors) who participated in this project.

It is licensed under the [Apache 2.0 License](https://github.com/Vonage/vivid-3/blob/main/LICENSE.md) and uses [semantic versioning](http://semver.org/). Available versions are listed on the [npm page](https://www.npmjs.com/package/@vonage/vivid).

#### Support

Found a problem? Please open a [bug report](https://github.com/Vonage/vivid-3/issues/new?assignees=yonatankra%2C+rachelbt%2C+rinaok%2C+yinonov&labels=bug&template=bug_report.yml&title=%5BYOUR+TITLE%5D%3A+Brief+description).

Need a new feature? Please open a [feature request](https://github.com/Vonage/vivid-3/issues/new?assignees=yonatankra%2C+rachelbt%2C+rinaok%2C+yinonov&labels=Feature+request&template=feature_request.yml&title=%5BYOUR+TITLE%5D%3A+Brief+description).


Feel like contributing? Please read [CONTRIBUTING.md](https://github.com/Vonage/vivid-3/blob/main/.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

#### Roadmap

- View [components status](https://github.com/orgs/Vonage/projects/6)
- [What's on our plate](https://github.com/orgs/Vonage/projects/3/views/7)
- See the [open issues](https://github.com/vonage/vivid-3/issues) for a full list of proposed features (and known issues).

We publish a *next* release on every successful merge to main, so you never need to wait for a new stable version to make use of any updates.

<!-- ## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc -->

#### Built With

- [Fast](https://www.fast.design) - to extend element classes and compile code to native web components
- [Typescript](https://www.typescriptlang.org) - for ergonomic and type-safe code
- [Sass](https://sass-lang.com) - for styles authoring extensibility and consistency
