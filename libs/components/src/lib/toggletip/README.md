## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerToggletip } from '@vonage/vivid';

registerToggletip('your-prefix');
```

```html preview
<script type="module">
	import {
		registerToggletip,
		registerButton,
		registerIcon,
	} from '@vonage/vivid';
	registerToggletip('your-prefix');
	registerButton('your-prefix');
	registerIcon('your-prefix');
</script>

<your-prefix-toggletip placement="right">
	<your-prefix-button slot="anchor" shape="pill" appearance="filled">
		<your-prefix-icon slot="icon" name="help-line"></your-prefix-icon>
	</your-prefix-button>
	I'm a Toggletip
</your-prefix-toggletip>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VToggletip, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VToggletip>
		<VButton slot="anchor" appearance="filled" shape="pill" icon="help-line" />
		I'm a toggletip
	</VToggletip>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

The `open` attribute controls the open state of the Toggletip.

```html preview center 100px
<vwc-toggletip open>
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	I'm open by default
</vwc-toggletip>
```

## Anchor

It's best to use the [`anchor` slot](#anchor-slot) to set the anchor, but you can also use the `anchor` attribute. Either set it to the `id` of the anchor element or pass the anchor element itself.

```html preview center 150px
<div class="wrapper">
	<vwc-button id="button" appearance="filled" shape="pill">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	<vwc-toggletip anchor="button" placement="left"
		>I'm a Toggletip</vwc-toggletip
	>

	<vwc-button id="button2" appearance="filled" shape="pill">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	<vwc-toggletip id="toggletip2">My anchor is an HTMLElement</vwc-toggletip>
</div>

<script>
	document.querySelector('#toggletip2').anchor =
		document.querySelector('#button2').id;
</script>

<style>
	.wrapper {
		display: flex;
		gap: 16px;
	}
</style>
```

## Slots

### Default Slot

Use default slot to add content to the Toggletip.

### Anchor Slot

Toggletips need to be anchored to an element. Place the anchor element inside the `anchor` slot of the Toggletip.

<vwc-note connotation="warning">
<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The anchor element must be clickable and in most cases, will be a button displaying an information glyph as in the example below.

</vwc-note>

```html preview center 150px
<vwc-toggletip>
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	I'm a Toggletip
</vwc-toggletip>
```

### Action Items Slot

You can add action items elements (Buttons) using the `action-items` slot. They will be displayed right-aligned at the bottom of the Toggletip.

```html preview 150px
<vwc-toggletip open placement="right-start">
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	This is a Toggletip with action items
	<vwc-button
		appearance="outlined"
		label="Action"
		shape="pill"
		slot="action-items"
	></vwc-button>
	<vwc-button
		appearance="filled"
		label="Action"
		shape="pill"
		slot="action-items"
	></vwc-button>
</vwc-toggletip>
```

## CSS Variables

### Max Inline Size

The `--toggletip-max-inline-size` variable sets the toggletip's max inline size.

- Default: `30ch`

```html preview center 250px
<vwc-toggletip class="toggletip" placement="top">
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	Turn on to receive notifications for important updates and alerts directly to
	your email or mobile device.
</vwc-toggletip>

<style>
	.toggletip {
		--toggletip-max-inline-size: 50ch;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name          | Type                                                                                                                                         | Description                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **alternate** | `boolean`                                                                                                                                    | Inverted color scheme                                                                      |
| **anchor**    | `string` or `HTMLElement`                                                                                                                    | ID of, or HTML elemnent itself, to anchor the Toggletip to. Prefer using the `anchor` slot |
| **headline**  | `string`                                                                                                                                     | Headline text for the Toggletip                                                            |
| **open**      | `boolean`                                                                                                                                    | Sets the open state of the Toggletip                                                       |
| **placement** | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | Prefered placement of the toggletip in relation to the anchor element                      |

</div>

### Slots

<div class="table-wrapper">

| Name             | Description                               |
| ---------------- | ----------------------------------------- |
| **default**      | For the default content of the Toggletip. |
| **anchor**       | For the anchor element.                   |
| **action-items** | For action buttons inside the Toggletip   |

</div>
