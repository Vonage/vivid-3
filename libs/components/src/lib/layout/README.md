# vwc-layout

Using layout, elements can be arranged easily in a variety of sizes and spaces that suit vivid design.

```js
<script type='module'>
    import '@vonage/vivid/layout';
</script>
```

## auto-sizing

Use the `auto-sizing` attribute to set the initial preferred auto-sizing.

- Type: `'fit'` | `'fill'`
- Default: `'fit'`

### fit

```html preview
<vwc-layout auto-sizing="fit">
  <img src="https://picsum.photos/311/200">
  <img src="https://picsum.photos/312/200">
  <img src="https://picsum.photos/313/200">
  <img src="https://picsum.photos/314/200">
  <img src="https://picsum.photos/311/200">
  <img src="https://picsum.photos/316/200">
</vwc-layout>
```

### fill

```html preview
<vwc-layout auto-sizing="fill">
  <img src="https://picsum.photos/311/200">
  <img src="https://picsum.photos/312/200">
  <img src="https://picsum.photos/313/200">
  <img src="https://picsum.photos/314/200">
  <img src="https://picsum.photos/311/200">
  <img src="https://picsum.photos/316/200">
</vwc-layout>
```

## Gutters

Use the `gutters` attribute to set the initial preferred margin.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `''`


```html preview
<vwc-layout>
  <div style="border: 1px solid">default</div>
  <div style="border: 1px solid">default</div>
</vwc-layout>
<vwc-layout gutters="base-small">
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
</vwc-layout>
<vwc-layout gutters="base">
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
</vwc-layout>
<vwc-layout gutters="base-large">
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
</vwc-layout>
```

## Column-spacing

Use the `column-spacing` attribute to set the initial preferred spacing of a column.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`

```html preview
<vwc-layout column-spacing="base-small">
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
</vwc-layout>
<vwc-layout column-spacing="base">
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
</vwc-layout>
<vwc-layout column-spacing="base-large">
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
</vwc-layout>
```

## Column-basis

Use the `column-basis` attribute to set the initial preferred measure of a column.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`

### base-small
```html preview
<vwc-layout column-basis="base-small">
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
</vwc-layout>
```
### base
```html preview
<vwc-layout column-basis="base">
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
</vwc-layout>
```
### base-large
```html preview
<vwc-layout column-basis="base-large">
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
</vwc-layout>
```
### block
```html preview
<vwc-layout column-basis="block">
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
</vwc-layout>
```