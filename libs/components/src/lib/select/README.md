## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerSelect } from '@vonage/vivid';

registerSelect('your-prefix');
```

```html preview 270px
<script type="module">
	import { registerSelect, registerOption } from '@vonage/vivid';
	registerSelect('your-prefix');
	registerOption('your-prefix');
</script>

<your-prefix-select label="Title" placeholder="Select an option">
	<your-prefix-option value="mr" text="Mr"></your-prefix-option>
	<your-prefix-option value="mrs" text="Mrs"></your-prefix-option>
	<your-prefix-option value="miss" text="Miss"></your-prefix-option>
	<your-prefix-option value="ms" text="Ms"></your-prefix-option>
</your-prefix-select>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect label="Title" placeholder="Select an option">
		<VOption value="mr" text="Mr" />
		<VOption value="mrs" text="Mrs" />
		<VOption value="miss" text="Miss" />
		<VOption value="ms" text="Ms" />
	</VSelect>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Width

By default, the Select's `width` is `fit-content` and the same goes for the listbox containing the options.

You can specify the `width` of the Select using CSS.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect class="select" label="Choose an option">
		<VOption value="1" text="Option 1: dogs" />
		<VOption value="2" text="Option 2: cats" />
		<VOption value="3" text="Option 3: dogs and cats" />
	</VSelect>
</template>

