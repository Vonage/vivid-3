## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
```

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover aria-label="My Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	</VPopover>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerPopover } from '@vonage/vivid';
import { registerButton } from '@vonage/vivid';

registerPopover('your-prefix');
registerButton('your-prefix');
```

```html preview center 240px
<script type="module">
	import { registerPopover } from '@vonage/vivid';
	import { registerButton } from '@vonage/vivid';

	registerPopover('your-prefix');
	registerButton('your-prefix');
</script>

<your-prefix-popover aria-label="My Popover">
	<your-prefix-button slot="anchor" label="Open popover" appearance="filled" icon="open-solid" icon-trailing></your-prefix-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</your-prefix-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Anchor

<vwc-note connotation="information" headline="Prefer using the anchot slot">
	<vwc-icon slot="icon" name="info-solid" label="Note:"></vwc-icon>

It is recommended use the [`anchor` slot](#anchor-slot) to set the anchor.

</vwc-note>

The `anchor` attribute can be used to pass the anchor element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';

const button = useTemplateRef<InstanceType<typeof VButton>>('button');
const popover = useTemplateRef<InstanceType<typeof VPopover>>('popover');
onMounted(() => {
	if (popover.value && button.value) {
		popover.value.element.anchor = button.value.element;
	}
});
</script>

<template>
	<div>
		<VButton ref="button" label="Open popover" appearance="filled" icon-trailing>
			<template #icon><VIcon name="open-solid" /></template>
		</VButton>
		<VPopover ref="popover" aria-label="My Popover">
			<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
		</VPopover>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-button id="button" label="Open popover" appearance="filled" icon-trailing>
	<vwc-icon slot="icon" name="open-solid"></vwc-icon>
</vwc-button>
<vwc-popover id="popover" aria-label="My Popover">
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>

<script>
	const button = document.getElementById('button');
	const popover = document.getElementById('popover');

	popover.anchor = button;
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

The `open` attribute controls the open state of the Popover.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover open aria-label="My Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>I'm opened by default, that's really cool!</div>
	</VPopover>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-popover open aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>I'm opened by default, that's really cool!</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Manual

The `manual` attribute sets the Popover to [manual mode](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#using_manual_popover_state), disabling light-dismiss (clicking outside) and displaying a close button.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover manual aria-label="My Popover" dismiss-button-aria-label="Close the Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	</VPopover>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-popover manual aria-label="My Popover" dismiss-button-aria-label="Close the Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Anchor Slot

Place the anchor element inside the anchor slot of the Popover.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover aria-label="My Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	</VPopover>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-popover aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

### Default Slot

Use default slot to add rich content to the Popover.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover aria-label="My Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	</VPopover>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-popover aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

### Footer Slot

Use footer slot to add extra content to the bottom of the Popover.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 210px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover aria-label="My Popover" placement="bottom-start">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
		<template #footer>
			<VButton label="Extra footer action" appearance="filled" connotation="cta">
				<template #icon><VIcon name="link-solid" /></template>
			</VButton>
		</template>
	</VPopover>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 210px
<vwc-popover aria-label="My Popover" placement="bottom-start">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	<vwc-button label="Extra footer action" appearance="filled" connotation="cta" slot="footer">
		<vwc-icon slot="icon" name="link-solid"></vwc-icon>
	</vwc-button>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Padding

Use the `--popover-padding` variable to set the padding around the Popover's content.

- Default: `24px`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover class="popover" aria-label="My Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>This popover has custom padding.</div>
	</VPopover>
</template>

<style>
.popover {
	--popover-padding: 6px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-popover aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>This popover has custom padding.</div>
</vwc-popover>

<style>
	vwc-popover {
		--popover-padding: 6px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Gap

Use the `--popover-gap` variable to set the size of the gap between Popover's content and footer.

- Default: `24px`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 210px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover class="popover" aria-label="My Popover" placement="bottom-start">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
		<template #footer>
			<VButton label="Extra footer action" appearance="filled" connotation="cta">
				<template #icon><VIcon name="link-solid" /></template>
			</VButton>
		</template>
	</VPopover>
</template>

<style>
.popover {
	--popover-gap: 12px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 210px
<vwc-popover aria-label="My Popover" placement="bottom-start">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	<vwc-button label="Extra footer action" appearance="filled" connotation="cta" slot="footer">
		<vwc-icon slot="icon" name="link-solid"></vwc-icon>
	</vwc-button>
</vwc-popover>

<style>
	vwc-popover {
		--popover-gap: 12px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Backdrop

Use the `--popover-backdrop-bg` variable to set the background color of the Popover's backdrop.

- Default: `transparent`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover class="popover" aria-label="My Popover">
		<template #anchor>
			<VButton label="Open popover" appearance="filled" icon-trailing>
				<template #icon><VIcon name="open-solid" /></template>
			</VButton>
		</template>
		<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
	</VPopover>
</template>

<style>
.popover {
	--popover-backdrop-bg: rgba(135, 30, 255, 0.25);
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 240px
<vwc-popover aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>

<style>
	vwc-popover {
		--popover-backdrop-bg: rgba(135, 30, 255, 0.25);
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                          | Type                                                                                                                                                   | Description                                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **alternate**                 | `boolean`                                                                                                                                              | Changes the Popover's color scheme to the opposite of the currently select one (e.g. from light to dark)                |
| **anchor**                    | `HTMLElement`                                                                                                                                          | Sets the Popover's anchor element. Prefer using the [`anchor` slot](/components/popover/code/#anchor-slot) if possible. |
| **arrow**                     | `boolean`                                                                                                                                              | Adds a small triangle to indicate the trigger element.                                                                  |
| **dismiss-button-aria-label** | `string`                                                                                                                                               | Overrides the default "Close" aria-label of Dismiss button when manual mode is enabled.                                 |
| **layout**                    | `default` (default), `condensed`                                                                                                                       | Can be used to enable a condensed layout with smaller paddings and gaps.                                                |
| **manual**                    | `boolean`                                                                                                                                              | Sets the Popover to manual mode, disabling light-dismiss (clicking outside) and displaying a close button.              |
| **open**                      | `boolean`                                                                                                                                              | Sets the open state of the Popover                                                                                      |
| **offset**                    | `number`, `null`                                                                                                                                       | Customizes the gap (in `px`) between the Popover and the trigger element.                                               |
| **placement**                 | `left-start`, `left`, `left-end`, `right-start`, `right`, `right-end`, `top-start`, `top`, `top-end`, `bottom-start`, `bottom` (default), `bottom-end` | Controls the position of the Popover, relative to its anchor element.                                                   |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                          |
| ----------- | ---------------------------------------------------- |
| **anchor**  | For the anchor element.                              |
| **default** | For the default content of the Popover.              |
| **footer**  | Add additional content to the bottom of the Popover. |

</div>

### Events

<div class="table-wrapper">

| Name      | Event Type               | Description                       |
| --------- | ------------------------ | --------------------------------- |
| **open**  | `CustomEvent<undefined>` | Fired when the Popover is opened. |
| **close** | `CustomEvent<undefined>` | Fired when the Popover is closed. |

</div>

### Methods

<div class="table-wrapper">

| Name               | Returns | Description                                                   |
| ------------------ | ------- | ------------------------------------------------------------- |
| **show**           | `void`  | Shows the Popover.                                            |
| **hide**           | `void`  | Hides the Popover.                                            |
| **toggle**         | `void`  | Toggles the Popover's visibility.                             |
| **updatePosition** | `void`  | Updates the Popover's position related to its anchor element. |

</div>
