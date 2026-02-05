## Selectable Tag Group

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTag, VTagGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VTagGroup>
		<VTag label="First tag" selectable selected />
		<VTag label="Second tag" selectable />
		<VTag label="Third tag" selectable selected />
	</VTagGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tag-group>
	<vwc-tag label="First tag" selectable selected></vwc-tag>
	<vwc-tag label="Second tag" selectable></vwc-tag>
	<vwc-tag label="Third tag" selectable selected></vwc-tag>
</vwc-tag-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Removable Tag Group

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTag, VTagGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VTagGroup>
		<VTag label="First tag" removable />
		<VTag label="Second tag" removable />
		<VTag label="Third tag" removable />
	</VTagGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tag-group>
	<vwc-tag label="First tag" removable></vwc-tag>
	<vwc-tag label="Second tag" removable></vwc-tag>
	<vwc-tag label="Third tag" removable></vwc-tag>
</vwc-tag-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Searchable Select with External Tags

When set, the selected Tags are displayed outside of Searchable Select components.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import {
	VIcon,
	VOption,
	VSearchableSelect,
	VTag,
	VTagGroup,
} from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

const countriesOptions = [
	{ value: 'AF', text: 'Afghanistan', icon: 'flag-afghanistan' },
	{ value: 'AL', text: 'Albania', icon: 'flag-albania' },
	{ value: 'DZ', text: 'Algeria', icon: 'flag-algeria' },
];
const companyOptions = [
	{ value: 'ngo', text: 'Non-Governmental Organization' },
	{ value: 'gov', text: 'Governmental Organization' },
	{ value: 'edu', text: 'Educational Institution' },
];

const selectedCountries = ref<string[]>([]);
const selectedCompanyTypes = ref<string[]>([]);

const externalTags = computed(() => {
	const tags: { value: string; text: string; source: 'countries' | 'company' }[] = [];
	for (const v of selectedCountries.value) {
		const o = countriesOptions.find((opt) => opt.value === v);
		if (o) tags.push({ value: o.value, text: o.text, source: 'countries' });
	}
	for (const v of selectedCompanyTypes.value) {
		const o = companyOptions.find((opt) => opt.value === v);
		if (o) tags.push({ value: o.value, text: o.text, source: 'company' });
	}
	return tags;
});

function onTagRemoved(e: CustomEvent) {
	const target = e.target as HTMLElement | null;
	const value = target?.dataset?.value;
	const source = target?.dataset?.source as 'countries' | 'company' | undefined;
	if (value === undefined || !source) return;
	if (source === 'countries') {
		selectedCountries.value = selectedCountries.value.filter((v) => v !== value);
	} else {
		selectedCompanyTypes.value = selectedCompanyTypes.value.filter((v) => v !== value);
	}
}
</script>

<template>
	<VSearchableSelect
		external-tags
		multiple
		label="Countries"
		clearable
		v-model:values="selectedCountries"
	>
		<VOption
			v-for="opt in countriesOptions"
			:key="opt.value"
			:value="opt.value"
			:text="opt.text"
		>
			<template #icon>
				<VIcon :name="opt.icon" />
			</template>
		</VOption>
	</VSearchableSelect>
	<VSearchableSelect
		external-tags
		multiple
		label="Company Type"
		clearable
		v-model:values="selectedCompanyTypes"
	>
		<VOption
			v-for="opt in companyOptions"
			:key="opt.value"
			:value="opt.value"
			:text="opt.text"
		/>
	</VSearchableSelect>
	<VTagGroup class="tag-group">
		<VTag
			v-for="tag in externalTags"
			:key="`${tag.source}-${tag.value}`"
			:label="tag.text"
			removable
			:data-value="tag.value"
			:data-source="tag.source"
			@removed="onTagRemoved"
		/>
	</VTagGroup>
</template>

<style scoped>
.tag-group {
	display: block;
	margin-top: 12px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-searchable-select external-tags multiple label="Countries" clearable>
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
<vwc-searchable-select external-tags multiple label="Company Type" clearable>
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
</vwc-searchable-select>
<vwc-tag-group></vwc-tag-group>

<script>
	function updateTags() {
		document.querySelector('vwc-tag-group').innerHTML = '';
		for (const option of document.querySelectorAll('vwc-option')) {
			if (option.selected) {
				const tag = document.createElement('vwc-tag');
				tag.label = option.text;
				tag.removable = true;
				tag.dataset.value = option.value;
				document.querySelector('vwc-tag-group').append(tag);
			}
		}
	}
	for (const select of document.querySelectorAll('vwc-searchable-select')) {
		select.addEventListener('change', updateTags);
	}
	updateTags();
	document.querySelector('vwc-tag-group').addEventListener('removed', (event) => {
		const option = document.querySelector(`vwc-option[value="${event.target.dataset.value}"]`);
		option.selected = false;
		updateTags();
	});
</script>

<style>
	vwc-tag-group {
		display: block;
		margin-top: 12px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
