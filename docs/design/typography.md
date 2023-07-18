# Typography

---

## Typefaces

Set the font custom properties of your choice (or all) to override the default typography styles with your own.

```css
--vvd-typography-headline
--vvd-typography-subtitle
--vvd-typography-heading-1
--vvd-typography-heading-2
--vvd-typography-heading-3
--vvd-typography-heading-4
--vvd-typography-base
--vvd-typography-base-bold
--vvd-typography-base-code
--vvd-typography-base-condensed
--vvd-typography-base-condensed-bold
--vvd-typography-base-extended
--vvd-typography-base-extended-bold
```


```html preview
<style>
  :root {
  --vvd-typography-heading-4: 500 20px/1.4 Georgia;
  --vvd-typography-base-code: 400 16px monospace;
  --vvd-typography-base-bold: 500 16px Georgia;
  }
</style>
<vwc-header>
  This header typeface is set by '--vvd-typography-heading-4' 
</vwc-header>
<pre>/*
 * This block of code typeface is set by '--vvd-typography-base-code'
 */
</pre>
<vwc-button appearance="filled" label="This button typeface is set by '--vvd-typography-base-bold'"></vwc-button>
```

---

## Font size

Use `--vvd-size-font-scale-base` to define the base font size which all typefaces sizes are based on.

Note that when using the [core styles](/#core-optional) with the `vvd-root` class set on the root element (i.e., `<html>`), the user-agent's default font size is unset (generally default to `'16px'`) and the `--vvd-size-font-scale-base` custom property is set to `'1rem'` to ensure end user's font size preferences are respected.

```html preview
<style>
 .vvd-root:root {
  --vvd-size-font-scale-base: 1.3rem;
 }
</style>

<vwc-header>
  This header's title is 30% larger
</vwc-header>

<pre>/*
 * This block of code too
 */
</pre>

<vwc-button appearance="filled" label="And the button label"></vwc-button>
```

---

## Typefaces preset

The following CSS custom properties can be referred to style the text in your application with the Vivid design language:

```html preview
<div style="font: var(--vvd-typography-headline)">headline</div>
<div style="font: var(--vvd-typography-subtitle)">subtitle</div>
<div style="font: var(--vvd-typography-heading-1)">heading-1</div>
<div style="font: var(--vvd-typography-heading-2)">heading-2</div>
<div style="font: var(--vvd-typography-heading-3)">heading-3</div>
<div style="font: var(--vvd-typography-heading-4)">heading-4</div>
<div style="font: var(--vvd-typography-base)">base</div>
<div style="font: var(--vvd-typography-base-bold)">base bold</div>
<div style="font: var(--vvd-typography-base-code)">base code</div>
<div style="font: var(--vvd-typography-base-condensed)">condensed</div>
<div style="font: var(--vvd-typography-base-condensed-bold)">condensed bold</div>
<div style="font: var(--vvd-typography-base-extended)">extended</div>
<div style="font: var(--vvd-typography-base-extended-bold)">extended bold</div>
```