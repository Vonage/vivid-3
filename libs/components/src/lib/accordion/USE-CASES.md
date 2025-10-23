## Alternative Expanded Indicators

The example below uses the `icon` and `icon-trailing` attributes to replace the chevron indicators with plus and minus icons.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { ref } from 'vue';
import { VAccordion, VAccordionItem, VIcon } from '@vonage/vivid-vue';

// Reactive icon states for each accordion item
const items = ref([
	{ heading: 'Accordion item 1', expanded: true, icon: 'minus-line' },
	{ heading: 'Accordion item 2', expanded: false, icon: 'plus-line' },
]);

// Toggle icon and expanded state on change
const handleChange = (index: number) => {
	const item = items.value[index];
	item.expanded = !item.expanded;
	item.icon = item.expanded ? 'minus-line' : 'plus-line';
};
</script>

<template>
	<VAccordion expand-mode="multi">
		<VAccordionItem v-for="(item, index) in items" :key="index" class="accordion-item" icon-trailing :heading="item.heading" :expanded="item.expanded" :icon="item.icon" @change="handleChange(index)">
			<VIcon slot="icon" :name="item.icon" />
			This is the accordion body.
		</VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item class="accordion-item" icon-trailing heading="Accordion item 1" icon="minus-line" expanded>
		<vwc-icon slot="icon" name="minus-line"></vwc-icon>
		This is the accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item class="accordion-item" icon-trailing icon="plus-line" heading="Accordion item 2"> This is the accordion body. </vwc-accordion-item>
</vwc-accordion>

<script>
	document.querySelectorAll('.accordion-item').forEach((item) => {
		item.addEventListener('change', (e) => {
			if (e.target !== item) {
				return;
			}
			const iconName = item.getAttribute('icon');
			iconName === 'minus-line' ? item.setAttribute('icon', 'plus-line') : item.setAttribute('icon', 'minus-line');
		});
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Single Accordion Items

The example below shows how a single Accordion Item can be used inside an [Action Group component](/components/action-group/) (which provides the border) to create a stand alone expandable section of content.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 160px
<script setup lang="ts">
import { VAccordion, VAccordionItem, VActionGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup class="action-group">
		<VAccordionItem class="accordion-item" heading="Expandable Section"> This is the content for the expandable section. </VAccordionItem>
	</VActionGroup>
</template>

<style scoped>
.action-group,
.accordion-item {
	display: block;
	inline-size: 100%;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 160px
<vwc-action-group class="action-group">
	<vwc-accordion-item class="accordion-item" heading="Expandable Section"> This is the content for the expandable section. </vwc-accordion-item>
</vwc-action-group>

<style>
	.action-group,
	.accordion-item {
		display: block;
		inline-size: 100%;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
