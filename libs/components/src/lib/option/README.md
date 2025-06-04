## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/option';
```

or, if you need to use a unique prefix:

```js
import { registerOption } from '@vonage/vivid';

registerOption('your-prefix');
```

```html preview
<script type="module">
	import { registerOption } from '@vonage/vivid';
	registerOption('your-prefix');
</script>

<div class="container">
	<your-prefix-option text="Option text"></your-prefix-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VOption } from '@vonage/vivid-vue';
</script>
<template>
	<VOption text="Option text" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Label

The `label` attribute can be used xsto display different text in the parent element when selected.

In the example below, the international dialing code (`label`) is displayed when selected, but the country name (`text`) is used in the option list.

```html preview 270px
<vwc-select label="Country code" class="country-code" id="country-code">
	<vwc-icon slot="icon" name="flag-united-states"></vwc-icon>
	<vwc-option label="+1" value="1" text="United States">
		<vwc-icon slot="tag-icon" name="flag-united-states"></vwc-icon>
	</vwc-option>
	<vwc-option label="+44" value="44" text="United Kingdom">
		<vwc-icon slot="tag-icon" name="flag-united-kingdom"></vwc-icon>
	</vwc-option>
	<vwc-option label="+49" value="49" text="Germany">
		<vwc-icon slot="tag-icon" name="flag-germany"></vwc-icon>
	</vwc-option>
	<vwc-option label="+355" value="355" text="Albania">
		<vwc-icon slot="tag-icon" name="flag-albania"></vwc-icon>
	</vwc-option>
</vwc-select>

<script>
	const select = document.getElementById('country-code');
	select?.addEventListener('change', (e) => {
		select.icon = select.selectedOptions[0].icon;
	});
</script>

<style>
	.country-code {
		inline-size: 120px;
	}
</style>
```

## Slots

### Icon Slot

Set the `icon` slot to show an icon before the option's text.
If set, the `icon` attribute is ignored.

```html preview
<div class="container">
	<vwc-option text="Option" value="my-value">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
			label="Selected"
		></vwc-icon>
	</vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

### Tag Icon Slot

If the option is represented as a tag in a [Searchable Select](/components/searchable-select/) component, you can use `tag-icon` slot to show an icon in the tag.

```html preview 180px
<vwc-searchable-select multiple>
	<vwc-option value="afghanistan" text="Afghanistan" selected>
		<vwc-icon slot="tag-icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                                   | Type                      | Description                                                                                                                 |
| -------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **disabled**                           | `boolean`                 | Sets the option to be disabled                                                                                              |
| _(deprecated as of 05/25)_<br>**icon** | _Enum_:<br/>`[icon-name]` | A decorative icon for the element. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |
| **label**                              | `string`                  | Text to be displayed instead of `text` when the option is selected                                                          |
| **selected**                           | `boolean`                 | Sets the option to be selected                                                                                              |
| **text**                               | `string`                  | Sets the option's text                                                                                                      |
| **value**                              | `string`                  | Value to be submited as part of the form data                                                                               |
| **matchedText**                        | `string`                  | Text to highlighted as matching a search query                                                                              |
| **tagConnotation**                     | `accent` (default), `cta` | When displayed as a tag, the connotation of the tag                                                                         |

</div>

### Slots

<div class="table-wrapper">

| Name         | Description                                                               |
| ------------ | ------------------------------------------------------------------------- |
| **icon**     | Add an icon before the option's text                                      |
| **tag-icon** | Icon to be displayed in the tag when selected inside of Searchable Select |

</div>
