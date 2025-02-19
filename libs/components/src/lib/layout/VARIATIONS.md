## Column Spacing

Use the `column-spacing` attribute to choose a predefined value for the [column-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).

```html preview full
<vwc-layout gutters="small" column-spacing="small">
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-spacing="medium">
	<vwc-card elevation="2" text="medium - default (24px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (24px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (24px)"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-spacing="large">
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
</vwc-layout>
```

## Row Spacing

Use the `row-spacing` attribute to choose a predefined value for the [row-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap).

```html preview full
<vwc-layout gutters="small" row-spacing="small (16px)" column-basis="block">
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
</vwc-layout>
<vwc-layout
	gutters="small"
	row-spacing="medium - default (24px)"
	column-basis="block"
>
	<vwc-card elevation="2" text="medium - default (24px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (24px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (24px)"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" row-spacing="large" column-basis="block">
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
</vwc-layout>
```

## Column Basis

Use the `column-basis` attribute to control the `min-width` of columns.
Use `block` to get full-width elements stacking one after the other.

<vwc-note connotation="information">

- **In mobile** both <code>medium</code> and <code>large</code> will get a <code>min-width</code> of <code>100%</code> to avoid horizontal scrolling.
- To change the column-basis use the css variable [<code>--layout-grid-template-columns</code>](/components/layout/#grid-template-columns)

</vwc-note>

```html preview full
<vwc-layout gutters="small" column-basis="small">
	<vwc-card elevation="2" text="small (160px)"></vwc-card>
	<vwc-card elevation="2" text="small (160px)"></vwc-card>
	<vwc-card elevation="2" text="small (160px)"></vwc-card>
	<vwc-card elevation="2" text="small (160px)"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-basis="medium">
	<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
	<vwc-card elevation="2" text="medium - default (320px)"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-basis="large">
	<vwc-card elevation="2" text="large (380px)"></vwc-card>
	<vwc-card elevation="2" text="large (380px)"></vwc-card>
	<vwc-card elevation="2" text="large (380px)"></vwc-card>
	<vwc-card elevation="2" text="large (380px)"></vwc-card>
</vwc-layout>
<vwc-layout gutters="small" column-basis="block">
	<vwc-card elevation="2" text="block"></vwc-card>
	<vwc-card elevation="2" text="block"></vwc-card>
	<vwc-card elevation="2" text="block"></vwc-card>
	<vwc-card elevation="2" text="block"></vwc-card>
</vwc-layout>
```

## Auto Sizing

The `auto-sizing` attribute controls how the grid's behaves with empty column tracks.

The grid container creates as many column tracks as possible without overflowing the container.

With `fit`, when there are not enough grid items to fill the number of tracks created, those empty tracks are collapsed.

With `fill`, the empty tracks remain and take up space in the layout.

With `fill`, everything is the same as `fit`, except empty tracks are not collapsed.

```html preview full
<vwc-layout auto-sizing="fit" column-basis="small">
	<vwc-card elevation="2" text="fit"></vwc-card>
	<vwc-card elevation="2" text="fit"></vwc-card>
</vwc-layout>
<vwc-layout auto-sizing="fill" column-basis="small">
	<vwc-card elevation="2" text="fill"></vwc-card>
	<vwc-card elevation="2" text="fill"></vwc-card>
</vwc-layout>
```

## Gutters

Use the `gutters` attribute to add a margin to the component.

```html preview full
<vwc-layout>
	<vwc-card elevation="2" text="none"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="small">
	<vwc-card elevation="2" text="small (16px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="medium">
	<vwc-card elevation="2" text="medium (24px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="large">
	<vwc-card elevation="2" text="large (32px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="small-inline">
	<vwc-card elevation="2" text="small-inline (16px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="medium-inline">
	<vwc-card elevation="2" text="medium-inline (24px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="large-inline">
	<vwc-card elevation="2" text="large-inline (32px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="small-block">
	<vwc-card elevation="2" text="small-block (16px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="medium-block">
	<vwc-card elevation="2" text="medium-block (24px)"></vwc-card>
</vwc-layout>
<vwc-divider></vwc-divider>
<vwc-layout gutters="large-block">
	<vwc-card elevation="2" text="large-block (32px)"></vwc-card>
</vwc-layout>
```
