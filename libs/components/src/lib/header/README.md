## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/header';
```

or, if you need to use a unique prefix:

```js
import { registerHeader } from '@vonage/vivid';

registerHeader('your-prefix');
```

```html preview full
<script type="module">
	import { registerHeader } from '@vonage/vivid';
	registerHeader('your-prefix');
</script>

<your-prefix-header>Header content</your-prefix-header>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VHeader } from '@vonage/vivid-vue';
</script>
<template>
	<VHeader> You do not have any numbers yet. </VHeader>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

The default slot sets assigned nodes to the start of the Header.

```html preview full
<vwc-header>Header content</vwc-header>
```

### Action Items Slot

Nodes assigned to `action-items` slot will be set at the end of the Header.

```html preview full
<vwc-header>
	<vwc-button slot="action-items" icon="twitter-mono"></vwc-button>
	<vwc-button slot="action-items" icon="facebook-mono"></vwc-button>
	<vwc-button slot="action-items" icon="heart-solid"></vwc-button>
</vwc-header>
```

### App Content Slot

It is also possible to assign application content directly to the Header's `app-content` slot, which will allow content to follow, vertically.

```html preview full
<vwc-header>
	Header content
	<main slot="app-content">
		<vwc-layout gutters="small">Application content</vwc-layout>
	</main>
</vwc-header>
```

## CSS Variables

### Block Size

The Header has a fixed height (`64px` default). It cannot be modified, but is available as the `--vvd-header-block-size` CSS variable to slotted content.

```html preview full
<style>
	vwc-header::part(base) {
		position: fixed;
		top: 0;
	}

	main {
		padding-block-start: var(--vvd-header-block-size);
	}
</style>

<vwc-header>
	Header content

	<main slot="app-content">
		<vwc-layout column-basis="block" gutters="medium">
			Application content
		</vwc-layout>
	</main>
</vwc-header>
```

### Header background-color

Use `--header-bg-color` to set a custom background color for the header.

```html preview full
<style>
	vwc-header {
		--header-bg-color: var(--vvd-color-neutral-200);
	}
</style>

<vwc-header>Header content</vwc-header>
```

## CSS Parts

### Base

The component's internal _header_ element.

```html preview full 350px
<style>
	vwc-header::part(base) {
		position: fixed;
		top: 0;
		z-index: 2;
	}
	main {
		padding-block-start: var(--vvd-header-block-size);
	}
</style>
<vwc-header alternate>
	Header content
	<main slot="app-content">
		<vwc-layout gutters="small" column-basis="block">
			<h2>Scroll this window</h2>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante
				est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat,
				gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
				Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor
				sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel
				ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut
				ligula faucibus ante pellentesque condimentum sit amet ac dui.
				Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id
				tortor at ornare.
			</p>

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante
				est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat,
				gravida sed velit id, tempus tempus metus. Proin mollis auctor orci.
				Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor
				sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel
				ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut
				ligula faucibus ante pellentesque condimentum sit amet ac dui.
				Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id
				tortor at ornare.
			</p>
		</vwc-layout>
	</main>
</vwc-header>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type      | Description                                |
| -------------------- | --------- | ------------------------------------------ |
| **alternate**        | `boolean` | Applies an alternate inverted color scheme |
| **elevation-shadow** | `boolean` | Applies a shadow to the header             |

</div>

### Slots

<div class="table-wrapper">

| Name             | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| **action-items** | Add adding action items to the end of the header            |
| **app-content**  | Add application content to apply consistant vertical rhythm |
| **default**      | Main content for the header, typically a heading            |

</div>
