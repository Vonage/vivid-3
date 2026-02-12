## Country Select

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 550px
<script setup lang="ts">
import { VSearchableSelect, VOption, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Countries" clearable multiple style="width: 400px">
		<template #icon>
			<VIcon name="globe-line" />
		</template>
		<VOption value="afghanistan" text="Afghanistan">
			<template #icon><VIcon name="flag-afghanistan" /></template>
		</VOption>
		<VOption value="albania" text="Albania">
			<template #icon><VIcon name="flag-albania" /></template>
		</VOption>
		<VOption value="algeria" text="Algeria">
			<template #icon><VIcon name="flag-algeria" /></template>
		</VOption>
		<VOption value="argentina" text="Argentina">
			<template #icon><VIcon name="flag-argentina" /></template>
		</VOption>
		<VOption value="australia" text="Australia">
			<template #icon><VIcon name="flag-australia" /></template>
		</VOption>
		<VOption value="brazil" text="Brazil">
			<template #icon><VIcon name="flag-brazil" /></template>
		</VOption>
		<VOption value="canada" text="Canada">
			<template #icon><VIcon name="flag-canada" /></template>
		</VOption>
		<VOption value="france" text="France">
			<template #icon><VIcon name="flag-france" /></template>
		</VOption>
		<VOption value="germany" text="Germany">
			<template #icon><VIcon name="flag-germany" /></template>
		</VOption>
		<VOption value="japan" text="Japan">
			<template #icon><VIcon name="flag-japan" /></template>
		</VOption>
		<VOption value="united-kingdom" text="United Kingdom">
			<template #icon><VIcon name="flag-united-kingdom" /></template>
		</VOption>
		<VOption value="united-states" text="United States">
			<template #icon><VIcon name="flag-united-states" /></template>
		</VOption>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 550px
<vwc-searchable-select label="Countries" clearable multiple>
	<vwc-icon slot="icon" name="globe-line"></vwc-icon>
	<vwc-option value="afghanistan" text="Afghanistan">
		<vwc-icon name="flag-afghanistan" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="albania" text="Albania">
		<vwc-icon name="flag-albania" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="algeria" text="Algeria">
		<vwc-icon name="flag-algeria" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="argentina" text="Argentina">
		<vwc-icon name="flag-argentina" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="armenia" text="Armenia">
		<vwc-icon name="flag-armenia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="aruba" text="Aruba">
		<vwc-icon name="flag-aruba" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="australia" text="Australia">
		<vwc-icon name="flag-australia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="austria" text="Austria">
		<vwc-icon name="flag-austria" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="bahamas" text="Bahamas">
		<vwc-icon name="flag-bahamas" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="bahrain" text="Bahrain">
		<vwc-icon name="flag-bahrain" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="belarus" text="Belarus">
		<vwc-icon name="flag-belarus" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="belgium" text="Belgium">
		<vwc-icon name="flag-belgium" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="benin" text="Benin">
		<vwc-icon name="flag-benin" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="bolivia" text="Bolivia">
		<vwc-icon name="flag-bolivia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="botswana" text="Botswana">
		<vwc-icon name="flag-botswana" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="brazil" text="Brazil">
		<vwc-icon name="flag-brazil" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="bulgaria" text="Bulgaria">
		<vwc-icon name="flag-bulgaria" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="burkina-faso" text="Burkina Faso">
		<vwc-icon name="flag-burkina-faso" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="cambodia" text="Cambodia">
		<vwc-icon name="flag-cambodia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="canada" text="Canada">
		<vwc-icon name="flag-canada" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="cayman-islands" text="Cayman Islands">
		<vwc-icon name="flag-cayman-islands" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="central-african-republic" text="Central African Republic">
		<vwc-icon name="flag-central-african-republic" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="chad" text="Chad">
		<vwc-icon name="flag-chad" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="chile" text="Chile">
		<vwc-icon name="flag-chile" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="china" text="China">
		<vwc-icon name="flag-china" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="colombia" text="Colombia">
		<vwc-icon name="flag-colombia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="costa-rica" text="Costa Rica">
		<vwc-icon name="flag-costa-rica" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="croatia" text="Croatia">
		<vwc-icon name="flag-croatia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="cyprus" text="Cyprus">
		<vwc-icon name="flag-cyprus" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="denmark" text="Denmark">
		<vwc-icon name="flag-denmark" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="dominican-republic" text="Dominican Republic">
		<vwc-icon name="flag-dominican-republic" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="egypt" text="Egypt">
		<vwc-icon name="flag-egypt" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="el-salvador" text="El Salvador">
		<vwc-icon name="flag-el-salvador" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="estonia" text="Estonia">
		<vwc-icon name="flag-estonia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="european-union" text="European Union">
		<vwc-icon name="flag-european-union" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="finland" text="Finland">
		<vwc-icon name="flag-finland" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="france" text="France">
		<vwc-icon name="flag-france" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="georgia" text="Georgia">
		<vwc-icon name="flag-georgia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="germany" text="Germany">
		<vwc-icon name="flag-germany" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="ghana" text="Ghana">
		<vwc-icon name="flag-ghana" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="grenada" text="Grenada">
		<vwc-icon name="flag-grenada" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="guatemala" text="Guatemala">
		<vwc-icon name="flag-guatemala" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="honduras" text="Honduras">
		<vwc-icon name="flag-honduras" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="hong-kong" text="Hong Kong">
		<vwc-icon name="flag-hong-kong" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="hungary" text="Hungary">
		<vwc-icon name="flag-hungary" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="iceland" text="Iceland">
		<vwc-icon name="flag-iceland" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="india" text="India">
		<vwc-icon name="flag-india" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="indonesia" text="Indonesia">
		<vwc-icon name="flag-indonesia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="ireland" text="Ireland">
		<vwc-icon name="flag-ireland" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="israel" text="Israel">
		<vwc-icon name="flag-israel" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="italy" text="Italy">
		<vwc-icon name="flag-italy" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="jamaica" text="Jamaica">
		<vwc-icon name="flag-jamaica" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="japan" text="Japan">
		<vwc-icon name="flag-japan" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="latvia" text="Latvia">
		<vwc-icon name="flag-latvia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="liechtenstein" text="Liechtenstein">
		<vwc-icon name="flag-liechtenstein" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="lithuania" text="Lithuania">
		<vwc-icon name="flag-lithuania" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="luxembourg" text="Luxembourg">
		<vwc-icon name="flag-luxembourg" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="macao" text="Macao">
		<vwc-icon name="flag-macao" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="malaysia" text="Malaysia">
		<vwc-icon name="flag-malaysia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="malta" text="Malta">
		<vwc-icon name="flag-malta" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="mauritius" text="Mauritius">
		<vwc-icon name="flag-mauritius" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="mexico" text="Mexico">
		<vwc-icon name="flag-mexico" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="moldova" text="Moldova">
		<vwc-icon name="flag-moldova" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="netherlands" text="Netherlands">
		<vwc-icon name="flag-netherlands" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="new-zealand" text="New Zealand">
		<vwc-icon name="flag-new-zealand" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="nigeria" text="Nigeria">
		<vwc-icon name="flag-nigeria" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="norway" text="Norway">
		<vwc-icon name="flag-norway" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="pakistan" text="Pakistan">
		<vwc-icon name="flag-pakistan" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="panama" text="Panama">
		<vwc-icon name="flag-panama" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="peru" text="Peru">
		<vwc-icon name="flag-peru" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="philippines" text="Philippines">
		<vwc-icon name="flag-philippines" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="poland" text="Poland">
		<vwc-icon name="flag-poland" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="portugal" text="Portugal">
		<vwc-icon name="flag-portugal" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="puertorico" text="Puerto Rico">
		<vwc-icon name="flag-puertorico" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="romania" text="Romania">
		<vwc-icon name="flag-romania" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="russia" text="Russia">
		<vwc-icon name="flag-russia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="rwanda" text="Rwanda">
		<vwc-icon name="flag-rwanda" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="saudi-arabia" text="Saudi Arabia">
		<vwc-icon name="flag-saudi-arabia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="serbia" text="Serbia">
		<vwc-icon name="flag-serbia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="singapore" text="Singapore">
		<vwc-icon name="flag-singapore" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="slovakia" text="Slovakia">
		<vwc-icon name="flag-slovakia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="slovenia" text="Slovenia">
		<vwc-icon name="flag-slovenia" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="south-africa" text="South Africa">
		<vwc-icon name="flag-south-africa" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="south-korea" text="South Korea">
		<vwc-icon name="flag-south-korea" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="spain" text="Spain">
		<vwc-icon name="flag-spain" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="sri-lanka" text="Sri Lanka">
		<vwc-icon name="flag-sri-lanka" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="sweden" text="Sweden">
		<vwc-icon name="flag-sweden" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="switzerland" text="Switzerland">
		<vwc-icon name="flag-switzerland" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="taiwan" text="Taiwan">
		<vwc-icon name="flag-taiwan" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="tajikistan" text="Tajikistan">
		<vwc-icon name="flag-tajikistan" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="tanzania" text="Tanzania">
		<vwc-icon name="flag-tanzania" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="thailand" text="Thailand">
		<vwc-icon name="flag-thailand" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="trinidad-and-tobago" text="Trinidad and Tobago">
		<vwc-icon name="flag-trinidad-and-tobago" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="turkey" text="Turkey">
		<vwc-icon name="flag-turkey" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="ukraine" text="Ukraine">
		<vwc-icon name="flag-ukraine" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="united-arab-emirates" text="United Arab Emirates">
		<vwc-icon name="flag-united-arab-emirates" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="united-kingdom" text="United Kingdom">
		<vwc-icon name="flag-united-kingdom" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="united-states" text="United States">
		<vwc-icon name="flag-united-states" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="uruguay" text="Uruguay">
		<vwc-icon name="flag-uruguay" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="uzbekistan" text="Uzbekistan">
		<vwc-icon name="flag-uzbekistan" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="venezuela" text="Venezuela">
		<vwc-icon name="flag-venezuela" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="vietnam" text="Vietnam">
		<vwc-icon name="flag-vietnam" slot="icon"></vwc-icon>
	</vwc-option>
	<vwc-option value="zambia" text="Zambia">
		<vwc-icon name="flag-zambia" slot="icon"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>

<style>
	vwc-searchable-select {
		width: 400px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## In a Form

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VSearchableSelect, VOption, VIcon, VLayout, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<form>
		<VLayout column-spacing="small" column-basis="block">
			<div>
				<VSearchableSelect name="country" multiple required>
					<VOption value="AF" text="Afghanistan">
						<template #icon><VIcon name="flag-afghanistan" /></template>
					</VOption>
					<VOption value="AL" text="Albania">
						<template #icon><VIcon name="flag-albania" /></template>
					</VOption>
					<VOption value="DZ" text="Algeria">
						<template #icon><VIcon name="flag-algeria" /></template>
					</VOption>
				</VSearchableSelect>
			</div>
			<div class="buttons">
				<VButton label="Reset" type="reset" />
				<VButton label="Submit" appearance="filled" type="submit" />
			</div>
		</VLayout>
	</form>
</template>

<style scoped>
.buttons {
	display: flex;
	gap: 12px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-searchable-select name="country" multiple required>
				<vwc-option value="AF" text="Afghanistan">
					<vwc-icon name="flag-afghanistan" slot="icon"></vwc-icon>
				</vwc-option>
				<vwc-option value="AL" text="Albania">
					<vwc-icon name="flag-albania" slot="icon"></vwc-icon>
				</vwc-option>
				<vwc-option value="DZ" text="Algeria">
					<vwc-icon name="flag-algeria" slot="icon"></vwc-icon>
				</vwc-option>
			</vwc-searchable-select>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```

</vwc-tab-panel>
</vwc-tabs>

## Asynchronous Option Loading

To fetch options for the search text asynchronously you will need combine several features:

Use `searchText` and the `search-text-change` event to fetch options for the search text. Set `loading` while options are being fetched.

Use the `no-options` slot to indicate that options will become available when the user starts typing.

As you are now handling the filtering of options yourself, you need to disable the built-in filtering logic:

- Set `optionFilter` to always return `true` to show all options.
- Set `matchedText` on the options to the search text they were fetched with.

Already selected options need to stay present, even if they are no longer in the current result set. Use `hidden` to hide them in the dropdown.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 500px
<template>
	<div class="container">
		<VSearchableSelect v-model="value" label="Favorite fruit" :option-filter="() => true" :loading="isLoading" @input="onInput($event.target?.values ?? [])" @search-text-change="onSearchTextChanged($event.target?.searchText ?? '')">
			<VOption v-for="option in retainedOptions" :key="option.value" :value="option.value" :text="option.text" hidden />
			<VOption v-for="option in currentSearchResults" :key="option.value" :value="option.value" :text="option.text" :matched-text="currentSearchText" />
			<template #no-options><span>Start typing to search...</span></template>
			<template #loading-options><span>Loading results...</span></template>
		</VSearchableSelect>

		<VSearchableSelect v-model:values="values" label="Favorite fruits" multiple :option-filter="() => true" :loading="isLoading2" @input="onInput2($event.target?.values ?? [])" @search-text-change="onSearchTextChanged2($event.target?.searchText ?? '')">
			<VOption v-for="option in retainedOptions2" :key="option.value" :value="option.value" :text="option.text" hidden />
			<VOption v-for="option in currentSearchResults2" :key="option.value" :value="option.value" :text="option.text" :matched-text="currentSearchText2" />
			<template #no-options><span>Start typing to search...</span></template>
			<template #loading-options><span>Loading results...</span></template>
		</VSearchableSelect>
	</div>
</template>

<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
import { computed, ref } from 'vue';

const value = ref('');
const values = ref<string[]>([]);

const isLoading = ref(false);
const selectedOptions = ref<{ value: string; text: string }[]>([]);
const currentSearchResults = ref<{ value: string; text: string }[]>([]);
const currentSearchText = ref('');

const isLoading2 = ref(false);
const selectedOptions2 = ref<{ value: string; text: string }[]>([]);
const currentSearchResults2 = ref<{ value: string; text: string }[]>([]);
const currentSearchText2 = ref('');

const retainedOptions = computed(() => selectedOptions.value.filter((s) => !currentSearchResults.value.some((o) => o.value === s.value)));
const retainedOptions2 = computed(() => selectedOptions2.value.filter((s) => !currentSearchResults2.value.some((o) => o.value === s.value)));

const fruitsDatabase = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Jackfruit', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Passion fruit', 'Quince', 'Raspberry', 'Strawberry', 'Watermelon'];

async function fetchOptions(searchText: string) {
	return new Promise<{ value: string; text: string }[]>((resolve) => {
		setTimeout(
			() =>
				resolve(
					fruitsDatabase
						.filter((fruit) => fruit.toLowerCase().includes(searchText.toLowerCase()))
						.map((fruit) => ({
							value: fruit,
							text: fruit,
						}))
				),
			1000
		);
	});
}

function debounce<T extends (...args: unknown[]) => void>(func: T, timeout: number) {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

let latestSearchText = '';
const debouncedSearch = debounce(async (searchText: string) => {
	const newResults = await fetchOptions(searchText);
	if (latestSearchText !== searchText) return;
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

function onInput(valuesArr: string[]) {
	selectedOptions.value = valuesArr.map((v) => {
		const fromResults = currentSearchResults.value.find((o) => o.value === v);
		const fromSelected = selectedOptions.value.find((o) => o.value === v);
		return fromResults ?? fromSelected ?? { value: v, text: v };
	});
}

let latestSearchText2 = '';
const debouncedSearch2 = debounce(async (searchText: string) => {
	const newResults = await fetchOptions(searchText);
	if (latestSearchText2 !== searchText) return;
	isLoading2.value = false;
	currentSearchResults2.value = newResults;
	currentSearchText2.value = searchText;
}, 1000);

const onSearchTextChanged2 = (newSearchText: string) => {
	if (newSearchText === '') {
		latestSearchText2 = '';
		isLoading2.value = false;
		currentSearchResults2.value = [];
		currentSearchText2.value = '';
	} else {
		latestSearchText2 = newSearchText;
		isLoading2.value = true;
		debouncedSearch2(newSearchText);
	}
};

function onInput2(valuesArr: string[]) {
	selectedOptions2.value = valuesArr.map((v) => {
		const fromResults = currentSearchResults2.value.find((o) => o.value === v);
		const fromSelected = selectedOptions2.value.find((o) => o.value === v);
		return fromResults ?? fromSelected ?? { value: v, text: v };
	});
}
</script>

<style scoped>
.container {
	block-size: 460px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 500px
<vwc-searchable-select label="Favorite fruit">
	<span slot="no-options">Start typing to search...</span>
</vwc-searchable-select>

<vwc-searchable-select label="Favorite fruits" multiple>
	<span slot="no-options">Start typing to search...</span>
</vwc-searchable-select>

<script>
	const fruitsDatabase = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Jackfruit', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Passion fruit', 'Quince', 'Raspberry', 'Strawberry', 'Watermelon'];

	async function fetchOptions(searchText) {
		return new Promise((resolve) => {
			setTimeout(
				() =>
					resolve(
						fruitsDatabase
							.filter((fruit) => fruit.toLowerCase().includes(searchText.toLowerCase()))
							.map((fruit) => ({
								value: fruit,
								text: fruit,
							}))
					),
				1000
			);
		});
	}

	window.customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelectorAll('vwc-searchable-select').forEach((select) => {
			// Disable built-in filtering
			select.optionFilter = () => true;

			// State
			let componentState = {
				selectedOptions: [],
				currentSearchResults: [],
				currentSearchText: '',
			};

			function MyComponent(state) {
				const retainedOptions = state.selectedOptions.filter((s) => !state.currentSearchResults.some((o) => o.value === s.value));
				return [
					// Render options that are selected but no longer in the current search results
					...retainedOptions.map((option) => {
						return {
							key: option.value,
							props: {
								value: option.value,
								text: option.text,
								matchedText: '',
								hidden: true, // But hide them from the dropdown
							},
						};
					}),
					...state.currentSearchResults.map((option) => {
						return {
							key: option.value,
							props: {
								value: option.value,
								text: option.text,
								matchedText: state.currentQueryText, // Use the search text that the search was performed with
								hidden: false,
							},
						};
					}),
				];
			}

			let previousRenderedOptions = [];
			const updateState = (newState) => {
				componentState = newState;
				const newRenderedOptions = MyComponent(componentState);
				updateDOM(select, previousRenderedOptions, newRenderedOptions);
				previousRenderedOptions = newRenderedOptions;
			};

			let latestSearchText = '';
			const debouncedSearch = debounce(async (searchText) => {
				const newResults = await fetchOptions(searchText);
				if (latestSearchText !== searchText) {
					return; // Results are no longer relevant
				}
				select.loading = false;
				updateState({
					...componentState,
					currentSearchResults: newResults,
					currentQueryText: searchText,
				});
			}, 1000);

			const onSearchTextChanged = (newSearchText) => {
				if (newSearchText === '') {
					latestSearchText = '';
					select.loading = false;
					updateState({
						...componentState,
						currentSearchResults: [],
						currentQueryText: '',
					});
				} else {
					latestSearchText = newSearchText;
					select.loading = true;
					debouncedSearch(newSearchText);
				}
			};

			select.addEventListener('search-text-change', (e) => {
				onSearchTextChanged(e.currentTarget.searchText);
			});

			select.addEventListener('input', (e) => {
				updateState({
					...componentState,
					selectedOptions: e.currentTarget.values.map((v) => componentState.currentSearchResults.find((o) => o.value === v) || componentState.selectedOptions.find((o) => o.value === v)),
				});
			});
		});
	});

	function debounce(func, timeout) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	function updateDOM(select, oldRenderedOptions, newRenderedOptions) {
		const insertAfter = (afterEl, el) => {
			if (afterEl) {
				afterEl.after(el);
			} else {
				select.appendChild(el);
			}
		};

		let lastEl = null;
		for (let i = 0; i < newRenderedOptions.length; i++) {
			const newNode = newRenderedOptions[i];
			const oldNode = oldRenderedOptions.find((o) => o.key === newNode.key);
			const el = select.querySelector(`[data-key="${newNode.key}"]`) || document.createElement('vwc-option');
			el.dataset.key = newNode.key;
			for (const key of Object.keys(newNode.props)) {
				if (!oldNode || newNode.props[key] !== oldNode.props[key]) {
					el[key] = newNode.props[key];
				}
			}
			insertAfter(lastEl, el);
			lastEl = el;
		}
		for (const oldNode of oldRenderedOptions) {
			if (!newRenderedOptions.find((n) => n.key === oldNode.key)) {
				select.querySelector(`[data-key="${oldNode.key}"]`).remove();
			}
		}
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>