<style scoped>
.select {
	max-width: 320px;
	width: 100%;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-select class="select" label="Choose an option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-select>

<style>
	.select {
		max-width: 320px;
		width: 100%;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Fixed Dropdown

The `fixed-dropdown` attribute is useful for cases in which the dropdown is obstructed by other elements.

In the example below, if `fixed-dropdown` was not set on the Select, the select dropdown would be cut off where the Dialog ends.
Also, see [the Grid Select example](/components/data-grid/#select-in-a-grid)).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 320px
<script setup lang="ts">
import { VActionGroup, VButton, VDialog, VDivider, VIcon, VOption, VSelect, VTextField } from '@vonage/vivid-vue';
import { ref } from 'vue';

const countryCode = ref('1');
</script>

<template>
	<VDialog open headline="Telephone Number" icon="call-line" icon-placement="side">
		<template #body>
			<VActionGroup>
				<VSelect fixed-dropdown aria-label="Country code" appearance="ghost" class="country-code" v-model="countryCode">
					<template #icon>
						<VIcon name="flag-united-states" />
					</template>
					<VOption value="1" text="+1">
						<template #icon>
							<VIcon name="flag-united-states" />
						</template>
					</VOption>
					<VOption value="44" text="+44">
						<template #icon>
							<VIcon name="flag-united-kingdom" />
						</template>
					</VOption>
					<VOption value="49" text="+49">
						<template #icon>
							<VIcon name="flag-germany" />
						</template>
					</VOption>
					<VOption value="355" text="+355">
						<template #icon>
							<VIcon name="flag-albania" />
						</template>
					</VOption>
				</VSelect>
				<VDivider orientation="vertical" />
				<VTextField aria-label="Telephone number" type="tel" inputmode="tel" appearance="ghost" />
			</VActionGroup>
		</template>
		<template #action-items>
			<VButton appearance="filled" label="Submit" />
		</template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 320px
<vwc-dialog open headline="Telephone Number" icon="call-line" icon-placement="side">
	<vwc-action-group slot="body">
		<vwc-select fixed-dropdown aria-label="Country code" appearance="ghost" class="country-code" id="country-code">
			<vwc-icon slot="icon" name="flag-united-states"></vwc-icon>
			<vwc-option value="1" text="+1">
				<vwc-icon slot="icon" name="flag-united-states"></vwc-icon>
			</vwc-option>
			<vwc-option value="44" text="+44">
				<vwc-icon slot="icon" name="flag-united-kingdom"></vwc-icon>
			</vwc-option>
			<vwc-option value="49" text="+49">
				<vwc-icon slot="icon" name="flag-germany"></vwc-icon>
			</vwc-option>
			<vwc-option value="355" text="+355">
				<vwc-icon slot="icon" name="flag-albania"></vwc-icon>
			</vwc-option>
		</vwc-select>
		<vwc-divider orientation="vertical"></vwc-divider>
		<vwc-text-field aria-label="Telephone number" type="tel" inputmode="tel" appearance="ghost"></vwc-text-field>
	</vwc-action-group>
	<vwc-button slot="action-items" appearance="filled" label="Submit"></vwc-button>
</vwc-dialog>

<script>
	const select = document.getElementById('country-code');
	select?.addEventListener('change', (e) => {
		select.icon = select.selectedOptions[0].icon;
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

The `open` attribute allows the Select to be opened programmatically.

<vwc-note connotation="warning" headline="Stacking Context">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).

Select component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements. If needed a `z-index` value can be set on the host.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect open label="Title" placeholder="Select an option">
		<VOption value="mr" text="Mr" />
		<VOption value="mrs" text="Mrs" />
		<VOption value="miss" text="Miss" />
		<VOption value="ms" text="Ms" />
	</VSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-select open label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

This is where you place the [Option](/components/option/) components to provide the option list.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect label="Title" placeholder="Select an option">
		<VOption value="mr" text="Mr" />
		<VOption value="mrs" text="Mrs" />
		<VOption value="miss" text="Miss" />
		<VOption value="ms" text="Ms" />
	</VSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-select label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

</vwc-tab-panel>
</vwc-tabs>

### Meta Slot

Set the `meta` slot to show meta information after the selected option label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VBadge, VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect aria-label="Options Selector" class="select">
		<template #meta>
			<VBadge connotation="success" text="Beta" />
		</template>
		<VOption value="1" text="Option 1" />
		<VOption value="2" text="Option 2" />
		<VOption value="3" text="Option 3" />
	</VSelect>
	<VSelect aria-label="Options Selector" class="select">
		<template #meta>
			<span class="duration">00:00:00</span>
		</template>
		<VOption value="1" text="Option 1" />
		<VOption value="2" text="Option 2" />
		<VOption value="3" text="Option 3" />
	</VSelect>
</template>

<style scoped>
.select {
	width: 250px;
}
.duration {
	color: var(--vvd-color-neutral-600);
	text-align: end;
	flex-grow: 1;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-select aria-label="Options Selector" class="select">
	<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
<vwc-select aria-label="Options Selector" class="select">
	<span slot="meta" class="duration">00:00:00</span>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>

<style>
	.select {
		width: 250px;
	}
	.duration {
		color: var(--vvd-color-neutral-600);
		text-align: end;
		flex-grow: 1;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Slot

Set the `icon` slot to show an icon before the selected option text.
If set, the `icon` attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VIcon, VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect aria-label="Options Selector" class="select">
		<template #icon>
			<VIcon name="check-circle-solid" connotation="success" />
		</template>
		<VOption value="1" text="Option 1" />
		<VOption value="2" text="Option 2" />
		<VOption value="3" text="Option 3" />
	</VSelect>
</template>

<style scoped>
.select {
	width: 150px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-select aria-label="Options Selector" class="select">
	<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>

<style>
	.select {
		width: 150px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the select's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect label="Business Type">
		<template #helper-text>
			<span>Please select the <a href="#">type of your business</a>.</span>
		</template>
		<VOption value="ngo" text="Non-Governmental Organization" />
		<VOption value="gov" text="Governmental Organization" />
		<VOption value="edu" text="Educational Institution" />
	</VSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-select label="Business Type">
	<span slot="helper-text"> Please select the <a href="#">type of your business</a>. </span>
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
</vwc-select>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help Slot

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VContextualHelp, VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect label="Business Type">
		<template #contextual-help>
			<VContextualHelp>Please select the type of your business</VContextualHelp>
		</template>
		<VOption value="ngo" text="Non-Governmental Organization" />
		<VOption value="gov" text="Governmental Organization" />
		<VOption value="edu" text="Educational Institution" />
	</VSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-select label="Business Type">
	<vwc-contextual-help slot="contextual-help">Please select the type of your business</vwc-contextual-help>
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
</vwc-select>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Dropdown Height

Use `--select-height` to customize the `max-height` of the dropdown.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect aria-label="Options Selector" class="select">
		<VOption value="1" text="Option 1" />
		<VOption value="2" text="Option 2" />
		<VOption value="3" text="Option 3" />
		<VOption value="4" text="Option 4" />
		<VOption value="5" text="Option 5" />
		<VOption value="6" text="Option 6" />
		<VOption value="7" text="Option 7" />
	</VSelect>
</template>

<style scoped>
.select {
	--select-height: 150px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-select aria-label="Options Selector" class="select">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-select>

<style>
	.select {
		--select-height: 150px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                                   | Type                            | Description                                                                                                                 |
| -------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **appearance**                         | `fieldset` (default), `ghost`   | Sets the element's appearance                                                                                               |
| **disabled**                           | `boolean`                       | Sets the element's disabled state. A disabled element will not be included during form submission.                          |
| **error-text**                         | `string`                        | Sets the element's error text                                                                                               |
| **fixed-dropdown**                     | `boolean`                       | Sets the position strategy of the dropdown to fixed                                                                         |
| **helper-text**                        | `string`                        | Sets the element's helper text                                                                                              |
| _(deprecated as of 05/25)_<br>**icon** | _Enum_:<br/>`[icon-name]`       | A decorative icon for the element. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |
| **label**                              | `string`                        | Sets the element's label                                                                                                    |
| **multiple**                           | `boolean`                       | Sets the element to allow multiple selections                                                                               |
| **open**                               | `boolean`                       | Sets the element's menu to be open                                                                                          |
| **placeholder**                        | `string`                        | Sets the text to be displayed when no option is selected                                                                    |
| **scale**                              | `normal` (default), `condensed` | Sets the display size of the input element                                                                                  |
| **shape**                              | `rounded` (default), `pill`     | Sets the shape of the select element                                                                                        |
| **success-text**                       | `string`                        | Sets the element's success text                                                                                             |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                     |
| ---------- | ------------------------ | ------- | -------- | ----------------------------------------------- |
| **input**  | `CustomEvent<undefined>` | No      | Yes      | Fired when an option is selected or unselected. |
| **change** | `CustomEvent<undefined>` | No      | Yes      | Fired when an option is selected or unselected. |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **default**         | Default slot meant for Option component to provide the option list                                                 |
| **helper-text**     | Add HTML content for helper text                                                                                   |
| **icon**            | Add an icon to the component.                                                                                      |
| **meta**            | Show meta information after the selected option label                                                              |
| **contextual-help** | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>
