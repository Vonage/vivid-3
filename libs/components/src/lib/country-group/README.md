# Country Group

Lays out multiple `Country` items with consistent spacing. When space is
limited, extra countries stay in the accessibility tree but are hidden visually
and listed in a hover popover (anchored to the `+N` badge).

## Usage

<vwc-tabs gutters="none">
  <vwc-tab label="Vue"></vwc-tab>
  <vwc-tab-panel>

```js
import { VCountryGroup, VCountry } from '@vonage/vivid-vue';
```

```vue preview 500px
<script setup lang="ts">
import { VCountryGroup, VCountry } from '@vonage/vivid-vue';
</script>

<template>
	<div style="display: grid; gap: 16px; padding: 16px;">
		<div style="width: 320px;">
			<VCountryGroup>
				<VCountry code="UK" />
				<VCountry code="NO" />
				<VCountry code="US" />
				<VCountry code="SE" />
				<VCountry code="DE" />
			</VCountryGroup>
		</div>

		<div
			style="
				font: 12px/1.2 var(--vvd-typography-base, system-ui);
				color: var(--vvd-color-neutral-700);
				margin-top: 4px;
				margin-bottom: -8px;
			"
		>
			Drag the bottom-right corner to resize (↘︎).
		</div>
		<div
			style="
				width: 200px;
				min-width: 80px;
				max-width: 320px;
				height: 72px;
				min-height: 40px;
				max-height: 140px;
				resize: both;
				overflow: hidden;
				box-sizing: border-box;
				border: 1px dashed var(--vvd-color-neutral-300);
				padding: 8px;
				background: repeating-linear-gradient(
					45deg,
					transparent,
					transparent 6px,
					rgba(0, 0, 0, 0.04) 6px,
					rgba(0, 0, 0, 0.04) 12px
				);
			"
		>
			<VCountryGroup style="display: block; width: 100%; height: 100%;">
				<VCountry code="UK" />
				<VCountry code="NO" />
				<VCountry code="US" />
				<VCountry code="SE" />
				<VCountry code="DE" />
				<VCountry code="FR" />
				<VCountry code="ES" />
				<VCountry code="IT" />
				<VCountry code="NL" />
				<VCountry code="PL" />
			</VCountryGroup>
		</div>
	</div>
</template>
```

  </vwc-tab-panel>
  <vwc-tab label="Web Component"></vwc-tab>
  <vwc-tab-panel>

```html preview 500px
<script type="module">
	import { registerCountryGroup } from '@vonage/vivid';
	registerCountryGroup('your-prefix');
</script>

<div style="display: grid; gap: 16px; padding: 16px;">
	<div style="width: 320px;">
		<your-prefix-country-group>
			<your-prefix-country code="UK"></your-prefix-country>
			<your-prefix-country code="NO"></your-prefix-country>
			<your-prefix-country code="US"></your-prefix-country>
			<your-prefix-country code="SE"></your-prefix-country>
			<your-prefix-country code="DE"></your-prefix-country>
		</your-prefix-country-group>
	</div>

	<div
		style="
			font: 12px/1.2 var(--vvd-typography-base, system-ui);
			color: var(--vvd-color-neutral-700);
			margin-top: 4px;
			margin-bottom: -8px;
		"
	>
		Drag the bottom-right corner to resize (↘︎).
	</div>
	<div
		data-country-group-resize-wrap
		style="
				width: 200px;
				min-width: 80px;
				max-width: 320px;
				height: 72px;
				min-height: 40px;
				max-height: 140px;
				resize: both;
				overflow: hidden;
				box-sizing: border-box;
				border: 1px dashed var(--vvd-color-neutral-300);
				padding: 8px;
				background: repeating-linear-gradient(
					45deg,
					transparent,
					transparent 6px,
					rgba(0, 0, 0, 0.04) 6px,
					rgba(0, 0, 0, 0.04) 12px
				);
			"
	>
		<your-prefix-country-group style="display: block; width: 100%; height: 100%;">
			<your-prefix-country code="UK"></your-prefix-country>
			<your-prefix-country code="NO"></your-prefix-country>
			<your-prefix-country code="US"></your-prefix-country>
			<your-prefix-country code="SE"></your-prefix-country>
			<your-prefix-country code="DE"></your-prefix-country>
			<your-prefix-country code="FR"></your-prefix-country>
			<your-prefix-country code="ES"></your-prefix-country>
			<your-prefix-country code="IT"></your-prefix-country>
			<your-prefix-country code="NL"></your-prefix-country>
			<your-prefix-country code="PL"></your-prefix-country>
		</your-prefix-country-group>
	</div>
</div>
```

  </vwc-tab-panel>
</vwc-tabs>

## API Reference

### Slots

| **Name**    | **Description**          |
| ----------- | ------------------------ |
| **default** | `Country` children only. |
