## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Country">
		<VOption value="AF" text="Afghanistan" />
		<VOption value="AL" text="Albania" />
		<VOption value="DZ" text="Algeria" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerSearchableSelect } from '@vonage/vivid';

registerSearchableSelect('your-prefix');
```

```html preview 230px
<script type="module">
	import { registerSearchableSelect, registerOption } from '@vonage/vivid';
	registerSearchableSelect('your-prefix');
	registerOption('your-prefix');
</script>

<your-prefix-searchable-select label="Country">
	<your-prefix-option value="AF" text="Afghanistan"></your-prefix-option>
	<your-prefix-option value="AL" text="Albania"></your-prefix-option>
	<your-prefix-option value="DZ" text="Algeria"></your-prefix-option>
</your-prefix-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

## Controlling the Value

### Single Select

For a single select, you can control the selected value by setting the `value` attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Country" value="AL">
		<VOption value="AF" text="Afghanistan" />
		<VOption value="AL" text="Albania" />
		<VOption value="DZ" text="Algeria" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select label="Country" value="AL">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

### Multiple Select

For multiple select, you can control the selected values by setting the `values` property.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Web components (as with all HTML elements) can only accept strings as their attributes. `values` requires an array, so it has to be set programmatically.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { ref } from 'vue';
import { VSearchableSelect, VOption, VIcon } from '@vonage/vivid-vue';

const values = ref(['AF', 'DZ']);
</script>

<template>
	<VSearchableSelect v-model:values="values" multiple label="Countries">
		<VOption value="AF" text="Afghanistan">
			<template #icon>
				<VIcon name="flag-afghanistan" />
			</template>
		</VOption>
		<VOption value="AL" text="Albania">
			<template #icon>
				<VIcon name="flag-albania" />
			</template>
		</VOption>
		<VOption value="DZ" text="Algeria">
			<template #icon>
				<VIcon name="flag-algeria" />
			</template>
		</VOption>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select multiple label="Countries">
	<vwc-option value="AF" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="AL" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="DZ" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelector('vwc-searchable-select').values = ['AF', 'DZ'];
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Fixed Dropdown

Add the `fixed-dropdown` attribute to change the dropdown to use a fixed position strategy.
This is useful for cases in which the dropdown is obstructed by other elements.

## Open

The `open` attribute allows the Searchable Select to be opened programmatically.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Country" open>
		<VOption value="AF" text="Afghanistan" />
		<VOption value="AL" text="Albania" />
		<VOption value="DZ" text="Algeria" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select label="Country" open>
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

## Search Text

You can access the current search text through the `searchText` property and listen for changes through the `search-text-change` event.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { ref } from 'vue';
import { VSearchableSelect } from '@vonage/vivid-vue';

const searchText = ref('');

function onSearchTextChange(e: Event) {
	const el = (e?.currentTarget ?? e?.target) as { searchText?: string };
	console.log('onSearchTextChange', el?.searchText);
	searchText.value = el?.searchText ?? '';
}
</script>

<template>
	<div>Current search text: "<span v-text="searchText"></span>"</div>
	<VSearchableSelect @search-text-change="onSearchTextChange" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<div>Current search text: "<span id="search-text"></span>"</div>
<vwc-searchable-select></vwc-searchable-select>

<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelector('vwc-searchable-select').addEventListener('search-text-change', (e) => {
			document.querySelector('#search-text').innerText = e.currentTarget.searchText;
		});
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Option Filtering

You can control option filtering by setting `optionFilter` to a custom function. For example, always returning `true` will disable filtering by always showing all options.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VSearchableSelect, VOption, VIcon } from '@vonage/vivid-vue';

const selectRef = ref<InstanceType<typeof VSearchableSelect> | null>(null);

onMounted(() => {
	if (selectRef.value?.element) {
		selectRef.value.element.optionFilter = () => true;
	}
});
</script>

<template>
	<VSearchableSelect ref="selectRef">
		<VOption value="AF" text="Afghanistan">
			<template #icon>
				<VIcon name="flag-afghanistan" />
			</template>
		</VOption>
		<VOption value="AL" text="Albania">
			<template #icon>
				<VIcon name="flag-albania" />
			</template>
		</VOption>
		<VOption value="DZ" text="Algeria">
			<template #icon>
				<VIcon name="flag-algeria" />
			</template>
		</VOption>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-searchable-select>
	<vwc-option value="AF" text="Afghanistan">
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="AL" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="DZ" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>

<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelector('vwc-searchable-select').optionFilter = () => true;
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default

Holds the available options as [Option](/components/option/) elements.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Select an option">
		<VOption value="1" text="Option 1" />
		<VOption value="2" text="Option 2" />
		<VOption value="3" text="Option 3" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select label="Select an option">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

