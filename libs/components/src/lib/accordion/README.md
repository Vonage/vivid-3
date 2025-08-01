## Usage

<vwc-tabs gutters="none">
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
<h1>Level 1 heading</h1>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		heading-level="2"
		heading="Accordion item 1"
		meta="Level 2"
	>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item
		heading-level="4"
		heading="Accordion item 2"
		meta="Level 2"
	>
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
<h2>Level 2 heading</h2>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		heading-level="3"
		heading="Accordion item 1"
		meta="Level 3"
	>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item
		heading-level="3"
		heading="Accordion item 2"
		meta="Level 3"
	>
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Methods

### Close All

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
<vwc-button
	id="close-all-button"
	label="Close All"
	appearance="outlined"
></vwc-button>

<script>
	document
		.getElementById('close-all-button')
		.addEventListener('click', closeAll);

	function closeAll() {
		document.getElementById('expanded-accordion').closeAll();
	}
</script>
```

## Slots

<vwc-note connotation="warning" headline="Do not nest any interactive elements within heading content">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The HTML specification does not allow one interactive element to be nested within another. Therefore, you should not use any links or buttons inside `heading` or `meta` slots.

</vwc-note>

### Icon Slot

```html preview 220px
<vwc-accordion>
	<vwc-accordion-item heading="Accordion item 1" expanded>
		<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2" expanded>
		<vwc-icon slot="icon">
			<svg
				width="240"
				height="160"
				viewBox="0 0 240 160"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M177.534 159.87H73.2606C61.8297 159.87 49.1214 150.467 44.8824 138.873L1.38368 20.9962C-2.85533 9.40215 2.97167 0 14.4069 0H118.676C130.107 0 142.815 9.40215 147.054 20.9962L190.553 138.873C194.796 150.467 188.969 159.87 177.534 159.87Z"
					fill="url(#paint0_linear_2889_5523)"
				/>
				<path
					d="M226.296 31.1954H119.314C108.631 31.1954 96.7543 39.9808 92.791 50.8161L60.0819 140.245C56.1185 151.08 61.5649 159.865 72.2521 159.865H179.233C189.916 159.865 201.794 151.08 205.757 140.245L238.465 50.8161C242.428 39.9808 236.978 31.1954 226.296 31.1954Z"
					fill="url(#paint1_linear_2889_5523)"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M72.5804 159.867H177.669C178.316 159.853 178.944 159.81 179.553 159.737C179.588 159.742 179.627 159.743 179.666 159.743C185.79 159.743 192.235 156.416 195.196 153.975C199.502 150.425 202.057 147.89 204.82 142.66C199.869 151.44 194.744 150.997 191.039 140.664C190.878 140.212 190.699 139.837 190.505 139.531C190.432 139.313 190.356 139.094 190.275 138.874L151.757 33.5565C151.464 32.7586 151.133 31.9711 150.764 31.1963H119.314C108.631 31.1963 96.7545 39.9815 92.7909 50.8169L60.082 140.246C59.9262 140.672 59.785 141.094 59.6581 141.513C55.9215 150.926 51.454 151.042 46.5389 142.415C49.3911 147.759 52.0279 150.349 56.4747 153.975C59.5319 156.469 66.1845 159.869 72.5073 159.869C72.5321 159.869 72.5565 159.867 72.5804 159.867Z"
					fill="url(#paint2_linear_2889_5523)"
				/>
				<path
					style="mix-blend-mode:hard-light"
					opacity="0.4"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M73.2606 159.87H177.534C178.146 159.87 178.744 159.843 179.324 159.79C179.402 159.81 179.487 159.819 179.576 159.819C185.7 159.819 192.145 156.491 195.106 154.05C199.414 150.501 201.967 147.967 204.73 142.736C200.027 151.08 195.165 151.094 191.513 142.208C191.286 141.122 190.969 140.008 190.553 138.873L147.054 20.9962C142.815 9.40215 130.107 0 118.676 0H14.4069C2.97166 0 -2.85532 9.40215 1.38368 20.9962L44.8824 138.873C49.1213 150.467 61.8297 159.87 73.2606 159.87Z"
					fill="url(#paint3_linear_2889_5523)"
				/>
				<path
					style="mix-blend-mode:hard-light"
					opacity="0.15"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M119.449 31.3275H226.43C237.114 31.3275 242.564 40.1129 238.601 50.9482L205.892 140.377C201.928 151.213 190.052 159.997 179.369 159.997H72.7282C72.7002 160 72.6715 160 72.6423 160C72.5302 160 72.4179 160 72.3056 159.997C70.8583 159.991 69.508 159.823 68.2647 159.512C63.4432 158.482 58.9619 156.025 56.6097 154.108C52.1629 150.481 49.5262 147.891 46.674 142.547C51.5888 151.175 56.0562 151.059 59.7928 141.646C59.9198 141.226 60.0612 140.803 60.2171 140.377L92.9261 50.9482C96.8895 40.1129 108.767 31.3275 119.449 31.3275Z"
					fill="url(#paint4_linear_2889_5523)"
				/>
				<path
					d="M226.536 31.3275H119.555C108.872 31.3275 96.9951 40.1129 93.0317 50.9481L60.3227 140.377C56.3593 151.213 61.8057 159.997 72.4928 159.997H179.474C190.157 159.997 202.034 151.213 205.997 140.377L238.707 50.9481C242.67 40.1129 237.218 31.3275 226.536 31.3275Z"
					fill="url(#paint5_linear_2889_5523)"
					fill-opacity="0.2"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_2889_5523"
						x1="124.234"
						y1="2.52581e-05"
						x2="-0.165732"
						y2="-27.4436"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#A662FF" />
						<stop offset="1" stop-color="#57EDFD" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2889_5523"
						x1="160.269"
						y1="137.843"
						x2="247.837"
						y2="35.6845"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#FC27F6" />
						<stop offset="1" stop-color="#FFA694" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_2889_5523"
						x1="97.1225"
						y1="31.3288"
						x2="204.541"
						y2="31.3288"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#7600FF" />
						<stop offset="1" stop-color="#FB2FFB" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_2889_5523"
						x1="142.424"
						y1="3.1328"
						x2="117.269"
						y2="13.3247"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="white" />
						<stop offset="1" stop-color="white" stop-opacity="0" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_2889_5523"
						x1="99.5251"
						y1="39.6815"
						x2="113.891"
						y2="44.8789"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="white" />
						<stop offset="1" stop-color="white" stop-opacity="0" />
					</linearGradient>
					<linearGradient
						id="paint5_linear_2889_5523"
						x1="224.789"
						y1="98.1602"
						x2="206.889"
						y2="92.0515"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="white" />
						<stop offset="1" stop-color="white" stop-opacity="0" />
					</linearGradient>
				</defs>
			</svg>
		</vwc-icon>
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

