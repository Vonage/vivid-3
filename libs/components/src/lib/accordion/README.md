## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/accordion';
import '@vonage/vivid/accordion-item';
```

or, if you need to use a unique prefix:

```js
import { registerAccordion } from '@vonage/vivid';
import { registerAccordionItem } from '@vonage/vivid';

registerAccordion('your-prefix');
registerAccordionItem('your-prefix');
```

```html preview
<script type="module">
	import { registerAccordion } from '@vonage/vivid';
	import { registerAccordionItem } from '@vonage/vivid';
	registerAccordion('your-prefix');
	registerAccordionItem('your-prefix');
</script>

<your-prefix-accordion>
	<your-prefix-accordion-item heading="Accordion item 1">
		This is the first item's accordion body.
	</your-prefix-accordion-item>
	<your-prefix-accordion-item heading="Accordion item 2">
		This is the second item's accordion body.
	</your-prefix-accordion-item>
</your-prefix-accordion>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VAccordion } from '@vonage/vivid-vue';
	import { VAccordionItem } from '@vonage/vivid-vue';
</script>

<template>
	<VTextAccordion>
		<VTextAccordionItem heading="Accordion item 1">
			This is the first item's accordion body.
		</VTextAccordionItem>
		<VTextAccordionItem heading="Accordion item 2">
			This is the second item's accordion body.
		</VTextAccordionItem>
	</VTextAccordion>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Heading level

Use the `heading-level` to set level of the **Accordion Item**'s headline element to ensure [accessible heading levels](/components/accordion/accessibility/#heading-levels).

```html preview 450px
<h3>Level 3 heading</h3>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading-level="4" heading="Accordion item 1" meta="Level 4">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading-level="4" heading="Accordion item 2" meta="Level 4">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
<h4>Level 4 heading</h4>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading-level="5" heading="Accordion item 1" meta="Level 5">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading-level="5" heading="Accordion item 2" meta="Level 5">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Close All Method

Use the `closeAll` method on **Accordion** to programatically close all open Accordion Item's.

```html preview 425px
<vwc-accordion id="expanded-accordion" expand-mode="multi">
	<vwc-accordion-item heading="Accordion item 1" expanded>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2" expanded>
		This is the second item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 3" expanded>
		This is the third item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
<br />
<vwc-button id="close-all-button" label="Close All" appearance="outlined"></vwc-button>

<script>
	document.getElementById('close-all-button').addEventListener('click', closeAll);

	function closeAll() {
		document.getElementById('expanded-accordion').closeAll();
	}
</script>
```

## API Reference

### Accordion

#### Properties

<div class="table-wrapper">

| Name | Type | Description |
| --- | --- | --- |
| **expand-mode** | `single` (default), `multi` | Determines if multiple items or a single item can opened at once |

</div>

#### Events

<div class="table-wrapper">

| Name     | Type                          | Bubbles | Composed | Description                                                |
| -------- | ----------------------------- | ------- | -------- | ---------------------------------------------------------- |
| **change** | `CustomEvent<string \| null>` | Yes     | Yes      | Fires a custom 'change' event when the active item changes |

</div>

#### Methods

<div class="table-wrapper">

| Name       | Returns | Description                                                                               |
| ---------- | ------- | ----------------------------------------------------------------------------------------- |
| **closeAll** | `void`  | When `expand-mode` is set to `multi`, closes all the accordion items from the open state. |

</div>

### Accordion Item

#### Properties

<div class="table-wrapper">

| Name | Type | Description |
| --- | --- | --- |
| **expand-mode** | `single` (default), `multi` | Determines if multiple items or a single item can opened at once |

</div>