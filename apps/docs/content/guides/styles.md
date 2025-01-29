---
title: Styles
order: 1
---

# Styles

Vivid components contain their own stylesheets. However, they require **design tokens** in the form of CSS custom properties to be present on the page.
Those are values such as colors, typography, spacing, etc.

You must load the design tokens stylesheet in order for the components to look as intended. Including it will not affect the look of your application itself.

There are several additional stylesheets that can be loaded to incorporate the Vivid look and feel into your application.
Which stylesheets you should load will depend on your project's needs.

**Required stylesheets:**

- [Design Tokens](#design-tokens)

**Optional core styles:**

- [Core Theme](#core-theme)
- [Core Typography](#core-typography)
- [Core All](#core-all)

**Optional utilities:**

- [Spezia Font Kit](#spezia-font-kit)
- [Vivid 2.x Compatibility](#vivid-2x-compatibility)

<vwc-note headline="Loading Styles" connotation="information" icon="info-line">

How to load styles will depend on your project's setup. You can find more guidance in the [Getting Started guides](/getting-started/web-components/#importing-the-styles-and-fonts).

</vwc-note>

## Design Tokens Stylesheet

<vwc-tabs gutters="none">
<vwc-tab id="light" label="Light Theme"></vwc-tab>
<vwc-tab-panel>

```js
'@vonage/vivid/styles/tokens/theme-light.css';
```

</vwc-tab-panel>
<vwc-tab id="dark" label="Dark Theme"></vwc-tab>
<vwc-tab-panel>

```js
'@vonage/vivid/styles/tokens/theme-dark.css';
```

</vwc-tab-panel>
</vwc-tabs>

This stylesheet contains all the **design tokens** used by Vivid components. It will not affect the look of your application.

The tokens will be scoped to the `vvd-root` class selector.

## Core Theme Stylesheet

```js
'@vonage/vivid/styles/core/theme.css';
```

The core theme styles will apply the appropriate `color`, `background-color` and `color-scheme` for the chosen theme to the `vvd-root` class selector.

### Scrollbar

Vivid components have scrollbars with custom styles to make them more consistent across browsers and operating systems. These styles can be added to the entire app/page by adding the class `vvd-scrollbar` to the `html` (`:root`) element.

## Core Typography Stylesheet

```js
'@vonage/vivid/styles/core/typography.css';
```

The core typography styles will apply the Vivid typography presets to HTML elements such as `h1`, `h2`, `p` etc. and provide a set of utility classes (e.g. `font-base`) that can be used to apply the typography to any element.

Learn how to use them in the [typography guidelines](/designs/typography/#core-typography).

Additionally, if the `vvd-root` class is applied to the `<html>` element, it will make the Vivid typography scale with the user-agent's font size settings.

The styles are scoped to the `vvd-root` class selector.

## Core All Stylesheet

```js
'@vonage/vivid/styles/core/all.css';
```

This stylesheet contains both the [core theme](#core-theme) and [core typography](#core-typography) stylesheets.

### Spezia Font Kit Stylesheet

```js
'@vonage/styles/fonts/spezia-variable.css';
```

Vonage products should use the brand-specific **Spezia** font families by importing the Spezia font kit.

This stylesheet will load the font files from the Vonage CDN and set the typography tokens to use the font families.

To avoid FOIT (Flash Of Invisible Text), you can also preload the fonts in your HTML `<head>` section:

```html
<head>
	<link
		rel="preload"
		href="https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2"
		type="font/woff2"
		as="font"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href="https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2"
		type="font/woff2"
		as="font"
		crossorigin="anonymous"
	/>
</head>
```

## Vivid 2.x Compatibility Stylesheet

```js
'@vonage/vivid/styles/tokens/vivid-2-compat.css';
```

This stylesheet is only needed if you are using both Vivid 2.x and Vivid 3.x components on the same page.

It is needed to solve the clashing of token names between Vivid 2.x and Vivid 3.x.

Learn more in the [Vivid 2.x to Vivid 3.x Migration Guide](/guides/vivid-2-migration/).
