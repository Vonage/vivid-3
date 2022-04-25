# vwc-layout

Using layout, elements can be arranged easily in a variety of sizes and spaces that suit vivid design.

```js
<script type='module'>
    import '@vonage/vivid/layout';
</script>
```

```html preview
<vwc-layout>
  <img src="https://picsum.photos/id/1015/300/200">
  <img src="https://picsum.photos/id/1016/300/200">
  <img src="https://picsum.photos/id/1018/300/200">
  <img src="https://picsum.photos/id/1019/300/200">
  <img src="https://picsum.photos/id/1055/300/200">
  <img src="https://picsum.photos/id/1050/300/200">
</vwc-layout>
```

## Auto-sizing

Use the `auto-sizing` attribute to set the initial preferred `auto-sizing`.

When the [repeat()](#css-custom-properties) function is set to `fit` or `fill`, the grid container creates as many grid tracks (columns/rows) as possible without overflowing the container.

With `fit`, when there are not enough grid items to fill the number of tracks created, those empty tracks are collapsed.

With `fill`, everything is the same as `fit`, except empty tracks are not collapsed.

- Type: `'fit'` | `'fill'`
- Default: `'fit'`

```html preview
<div class="box-wrapper">
  <vwc-layout auto-sizing="fit">
    <div class="box">fit</div>
    <div class="box">fit</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout auto-sizing="fill">
    <div class="box">fill</div>
    <div class="box">fill</div>
  </vwc-layout>
</div>
```

## Gutters

Use the `gutters` attribute to set the initial preferred `margin`.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `''`

```html preview
<div class="box-wrapper">
  <vwc-layout>
    <div class="box">default</div>
    <div class="box">default</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout gutters="base-small">
    <div class="box">base-small</div>
    <div class="box">base-small</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
<vwc-layout gutters="base">
  <div class="box">base</div>
  <div class="box">base</div>
</vwc-layout>
</div>
<div class="box-wrapper">
<vwc-layout gutters="base-large">
  <div class="box">base-large</div>
  <div class="box">base-large</div>
</vwc-layout>
</div>
```

## Column-spacing

Use the `column-spacing` attribute to set the initial preferred `spacing` of a column.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`

```html preview
<div class="box-wrapper">
  <vwc-layout column-spacing="base-small">
    <div class="box">base-small</div>
    <div class="box">base-small</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout column-spacing="base">
    <div class="box">base</div>
    <div class="box">base</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout column-spacing="base-large">
    <div class="box">base-large</div>
    <div class="box">base-large</div>
  </vwc-layout>
</div>
```

## Column-basis

Use the `column-basis` attribute to set the initial preferred `measure` of a column.

- Type: `'base-small'` | `'base'` | `'base-large'` | `'block'`
- Default: `'base'`

```html preview
<div class="box-wrapper">
  <vwc-layout column-basis="base-small">
    <div class="box">base-small</div>
    <div class="box">base-small</div>
    <div class="box">base-small</div>
    <div class="box">base-small</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout column-basis="base">
    <div class="box">base</div>
    <div class="box">base</div>
    <div class="box">base</div>
    <div class="box">base</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout column-basis="base-large">
    <div class="box">base-large</div>
    <div class="box">base-large</div>
    <div class="box">base-large</div>
    <div class="box">base-large</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout column-basis="block">
    <div class="box">block</div>
    <div class="box">block</div>
    <div class="box">block</div>
    <div class="box">block</div>
  </vwc-layout>
</div>
```

## CSS Custom Properties

| Name                           | Description                                      | Usage                                              |
| ------------------------------ | ------------------------------------------------ | -------------------------------------------------- |
| `--layout-grid-template-columns` | controls the grid-template-columns of the layout | repeat(`auto-sizing`, minmax(`column-basis`, 1fr)) |

```html preview
<div class="box-wrapper">
  <vwc-layout style="--layout-grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
    <div class="box">example</div>
    <div class="box">example</div>
    <div class="box">example</div>
    <div class="box">example</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout style="--layout-grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));">
    <div class="box">example</div>
    <div class="box">example</div>
    <div class="box">example</div>
    <div class="box">example</div>
  </vwc-layout>
</div>
<div class="box-wrapper">
  <vwc-layout style="--layout-grid-template-columns: 280px repeat(auto-fill, minmax(100px, 1fr));">
    <div class="box">example</div>
    <div class="box">example</div>
    <div class="box">example</div>
    <div class="box">example</div>
  </vwc-layout>
</div>
```
