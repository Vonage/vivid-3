## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the File Picker.

<vwc-note connotation="information" headline="Accessibility note">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Select.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFilePicker, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VFilePicker label="Label"> Drag & Drop or click to upload </VFilePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-file-picker label="Label"> Drag & Drop or click to upload </vwc-file-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper text

The `helper-text` attribute provides additional information about the purpose of the File Picker.  
To add HTML to the helper text, use the [helper-text slot](/components/file-picker/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFilePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VFilePicker helper-text="helper-text"> Drag & Drop or click to upload </VFilePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-file-picker helper-text="helper-text"> Drag & Drop or click to upload </vwc-file-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFilePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VFilePicker label="Label">
		Drag & Drop or click to upload
		<VContextualHelp slot="contextual-help">Acceptable formats: .jpg, .png, .gif</VContextualHelp>
	</VFilePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-file-picker label="Label">
	Drag & Drop or click to upload
	<vwc-contextual-help slot="contextual-help">Acceptable formats: .jpg, .png, .gif</vwc-contextual-help>
</vwc-file-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFilePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VFilePicker error-text="Please provide a valid file."> Drag & Drop or click to upload </VFilePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-file-picker error-text="Please provide a valid file."> Drag & Drop or click to upload </vwc-file-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

Use the `size` attribute to set the file picker's block-size.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFilePicker, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<div class="wrapper">
		<VFilePicker size="normal" label="Normal"> File picker with Normal size (default) </VFilePicker>
		<VFilePicker size="expanded" label="Expanded"> File picker with Expanded size (default) </VFilePicker>
	</div>
</template>

<style>
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="wrapper">
	<vwc-file-picker size="normal" label="Normal"> File picker with Normal size (default) </vwc-file-picker>
	<vwc-file-picker size="expanded" label="Expanded"> File picker with Expanded size (default) </vwc-file-picker>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
