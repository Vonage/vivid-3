## Heading

Use the `heading` attribute on **Accordion Item** to set the heading text.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

    To ensure [accessible heading levels](/components/accordion/accessibility/#heading-levels) use the [`heading-level` attribute](/components/accordion/code/#heading-level).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion>
		<VAccordionItem heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>
		<VAccordionItem heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-accordion>
	<vwc-accordion-item heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

## Expand Mode

Use the `expand-mode` attribute on **Accordion** to determine if multiple items can opened at once or single (default).

### Single

In `single` mode only one Accordion Item can be expanded at a time. By default, the first Accordion Item will be expanded when the component is initialized.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion expand-mode="single">
		<VAccordionItem heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>

		<VAccordionItem heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>

		<VAccordionItem heading="Accordion item 3"> This is the third item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-accordion expand-mode="single">
	<vwc-accordion-item heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 3"> This is the third item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

### Multi

In `multi` mode multiple Accordion Items can be expanded.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion expand-mode="multi">
		<VAccordionItem heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>

		<VAccordionItem heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>

		<VAccordionItem heading="Accordion item 3"> This is the third item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 3"> This is the third item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

## Expanded

Use the `expanded` attribute on **Accordion Item** to set it's open state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion expand-mode="multi">
		<VAccordionItem heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>
		<VAccordionItem expanded heading="Accordion item 2 with expanded attribute"> This is the second item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item expanded heading="Accordion item 2 with expanded attribute"> This is the second item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

Use the `appearance` attribute to change the **Accordion Item** appearance.

Choose from `ghost` (default), `ghost-light` (as ghost but with transparency on the hover color) and `filled`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion expand-mode="multi">
		<VAccordionItem heading="Ghost (default)"> This is the first item's accordion body. </VAccordionItem>

		<VAccordionItem appearance="ghost-light" heading="Ghost light"> This is the second item's accordion body. </VAccordionItem>

		<VAccordionItem appearance="filled" heading="Filled"> This is the third item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Ghost (default)"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Ghost light" appearance="ghost-light"> This is the second item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item heading="Filled" appearance="filled"> This is the third item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the **Accordion Item**'s heading.

The preferred way to add icons is to use the [icon slot](/components/accordion/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion>
		<VAccordionItem icon="accessibility-line" heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>
		<VAccordionItem icon="ai-line" heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-accordion>
	<vwc-accordion-item icon="accessibility-line" heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item icon="ai-line" heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Trailing

Use the `icon-trailing` attribute to postfix the icon in place of the **Accordion Item**'s chevron.

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

## Meta

Use the `meta` attribute to add meta data to the **Accordion Item**'s heading.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion>
		<VAccordionItem meta="Meta 1" heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>
		<VAccordionItem meta="Meta 2" heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-accordion>
	<vwc-accordion-item meta="Meta 1" heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item meta="Meta 2" heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

Use the `size` attribute to control the size of the **Accordion Item**.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 500px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<div class="example">
			<b>Normal</b>
			<VAccordion class="accordion">
				<VAccordionItem size="normal" heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>
				<VAccordionItem size="normal" heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>
			</VAccordion>
		</div>

		<div class="example">
			<b>Condensed</b>
			<VAccordion class="accordion">
				<VAccordionItem size="condensed" heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>
				<VAccordionItem size="condensed" heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>
			</VAccordion>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 48px;
	inline-size: 100%;
}

.example {
	flex-grow: 1;
	inline-size: 100%;
}

.accordion {
	margin-top: 16px;
	display: block;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 500px
<div class="container">
	<div class="example">
		<b>Normal</b>
		<vwc-accordion class="accordion">
			<vwc-accordion-item size="normal" heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
			<vwc-accordion-item size="normal" heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
		</vwc-accordion>
	</div>
	<div class="example">
		<b>Condensed</b>
		<vwc-accordion class="accordion">
			<vwc-accordion-item size="condensed" heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
			<vwc-accordion-item size="condensed" heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
		</vwc-accordion>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 48px;
		inline-size: 100%;
	}
	.example {
		flex-grow: 1;
		inline-size: 100%;
	}
	.accordion {
		margin-top: 16px;
		display: block;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## No Indicator

Use the `no-indicator` attribute on **Accordion Item** to remove indicator icon from the heading element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VAccordion>
		<VAccordionItem no-indicator heading="Accordion item 1"> This is the first item's accordion body. </VAccordionItem>

		<VAccordionItem no-indicator heading="Accordion item 2"> This is the second item's accordion body. </VAccordionItem>

		<VAccordionItem no-indicator heading="Accordion item 3"> This is the third item's accordion body. </VAccordionItem>
	</VAccordion>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-accordion>
	<vwc-accordion-item no-indicator heading="Accordion item 1"> This is the first item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item no-indicator heading="Accordion item 2"> This is the second item's accordion body. </vwc-accordion-item>
	<vwc-accordion-item no-indicator heading="Accordion item 3"> This is the third item's accordion body. </vwc-accordion-item>
</vwc-accordion>
```

</vwc-tab-panel>
</vwc-tabs>
