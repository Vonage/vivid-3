## Labelling

### Label

The `label` attribute adds the label text for the default action.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<VSplitButton label="A default split button" appearance="filled" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-split-button label="A default split button" appearance="filled"></vwc-split-button>
```

</vwc-tab-panel>
</vwc-tabs>

### Secondary Action Label

By default, the secondard action is given a locallized `aria-label` of "Show more actions", this can be overriden using the `indicator-aria-label` attribute. This will be read by screen-readers to clarify the purpose of the action.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<VSplitButton indicator-aria-label="Secondary action" label="A default split button" appearance="filled" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-split-button indicator-aria-label="Secondary action" label="A default split button" appearance="filled"></vwc-split-button>
```

</vwc-tab-panel>
</vwc-tabs>

## Icons

### Default Action Icon

Icons can be provided using the [icon slot](/components/button/code/#icon-slot) or
the `icon`_(deprecated)_ attribute([icon library](/icons/icons-gallery/)) to display an icon for the default action.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VSplitButton appearance="filled" aria-label="Send Message" indicator-aria-label="More actions">
		<template #icon>
			<VIcon name="compose-line" />
		</template>
	</VSplitButton>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-split-button appearance="filled" aria-label="Send Message" indicator-aria-label="More actions">
	<vwc-icon slot="icon" name="compose-line"></vwc-icon>
</vwc-split-button>
```

</vwc-tab-panel>
</vwc-tabs>

### Split Indicator Icon

The `split-indicator` attribute to sets the icon for the secondary action button.
View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<VSplitButton split-indicator="more-vertical-solid" indicator-aria-label="More actions" appearance="filled" label="Split Indicator" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-split-button split-indicator="more-vertical-solid" indicator-aria-label="More actions" appearance="filled" label="Split Indicator"></vwc-split-button>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

The `appearance` sets the Split Button's appearance.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VSplitButton label="ghost" appearance="ghost" />
		<VSplitButton label="filled" appearance="filled" />
		<VSplitButton label="outlined" appearance="outlined" />
		<VSplitButton label="outlined-light" appearance="outlined-light" />
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-split-button label="ghost" appearance="ghost"></vwc-split-button>
	<vwc-split-button label="filled" appearance="filled"></vwc-split-button>
	<vwc-split-button label="outlined" appearance="outlined"></vwc-split-button>
	<vwc-split-button label="outlined-light" appearance="outlined-light"></vwc-split-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute sets the Split Button's connotation.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VSplitButton appearance="filled" label="accent" connotation="accent" />
		<VSplitButton appearance="filled" label="cta" connotation="cta" />
		<VSplitButton appearance="filled" label="announcement" connotation="announcement" />
		<VSplitButton appearance="filled" label="success" connotation="success" />
		<VSplitButton appearance="filled" label="alert" connotation="alert" />
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-split-button appearance="filled" label="accent" connotation="accent"></vwc-split-button>
	<vwc-split-button appearance="filled" label="cta" connotation="cta"></vwc-split-button>
	<vwc-split-button appearance="filled" label="announcement" connotation="announcement"></vwc-split-button>
	<vwc-split-button appearance="filled" label="success" connotation="success"></vwc-split-button>
	<vwc-split-button appearance="filled" label="alert" connotation="alert"></vwc-split-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

The `shape` attribute sets the style of the Split Button's edges.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VSplitButton appearance="filled" label="rounded" shape="rounded" />
		<VSplitButton appearance="filled" label="pill" shape="pill" />
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-split-button appearance="filled" label="rounded" shape="rounded"></vwc-split-button>
	<vwc-split-button appearance="filled" label="pill" shape="pill"></vwc-split-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

The `size` attribute sets the Split Button to one of the predefined block sizes.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VSplitButton appearance="filled" label="super-condensed" size="super-condensed" />
		<VSplitButton appearance="filled" label="condensed" size="condensed" />
		<VSplitButton appearance="filled" label="normal" size="normal" />
		<VSplitButton appearance="filled" label="expanded" size="expanded" />
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-split-button appearance="filled" label="super-condensed" size="super-condensed"></vwc-split-button>
	<vwc-split-button appearance="filled" label="condensed" size="condensed"></vwc-split-button>
	<vwc-split-button appearance="filled" label="normal" size="normal"></vwc-split-button>
	<vwc-split-button appearance="filled" label="expanded" size="expanded"></vwc-split-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute sets the disabled state of the Split Button.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSplitButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VSplitButton appearance="ghost" label="ghost" disabled />
		<VSplitButton appearance="filled" label="filled" disabled />
		<VSplitButton appearance="outlined" label="outlined" disabled />
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-split-button appearance="ghost" label="ghost" disabled></vwc-split-button>
	<vwc-split-button appearance="filled" label="filled" disabled></vwc-split-button>
	<vwc-split-button appearance="outlined" label="outlined" disabled></vwc-split-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
