## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTooltip, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VTooltip text="I'm a tooltip" placement="right">
		<template #anchor>
			<VButton appearance="filled" shape="pill" icon="help-line" aria-label="More information" />
		</template>
	</VTooltip>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTooltip } from '@vonage/vivid';

registerTooltip('your-prefix');
```

```html preview
<script type="module">
	import { registerTooltip, registerButton, registerIcon } from '@vonage/vivid';
	registerTooltip('your-prefix');
	registerButton('your-prefix');
	registerIcon('your-prefix');
</script>

<your-prefix-tooltip text="I'm a tooltip" placement="right">
	<your-prefix-button slot="anchor" shape="pill" appearance="filled" aria-label="More information">
		<your-prefix-icon slot="icon" name="help-line"></your-prefix-icon>
	</your-prefix-button>
</your-prefix-tooltip>
```

</vwc-tab-panel>
</vwc-tabs>

## Anchor

It's best to use the [`anchor` slot](#anchor-slot) to set the anchor, but you can also use the `anchor` attribute. Either set it to the `id` of the anchor element or pass the anchor element itself.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 150px
<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { VButton, VIcon, VTooltip } from '@vonage/vivid-vue';

const secondTooltip = useTemplateRef<InstanceType<typeof VTooltip>>('tooltip2');
const secondButton = useTemplateRef<InstanceType<typeof VButton>>('button2');

onMounted(() => {
	if (secondTooltip.value?.element) {
		secondTooltip.value.element.anchor = secondButton.value?.element;
	}
});
</script>

<template>
	<div class="wrapper">
		<VButton id="button" appearance="filled" shape="pill" aria-label="More information">
			<template #icon><VIcon name="help-line" /></template>
		</VButton>
		<VTooltip anchor="button" placement="left" text="My anchor is ID" />
		<VButton ref="button2" appearance="filled" shape="pill" aria-label="More information">
			<template #icon><VIcon name="help-line" /></template>
		</VButton>
		<VTooltip ref="tooltip2" placement="right" text="My anchor is an HTMLElement" />
	</div>
</template>

<style>
.wrapper {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 150px
<div class="wrapper">
	<vwc-button id="button" appearance="filled" shape="pill" aria-label="More information">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	<vwc-tooltip anchor="button" placement="left" text="My anchor is ID"></vwc-tooltip>
	<vwc-button id="button2" appearance="filled" shape="pill" aria-label="More information">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	<vwc-tooltip id="tooltip2" placement="right" text="My anchor is an HTMLElement"></vwc-tooltip>
</div>

<script>
	document.querySelector('#tooltip2').anchor = document.querySelector('#button2').id;
</script>

<style>
	.wrapper {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Anchor Slot

Tooltips need to be anchored to an element. Place the anchor element inside the `anchor` slot of the tooltip.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

Do not use a non-interactive element (`div`, `p`, etc.) as an anchor, as the Tooltip will not be accessible to keyboard or screen reader users.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 150px
<script setup lang="ts">
import { VButton, VIcon, VTooltip } from '@vonage/vivid-vue';
</script>

<template>
	<VTooltip text="I'm a tooltip">
		<template #anchor>
			<VButton shape="pill" appearance="filled" aria-label="More information">
				<template #icon><VIcon name="help-line" /></template>
			</VButton>
		</template>
	</VTooltip>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 150px
<vwc-tooltip text="I'm a tooltip">
	<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="More information">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
</vwc-tooltip>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Max Inline Size

The `--tooltip-max-inline-size` variable sets the Tooltip's max inline size.

- Default: `30ch`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 300px
<script setup lang="ts">
import { VButton, VIcon, VTooltip } from '@vonage/vivid-vue';
</script>

<template>
	<VTooltip text="Turn on to receive notifications for important updates and alerts directly to your email or mobile device." class="tooltip">
		<template #anchor>
			<VButton shape="pill" appearance="filled" aria-label="More information">
				<template #icon><VIcon name="info-line" /></template>
			</VButton>
		</template>
	</VTooltip>
</template>

<style>
.tooltip {
	--tooltip-max-inline-size: 50ch;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 300px
<vwc-tooltip text="Turn on to receive notifications for important updates and alerts directly to your email or mobile device." class="tooltip">
	<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="More information">
		<vwc-icon slot="icon" name="info-line"></vwc-icon>
	</vwc-button>
</vwc-tooltip>

<style>
	.tooltip {
		--tooltip-max-inline-size: 50ch;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name          | Type                                                                                                                                         | Description                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **anchor**    | `string` or `HTMLElement`                                                                                                                    | ID of, or HTML elemnent itself, to anchor the Tooltip to. Prefer using the `anchor` slot |
| **placement** | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | Prefered placement of the Tooltip in relation to the anchor element                      |
| **text**      | `string`                                                                                                                                     | Text content of the Tooltip                                                              |

</div>

### Slots

<div class="table-wrapper">

| Name       | Description             |
| ---------- | ----------------------- |
| **anchor** | For the anchor element. |

</div>