You can use the [Option's `tag-icon` slot](/components/option/#tag-icon) to display an icon next to the selected option's tag.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 320px
<script setup lang="ts">
import { VSearchableSelect, VOption, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Country" clearable multiple>
		<VOption value="afghanistan" text="Afghanistan" selected>
			<template #icon>
				<VIcon name="flag-afghanistan" />
			</template>
			<template #tag-icon>
				<VIcon name="flag-afghanistan" />
			</template>
		</VOption>
		<VOption value="albania" text="Albania">
			<template #icon>
				<VIcon name="flag-albania" />
			</template>
			<template #tag-icon>
				<VIcon name="flag-albania" />
			</template>
		</VOption>
		<VOption value="algeria" text="Algeria">
			<template #icon>
				<VIcon name="flag-algeria" />
			</template>
			<template #tag-icon>
				<VIcon name="flag-algeria" />
			</template>
		</VOption>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 320px
<vwc-searchable-select label="Country" clearable multiple>
	<vwc-option value="afghanistan" text="Afghanistan" selected>
		<vwc-icon slot="icon" name="flag-afghanistan"></vwc-icon>
		<vwc-icon slot="tag-icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option value="albania" text="Albania">
		<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
		<vwc-icon slot="tag-icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option value="algeria" text="Algeria">
		<vwc-icon slot="icon" name="flag-algeria"></vwc-icon>
		<vwc-icon slot="tag-icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

#### Hidden Options

Setting `hidden` on an Option will hide it from the dropdown while still allowing it to be a selected value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect multiple>
		<VOption value="AF" text="Afghanistan" selected hidden />
		<VOption value="AL" text="Albania" />
		<VOption value="DZ" text="Algeria" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-searchable-select multiple>
	<vwc-option value="AF" text="Afghanistan" selected hidden></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon

Set the `icon` slot to show an icon at the start of the input.
If set, the `icon`_(deprecated)_ attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Country" multiple>
		<template #icon>
			<VIcon name="check-circle-solid" connotation="success" />
		</template>
		<VOption value="AF" text="Afghanistan" selected />
		<VOption value="AL" text="Albania" selected />
		<VOption value="DZ" text="Algeria" selected />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select label="Country" multiple>
	<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
	<vwc-option value="AL" text="Albania" selected></vwc-option>
	<vwc-option value="DZ" text="Algeria" selected></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

### Meta

Use the `meta` slot to show meta information at the end of the input field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 320px
<script setup lang="ts">
import { VSearchableSelect, VOption, VBadge } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect aria-label="Country" multiple style="width: 250px">
		<VOption value="AF" text="Afghanistan" selected />
		<VOption value="AL" text="Albania" selected />
		<VOption value="DZ" text="Algeria" selected />
		<template #meta>
			<VBadge connotation="success" text="Beta" />
		</template>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 320px
<vwc-searchable-select aria-label="Country" multiple>
	<vwc-option value="AF" text="Afghanistan" selected></vwc-option>
	<vwc-option value="AL" text="Albania" selected></vwc-option>
	<vwc-option value="DZ" text="Algeria" selected></vwc-option>
	<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
</vwc-searchable-select>

<style>
	vwc-searchable-select {
		width: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` slot allows you to use rich content as the helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Business Type">
		<VOption value="ngo" text="Non-Governmental Organization" />
		<VOption value="gov" text="Governmental Organization" />
		<VOption value="edu" text="Educational Institution" />
		<template #helper-text>
			<span>Please select the <a href="#">type of your business</a>.</span>
		</template>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select label="Business Type">
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
	<span slot="helper-text"> Please select the <a href="#">type of your business</a>. </span>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Business Type">
		<VOption value="ngo" text="Non-Governmental Organization" />
		<VOption value="gov" text="Governmental Organization" />
		<VOption value="edu" text="Educational Institution" />
		<template #contextual-help>
			<VContextualHelp>Please select the type of your business</VContextualHelp>
		</template>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-searchable-select label="Business Type">
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
	<vwc-contextual-help slot="contextual-help">Please select the type of your business</vwc-contextual-help>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Width

You can specify width on the Searchable Select to control the width of the component. The default width is `300px`.

The dropdown has min-width of its content.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Choose an option" style="width: 140px">
		<VOption value="1" text="Option 1: dogs" />
		<VOption value="2" text="Option 2: cats" />
		<VOption value="3" text="Option 3: dogs and cats" />
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<style>
	vwc-searchable-select {
		width: 140px;
	}
</style>
<vwc-searchable-select label="Choose an option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Height

Use `--searchable-select-height` to set the max-height of the dropdown. The default value is `408px`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect class="searchable-select-height-demo" aria-label="Options Selector">
		<VOption value="1" text="Option 1" />
		<VOption value="2" text="Option 2" />
		<VOption value="3" text="Option 3" />
		<VOption value="4" text="Option 4" />
		<VOption value="5" text="Option 5" />
		<VOption value="6" text="Option 6" />
		<VOption value="7" text="Option 7" />
	</VSearchableSelect>
</template>

<style scoped>
.searchable-select-height-demo {
	--searchable-select-height: 100px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<style>
	vwc-searchable-select {
		--searchable-select-height: 100px;
	}
</style>
<vwc-searchable-select aria-label="Options Selector">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                                   | Type                                                        | Description                                                                                                                       |
| -------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **successText**                        | `string`                                                    | The success text for the form element.                                                                                            |
| **errorText**                          | `string`                                                    | The error text for the form element.                                                                                              |
| **helperText**                         | `string`                                                    | The helper text for the form element.                                                                                             |
| **label**                              | `string`                                                    | The label for the form element.                                                                                                   |
| _(deprecated as of 05/25)_<br>**icon** | _Enum_:<br/>`[icon-name]`                                   | A decorative icon the custom element should have. See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |
| **iconTrailing**                       | `boolean`                                                   | Indicates the icon affix alignment.                                                                                               |
| **disabled**                           | `boolean`                                                   | Sets the element's disabled state. A disabled element will not be included during form submission.                                |
| **name**                               | `string`                                                    | The name of the element. This element's value will be surfaced during form submission under the provided name.                    |
| **required**                           | `boolean`                                                   | Require the field to be completed prior to form submission.                                                                       |
| **appearance**                         | _Enum_:<br/>`fieldset`<br/>`ghost`                          |                                                                                                                                   |
| **shape**                              | _Enum_:<br/>`rounded`<br/>`pill`                            |                                                                                                                                   |
| **fixedDropdown**                      | `boolean`                                                   |                                                                                                                                   |
| **placeholder**                        | `string`                                                    |                                                                                                                                   |
| **open**                               | `boolean`                                                   |                                                                                                                                   |
| **multiple**                           | `boolean`                                                   |                                                                                                                                   |
| **externalTags**                       | `boolean`                                                   |                                                                                                                                   |
| **maxLines**                           | `number`                                                    |                                                                                                                                   |
| **maxSelected**                        | `number`                                                    |                                                                                                                                   |
| **clearable**                          | `boolean`                                                   | Adds a clear button to the input field that clears the selected values.                                                           |
| **values**                             | `string[]`                                                  | List of selected option's values in the order that they have been selected in.                                                    |
| **value**                              | `string`                                                    | Value of the first selected option or the empty string if no option is selected.                                                  |
| **selectedIndex**                      | `number`                                                    | Index of the first selected option or `-1` if no option is selected.                                                              |
| **options**                            | `ListboxOption[]`                                           | Read-only collections of all options.                                                                                             |
| **selectedOptions**                    | `ListboxOption[]`                                           | Read-only collections of selected options.                                                                                        |
| **initialValues**                      | `string[]`                                                  | List of initially selected option's values. Used in case of form reset.                                                           |
| **initialValue**                       | `string`                                                    | Initially selected option's value. Used in case of form reset.                                                                    |
| **loading**                            | `boolean`                                                   | Whether the component is in a loading state.                                                                                      |
| **searchText**                         | `string`                                                    | Read-only property containing the current search text.                                                                            |
| **optionFilter**                       | `(option: VwcOptionElement, searchText: string) => boolean` | Function to filter the options to display.                                                                                        |
| **enable-select-all**                  | `boolean`                                                   | Adds a "Select All" option at the top of the options list.                                                                        |
| **select-all-text**                    | `string`                                                    | Overrides the default "Select All" text.                                                                                          |
| **deselect-all-text**                  | `string`                                                    | Overrides the default "Deselect All" text.                                                                                        |

</div>

### Events

<div class="table-wrapper">

| Name                   | Event Type               | Bubbles | Composed | Description                            |
| ---------------------- | ------------------------ | ------- | -------- | -------------------------------------- |
| **input**              | `CustomEvent<undefined>` | No      | Yes      | Fired when the selected options change |
| **change**             | `CustomEvent<undefined>` | No      | Yes      | Fired when the selected options change |
| **search-text-change** | `CustomEvent<undefined>` | No      | No       | Fired when the search text changes     |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **default**         | Holds the available options.                                                                                       |
| **icon**            | Slot to add an icon to the control.                                                                                |
| **meta**            | Slot to add meta content to the control.                                                                           |
| **helper-text**     | Describes how to use the component. Alternative to the `helper-text` attribute.                                    |
| **no-options**      | Message that appears when no options are available.                                                                |
| **no-matches**      | Message that appears when no options match the search query.                                                       |
| **loading-options** | Message that appears there are no options to display and the component is in a loading state.                      |
| **contextual-help** | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>
