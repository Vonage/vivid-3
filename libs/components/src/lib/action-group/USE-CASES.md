## Separator

Use [Divider](/components/divider/) for adding separator between the action elements

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton, VDivider } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup appearance="fieldset">
		<VButton icon="reply-line" />
		<VDivider orientation="vertical" />
		<VButton icon="compose-line" />
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-action-group appearance="fieldset">
	<vwc-button aria-label="Reply">
		<vwc-icon slot="icon" name="reply-line"></vwc-icon>
	</vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-button aria-label="New message">
		<vwc-icon slot="icon" name="compose-line"></vwc-icon>
	</vwc-button>
</vwc-action-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Toggle buttons

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VButton, VActionGroup } from '@vonage/vivid-vue';
import { ref } from 'vue';

const selectedAlignment = ref('center');

function handleAlignmentChange(alignment: string) {
	// If clicking the same alignment, deselect it
	if (selectedAlignment.value === alignment) {
		selectedAlignment.value = '';
	} else {
		selectedAlignment.value = alignment;
	}
}
</script>

<template>
	<VActionGroup role="radiogroup" aria-label="Text Alignment">
		<VButton type="button" role="radio" icon="align-left-line" :aria-checked="selectedAlignment === 'left'" :tabindex="selectedAlignment === 'left' ? 0 : -1" aria-label="Text Align Left" :appearance="selectedAlignment === 'left' ? 'filled' : 'outline'" @click="handleAlignmentChange('left')" />
		<VButton type="button" role="radio" icon="align-center-line" :aria-checked="selectedAlignment === 'center'" :tabindex="selectedAlignment === 'center' ? 0 : -1" aria-label="Text Align Center" :appearance="selectedAlignment === 'center' ? 'filled' : 'outline'" @click="handleAlignmentChange('center')" />
		<VButton type="button" role="radio" icon="align-right-line" :aria-checked="selectedAlignment === 'right'" :tabindex="selectedAlignment === 'right' ? 0 : -1" aria-label="Text Align Right" :appearance="selectedAlignment === 'right' ? 'filled' : 'outline'" @click="handleAlignmentChange('right')" />
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-action-group role="radiogroup" aria-label="Text Alignment">
	<vwc-button type="button" role="radio" aria-checked="false" tabindex="-1" aria-label="Text Align Left" onclick="onClick(event, 'left')">
		<vwc-icon slot="icon" name="align-left-line"></vwc-icon>
	</vwc-button>
	<vwc-button type="button" role="radio" aria-checked="true" tabindex="0" aria-label="Text Align Center" appearance="filled" onclick="onClick(event, 'center')">
		<vwc-icon slot="icon" name="align-center-line"></vwc-icon>
	</vwc-button>
	<vwc-button type="button" role="radio" aria-checked="false" tabindex="-1" aria-label="Text Align Right" onclick="onClick(event, 'right')">
		<vwc-icon slot="icon" name="align-right-line"></vwc-icon>
	</vwc-button>
</vwc-action-group>

<script>
	let selectedAlignment = 'center';

	function onClick(event, alignment) {
		if (selectedAlignment === alignment) {
			selectedAlignment = '';
		} else {
			selectedAlignment = alignment;
		}

		updateButtonStates();
	}

	function updateButtonStates() {
		let allButtons = document.querySelectorAll('vwc-button');

		allButtons.forEach((button, index) => {
			const onclickAttr = button.getAttribute('onclick');
			if (!onclickAttr) return; // Skip buttons without onclick

			const buttonAlignment = onclickAttr.includes("'left'") ? 'left' : onclickAttr.includes("'center'") ? 'center' : 'right';

			button.setAttribute('aria-checked', selectedAlignment === buttonAlignment ? 'true' : 'false');

			if (selectedAlignment === buttonAlignment) {
				button.setAttribute('appearance', 'filled');
			} else {
				button.removeAttribute('appearance');
			}

			if (selectedAlignment === buttonAlignment) {
				button.setAttribute('tabindex', '0');
			} else if (selectedAlignment === '' && index === 0) {
				button.setAttribute('tabindex', '0');
			} else {
				button.setAttribute('tabindex', '-1');
			}
		});
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Composed Search

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton, VDivider, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup shape="pill">
		<VButton label="Action" appearance="ghost" icon="chevron-down-solid" icon-trailing shape="pill" />
		<VDivider orientation="vertical" />
		<VTextField icon="search-line" placeholder="Search..." appearance="ghost" shape="pill" style="min-width: 160px" />
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-action-group shape="pill">
	<vwc-button label="Action" appearance="ghost" icon-trailing shape="pill">
		<vwc-icon slot="icon" name="chevron-down-solid"></vwc-icon>
	</vwc-button>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-text-field icon="search-line" placeholder="Search..." appearance="ghost" shape="pill" style="min-width: 160px;">
		<vwc-icon slot="icon" name="search-line"></vwc-icon>
	</vwc-text-field>
</vwc-action-group>
```

</vwc-tab-panel>
</vwc-tabs>
