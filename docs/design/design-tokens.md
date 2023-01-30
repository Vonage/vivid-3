
# Design Tokens

## What are design tokens?

Design tokens are all the values needed to construct and maintain a design system — color, typography, spacing, object styles, sizing, etc. — represented as data.

These can represent anything defined by design: font size in pixel, a color as a RGB value, an opacity as a number, etc. They’re used in place of hard-coded values in order to ensure flexibility and unity across all product experiences.

Design tokens are directly integrated into our component libraries and UI kits. They cover the various options of platform scales, color themes, component states, and more.

Using design tokens allows us to manage and maintain our design system as Vonage’s design Single source of truth.

### Design token Identities

| **Identities**   | **Properties**    |
| :--------------  |:----------------- |
| **Typography**   | Font sizes        |
|                  | Font weights      |
|                  | Font decoration   |
|                  | Line Height       |
| **Color**        | Color Palette     |
|                  | Connotation colors|
| **Scheme**       | Dark mode         |
|                  | Light mode        |
| **Elevation**    | Drop Shadow       |
|                  | Opacity           |
| **Sizing**       | Spacing           |
|                  | Dense             |
| **Shape**        | Border Style      |
|                  | Border Radius     |

### Design token types

The following types of design tokens are the building blocks and design decisions that make up the Vivid design language:

**Global tokens** - global tokens are the primitive values in our design language, represented by context-agnostic names. Our color palette, typography, and elevation values are all recorded as global tokens. These can be directly used, and are inherited by all other token types.

![Global-tokens-explainer](https://user-images.githubusercontent.com/106529909/185866434-34566931-4f35-49cc-a535-5690414ea5a2.png)

**Alias tokens** - alias tokens relate to a specific context or abstraction. Aliases help communicate the intended purpose of a token, and are effective when a value with a single intent will appear in multiple places.

![alias-tokens-explainer](https://user-images.githubusercontent.com/106529909/185866411-98c26728-8bec-4836-a440-a76469edd25d.png)

## Using design tokens

Aside from the [color-related tokens](/designs/color-palette), you may use the following to customize your application appearance.

### Typography

#### Typefaces

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
  --vvd-typography-base-code: 400 16px Courier;
  --vvd-typography-base-bold: 500 16px Georgia;
  }
</style>
<vwc-header>
  This header typeface is set by '--vvd-typography-heading-4' 
</vwc-header>
<pre>/*
 * This block of code uses an override '--vvd-typography-base-code'
 */
</pre>
<vwc-button appearance="filled" label="I using my override '--vvd-typography-base-bold'"></vwc-button>
```

#### Font size

Use `--vvd-size-font-scale-base` to define the base font size which all typefaces sizes are based on.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `'16px'`

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

#### Typefaces preset

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

### Sizing

#### Density

Use `--vvd-size-density` to modify the density of the Vivid integrated UI. This can be scoped to a specific element, or set globally.
Due to a11y and design constraints, the density can only be set to one of the following values `-1` (most condensed), `0`, `1` and `2` (most expanded).

- Type: `-1` | `0` | `1` | `2`
- Default: `0`

```html preview blocks
<style>
 #scoped-region {
  --vvd-size-density: 1;
 }
</style>

<vwc-number-field label="Choose density" helper-text="Change density value" min="-1" max="2" value="1" style="justify-self: flex-start; width: 105px;"></vwc-number-field>

<vwc-divider></vwc-divider>

<div id="scoped-region">

 <form style="width: 250px">
  <vwc-layout column-basis="block">

   <vwc-text-field label="First name:"></vwc-text-field>

   <vwc-text-field label="Last name:"></vwc-text-field>

   <vwc-button appearance="filled" label="Submit"></vwc-button>

  </vwc-layout>
 </form>

</div>

<script>
  const root = document.querySelector('#scoped-region');
  const numberfield = document.querySelector('vwc-number-field');
  numberfield.addEventListener('change', (e) => root.style.setProperty('--vvd-size-density', e.target.value));
</script>
```
