## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<p>I <VIcon name="heart-line" connotation="alert" label="Love" /> VIVID!</p>
</template>

<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerIcon } from '@vonage/vivid';

registerIcon('your-prefix');
```

```html preview
<script type="module">
	import { registerIcon } from '@vonage/vivid';
	registerIcon('your-prefix');
</script>

<p>I <your-prefix-icon name="heart-line" connotation="alert" label="Love"></your-prefix-icon> VIVID!</p>
```

</vwc-tab-panel>
</vwc-tabs>

## Label

Use the `label` attribute to provide the Icon with a descriptive label so that it's meaning can be conveyed to screen reader users.

See the [Accessibility section](/components/icon/accessibility/) for more information.

<vwc-note connotation="information" headline="Accessibility note">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

The `label` attribute was added as an alternative to using the `aria-label` attribute. It is preferable because using `aria-label` on non-interactive elements (like Icon) idoes not work consistantly across screen readers.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VIcon label="Close dialog" name="close-line" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-icon label="Close dialog" name="close-line"></vwc-icon>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Size

If the component is used without a `size`, it will use the current `font-size` value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>

<template><VIcon name="close-line" label="Close dialog" class="small-icon" /> 30px</template>

<style>
.small-icon {
	font-size: 30px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-icon name="close-line" label="Close dialog" class="small-icon"></vwc-icon>
30px

<style>
	.small-icon {
		font-size: 30px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Color

If the component is used without a `connotation`, it will use the current text color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VIcon class="icon" label="Heart icon" name="heart-solid" />
</template>

<style>
.icon {
	color: var(--vvd-color-announcement-400);
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-icon class="icon" label="Heart icon" name="heart-solid"></vwc-icon>

<style>
	.icon {
		color: var(--vvd-color-announcement-400);
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
