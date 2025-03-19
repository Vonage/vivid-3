<template>
	<div class="container">
		<VSearchableSelect
			v-model="value"
			label="Countries"
			:filter-option="() => true"
			:loading="isLoading"
			@input="onInput($event.target.values)"
			@input:search-text="onSearchTextChanged($event.target.searchText)"
		>
			<VOption
				v-for="option in retainedOptions"
				:key="option.value"
				:value="option.value"
				:text="option.text"
				hidden
			/>
			<VOption
				v-for="option in currentSearchResults"
				:key="option.value"
				:value="option.value"
				:text="option.text"
				:highlight-text="currentQueryText"
			/>
			<template #no-options><span>Start typing to search...</span></template>
			<template #loading-options><span>Loading results...</span></template>
		</VSearchableSelect>
	</div>
</template>

<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

function debounce(func, timeout) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

const value = ref('');

const isLoading = ref(false);
const selectedOptions = ref([]);
const currentSearchResults = ref([]);
const currentQueryText = ref('');

const retainedOptions = computed(() =>
	selectedOptions.value.filter(
		(s) => !currentSearchResults.value.some((o) => o.value === s.value)
	)
);

function onInput(values) {
	selectedOptions.value = values.map(
		(v) =>
			currentSearchResults.value.find((o) => o.value === v) ||
			selectedOptions.value.find((o) => o.value === v)
	);
}

async function loadOptions(searchText) {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (searchText === 'empty') {
				resolve([]);
				return;
			}
			const results = [
				{
					value: `always-there`,
					text: `I'm always there`,
				},
				{
					value: `${encodeURIComponent(searchText)}-value-1`,
					text: `Example ${searchText} Option 1`,
				},
				{
					value: `${encodeURIComponent(searchText)}-value-2`,
					text: `Example ${searchText} Option 2`,
				},
				{
					value: `${encodeURIComponent(searchText)}-value-3`,
					text: `Example ${searchText} Option 3`,
				},
			];
			resolve(results);
		}, 1000);
	});
}

let latestQueryString = '';
const debouncedSearch = debounce(async (queryString) => {
	const newResults = await loadOptions(queryString);
	if (latestQueryString !== queryString) {
		return;
	}
	isLoading.value = false;
	currentSearchResults.value = newResults as any[];
	currentQueryText.value = queryString;
}, 1000);

const onSearchTextChanged = (newSearchText: string) => {
	console.log('newSearchText', newSearchText);
	if (newSearchText === '') {
		console.log('clearing latestQueryString');
		latestQueryString = '';
		isLoading.value = false;
		currentSearchResults.value = [];
		currentQueryText.value = '';
	} else {
		latestQueryString = newSearchText;
		isLoading.value = true;
		debouncedSearch(newSearchText);
	}
};
</script>

<style scoped>
.container {
	block-size: 230px;
}
</style>
