
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
#### Font families

Use `--vvd-font-family-upright` to specify a base proportional font.

Use `--vvd-font-family-monospace` to specify a base monospaced font.

Unless explicitely stated otherwise, Vonage products should use the brand font family `Spezia` for both. This is explained [in this repo](https://github.com/Vonage/spezia-webfont-kit).

`--vvd-font-family-upright`
- Type: `string`
- Default: `'Montserrat'`

`--vvd-font-family-monospace`
- Type: `string`
- Default: `'Roboto Mono'`

```html preview
<style>
  :root {
    --vvd-font-family-upright: Georgia;
    --vvd-font-family-monospace: Courier;
  }
</style>
<vwc-header>
  This header is using Georgia
</vwc-header>
<pre>/*
 * This block of code uses Courier
 */
</pre>
<vwc-button appearance="filled" label="I use Georgia too"></vwc-button>
```

#### Font size

Use `--vvd-size-font-scale-base` to define the base font size for the widgets.

When using the [core styles](/#core-optional) and the `.vvd-root` class is set on the root element (i.e., `<html>`), the default font size is reset to the user-agent's one (generally `16px`) and `--vvd-size-font-scale-base` set to `1rem`.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `undefined` or `'1rem'` (see above)

```html preview
<style>
  :root {
    --vvd-size-font-scale-base: 1.3rem;
  }
</style>
<vwc-header>
  This header's title is 30% larger than its parent
</vwc-header>
<pre>/*
 * This block of code too
 */
</pre>
<vwc-button appearance="filled" label="And the button label"></vwc-button>
```

#### Density

Use `--vvd-size-density` to modify the spacing and padding of widgets. Allowed values are `-1` (most condensed), `0`, `1` and `2` (most expanded).

- Type: `-1` | `0` | `1` | `2`
- Default: `0`

```html preview
<style>
  :root {
    --vvd-size-density: -1;
  }
</style>
<vwc-header>
  This header is condensed
</vwc-header>
<pre>/*
 * This block of code is not affected
 */
</pre>
<vwc-button appearance="filled" label="But the button is"></vwc-button>
```

#### Styles preset

The following presets can be used to style the text in your application:
- `--vvd-typography-headline`
- `--vvd-typography-subtitle`
- `--vvd-typography-heading-1`
- `--vvd-typography-heading-2`
- `--vvd-typography-heading-3`
- `--vvd-typography-heading-4`

```html preview
<div style="font: var(--vvd-typography-headline)">headline</div>
<div style="font: var(--vvd-typography-subtitle)">subtitle</div>
<div style="font: var(--vvd-typography-heading-1)">heading-1</div>
<div style="font: var(--vvd-typography-heading-2)">heading-2</div>
<div style="font: var(--vvd-typography-heading-3)">heading-3</div>
<div style="font: var(--vvd-typography-heading-4)">heading-4</div>
```
