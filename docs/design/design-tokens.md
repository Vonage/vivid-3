
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

Aside from the [color-related tokens](/designs/color-palette), you may use these ones to tweak your application appearance.

### Typography
#### Font families

Use `--vvd-font-family-upright` to specify a base proportional font.

Use `--vvd-font-family-monospace` to specify a base monospaced font.

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

Use `--vvd-size-font-scale-base` to define the base font size for the widgets. The default value in Vivid is `16px`.

```html preview
<style>
  :root {
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

#### Density

Use `--vvd-size-density` to modify the spacing and padding of widgets. Allowed values are `-1` (condensed), `0` (default) and `1` (expanded).

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
