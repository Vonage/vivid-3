## Text

The `text` attribute sets the text content of the Tooltip.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>The Tooltip itself never receives focus and is not in the tabbing order, so a tooltip can not contain interactive elements like links, inputs, or buttons.</p>
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

## Placement

The `placement` attribute sets the default placement of the Tooltip around its anchor element.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>The Tooltip will attempt to position itself where the <code>placement</code> attribute dictates (or the default of <code>bottom</code> if not set). If it is unable to do so, because of lack of available space on the screen, it will reposition itself to the most appropriate alternative placement.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 400px
<script setup lang="ts">
import { VButton, VIcon, VTooltip } from '@vonage/vivid-vue';
</script>

<template>
	<div class="grid">
		<VTooltip text="top-start" placement="top-start" class="grid-col-2">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Top start alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="top" placement="top">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Top alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="top-end" placement="top-end">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Top end alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="left-start" placement="left-start" class="grid-col-1">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Left start alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="right-start" placement="right-start" class="grid-col-5">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Right start alignment">
					<template #icon><VIcon name="help-line" /></template> </VButton
			></template>
		</VTooltip>
		<VTooltip text="left" placement="left" class="grid-col-1">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Left alignment">
					<template #icon><VIcon name="help-line" /></template> </VButton
			></template>
		</VTooltip>
		<VTooltip text="right" placement="right" class="grid-col-5">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Right alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="left-end" placement="left-end" class="grid-col-1">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Left end alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="right-end" placement="right-end" class="grid-col-5">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Right end alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="bottom-start" placement="bottom-start" class="grid-col-2">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Bottom start alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="bottom" placement="bottom">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Bottom alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
		<VTooltip text="bottom-end" placement="bottom-end">
			<template #anchor>
				<VButton shape="pill" appearance="filled" aria-label="Bottom end alignment">
					<template #icon><VIcon name="help-line" /></template>
				</VButton>
			</template>
		</VTooltip>
	</div>
</template>

<style>
.grid {
	display: grid;
	grid-template-columns: repeat(5, auto);
	grid-template-rows: repeat(5, 40px);
	gap: 4px;
}
.grid-col-1 {
	grid-column: 1;
}
.grid-col-2 {
	grid-column: 2;
}
.grid-col-5 {
	grid-column: 5;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 400px
<div class="grid">
	<vwc-tooltip text="top-start" placement="top-start" class="grid-col-2">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Top start alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top" placement="top">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Top alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top-end" placement="top-end">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Top end alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="left-start" placement="left-start" class="grid-col-1">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Left start alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="right-start" placement="right-start" class="grid-col-5">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Right start alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="left" placement="left" class="grid-col-1">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Left alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="right" placement="right" class="grid-col-5">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Right alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="left-end" placement="left-end" class="grid-col-1">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Left end alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="right-end" placement="right-end" class="grid-col-5">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Right end alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom-start" placement="bottom-start" class="grid-col-2">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Bottom start alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom" placement="bottom">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Bottom alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom-end" placement="bottom-end">
		<vwc-button slot="anchor" shape="pill" appearance="filled" aria-label="Bottom end alignment">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, auto);
		grid-template-rows: repeat(5, 40px);
		gap: 4px;
	}
	.grid-col-1 {
		grid-column: 1;
	}
	.grid-col-2 {
		grid-column: 2;
	}
	.grid-col-5 {
		grid-column: 5;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
