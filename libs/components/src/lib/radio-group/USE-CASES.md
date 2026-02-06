## Inside Toolbar

If the Radio Group is a child of an element with a `role` of `toolbar`, it's keyboard navigation behaviour will change to align with the [toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/):

- When pressing Left/Right arrow keys on the first/last radio button, the focus will move to the previous/next element in the toolbar.
- Moving the focus with arrow keys will not automatically select the radio buttons.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton, VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup role="toolbar" style="display: flex;">
		<VButton label="Before" />
		<VRadioGroup>
			<VRadio label="1" value="1" />
			<VRadio label="2" value="2" />
			<VRadio label="3" value="3" />
		</VRadioGroup>
		<VButton label="After" />
	</VActionGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-action-group role="toolbar" style="display: flex;">
	<vwc-button label="Before"></vwc-button>
	<vwc-radio-group>
		<vwc-radio label="1" value="1"></vwc-radio>
		<vwc-radio label="2" value="2"></vwc-radio>
		<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	<vwc-button label="After"></vwc-button>
</vwc-action-group>
```

</vwc-tab-panel>
</vwc-tabs>
