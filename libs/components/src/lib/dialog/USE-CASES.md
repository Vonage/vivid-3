## Dialog Form

You can use a `form` with `method=dialog` inside a dialog. This will make the dialog close when the form is submitted.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 400px
<script setup lang="ts">
import { VButton, VDialog, VLayout, VTextArea, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog headline="Dialog With Form" open>
		<template #body>
			<form method="dialog">
				<VLayout column-basis="block">
					<VTextField label="Agent Name" placeholder="Search for an agent" icon="search-line" />
					<VTextArea label="Additional Note (Optional)" />
					<VButton type="submit" label="Submit" appearance="filled" />
				</VLayout>
			</form>
		</template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 400px
<vwc-dialog headline="Dialog With Form" open>
	<form slot="body" method="dialog">
		<vwc-layout column-basis="block">
			<vwc-text-field label="Agent Name" placeholder="Search for an agent" icon="search-line"></vwc-text-field>
			<vwc-text-area label="Additional Note (Optional)"></vwc-text-area>
			<vwc-button type="submit" label="Submit" appearance="filled"></vwc-button>
		</vwc-layout>
	</form>
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

## Confirm Closing of Dialog

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 400px
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VButton, VDialog, VTextArea } from '@vonage/vivid-vue';
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');
const confirmDialog = useTemplateRef<InstanceType<typeof VDialog>>('confirm');

function onDialogCancel(e) {
	if (confirmDialog.value?.element) {
		e.preventDefault();
		confirmDialog.value.element.open = true;
	}
}

function openDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = true;
	}
}

function closeDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = false;
	}
}

function closeConfirm() {
	if (dialog.value?.element) {
		confirmDialog.value.element.open = false;
	}
}

function discardChanges() {
	closeConfirm();
	closeDialog();
}
</script>

<template>
	<VButton label="Open Dialog" @click="openDialog" />
	<VDialog ref="dialog" headline="Dialog" modal open @cancel="onDialogCancel">
		<template #body>
			<VTextArea class="textarea" id="input" label="Important Data" value="Some important data" />
		</template>
		<template #action-items>
			<VButton label="Cancel" appearance="outlined" @click="closeDialog" />
			<VButton label="Save" appearance="filled" @click="closeDialog" />
		</template>
	</VDialog>
	<VDialog ref="confirm" headline="Unsaved Changes" subtitle="Are you sure you want to discard your changes?" modal>
		<template #action-items>
			<VButton label="Cancel" appearance="outlined" @click="closeConfirm" />
			<VButton autofocus label="Discard" appearance="filled" connotation="alert" @click="discardChanges" />
		</template>
	</VDialog>
</template>

<style>
.textarea {
	width: 100%;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 400px
<style>
	vwc-text-area {
		width: 100%;
	}
</style>
<vwc-button label="Open Dialog" onclick="openDialog()"></vwc-button>
<vwc-dialog id="dialog" headline="Dialog" modal open>
	<vwc-text-area id="input" slot="body" label="Important Data" value="Some important data"></vwc-text-area>
	<vwc-button slot="action-items" label="Cancel" appearance="outlined" onclick="closeDialog()"></vwc-button>
	<vwc-button slot="action-items" label="Save" appearance="filled" onclick="closeDialog()"></vwc-button>
</vwc-dialog>
<vwc-dialog id="confirm" headline="Unsaved Changes" subtitle="Are you sure you want to discard your changes?" modal>
	<vwc-button slot="action-items" label="Cancel" appearance="outlined" onclick="closeConfirm()"></vwc-button>
	<vwc-button autofocus slot="action-items" label="Discard" appearance="filled" connotation="alert" onclick="discardChanges()"></vwc-button>
</vwc-dialog>
<script>
	document.querySelector('#dialog').addEventListener('cancel', (e) => {
		e.preventDefault();
		document.querySelector('#confirm').open = true;
	});

	function openDialog() {
		document.querySelector('#dialog').open = true;
	}

	function closeDialog() {
		document.querySelector('#dialog').open = false;
	}

	function closeConfirm() {
		document.querySelector('#confirm').open = false;
	}

	function discardChanges() {
		closeConfirm();
		closeDialog();
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>
