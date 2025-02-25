## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/layout';
```

or, if you need to use a unique prefix:

```js
import { registerLayout } from '@vonage/vivid';

registerLayout('your-prefix');
```

```html preview full
<script type="module">
	import { registerLayout, registerCard } from '@vonage/vivid';
	registerLayout('your-prefix');
	registerCard('your-prefix');
</script>

<your-prefix-layout gutters="small">
	<your-prefix-card
		headline="Lorem ipsum"
		text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<img
			slot="media"
			src="https://picsum.photos/id/1015/300/200"
			alt="landscape"
			style="width: 100%; height: 150px; object-fit: cover;"
		/>
	</your-prefix-card>
	<your-prefix-card
		headline="Lorem ipsum"
		text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<img
			slot="media"
			src="https://picsum.photos/id/1016/300/200"
			alt="landscape"
			style="width: 100%; height: 150px; object-fit: cover;"
		/>
	</your-prefix-card>
	<your-prefix-card
		headline="Lorem ipsum"
		text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<img
			slot="media"
			src="https://picsum.photos/id/1018/300/200"
			alt="landscape"
			style="width: 100%; height: 150px; object-fit: cover;"
		/>
	</your-prefix-card>
	<your-prefix-card
		headline="Lorem ipsum"
		text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<img
			slot="media"
			src="https://picsum.photos/id/1019/300/200"
			alt="landscape"
			style="width: 100%; height: 150px; object-fit: cover;"
		/>
	</your-prefix-card>
	<your-prefix-card
		headline="Lorem ipsum"
		text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<img
			slot="media"
			src="https://picsum.photos/id/1055/300/200"
			alt="landscape"
			style="width: 100%; height: 150px; object-fit: cover;"
		/>
	</your-prefix-card>
	<your-prefix-card
		headline="Lorem ipsum"
		text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	>
		<img
			slot="media"
			src="https://picsum.photos/id/1050/300/200"
			alt="landscape"
			style="width: 100%; height: 150px; object-fit: cover;"
		/>
	</your-prefix-card>
</your-prefix-layout>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VLayout, VCard } from '@vonage/vivid-vue';
</script>
<template>
	<VLayout>
		<VCard
			headline="Lorem ipsum"
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
		<VCard
			headline="Lorem ipsum"
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
		<VCard
			headline="Lorem ipsum"
			text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		/>
	</VLayout>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Grid-template-columns

Use custom [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) by setting `--layout-grid-template-columns`.

This will override the `auto-sizing` and `column-basis` attributes. The default value is `repeat(<auto-sizing>, minmax(<column-basis>, 1fr))`.

```html preview full
<vwc-layout style="--layout-grid-template-columns: 1fr 1fr;" gutters="small">
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
</vwc-layout>
```

### Grid-template-rows

Control the [grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows) of the layout by setting `--layout-grid-template-rows`. The default value is `min-content`.

```html preview full
<vwc-layout
	style="--layout-grid-template-rows: 80px 40px auto;"
	gutters="small"
>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
</vwc-layout>
```

### Grid-gap

#### Layout-column-gap

Use a custom [column-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) by setting `--layout-column-gap`.

This will override the `column-spacing` attribute.

#### Layout-row-gap

Use a custom [row-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) by setting `--layout-row-gap`.

This will override the `row-spacing` attribute.

```html preview full
<vwc-layout
	style="--layout-column-gap: 0; --layout-row-gap: 0;"
	gutters="small"
>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
	<vwc-card elevation="2"></vwc-card>
</vwc-layout>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name               | Type                                                                                                                                        | Description                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **auto-sizing**    | `fit` (default), `fill`                                                                                                                     | Controls how the grid's behaves with empty column tracks |
| **column-basis**   | `small`, `medium` (default), `large`, `block`                                                                                               | Controls the `min-width` of columns                      |
| **column-spacing** | `small`, `medium` (default), `large`                                                                                                        | Controls the size of the spacing between columns         |
| **gutters**        | `none` (default), `small`, `medium`, `large`, `small-inline`, `medium-inline`, `large-inline`, `small-block`, `medium-block`, `large-block` | Controls the amount of margin around the component       |

</div>
