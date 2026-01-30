## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VOption } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VOption text="Option text" />
	</div>
</template>

<style>
.container {
	width: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

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
</vwc-tabs>

## Label

The `label` attribute can be used to display different text in the parent element when selected.

In the example below, the international dialing code (`label`) is displayed when selected, but the country name (`text`) is used in the option list.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { ref } from 'vue';
import { VIcon, VOption, VSelect } from '@vonage/vivid-vue';

const activeFlagName = ref('flag-united-states');

function updateFlagIcon(e) {
	if (!activeFlagName.value) return;
	const selectedIcon = e.target.selectedOptions[0].querySelector('[slot="icon"]');
	activeFlagName.value = selectedIcon?.getAttribute('name');
}
</script>

<template>
	<VSelect label="Country code" class="country-code" @change="updateFlagIcon">
		<template #icon><VIcon :name="activeFlagName" /></template>
		<VOption label="+1" value="1" text="United States">
			<template #icon><VIcon name="flag-united-states" /></template>
		</VOption>
		<VOption label="+44" value="44" text="United Kingdom">
			<template #icon><VIcon name="flag-united-kingdom" /></template>
		</VOption>
		<VOption label="+49" value="49" text="Germany">
			<template #icon><VIcon name="flag-germany" /></template>
		</VOption>
		<VOption label="+355" value="355" text="Albania">
			<template #icon><VIcon name="flag-albania" /></template>
		</VOption>
	</VSelect>
</template>

<style>
.country-code {
	inline-size: 120px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-select label="Country code" class="country-code" id="country-code">
	<vwc-icon slot="icon" id="active-icon" name="flag-united-states"></vwc-icon>
	<vwc-option label="+1" value="1" text="United States">
		<vwc-icon slot="icon" name="flag-united-states"></vwc-icon>
	</vwc-option>
	<vwc-option label="+44" value="44" text="United Kingdom">
		<vwc-icon slot="icon" name="flag-united-kingdom"></vwc-icon>
	</vwc-option>
	<vwc-option label="+49" value="49" text="Germany">
		<vwc-icon slot="icon" name="flag-germany"></vwc-icon>
	</vwc-option>
	<vwc-option label="+355" value="355" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
</vwc-select>

<script>
	const select = document.getElementById('country-code');
	const activeIcon = document.getElementById('active-icon');
	select?.addEventListener('change', (e) => {
		const selectedIcon = select.selectedOptions[0].querySelector('[slot="icon"]');
		activeIcon.name = selectedIcon?.getAttribute('name');
	});
</script>

<style>
	.country-code {
		inline-size: 120px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

Set the `icon` slot to show an icon before the option's text.
If set, the `icon` attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VOption text="Option" value="my-value">
			<template #icon><VIcon name="check-circle-solid" connotation="success" label="Selected" /></template>
		</VOption>
	</div>
</template>

<style>
.container {
	width: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-option text="Option" value="my-value">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success" label="Selected"></vwc-icon>
	</vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Trailing Meta Slot

Use the `trailing-meta` slot to add an element (like a badge or an additional icon) to the end of Option.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge, VIcon, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VOption text="Option" value="my-value">
			<template #icon><VIcon name="check-circle-solid" connotation="success" label="Selected" /></template>
			<template #trailing-meta><VBadge appearance="subtle" connotation="cta" text="New" /></template>
		</VOption>
	</div>
</template>

<style>
.container {
	width: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-option text="Option" value="my-value">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success" label="Selected"></vwc-icon>
		<vwc-badge slot="trailing-meta" appearance="subtle" connotation="cta" text="New"></vwc-badge>
	</vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Tag Icon Slot

If the option is represented as a tag in a [Searchable Select](/components/searchable-select/) component, you can use `tag-icon` slot to show an icon in the tag.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 180px
<script setup lang="ts">
import { VIcon, VOption, VSearchableSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect multiple>
		<VOption value="afghanistan" text="Afghanistan" selected>
			<template #tag-icon><VIcon name="flag-afghanistan" /></template>
		</VOption>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 180px
<vwc-searchable-select multiple>
	<vwc-option value="afghanistan" text="Afghanistan" selected>
		<vwc-icon slot="tag-icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

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

| Name              | Description                                                               |
| ----------------- | ------------------------------------------------------------------------- |
| **icon**          | Add an icon before the option's text                                      |
| **trailing-meta** | For additional elements at the end of the Menu Item                       |
| **tag-icon**      | Icon to be displayed in the tag when selected inside of Searchable Select |

</div>
