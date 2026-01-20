## Label

The `label` attribute controls Fab's label text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFab, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VFab label="Add to cart">
		<template #icon><VIcon name="cart-line" /></template>
	</VFab>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-fab label="Add to cart">
	<vwc-icon slot="icon" name="cart-line"></vwc-icon>
</vwc-fab>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute controls the purpose of the Fab, expressed in its colors.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFab, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VFab label="Add default">
		<template #icon><VIcon name="plus-line" /></template>
	</VFab>
	<VFab label="Add accent" connotation="accent">
		<template #icon><VIcon name="plus-line" /></template>
	</VFab>
	<VFab label="Add CTA" connotation="cta">
		<template #icon><VIcon name="plus-line" /></template>
	</VFab>
	<VFab label="Add announcement" connotation="announcement">
		<template #icon><VIcon name="plus-line" /></template>
	</VFab>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-fab label="Add default">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="Add accent" connotation="accent">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="Add CTA" connotation="cta">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="Add announcement" connotation="announcement">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the icon library](/icons/icons-gallery/), which can be displayed on the leading (default) or trailing side (`icon-trailing`) of the Fab.

The preferred way to add icons is to use the [icon slot](/components/fab/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFab } from '@vonage/vivid-vue';
</script>

<template>
	<VFab icon="plus-line" label="Add Action" />
	<VFab icon="cart-line" icon-trailing label="icon-trailing" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-fab icon="plus-line" label="Add Action"></vwc-fab> <vwc-fab icon="cart-line" icon-trailing label="icon-trailing"></vwc-fab>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Only

If the `label` is omitted, the Fab will be displayed as an _icon-only_ Fab.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

When an element has no visible text, provide an accessible name using the <nobr><code>aria-label</code></nobr>attribute. This ensures screen reader users can understand the element's purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFab, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VFab aria-label="Icon only FAB button">
		<template #icon><VIcon name="check-line" /></template>
	</VFab>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-fab aria-label="Icon only FAB button">
	<vwc-icon slot="icon" name="check-line"></vwc-icon>
</vwc-fab>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

The `size` attribute controls the size of the Fab.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFab, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VFab label="condensed" size="condensed">
		<template #icon><VIcon name="thumbs-up-line" /></template>
	</VFab>
	<VFab label="normal (default)" size="normal">
		<template #icon><VIcon name="thumbs-up-line" /></template>
	</VFab>
	<VFab label="expanded" size="expanded">
		<template #icon><VIcon name="thumbs-up-line" /></template>
	</VFab>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-fab label="condensed" size="condensed">
	<vwc-icon slot="icon" name="thumbs-up-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="normal (default)" size="normal">
	<vwc-icon slot="icon" name="thumbs-up-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="expanded" size="expanded">
	<vwc-icon slot="icon" name="thumbs-up-line"></vwc-icon>
</vwc-fab>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the Fab and indicates that the action is not available.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>
	
Disabled buttons should be used with caution. Read our [guidelines for when to disabled buttons](/components/button/guidelines/#disabled).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFab, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VFab disabled>
		<template #icon><VIcon name="store-line" label="Home" /></template>
	</VFab>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-fab disabled>
	<vwc-icon slot="icon" name="store-line" label="Home"></vwc-icon>
</vwc-fab>
```

</vwc-tab-panel>
</vwc-tabs>
