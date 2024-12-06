## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/tooltip';
```

or, if you need to use a unique prefix:

```js
import { registerTooltip } from '@vonage/vivid';

registerTooltip('your-prefix');
```

```html preview
<script type="module">
	import { registerTooltip, registerButton } from '@vonage/vivid';
	registerTooltip('your-prefix');
	registerButton('your-prefix');
</script>

<your-prefix-tooltip text="I'm a tooltip" placement="right">
	<your-prefix-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></your-prefix-button>
</your-prefix-tooltip>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VTooltip, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VTooltip text="I'm a tooltip">
		<VButton slot="anchor" appearance="filled" shape="pill" icon="help-line" />
	</VTooltip>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

### Anchor

It's best to use the [`anchor` slot](#anchor-slot) to set the anchor, but you can also use the `anchor` attribute. Either set it to the `id` of the anchor element or pass the anchor element itself.

```html preview center 150px
<div class="wrapper">
	<vwc-button id="button" icon="help-line" appearance="filled" shape="pill"></vwc-button>
	<vwc-tooltip anchor="button" text="I'm a tooltip"></vwc-tooltip>

	<vwc-button id="button2" icon="help-line" appearance="filled" shape="pill"></vwc-button>
	<vwc-tooltip id="tooltip2" text="My anchor is an HTMLElement"></vwc-tooltip>
</div>

<script>
	document.querySelector('#tooltip2').anchor =
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

### Anchor Slot

Tooltips need to be anchored to an element. Place the anchor element inside the `anchor` slot of the tooltip.

<vwc-note connotation="warning" icon="warning-line">

Do not use a non-interactive element (`div`, `p`, etc.) as an anchor, as the Tooltip will not be accessible to keyboard or screen reader users.

</vwc-note>

```html preview center 150px
<vwc-tooltip text="I'm a tooltip">
	<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
</vwc-tooltip>
```

## CSS Variables

### Max Inline Size

The `--tooltip-max-inline-size` variable sets the Tooltip's max inline size.

- Default: `30ch`

```html preview center 300px
<vwc-tooltip
	text="Turn on to receive notifications for important updates and alerts directly to your email or mobile device."
	class="tooltip"
>
	<vwc-button slot="anchor" icon="info-line" shape="pill" appearance="filled"></vwc-button>
</vwc-tooltip>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name | Type | Description |
| --- | --- | --- |
| **anchor** | `string` or `HTMLElement` | ID of, or HTML elemnent itself, to anchor the Tooltip to. Prefer using the `anchor` slot |
| **placement** | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | Prefered placement of the Tooltip in relation to the anchor element |
| **text** | `string` | Text content of the Tooltip |

</div>

### Slots

<div class="table-wrapper">

| Name     | Description                   |
| -------- | ----------------------------- |
| **anchor** | For the anchor element. |

</div>
