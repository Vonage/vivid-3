## Text

The `text` attribute sets the badge's text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<VBadge text="A default badge" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-badge text="A default badge"></vwc-badge>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

Set the `appearance` attribute to change the badge's appearance.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<div class="row">
		<VBadge appearance="filled" text="filled (default)" />
		<VBadge appearance="subtle" text="subtle" />
		<VBadge appearance="subtle-light" text="subtle-light" />
		<VBadge appearance="duotone" text="duotone" />
	</div>
</template>
<style>
.row {
	display: flex;
	gap: 4px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="row">
	<vwc-badge appearance="filled" text="filled (default)"></vwc-badge>
	<vwc-badge appearance="subtle" text="subtle"></vwc-badge>
	<vwc-badge appearance="subtle-light" text="subtle-light"></vwc-badge>
	<vwc-badge appearance="duotone" text="duotone"></vwc-badge>
</div>
<style>
	.row {
		display: flex;
		gap: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute controls the purpose of the badge, expressed in its colors.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<p>Filled badge with connotation (default)</p>
	<div class="row">
		<VBadge text="accent" connotation="accent" appearance="filled" />
		<VBadge text="cta" connotation="cta" appearance="filled" />
		<VBadge text="information" connotation="information" appearance="filled" />
		<VBadge text="announcement" connotation="announcement" appearance="filled" />
		<VBadge text="success" connotation="success" />
		<VBadge text="warning" connotation="warning" />
		<VBadge text="alert" connotation="alert" />
	</div>
	<p>Subtle badge with connotation</p>
	<div class="row">
		<VBadge text="accent" appearance="subtle" connotation="accent" />
		<VBadge text="cta" appearance="subtle" connotation="cta" />
		<VBadge text="information" appearance="subtle" connotation="information" />
		<VBadge text="announcement" appearance="subtle" connotation="announcement" />
		<VBadge text="success" appearance="subtle" connotation="success" />
		<VBadge text="warning" appearance="subtle" connotation="warning" />
		<VBadge text="alert" appearance="subtle" connotation="alert" />
	</div>
	<p>Subtle-Light badge with connotation</p>
	<div class="row">
		<VBadge text="accent" appearance="subtle-light" connotation="accent" />
		<VBadge text="cta" appearance="subtle-light" connotation="cta" />
		<VBadge text="information" appearance="subtle-light" connotation="information" />
		<VBadge text="announcement" appearance="subtle-light" connotation="announcement" />
		<VBadge text="success" appearance="subtle-light" connotation="success" />
		<VBadge text="warning" appearance="subtle-light" connotation="warning" />
		<VBadge text="alert" appearance="subtle-light" connotation="alert" />
	</div>
	<p>Duotone badge with connotation</p>
	<div class="row">
		<VBadge text="accent" appearance="duotone" connotation="accent" />
		<VBadge text="cta" appearance="duotone" connotation="cta" />
		<VBadge text="information" appearance="duotone" connotation="information" />
		<VBadge text="announcement" appearance="duotone" connotation="announcement" />
		<VBadge text="success" appearance="duotone" connotation="success" />
		<VBadge text="warning" appearance="duotone" connotation="warning" />
		<VBadge text="alert" appearance="duotone" connotation="alert" />
	</div>
</template>
<style>
.row {
	display: flex;
	gap: 4px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>Filled badge with connotation (default)</p>
<div class="row">
	<vwc-badge text="accent" connotation="accent" appearance="filled"></vwc-badge>
	<vwc-badge text="cta" connotation="cta" appearance="filled"></vwc-badge>
	<vwc-badge text="information" connotation="information" appearance="filled"></vwc-badge>
	<vwc-badge text="announcement" connotation="announcement" appearance="filled"></vwc-badge>
	<vwc-badge text="success" connotation="success"></vwc-badge>
	<vwc-badge text="warning" connotation="warning"></vwc-badge>
	<vwc-badge text="alert" connotation="alert"></vwc-badge>
</div>
<p>Subtle badge with connotation</p>
<div class="row">
	<vwc-badge text="accent" appearance="subtle" connotation="accent"></vwc-badge>
	<vwc-badge text="cta" appearance="subtle" connotation="cta"></vwc-badge>
	<vwc-badge text="information" appearance="subtle" connotation="information"></vwc-badge>
	<vwc-badge text="announcement" appearance="subtle" connotation="announcement"></vwc-badge>
	<vwc-badge text="success" appearance="subtle" connotation="success"></vwc-badge>
	<vwc-badge text="warning" appearance="subtle" connotation="warning"></vwc-badge>
	<vwc-badge text="alert" appearance="subtle" connotation="alert"></vwc-badge>
</div>
<p>Subtle-Light badge with connotation</p>
<div class="row">
	<vwc-badge text="accent" appearance="subtle-light" connotation="accent"></vwc-badge>
	<vwc-badge text="cta" appearance="subtle-light" connotation="cta"></vwc-badge>
	<vwc-badge text="information" appearance="subtle-light" connotation="information"></vwc-badge>
	<vwc-badge text="announcement" appearance="subtle-light" connotation="announcement"></vwc-badge>
	<vwc-badge text="success" appearance="subtle-light" connotation="success"></vwc-badge>
	<vwc-badge text="warning" appearance="subtle-light" connotation="warning"></vwc-badge>
	<vwc-badge text="alert" appearance="subtle-light" connotation="alert"></vwc-badge>
</div>
<p>Duotone badge with connotation</p>
<div class="row">
	<vwc-badge text="accent" appearance="duotone" connotation="accent"></vwc-badge>
	<vwc-badge text="cta" appearance="duotone" connotation="cta"></vwc-badge>
	<vwc-badge text="information" appearance="duotone" connotation="information"></vwc-badge>
	<vwc-badge text="announcement" appearance="duotone" connotation="announcement"></vwc-badge>
	<vwc-badge text="success" appearance="duotone" connotation="success"></vwc-badge>
	<vwc-badge text="warning" appearance="duotone" connotation="warning"></vwc-badge>
	<vwc-badge text="alert" appearance="duotone" connotation="alert"></vwc-badge>
</div>
<style>
	.row {
		display: flex;
		gap: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

Use the `shape` attribute to change the badge's edges.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template><VBadge text="rounded (default)" shape="rounded" /> <VBadge text="pill" shape="pill" /></template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-badge text="rounded (default)" shape="rounded"></vwc-badge> <vwc-badge text="pill" shape="pill"></vwc-badge>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

The `size` attribute controls the size of the badge.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<div class="row">
		<VBadge text="normal" size="normal" />
		<VBadge text="expanded" size="expanded" />
	</div>
</template>
<style>
.row {
	display: flex;
	gap: 4px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="row">
	<vwc-badge text="normal" size="normal"></vwc-badge>
	<vwc-badge text="expanded" size="expanded"></vwc-badge>
</div>
<style>
	.row {
		display: flex;
		gap: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed on the leading (default) or trailing side (`icon-trailing`) of the badge.

The preferred way to add icons is to use the [icon slot](/components/badge/code/#icon-slot).

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

This should only be used for [decorative icons](/components/icon/accessibility//#informative-vs-decorative-icons) (as there is no way to provide an accessible label to describe the icon). For [informative icons](/components/icon/accessibility//#informative-vs-decorative-icons), use the [icon slot](/components/badge/code/#icon-slot) and provide an accessible label using the `label` attribute on the [Icon component](/components/icon/code/#label).

</vwc-note>

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge, VIcon } from '@vonage/vivid-vue';
</script>
<template>
	<div class="row">
		<VBadge appearance="filled" text="icon leading (default)" shape="pill">
			<template #icon><VIcon slot="icon" name="message-sent-line" /></template>
		</VBadge>
		<VBadge icon-trailing appearance="filled" text="icon trailing" shape="pill">
			<template #icon><VIcon slot="icon" name="message-sent-line" /></template>
		</VBadge>
	</div>
</template>
<style>
.row {
	display: flex;
	gap: 4px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="row">
	<vwc-badge appearance="filled" text="icon leading (default)" shape="pill">
		<vwc-icon slot="icon" name="message-sent-line"></vwc-icon>
	</vwc-badge>
	<vwc-badge icon-trailing appearance="filled" text="icon trailing" shape="pill">
		<vwc-icon slot="icon" name="message-sent-line"></vwc-icon>
	</vwc-badge>
</div>
<style>
	.row {
		display: flex;
		gap: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Only

If the `label` is omitted, the badge will be displayed as an _icon-only_ badge.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

When an element has no visible text, provide an accessible name using the <nobr><code>label</code></nobr> attribute of the Icon component. This ensures screen reader users can understand the element’s purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge, VIcon } from '@vonage/vivid-vue';
</script>
<template>
	<VBadge appearance="filled">
		<template #icon><VIcon name="accessibility-line" label="Checked for accessibility" /></template>
	</VBadge>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-badge appearance="filled">
	<vwc-icon slot="icon" name="accessibility-line" label="Checked for accessibility"></vwc-icon>
</vwc-badge>
```

</vwc-tab-panel>
</vwc-tabs>
