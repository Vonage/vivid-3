<script setup lang="ts">
import {
	VButton,
	VDialog,
	VOption,
	VSearchableSelect,
	VSelect,
	VTooltip,
} from '@vonage/vivid-vue';
import { ref } from 'vue';

const isOpen = ref(false);
const selected = ref('1');

function delayedClose() {
	setTimeout(() => {
		isOpen.value = false;
	}, 1000);
}
</script>

<template>
	<main>
		<VButton
			label="Open Dialog"
			data-testid="open-dialog"
			@click="isOpen = true"
		/>
		<VDialog
			aria-label="Dialog"
			data-testid="dialog"
			headline="My Dialog"
			modal
			:open="isOpen"
			@close="isOpen = false"
		>
			<template #body>
				<VTooltip data-testid="tooltip" text="Tooltip" placement="top">
					<template #anchor
						><VButton label="With tooltip" data-testid="with-tooltip"
					/></template>
				</VTooltip>
				<VSelect data-testid="select" label="Select" v-model="selected">
					<VOption value="1" label="Option 1" text="Text 1" />
					<VOption value="2" label="Option 2" text="Text 2" />
					<VOption value="3" label="Option 3" text="Text 3" />
				</VSelect>
				<VSearchableSelect multiple data-testid="searchable" label="Searchable">
					<VOption value="1" label="Option 1" text="Text 1" />
					<VOption value="2" label="Option 2" text="Text 2" />
					<VOption value="3" label="Option 3" text="Text 3" />
				</VSearchableSelect>
			</template>
			<template #footer>
				<VButton
					label="Delayed Close"
					data-testid="delayed-close"
					@click="delayedClose"
				/>
			</template>
		</VDialog>
		<pre>{{
			JSON.stringify({
				isOpen,
				selected,
			})
		}}</pre>
	</main>
</template>
