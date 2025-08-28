---
title: Web Components
order: 1
---

# Getting Started With Web Components

Vivid components are built as [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). This means they are framework-agnostic and can be used with any framework or no framework at all.

## Installation

Add the NPM package to your repository:

{% packageInstallation "@vonage/vivid" %}

## Adding the vvd-root Class

The Vivid tokens require a `vvd-root` class to be present. It is recommended to add it on the `<html>` element, but it can also be added on a wrapping element to scope it to a certain part of the application.

```html
<html class="vvd-root">
	...
</html>
```

## Importing the Styles & Fonts

How to load CSS may vary from project to project, so we cannot provide a one-size-fits-all solution. Choose an appropriate method for your project.

See the [list of styles that come with Vivid](/guides/styles/) for more information.

<vwc-tabs gutters="none">
<vwc-tab label="CSS"></vwc-tab>
<vwc-tab-panel>

```css
/* Import Tokens For Light or Dark Theme */
@import '@vonage/vivid/styles/tokens/theme-light.css';
/* (Vonage only) Load Spezia Variable fonts */
@import '@vonage/vivid/styles/fonts/spezia-variable.css';
/* (Optional) Import Theme Styles */
@import '@vonage/vivid/styles/core/theme.css';
/* (Optional) Import Typography Styles */
@import '@vonage/vivid/styles/core/typography.css';
/* (Optional) Import Vivid 2 Compatibility Styles */
@import '@vonage/vivid/styles/tokens/vivid-2-compat.css';
```

</vwc-tab-panel>
<vwc-tab label="SCSS"></vwc-tab>
<vwc-tab-panel>

```scss
/* Import Tokens For Light or Dark Theme */
@forward '@vonage/vivid/styles/tokens/theme-light.css';
/* (Vonage only) Load Spezia Variable fonts */
@forward '@vonage/vivid/styles/fonts/spezia-variable.css';
/* (Optional) Import Theme Styles */
@forward '@vonage/vivid/styles/core/theme.css';
/* (Optional) Import Typography Styles */
@forward '@vonage/vivid/styles/core/typography.css';
/* (Optional) Import Vivid 2 Compatibility Styles */
@forward '@vonage/vivid/styles/tokens/vivid-2-compat.css';
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-action-group style="inline-size: 100%">
<vwc-accordion expand-mode="multi" style="inline-size: 100%">
<vwc-accordion-item heading="Not a Vonage Project?" expanded="false">

Vonage uses the brand-specific Spezia font.

If you are not working on a Vonage project, you should use the Montserrat and Roboto Mono fonts.

Add the following to your `<head>` to load them from Google Fonts:

```html
<head>
	<!-- ... -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
	<!-- ... -->
</head>
```

</vwc-accordion-item>
</vwc-accordion>
</vwc-action-group>

## Usage

You have two options to import the components:

- Using [side effect imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#import_a_module_for_its_side_effects_only) to register them with the default `vwc` prefix.
- Using a register function to register them with a [custom prefix](/guides/prefix/).

<vwc-tabs gutters="none">
<vwc-tab label="Import"></vwc-tab>
<vwc-tab-panel>

Import components in your project via:

```js
import '@vonage/vivid/button';
```

And include in HTML:

```html
<vwc-button label="Click me"></vwc-button>
```

</vwc-tab-panel>
<vwc-tab label="Register Function"></vwc-tab>
<vwc-tab-panel>

Import components in your project via:

```js
import { registerButton } from '@vonage/vivid';

registerButton('dashboard');
```

And include in HTML:

```html
<dashboard-button label="Click me"></dashboard-button>
```

Remember to not include the default side effect import (`import '@vonage/vivid/button';`) anywhere when using the register function as it will register the default prefix.

</vwc-tab-panel>
</vwc-tabs>

### Component Types

Vivid components come with type definitions. You can import the element class for each element as `Vwc<Name>Element`.

```ts
import { type VwcButtonElement } from '@vonage/vivid';

function updateLabel(button: VwcButtonElement) {
	button.label = 'Click me';
}
```

TypeScript can automatically infer the element type when using certain DOM APIs.

To enable this, create a `vivid.d.ts` file in your project with the following content:

```ts
import { type VividTagNameMap } from '@vonage/vivid';

declare global {
	interface HTMLElementTagNameMap extends VividTagNameMap<'vwc'> {}
}
```

If you are using a custom prefix, replace `vwc` with your prefix.

Now, TypeScript is able to infer the correct type:

```ts
const button = document.querySelector('vwc-button')!;
button.label = 'Click me'; // button has VwcButtonElement type
```

## Alternative: Using a CDN

As an alternative to installing the package, you can use a content delivery network (CDN) to load the components directly in your HTML.

Global CDNs can help quickly integrate content within HTML pages, fetching content from a URL, skipping local builds entirely.

Such practice is often used when working on POCs or reproduction environments.

Tools like [UNPKG](https://unpkg.com), [jsDeliver](https://www.jsdelivr.com), [Skypack](https://www.skypack.dev) etc. are bound to deliver any content registered in the npm registry.

The following snippet fully renders a Vivid Button component:

```html
<!-- import Montserrat & Roboto-Mono fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
	href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap"
	rel="stylesheet"
/>

<!-- import light theme style tokens -->
<link
	rel="stylesheet"
	href="https://unpkg.com/@vonage/vivid@5.x/styles/tokens/theme-light.css"
/>

<!-- import Vivid button component -->
<script
	type="module"
	src="https://unpkg.com/@vonage/vivid@5.x/button/index.js"
></script>

<!-- Part of the app (or a whole app) that contains vivid components -->
<div class="vvd-root">
	<vwc-button
		label="Click me"
		appearance="filled"
		connotation="cta"
	></vwc-button>
</div>
```