### Heading Slot

Use the `heading` slot to add custom content to the Accordion Item's heading, allowing you to apply custom formatting.
If set, the `heading` attribute is ignored.

```html preview 120px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item" expanded>
		<span slot="heading"
			>Accordion item <span class="highlight">(slotted)</span></span
		>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
<style>
	.highlight {
		color: var(--vvd-color-cta-500);
	}
</style>
```

### Meta Slot

Set the `meta` slot to add additional content to the accordion item's heading.
If set, the `meta` attribute is ignored.

```html preview 120px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item" meta="Meta data" expanded>
		<span slot="heading"
			>Accordion item <span class="highlight">(slotted)</span></span
		>
		<span slot="meta">Meta data <span class="highlight">(slotted)</span></span>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
<style>
	.highlight {
		color: var(--vvd-color-cta-500);
	}
</style>
```

## CSS Variables

### Meta Data Inline Size

Use the `--accordion-item-meta-inline-size` to control the width of the `meta-data` slot content.

- Default: `20%`

```html preview 140px
<vwc-accordion expand-mode="multi" class="accordion">
	<vwc-accordion-item
		heading="Accordion item"
		meta="meta-data with custom width"
	>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>

<style>
	.accordion {
		--accordion-item-meta-inline-size: 230px;
	}
</style>
```

## API Reference

### Accordion

#### Properties

<div class="table-wrapper">

| Name            | Type                        | Description                                                      |
| --------------- | --------------------------- | ---------------------------------------------------------------- |
| **expand-mode** | `single` (default), `multi` | Determines if multiple items or a single item can opened at once |

</div>

#### Methods

<div class="table-wrapper">

| Name         | Returns | Description                                                                               |
| ------------ | ------- | ----------------------------------------------------------------------------------------- |
| **closeAll** | `void`  | When `expand-mode` is set to `multi`, closes all the accordion items from the open state. |

</div>

### Accordion Item

#### Properties

<div class="table-wrapper">

| Name                                   | Type                                       | Description                                                                                                     |
| -------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **heading**                            | `string`                                   | Sets the text for the heading                                                                                   |
| **heading-level**                      | `1`, `2` (default), `3`, `4`, `5`, `6`     | Determines the heading level                                                                                    |
| _(deprecated as of 05/25)_<br>**icon** | Enum: `[icon-name]`                        | A decorative icon the custom element should have. See the Vivid Icon Gallery for available icons and icon-names |
| **expanded**                           | `boolean`                                  | Sets the open state                                                                                             |
| **meta**                               | `string`                                   | Sets the meta text for the heading                                                                              |
| **no-indicator**                       | `boolean`                                  | Hides the open state indicator icon (chevron)                                                                   |
| **size**                               | `normal` (default), `condensed`            | Sets the size                                                                                                   |
| **appearance**                         | `ghost` (default), `filled`, `ghost-light` | Controls the appearance                                                                                         |

</div>

#### Slots

<div class="table-wrapper">

| Name     | Description                  |
| -------- | ---------------------------- |
| **icon** | Add an icon to the component |

</div>

#### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                              |
| ---------- | ------------------------ | ------- | -------- | -------------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the button is invoked |

</div>
