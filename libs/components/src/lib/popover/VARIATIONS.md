## Placement

The `placement` attribute controls the position of the Popover relative to its anchor element. See the [API Reference](/components/popover/code/#api-reference) for all possible values.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	
	The Popover will attempt to position itself where the <code>placement</code> attribute dictates (or the default of <code>bottom</code> if not set). If it is unable to do so, because of lack of available space on the screen, it will flip the Popover to the opposite side.
		
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover placement="bottom-end" aria-label="My Popover">
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
<vwc-popover placement="bottom-end" aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Layout

The `layout` attribute allows you to enable a condensed layout with smaller paddings and gaps.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	
	If you need to set custom paddings and gaps, use [CSS variables](/components/popover/code/#css-variables).
		
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover layout="condensed" aria-label="My Popover">
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
<vwc-popover layout="condensed" aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Arrow

The `arrow` attribute adds a small triangle to indicate the trigger element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover arrow aria-label="My Popover">
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
<vwc-popover arrow aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Alternate

The `alternate` attribute changes the Popover's color scheme to the opposite of the currently select one (e.g. from light to dark).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover alternate aria-label="My Popover">
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
<vwc-popover alternate aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>

## Offset

Use the `offset` attribute to customize the gap (in `px`) between the Popover and the trigger element.

- Type: `number` | `null`
- Default: `8`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 240px
<script setup lang="ts">
import { VPopover, VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VPopover offset="12" aria-label="My Popover">
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
<vwc-popover offset="12" aria-label="My Popover">
	<vwc-button label="Open popover" appearance="filled" slot="anchor" icon-trailing>
		<vwc-icon slot="icon" name="open-solid"></vwc-icon>
	</vwc-button>
	<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
</vwc-popover>
```

</vwc-tab-panel>
</vwc-tabs>
