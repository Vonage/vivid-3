## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/card';
```

or, if you need to use a unique prefix:

```js
import { registerCard } from '@vonage/vivid';

registerCard('your-prefix');
```

```html preview
<script type="module">
	import { registerCard } from '@vonage/vivid';
	registerCard('your-prefix');
</script>

<your-prefix-card headline="I'm a card"></your-prefix-text-card>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VCard } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="I'm a card" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Graphic Slot

The graphic slot overrides the icon property.  
Use the slot if a colored icon is needed or an icon with different dimensions.

```html preview
<vwc-card
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
>
	<vwc-icon
		slot="graphic"
		name="android-mono"
		style="font-size: 44px; color: #A4C439"
	></vwc-icon>
</vwc-card>
```

### Media Slot

The media slot can be used to display images or video content above the card header.

```html preview
<vwc-card
	headline="Card with Media Slot"
	subtitle="Extra text below the card headline"
	class="card-media"
>
	<img
		slot="media"
		src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
		alt="Sitting on Floor"
		style="width: 100%; height: 150px; object-fit: cover;"
	/>
</vwc-card>

<style>
	.card-media {
		max-inline-size: 300px;
	}
</style>
```

### Meta Slot

The meta slot is for action content in the card header.

```html preview 220px
<vwc-card
	headline="Card with Meta Slot"
	subtitle="Extra text below the card headline"
>
	<div slot="meta">
		<vwc-menu aria-label="Card options" placement="bottom-start" trigger="auto">
			<vwc-button
				slot="anchor"
				icon="more-vertical-line"
				aria-label="Open menu"
				appearance="outlined"
			></vwc-button>
			<vwc-menu-item text="save card"></vwc-menu-item>
			<vwc-menu-item text="remove card"></vwc-menu-item>
		</vwc-menu>
	</div>
</vwc-card>
```

### Footer Slot

The footer slot is for content in the card footer.  
Use it for adding buttons or action items.  
By default - items inside footer slot are aligned to the end.

```html preview
<vwc-card
	headline="Card with Footer Slot"
	subtitle="Extra text below the card headline"
>
	<vwc-button
		slot="footer"
		icon="arrow-bold-right-line"
		shape="pill"
		label="Action"
		appearance="outlined"
	></vwc-button>
</vwc-card>
```

### Main Slot

Card has predefined content style template.  
Use the `main` slot to fully override a card's predefined template with your own. When using main - only appearance and elevation are applied on the card.

```html preview
<vwc-card>
	<vwc-layout gutters="small" slot="main">
		Assign custom template using "main" slot.
	</vwc-layout>
</vwc-card>
```

## CSS Variables

### Trim headline

The card headline can be trimmed to your preferable number of lines.
The number of lines is controlled by the css variable `--headline-line-clamp`.

```html preview
<vwc-card
	class="vwc-card"
	headline="Card with long headline that has trim into one line"
></vwc-card>

<style>
	.vwc-card {
		--headline-line-clamp: 1;
		max-inline-size: 42ch;
	}
</style>
```

### Trim subtitle

The card subtitle can be trimmed to your preferable number of lines.
The number of lines is controlled by css variable `--subtitle-line-clamp`.

```html preview
<vwc-card
	class="vwc-card"
	headline="Card with Trimmed Subtitle"
	subtitle="This subtitle is extremely long and will be trimmed after 2 lines. This way you can control the size of the card."
></vwc-card>

<style>
	.vwc-card {
		--subtitle-line-clamp: 2;
		max-inline-size: 42ch;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name           | Type                                      | Description                   |
| -------------- | ----------------------------------------- | ----------------------------- |
| **appearance** | `elevated` (default), `outlined`, `ghost` | Sets the element's appearance |
| **elevation**  | `2`, `4` (default), `8`, `12`, `16`, `24` | Sets the element's elevation  |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| **Graphic** | Add graphic element to card. Overrides the icon property     |
| **Media**   | Use to display images or video content above the card header |
| **Meta**    | Use for adding action content, of info in the card header    |
| **Footer**  | Content in the card footer.                                  |
| **Main**    | Override a card's predefined template                        |

</div>
