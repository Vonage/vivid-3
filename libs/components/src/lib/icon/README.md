## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/icon';
```

or, if you need to use a unique prefix:

```js
import { registerIcon } from '@vonage/vivid';

registerIcon('your-prefix');
```

```html preview
<script type="module">
	import { registerIcon } from '@vonage/vivid';
	registerIcon('your-prefix');
</script>

<your-prefix-icon name="close-line" aria-hidden="true"></your-prefix-icon>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VIcon } from '@vonage/vivid-vue';
</script>
<template>
	<VIcon name="close-line" aria-hidden="true" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Size

If the component is used without a `size`, it will use the current `font-size` value.

```html preview
<vwc-icon name="close-line" class="small-icon" aria-hidden="true"></vwc-icon>
30px

<style>
	.small-icon {
		font-size: 30px;
	}
</style>
```

## Custom Color

If the component is used without a `connotation`, it will use the current text color.

```html preview
<vwc-icon class="icon" name="heart-solid"></vwc-icon>

<style>
	.icon {
		color: var(--vvd-color-announcement-400);
	}
</style>
```

## API Reference

{% apiReference "icon" %}
