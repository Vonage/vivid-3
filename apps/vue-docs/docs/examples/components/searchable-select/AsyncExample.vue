<template>
	<div class="container">
		<VSearchableSelect
			v-model="value"
			label="Country"
			:option-filter="() => true"
			:loading="isLoading"
			@input="onInput($event.target.values)"
			@search-text-change="onSearchTextChanged($event.target.searchText)"
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
				:highlight-text="currentSearchText"
			/>
			<template #no-options><span>Start typing to search...</span></template>
			<template #loading-options><span>Loading results...</span></template>
		</VSearchableSelect>
	</div>
</template>

<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

type Option = {
	value: string;
	text: string;
};

const value = ref('');

const isLoading = ref(false);
const selectedOptions = ref<Option[]>([]);
const currentSearchResults = ref<Option[]>([]);
const currentSearchText = ref('');

const retainedOptions = computed(() =>
	selectedOptions.value.filter(
		(s) => !currentSearchResults.value.some((o) => o.value === s.value)
	)
);

const fruitsDatabase: string[] = [
	'Apple',
	'Banana',
	'Cherry',
	'Date',
	'Elderberry',
	'Fig',
	'Grape',
	'Jackfruit',
	'Kiwi',
	'Lemon',
	'Mango',
	'Nectarine',
	'Orange',
	'Passion fruit',
	'Quince',
	'Raspberry',
	'Strawberry',
	'Watermelon',
];

async function fetchOptions(searchText: string): Promise<Option[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve(
					fruitsDatabase
						.filter((fruit) =>
							fruit.toLowerCase().includes(searchText.toLowerCase())
						)
						.map((fruit) => ({
							value: fruit,
							text: fruit,
						}))
				),
			1000
		);
	});
}

let latestSearchText = '';
const debouncedSearch = debounce(async (searchText: string) => {
	const newResults = await fetchOptions(searchText);
	if (latestSearchText !== searchText) {
		return; // Results are no longer relevant
	}
	isLoading.value = false;
	currentSearchResults.value = newResults;
	currentSearchText.value = searchText;
}, 1000);

const onSearchTextChanged = (newSearchText: string) => {
	if (newSearchText === '') {
		latestSearchText = '';
		isLoading.value = false;
		currentSearchResults.value = [];
		currentSearchText.value = '';
	} else {
		latestSearchText = newSearchText;
		isLoading.value = true;
		debouncedSearch(newSearchText);
	}
};

function onInput(values: string[]) {
	selectedOptions.value = values.map(
		(v) =>
			currentSearchResults.value.find((o) => o.value === v) ||
			selectedOptions.value.find((o) => o.value === v)
	);
}

function debounce<T extends (...args: unknown[]) => void>(
	func: T,
	timeout: number
) {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, timeout);
	};
}
</script>

<style scoped>
.container {
	block-size: 230px;
}
</style>
