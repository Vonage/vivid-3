# Layout

Using layout, elements can be arranged easily in a variety of sizes and spaces that suit vivid design.

```js
<script type='module'>
  import '@vonage/vivid/layout';
</script>
```

```html preview
<vwc-layout>
  <vwc-card headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <img slot="media" src="https://picsum.photos/id/1015/300/200" alt="landscape" style="width: 100%; height: 150px; object-fit: cover;"/>
  </vwc-card>
  <vwc-card headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <img slot="media" src="https://picsum.photos/id/1016/300/200" alt="landscape" style="width: 100%; height: 150px; object-fit: cover;"/>
  </vwc-card>
  <vwc-card headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <img slot="media" src="https://picsum.photos/id/1018/300/200" alt="landscape" style="width: 100%; height: 150px; object-fit: cover;"/>
  </vwc-card>
  <vwc-card headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <img slot="media" src="https://picsum.photos/id/1019/300/200" alt="landscape" style="width: 100%; height: 150px; object-fit: cover;"/>
  </vwc-card>
  <vwc-card headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <img slot="media" src="https://picsum.photos/id/1055/300/200" alt="landscape" style="width: 100%; height: 150px; object-fit: cover;"/>
  </vwc-card>
  <vwc-card headline="Lorem ipsum" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <img slot="media" src="https://picsum.photos/id/1050/300/200" alt="landscape" style="width: 100%; height: 150px; object-fit: cover;"/>
  </vwc-card>
</vwc-layout>
```

## Members

### Column Spacing

Use the `column-spacing` attribute to set the initial preferred `spacing` of a column.

- Type: `'small'` | `'medium'` | `'large'`
- Default: `'medium'`

```html preview full
<vwc-layout gutters="small" column-spacing="small">
  <vwc-card elevation="2" text="small"></vwc-card>
  <vwc-card elevation="2" text="small"></vwc-card>
  <vwc-card elevation="2" text="small"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-spacing="medium">
  <vwc-card elevation="2" text="medium"></vwc-card>
  <vwc-card elevation="2" text="medium"></vwc-card>
  <vwc-card elevation="2" text="medium"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-spacing="large">
  <vwc-card elevation="2" text="large"></vwc-card>
  <vwc-card elevation="2" text="large"></vwc-card>
  <vwc-card elevation="2" text="large"></vwc-card>
</vwc-layout>
```

### Column Basis

Use the `column-basis` attribute to set the initial preferred `measure` of a column.
Use `block` to stack elements one above the other.

- Type: `'small'` | `'medium'` | `'large'` | `'block'`
- Default: `'medium'`

```html preview full
<vwc-layout gutters="small" column-basis="small">
  <vwc-card elevation="2" text="small"></vwc-card>
  <vwc-card elevation="2" text="small"></vwc-card>
  <vwc-card elevation="2" text="small"></vwc-card>
  <vwc-card elevation="2" text="small"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-basis="medium">
  <vwc-card elevation="2" text="medium"></vwc-card>
  <vwc-card elevation="2" text="medium"></vwc-card>
  <vwc-card elevation="2" text="medium"></vwc-card>
  <vwc-card elevation="2" text="medium"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-basis="large">
  <vwc-card elevation="2" text="large"></vwc-card>
  <vwc-card elevation="2" text="large"></vwc-card>
  <vwc-card elevation="2" text="large"></vwc-card>
  <vwc-card elevation="2" text="large"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-basis="block">
  <vwc-card elevation="2" text="block"></vwc-card>
  <vwc-card elevation="2" text="block"></vwc-card>
  <vwc-card elevation="2" text="block"></vwc-card>
  <vwc-card elevation="2" text="block"></vwc-card>
</vwc-layout>
```


### Auto Sizing

Use the `auto-sizing` attribute to set the initial preferred `auto-sizing`.

When the [repeat()](#css-custom-properties) function is set to `fit` or `fill`, the grid container creates as many grid tracks (columns/rows) as possible without overflowing the container.

With `fit`, when there are not enough grid items to fill the number of tracks created, those empty tracks are collapsed.

With `fill`, everything is the same as `fit`, except empty tracks are not collapsed.

- Type: `'fit'` | `'fill'`
- Default: `'fit'`

```html preview full
<vwc-layout auto-sizing="fit">
  <vwc-card elevation="2" text="fit"></vwc-card>
  <vwc-card elevation="2" text="fit"></vwc-card>
</vwc-layout>
<vwc-layout auto-sizing="fill">
  <vwc-card elevation="2" text="fill"></vwc-card>
  <vwc-card elevation="2" text="fill"></vwc-card>
</vwc-layout>
```

### Gutters

Use the `gutters` attribute to set the initial preferred `margin`.

- Type: `'small'` | `'small-inline'` | `'small-block'` | `'medium'` | `'medium-inline'` | `'medium-block'` | `'large'` | `'large-inline'` | `'large-block'`

- Default: `none`

```html preview full
<vwc-layout>
  <vwc-card elevation="2" text="none"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="small">
  <vwc-card elevation="2" text="small"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="medium">
  <vwc-card elevation="2" text="medium"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="large">
  <vwc-card elevation="2" text="large"></vwc-card>
</vwc-layout>
```

```html preview full
<vwc-layout gutters="small-inline">
  <vwc-card elevation="2" text="small-inline"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="medium-inline">
  <vwc-card elevation="2" text="medium-inline"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="large-inline">
  <vwc-card elevation="2" text="large-inline"></vwc-card>
</vwc-layout>
```

```html preview full
<vwc-layout gutters="small-block">
  <vwc-card elevation="2" text="small-block"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="medium-block">
  <vwc-card elevation="2" text="medium-block"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="large-block">
  <vwc-card elevation="2" text="large-block"></vwc-card>
</vwc-layout>
```

## CSS Variables

### Grid-template-columns

Control the grid-template-columns of the layout by setting `--layout-grid-template-columns`.

- Type: `repeat(auto-sizing, minmax(column-basis, 1fr))`
- Default: `auto`

```html preview full
<vwc-layout style="--layout-grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));">
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
</vwc-layout>
<vwc-layout style="--layout-grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));">
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
</vwc-layout>
<vwc-layout style="--layout-grid-template-columns: 280px repeat(auto-fill, minmax(100px, 1fr));">
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
  <vwc-card elevation="2"></vwc-card>
</vwc-layout>
```
