## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';
</script>

<template>
	<VColorPicker label="Primary color" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/color-picker';
```

or, if you need to use a unique prefix:

```js
import { registerColorPicker' } from '@vonage/vivid';

registerColorPicker('your-prefix');
```

```html preview 480px
<script type="module">
	import { registerColorPicker } from '@vonage/vivid';
	registerColorPicker('your-prefix');
</script>

<your-prefix-color-picker label="Primary color"></your-prefix-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

Use the `open` attribute to indicate whether the Simple Color Picker's popup should be open.

- Type: `boolean`
- Default: `false`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';
</script>
<template>
	<VColorPicker label="Primary color" saved-colors-key="vvd-color-picker-open" open />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker label="Primary color" saved-colors-key="vvd-color-picker-open" open></vwc-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Saved Colors

### Saved Colors Key

Saved colors are stored in the browser’s `localStorage` by default, using a key generated from the component’s tag name.

To ensure persistence and uniqueness, it’s good practice to specify a custom key using the `saved-colors-key` attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';
</script>
<template>
	<VColorPicker label="Primary color" saved-colors-key="vvd-color-picker-unique-key" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker label="Primary color" saved-colors-key="vvd-color-picker-unique-key"></vwc-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Disable Saved Colors

You can use the `disabled-saved-colors` attribute to disable saving colors by the users.

- Type: `boolean`
- Default: `false`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';
</script>
<template>
	<VColorPicker label="Primary color" disable-saved-colors />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker label="Primary color" disable-saved-colors></vwc-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Contextual Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VContextualHelp, VColorPicker } from '@vonage/vivid-vue';
</script>
<template>
	<VColorPicker label="Color Picker" saved-colors-key="vvd-color-picker-contextual-help">
		<template #contextual-help><VContextualHelp>Choose your brand color</VContextualHelp></template>
	</VColorPicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker label="Color Picker" saved-colors-key="vvd-color-picker-contextual-help">
	<vwc-contextual-help slot="contextual-help">Choose your brand color</vwc-contextual-help>
</vwc-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` slot allows you to use rich content as the Color Picker's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';
</script>
<template>
	<VColorPicker label="Primary color" saved-colors-key="vvd-color-picker-helper-text">
		<template #helper-text><span>Choose the Primary Color</span></template>
	</VColorPicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker label="Primary color" saved-colors-key="vvd-color-picker-helper-text">
	<span slot="helper-text">Choose the Primary Color</span>
</vwc-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Popup Text

The `popup-text` slot allows you to override the default **"Color Picker"** title displayed in the Color Picker's popup.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';
</script>
<template>
	<VColorPicker label="Primary color" saved-colors-key="vvd-color-picker-popup-text">
		<template #popup-text><span>Brand Color</span></template>
	</VColorPicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker label="Primary color" saved-colors-key="vvd-color-picker-popup-text">
	<span slot="popup-text">Brand Color</span>
</vwc-color-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Swatches Text

The `swatches-text` slot allows you to override the default **"Saved Colors:"** text displayed above the color swatches.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 480px
<script setup lang="ts">
import { VColorPicker } from '@vonage/vivid-vue';

const swatches = [
	{
		label: 'Magenta',
		value: '#D6219C',
	},
	{
		label: 'Blue',
		value: '#80C7F5',
	},
	{
		label: 'Orange',
		value: '#FA7454',
	},
	{
		label: 'Peach',
		value: '#FCAC98',
	},
];
</script>
<template>
	<VColorPicker :swatches="swatches" label="Brand color" value="#D6219C" disable-saved-colors>
		<template #swatches-text><span>Brand Colors:</span></template>
	</VColorPicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 480px
<vwc-color-picker id="picker" label="Brand color" value="#D6219C" disable-saved-colors>
	<span slot="swatches-text">Brand Colors:</span>
</vwc-color-picker>

<script>
	const swatches = [
		{
			label: 'Magenta',
			value: '#D6219C',
		},
		{
			label: 'Blue',
			value: '#80C7F5',
		},
		{
			label: 'Orange',
			value: '#FA7454',
		},
		{
			label: 'Peach',
			value: '#FCAC98',
		},
	];

	const picker = document.getElementById('picker');
	picker.swatches = swatches;
</script>
```

</vwc-tab-panel>
</vwc-tabs>
