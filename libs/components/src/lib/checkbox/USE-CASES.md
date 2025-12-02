## In a Form

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox, VLayout, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<form method="post" action="">
		<VLayout column-spacing="small" column-basis="block">
			<VCheckbox required label="I agree to the terms and conditions"></VCheckbox>
			<div class="buttons">
				<VButton label="Reset" appearance="outlined" type="reset"></VButton>
				<VButton label="Submit" appearance="filled" type="submit"></VButton>
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

```html preview
<form method="post" action="">
	<vwc-layout column-spacing="small" column-basis="block">
		<vwc-checkbox required label="I agree to the terms and conditions"></vwc-checkbox>
		<div class="buttons">
			<vwc-button label="Reset" appearance="outlined" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>

<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Select All

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref, computed } from 'vue';
import { VCheckbox, VDivider } from '@vonage/vivid-vue';

type Option = {
	label: string;
	checked: boolean;
};

const options = ref<Option[]>([
	{ label: 'Option 1', checked: false },
	{ label: 'Option 2', checked: false },
	{ label: 'Option 3', checked: false },
]);

const selectAllChecked = computed(() => {
	return options.value.every((option) => option.checked);
});

const selectAllIndeterminate = computed(() => {
	const checkedCount = options.value.filter((option) => option.checked).length;
	return checkedCount > 0 && checkedCount < options.value.length;
});

const handleSelectAllClick = (event: Event) => {
	const target = event.currentTarget as HTMLInputElement & { checked: boolean };
	const newState = target.checked;
	options.value = options.value.map((option) => ({
		...option,
		checked: newState,
	}));
};

const handleOptionChange = (index: number, event: Event) => {
	const target = event.currentTarget as HTMLInputElement & { checked: boolean };
	options.value[index].checked = target.checked;
};
</script>

<template>
	<div class="container">
		<VCheckbox :checked="selectAllChecked" :indeterminate="selectAllIndeterminate" label="Select all" @click="handleSelectAllClick"></VCheckbox>
		<VDivider></VDivider>
		<div class="options">
			<VCheckbox v-for="(option, index) in options" :key="option.label" :label="option.label" :checked="option.checked" @change="handleOptionChange(index, $event)"></VCheckbox>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.options {
	display: contents;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-checkbox id="select-all" label="Select all"></vwc-checkbox>
	<vwc-divider></vwc-divider>
	<div class="options">
		<vwc-checkbox label="Option 1"></vwc-checkbox>
		<vwc-checkbox label="Option 2"></vwc-checkbox>
		<vwc-checkbox label="Option 3"></vwc-checkbox>
	</div>
</div>

<script>
	document.querySelector('.options').addEventListener('change', () => {
		const checkboxes = document.querySelectorAll('.options vwc-checkbox');
		const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
		const allUnchecked = Array.from(checkboxes).every((checkbox) => !checkbox.checked);
		const selectAll = document.querySelector('#select-all');
		selectAll.checked = allChecked;
		selectAll.indeterminate = !allChecked && !allUnchecked;
	});

	document.querySelector('#select-all').addEventListener('change', () => {
		const checkboxes = document.querySelectorAll('.options vwc-checkbox');
		const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
		const newState = event.target.checked;

		if (allChecked !== newState) {
			for (const checkbox of checkboxes) {
				checkbox.checked = newState;
			}
		}
	});
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.options {
		display: contents;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
