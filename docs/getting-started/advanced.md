# Advanced

---
## Styles (Optional)

Vivid provides a set of styles (combined with the tokens and fonts) that can be used to embody the Vivid design system into an application.  
**These styles are not required by vivid components directly. However, native HTML tags do.**

- `theme.css` - Sets theme related styles

- `typography.css` - Sets typography related styles

- `all.css` - Sets all the above styles

These **core styles** rely on the [tokens and fonts to be loaded](/getting-started/quick-start/#prerequisite)

### Include the styles

To include the styles, its css files must be loaded into the project from: 

```js
'node_modules/@vonage/vivid/styles/[path to file].css';
```

Scss users can simply use [@forward](https://sass-lang.com/documentation/at-rules/forward).
```js
@forward 'node_modules/@vonage/vivid/styles/[path to file].css';
```

### Setting Vivid class

[As in tokens](/getting-started/quick-start/#setting-vivid-class) styles **require** a `vvd-root` class selector to be present on a wrapping element (advisably the [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)). 
When set on the **:root HTML Element**, typeface sizes are able to descend from the root font-size, thus comply with the [WCAG 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text) to ensure text readability experience.

---

## Scoped Elements

Custom elements are registered globally by the browser. When two custom elements with the same tag name are registered on the same document, it creates a conflict that results in an error. Loading multiple versions of `vivid` is likely to cause this error as vivid elements are named the same.

Enforcing only a single version of the library to be used simultaneously makes it difficult to progressively migrate to newer versions of the library, as each update will require a full application update.
Also, in a micro-frontend architecture, this can be a major bottleneck as each micro-frontend may use a different version of the library.

To work around this limitation, Vivid provides a way for authors' to scope each custom element namespace by passing an argument to the `prefix` parameter when registering each custom element.

The following example will register *badge* custom element as `dashboard-badge`:

```js
import { registerBadge } from '@vonage/vivid';

registerBadge('dashboard');
```

Then use it as:

```html
<dashboard-badge text="dashboard scoped badge"></dashboard-badge>
```

Remember to not include the default side-effect import (`import '@vonage/vivid/button';`) when using scoped elements as it will register the default namespace.

In addition to avoiding namespace collision and customizing elements' tag names, this approach lets you enjoy the benefits of [npm dedupe](https://docs.npmjs.com/cli/v8/commands/npm-dedupe). With [npm dedupe](https://docs.npmjs.com/cli/v8/commands/npm-dedupe), only the least needed versions of the library are used in the application.

---
## Vonage Fonts

Vivid uses _Montserrat_ and _Roboto Mono_ Google fonts.

**Vonage** products should use the brand-specific _Spezia_ font families.

To obtain the _Spezia_ webfont kit, go to this repository: [https://github.com/Vonage/spezia-webfont-kit](https://github.com/Vonage/spezia-webfont-kit)

Download the font and add it to your project.

Make sure it is added to the correct path as indicated in the CSS file (or update the path in the CSS below).

```
assets/fonts/Spezia_Web_Complete/VariableFont/Complete
```

In your CSS file, add the following code to specify & load the font family:

<vwc-note connotation="warning" headline="The @font-face declaration must be placed at the top of the CSS file."></vwc-note>

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

---
## Have questions?

Still looking for answers, ask us in [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) slack channel.