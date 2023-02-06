# First Steps for Vonage Users
## Getting Started with Vivid@3 and up For Vonage Users

This guide provides step-by-step instructions for setting up vivid@3.x.

If you have [vivid@2.x](mailto:vivid@2.x) installed in your project, make sure to follow the instructions for [integrating vivid@3 alongside vivid@2](#integrating-vivid@3-alongside-vivid@2).

---

## install vivid

```bash
npm install @vonage/vivid
```

---

## Prerequisites

### Tokens
Design system tokens are standardized visual design elements, such as colors, typography and spacing.
Tokens are not applying any style, they are css-variables that Vivid uses in its style.  

Adding tokens to your project.

CSS:

```css
@import "node_modules/@vonage/vivid/styles/tokens/theme-light.css";

/* or alternatively */
@import "node_modules/@vonage/vivid/styles/tokens/theme-dark.css";
```

SCSS:

```css
@forward 'node_modules/@vonage/vivid/styles/tokens/theme-light.css";
```

In the &lt;head> tag:

```html
<link rel="stylesheet" href="node_modules/@vonage/vivid/styles/tokens/theme-light.css" media="all">
```

### Font

Vivid uses _Montserrat_ and _Roboto Mono_ Google fonts.

**Vonage** products should use the brand-specific _Spezia_ font families.

To obtain the _Spezia_ webfont kit, go to this repository:

[https://github.com/Vonage/spezia-webfont-kit](https://github.com/Vonage/spezia-webfont-kit)

Download the font and add it to your project.

Make sure it is added to the correct path as indicated in the CSS file (or update the path in the CSS below).

```
assets/fonts/Spezia_Web_Complete/VariableFont/Complete
```

In your CSS file, add the following code to specify & load the font family:

Note: The `@font-face` declaration must be placed at the top of the CSS file.

```css
@font-face {
 font-family: SpeziaCompleteVariableUpright;
 font-stretch: 50% 200%;
 font-weight: 1 1000;
 src: url('assets/fonts/Spezia_Web_Complete/VariableFont/Complete/SpeziaCompleteVariableUprightWeb.woff2') format('woff2');
}

@font-face {
 font-family: SpeziaCompleteVariableItalic;
 font-stretch: 50% 200%;
 font-weight: 1 1000;
 src: url('assets/fonts/Spezia_Web_Complete/VariableFont/Complete/SpeziaCompleteVariableItalicWeb.woff2') format('woff2');
}

@font-face {
 font-family: SpeziaMonoCompleteVariable;
 font-stretch: 50% 200%;
 font-weight: 1 1000;
 src: url('assets/fonts/Spezia_Web_Complete/VariableFont/Complete/SpeziaMonoCompleteVariableWeb.woff2') format('woff2');
}
```

Now that we have the _Spezia_ font families set up - we need to override Vivid's default typefaces by applying the following to the css:

```css
.vvd-root {
	/* override typefaces */
	--vvd-typography-headline: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 4.125)/1.3333333333333333 SpeziaCompleteVariableUpright;
	--vvd-typography-subtitle: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 3.25)/1.3076923076923077 SpeziaCompleteVariableUpright;
	--vvd-typography-heading-1: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 2.5)/1.3 SpeziaCompleteVariableUpright;
	--vvd-typography-heading-2: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 2)/1.375 SpeziaCompleteVariableUpright;
	--vvd-typography-heading-3: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 1.625)/1.3846153846153846 SpeziaCompleteVariableUpright;
	--vvd-typography-heading-4: 500 condensed calc(var(--vvd-size-font-scale-base, 16px) * 1.25)/1.4 SpeziaCompleteVariableUpright;
	--vvd-typography-base: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.875)/1.4285714285714286 SpeziaCompleteVariableUpright;
	--vvd-typography-base-bold: 600 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.875)/1.4285714285714286 SpeziaCompleteVariableUpright;
	--vvd-typography-base-code: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.875)/1.4285714285714286 SpeziaMonoCompleteVariable;
	--vvd-typography-base-condensed: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.75)/1.3333333333333333 SpeziaCompleteVariableUpright;
	--vvd-typography-base-condensed-bold: 600 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px) * 0.75)/1.3333333333333333 SpeziaCompleteVariableUpright;
	--vvd-typography-base-extended: 400 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px))/1.5 SpeziaCompleteVariableUpright;
	--vvd-typography-base-extended-bold: 600 ultra-condensed calc(var(--vvd-size-font-scale-base, 16px))/1.5 SpeziaCompleteVariableUpright;
	/* If vivid typography css core style is included in application, setting the '--vvd-size-font-scale-base'
	css variable as derivative will flexibly update font-size by the user preference */
}
```


### Typography (Optional)

If you wish your whole app to align to vivid typography (instead of the deprecated  vivid-2 vwc-text anymore) add the typography css, or all core css to typography and theme:

CSS:

```css
@import "node_modules/@vonage/vivid/styles/core/all.css";
```

SCSS:

```css
@forward 'node_modules/@vonage/vivid/styles/core/all.css";
```

In the &lt;head> tag:

```html
<link rel="stylesheet" href="node_modules/@vonage/vivid/styles/core/all.css">
```
---

## Vivid Class
To add fonts and tokens (and typography) to the component you need to add the class`vvd-root` to your app.

```html
<body class="vvd-root">...</body>
```

You can also add it to any wrapping element if you would like to scope the styles to only a certain part of your application.

---

## Adding component
```html
<vwc-button label="Click me"></vwc-button>
``` 

---

## integrating vivid@3 alongside vivid@2
Vivid@next can be installed alongside vivid@2.x but there are some prerequisites:

### Pre Installation
The project needs to import vivid@2 components individually and not as a whole package.

DON’T:

```json
"@vonage/vivid": "^2.37.0", // previous vivid version
"@vonage/vivid": "next", // new vivid version
```

DO:

```json
# Vivid new version
"@vonage/vivid": "next",

# Vivid previous version
"@Vonage/vwc-accordion": "2.37.0",
"@Vonage/vwc-action-group": "2.37.0",
"@Vonage/vwc-audio": "2.37.0",
...
```
---

### Setting custom prefix

```js
import { registerBadge } from '@vonage/vivid';

registerBadge ('vwc3');
```


### Start Using component

Now it's time to use the components with the prefix you set.

```html
<vwc3-badge text="vivid@3 scoped badge"></vwc3-badge>
```

---

## Have fun using vivid@3 components :)

### Have questions?

* Check out the [documentation](https://vivid.deno.dev/)
* Still looking for answers, ask us in[#Ask-Vivid slack channel](https://vonage.slack.com/archives/C013F0YKH99).
