# layout

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

Use the `auto-sizing` attribute to set the initial preferred auto-sizing.

- Type: `'fit'` | `'fill'`
- Default: `'fit'`

### fit

```html preview
<vwc-layout auto-sizing="fit">
  <div style="border: 1px solid">fit</div>
  <div style="border: 1px solid">fit</div>
</vwc-layout>
```

### fill

```html preview
<vwc-layout auto-sizing="fill">
  <div style="border: 1px solid">fill</div>
  <div style="border: 1px solid">fill</div>
</vwc-layout>
```

## Gutters

Use the `gutters` attribute to set the initial preferred margin.

- Type: `'sm'` | `'md'` | `lg'`
- Default: `''`

```html preview
<vwc-layout>
  <div style="border: 1px solid">default</div>
  <div style="border: 1px solid">default</div>
</vwc-layout>
<vwc-layout gutters="sm">
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
</vwc-layout>
<vwc-layout gutters="md">
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
</vwc-layout>
<vwc-layout gutters="lg">
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
</vwc-layout>
```

## Column Spacing

Use the `column-spacing` attribute to set the initial preferred spacing of a column.

- Type: `'sm'` | `'md'` | `lg'`
- Default: `'md'`

```html preview
<vwc-layout column-spacing="sm">
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
</vwc-layout>
<vwc-layout column-spacing="md">
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
</vwc-layout>
<vwc-layout column-spacing="lg">
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
</vwc-layout>
```

## Column Basis

Use the `column-basis` attribute to set the initial preferred measure of a column.

- Type: `'sm'` | `'md'` | `'lg'` | `'block'`
- Default: `'md'`

### Small

```html preview
<vwc-layout column-basis="sm">
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
  <div style="border: 1px solid">base-small</div>
</vwc-layout>
```

### Medium

```html preview
<vwc-layout column-basis="md">
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
  <div style="border: 1px solid">base</div>
</vwc-layout>
```

### Large

```html preview
<vwc-layout column-basis="lg">
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
  <div style="border: 1px solid">base-large</div>
</vwc-layout>
```

### Block

```html preview
<vwc-layout column-basis="block">
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
  <div style="border: 1px solid">block</div>
</vwc-layout>
```

## CSS Custom Properties

| Name                         | Description                                      | Usage                                              |
| ---------------------------- | ------------------------------------------------ | -------------------------------------------------- |
| --layout-grid-template-columns | controls the grid-template-columns of the layout | repeat(`auto-sizing`, minmax(`column-basis`, 1fr)) |
