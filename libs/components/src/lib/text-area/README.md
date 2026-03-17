## Usage

All native attributes of the `textarea` are supported as well as some enhancements.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Description" value="This is the text we want to see!" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTextArea } from '@vonage/vivid';

registerTextArea('your-prefix');
```

```html preview
<script type="module">
	import { registerTextArea } from '@vonage/vivid';
	registerTextArea('your-prefix');
</script>

<your-prefix-text-area label="Description" value="This is the text we want to see!"></your-prefix-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

## Resize

Set the `resize` attribute to control how the text area can be resized by the user.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { ref } from 'vue';
import { VTextArea, VSelect, VOption } from '@vonage/vivid-vue';

const resize = ref('default');
</script>

<template>
	<div class="wrapper">
		<VSelect v-model="resize" label="Resize Options">
			<VOption value="none" text="none (default)" />
			<VOption value="vertical" text="vertical" />
			<VOption value="horizontal" text="horizontal" />
			<VOption value="both" text="both" />
		</VSelect>
		<VTextArea :value="resize" :resize="resize" label="text-area" />
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
	row-gap: 16px;
	inline-size: 240px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<div class="wrapper">
	<vwc-select label="Resize Options" id="vwc-select">
		<vwc-option value="none" text="none (default)"></vwc-option>
		<vwc-option value="vertical" text="vertical"></vwc-option>
		<vwc-option value="horizontal" text="horizontal"></vwc-option>
		<vwc-option value="both" text="both"></vwc-option>
	</vwc-select>
	<vwc-text-area value="default" id="vwc-text-area" label="text-area"></vwc-text-area>
</div>

<script>
	document.querySelector('vwc-select').addEventListener('change', (e) => {
		document.querySelector('#vwc-text-area').value = e.currentTarget.value;
		document.querySelector('#vwc-text-area').resize = e.currentTarget.value;
	});
</script>
<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 16px;
		inline-size: 240px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the Text Area's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Description">
		<template #helper-text>
			<span>Please ensure you provide the <a href="#">required details</a>.</span>
		</template>
	</VTextArea>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area label="Description">
	<span slot="helper-text">Please ensure you provide the <a href="#">required details</a>.</span>
</vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual-Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Your comments">
		<template #contextual-help>
			<VContextualHelp>This is the contextual help</VContextualHelp>
		</template>
	</VTextArea>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area label="Your comments">
	<vwc-contextual-help slot="contextual-help">This is the contextual help</vwc-contextual-help>
</vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>
