## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerToggletip } from '@vonage/vivid';

registerToggletip('your-prefix');
```

```html preview
<script type="module">
	import { registerToggletip, registerButton, registerIcon } from '@vonage/vivid';
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
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VToggletip, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VToggletip>
		<template #anchor><VButton appearance="filled" shape="pill" icon="help-line" /></template>
		I'm a toggletip
	</VToggletip>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

The `open` attribute controls the open state of the Toggletip.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 100px
<script setup lang="ts">
import { VButton, VIcon, VToggletip } from '@vonage/vivid-vue';
</script>

<template>
	<VToggletip open>
		<template #anchor>
			<VButton shape="pill" appearance="filled">
				<template #icon><VIcon name="help-line" /></template>
			</VButton>
		</template>
		I'm open by default
	</VToggletip>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 100px
<vwc-toggletip open>
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	I'm open by default
</vwc-toggletip>
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
import { VButton, VIcon, VToggletip } from '@vonage/vivid-vue';

const firstToggletip = useTemplateRef<InstanceType<typeof VToggletip>>('toggletip1');
const secondToggletip = useTemplateRef<InstanceType<typeof VToggletip>>('toggletip2');
const secondButton = useTemplateRef<InstanceType<typeof VButton>>('button2');

onMounted(() => {
	if (firstToggletip.value?.element) {
		firstToggletip.value.element.anchor = 'button';
	}
	if (secondToggletip.value?.element) {
		secondToggletip.value.element.anchor = secondButton.value?.element;
	}
});
</script>

<template>
	<div class="wrapper">
		<VButton id="button" appearance="filled" shape="pill">
			<template #icon><VIcon name="help-line" /></template>
		</VButton>
		<VToggletip ref="toggletip1" placement="left">My anchor is ID</VToggletip>
		<VButton ref="button2" appearance="filled" shape="pill">
			<template #icon><VIcon name="help-line" /></template>
		</VButton>
		<VToggletip ref="toggletip2">My anchor is an HTMLElement</VToggletip>
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
	<vwc-button id="button" appearance="filled" shape="pill">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	<vwc-toggletip anchor="button" placement="left">My anchor is ID</vwc-toggletip>

	<vwc-button id="button2" appearance="filled" shape="pill">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	<vwc-toggletip id="toggletip2">My anchor is an HTMLElement</vwc-toggletip>
</div>

<script>
	document.querySelector('#toggletip2').anchor = document.querySelector('#button2').id;
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

### Default Slot

Use default slot to add content to the Toggletip.

### Anchor Slot

Toggletips need to be anchored to an element. Place the anchor element inside the `anchor` slot of the Toggletip.

<vwc-note connotation="warning">
<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The anchor element must be clickable and in most cases, will be a button displaying an information glyph as in the example below.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 150px
<script setup lang="ts">
import { VButton, VIcon, VToggletip } from '@vonage/vivid-vue';
</script>

<template>
	<VToggletip>
		<template #anchor>
			<VButton shape="pill" appearance="filled">
				<template #icon><VIcon name="help-line" /></template>
			</VButton>
		</template>
		I'm a Toggletip
	</VToggletip>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 150px
<vwc-toggletip>
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	I'm a Toggletip
</vwc-toggletip>
```

</vwc-tab-panel>
</vwc-tabs>

### Action Items Slot

You can add action items elements (Buttons) using the `action-items` slot. They will be displayed right-aligned at the bottom of the Toggletip.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VButton, VIcon, VToggletip } from '@vonage/vivid-vue';
</script>

<template>
	<VToggletip open placement="right-start">
		<template #anchor>
			<VButton shape="pill" appearance="filled">
				<template #icon><VIcon name="help-line" /></template>
			</VButton>
		</template>
		This is a Toggletip with action items
		<template #action-items><VButton appearance="outlined" label="Action" shape="pill" /><VButton appearance="filled" label="Action" shape="pill" /></template>
	</VToggletip>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-toggletip open placement="right-start">
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	This is a Toggletip with action items
	<vwc-button appearance="outlined" label="Action" shape="pill" slot="action-items"></vwc-button>
	<vwc-button appearance="filled" label="Action" shape="pill" slot="action-items"></vwc-button>
</vwc-toggletip>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Max Inline Size

The `--toggletip-max-inline-size` variable sets the toggletip's max inline size.

- Default: `30ch`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 250px
<script setup lang="ts">
import { VButton, VIcon, VToggletip } from '@vonage/vivid-vue';
</script>

<template>
	<VToggletip class="toggletip" placement="top">
		<template #anchor>
			<VButton shape="pill" appearance="filled">
				<template #icon><VIcon name="help-line" /></template>
			</VButton>
		</template>
		Turn on to receive notifications for important updates and alerts directly to your email or mobile device.
	</VToggletip>
</template>

<style>
.toggletip {
	--toggletip-max-inline-size: 50ch;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 250px
<vwc-toggletip class="toggletip" placement="top">
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
	Turn on to receive notifications for important updates and alerts directly to your email or mobile device.
</vwc-toggletip>

<style>
	.toggletip {
		--toggletip-max-inline-size: 50ch;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

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
