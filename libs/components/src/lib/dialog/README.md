## Usage

<vwc-note connotation="information">
	<vwc-icon name="info-line" slot="icon" label="Note:"></vwc-icon>
	
	Dialog uses the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"><code>native dialog</code></a> element.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog headline="I'm a dialog" open />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDialog } from '@vonage/vivid';

registerDialog('your-prefix');
```

```html preview 150px
<script type="module">
	import { registerDialog } from '@vonage/vivid';
	registerDialog('your-prefix');
</script>

<your-prefix-dialog headline="I'm a dialog" open></your-prefix-text-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

## Modal

Use the `modal` attribute to set the dialog as Modal

<vwc-note connotation="information" headline="Dialogs can be modal or non-modal">
	<vwc-icon name="info-line" slot="icon" label="Note:"></vwc-icon>
<ul>
<li>Modal dialogs prevent users from interacting with the rest of the application until the dialog is closed and render a backdrop behind the dialog.</li>
<li>Non-modal dialogs allow users to interact with the rest of the application while the dialog is open.</li>
</ul>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { VButton, VCheckbox, VDialog, VRadio, VRadioGroup } from '@vonage/vivid-vue';
const modal = ref('false');
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');

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
</script>

<template>
	<div class="buttons-wrapper">
		<VRadioGroup v-model="modal">
			<VRadio label="Non-modal" value="false" />
			<VRadio label="Modal" value="true" />
		</VRadioGroup>
		<VButton appearance="filled" label="Open Dialog" @click="openDialog" />
	</div>

	<VDialog ref="dialog" :modal="modal === 'true'" icon="info" headline="Headline" subtitle="subtitle">
		<VCheckbox slot="footer" label="Checkbox" />
		<VButton slot="action-items" label="Cancel" appearance="outlined" @click="closeDialog" /><VButton slot="action-items" label="Ok" appearance="filled" @click="closeDialog" />
	</VDialog>
</template>

<style>
.buttons-wrapper {
	display: flex;
	align-items: center;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<div class="buttons-wrapper">
	<vwc-radio-group>
		<vwc-radio label="Non-modal" value="false" checked></vwc-radio>
		<vwc-radio label="Modal" value="true"></vwc-radio>
	</vwc-radio-group>
	<vwc-button appearance="filled" label="Open Dialog" onclick="openDialog()"></vwc-button>
</div>

<vwc-dialog id="vwc-dialog" icon="info" headline="Headline" subtitle="subtitle">
	<vwc-checkbox slot="footer" label="Checkbox"></vwc-checkbox>
	<vwc-button slot="action-items" label="Cancel" appearance="outlined" onclick="closeDialog()"></vwc-button>
	<vwc-button slot="action-items" label="Ok" appearance="filled" onclick="closeDialog()"></vwc-button>
</vwc-dialog>

<script>
	const dialog = document.querySelector('#vwc-dialog');

	function openDialog() {
		dialog.open = true;
	}

	document.querySelector('vwc-radio-group').addEventListener('change', (e) => {
		dialog.modal = e.currentTarget.value === 'true';
	});

	function closeDialog() {
		dialog.open = false;
	}
</script>

<style>
	.buttons-wrapper {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

Sets or returns whether a dialog should be open or not.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VButton, VDialog } from '@vonage/vivid-vue';
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');

function toggleDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = !dialog.value.element.open;
	}
}
</script>

<template>
	<VButton label="Toggle Dialog Open" @click="toggleDialog" appearance="outlined" />
	<VDialog ref="dialog" headline="I'm a Dialog" subtitle="subtitle" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-button label="Toggle Dialog Open" onclick="dialog.open = !dialog.open" appearance="outlined"></vwc-button> <vwc-dialog id="dialog" headline="I'm a Dialog" subtitle="subtitle"></vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

## Dismiss

<vwc-note connotation="warning" headline="Add dismiss options with caution">
	<vwc-icon name="warning-line" slot="icon" label="Warning"></vwc-icon>
	
	When using this attribute, ensure that the dialog can be closed by other means.

</vwc-note>

### No-light-dismiss

Use the `no-light-dismiss` attribute to prevent a modal dialog from being dismissed by clicking outside it.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VButton, VDialog } from '@vonage/vivid-vue';
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');
function openDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = true;
	}
}
</script>

<template>
	<VButton label="Open modal dialog" @click="openDialog" appearance="outlined" />
	<VDialog ref="dialog" no-light-dismiss headline="Headline" modal />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-button label="Open modal dialog" onclick="document.querySelector('vwc-dialog').open = true" appearance="outlined"></vwc-button> <vwc-dialog no-light-dismiss headline="Headline" modal></vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### No-Dismiss-On-Esc

Use the `no-dismiss-on-esc` attribute to prevent a modal dialog from being dismissed by pressing ESC.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VButton, VDialog } from '@vonage/vivid-vue';
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');
function openDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = true;
	}
}
</script>

<template>
	<VButton label="Open modal dialog" @click="openDialog" appearance="outlined" />
	<VDialog ref="dialog" no-dismiss-on-esc headline="Headline" modal />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-button label="Open modal dialog" onclick="document.querySelector('vwc-dialog').open = true" appearance="outlined"></vwc-button> <vwc-dialog no-dismiss-on-esc headline="Headline" modal></vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### No-Dismiss-Button

Use the `no-dismiss-button` attribute to remove the dismiss button from the dialog.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VButton, VDialog } from '@vonage/vivid-vue';
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');
function openDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = true;
	}
}
</script>

<template>
	<VButton label="Open modal dialog" @click="openDialog" appearance="outlined" />
	<VDialog ref="dialog" no-dismiss-button headline="Headline" modal />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-button label="Open modal dialog" onclick="document.querySelector('vwc-dialog').open = true" appearance="outlined"></vwc-button> <vwc-dialog no-dismiss-button headline="Headline" modal></vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### Non-Dismissible

The `non-dismissible` attribute combines `no-light-dismiss`, `no-dismiss-on-esc`, and `no-dismiss-button`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { VButton, VDialog } from '@vonage/vivid-vue';
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');
function openDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = true;
	}
}
</script>

<template>
	<VButton label="Open modal dialog" @click="openDialog" appearance="outlined" />
	<VDialog ref="dialog" non-dismissible headline="Headline" modal />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-button label="Open modal dialog" onclick="document.querySelector('vwc-dialog').open = true" appearance="outlined"></vwc-button> <vwc-dialog non-dismissible headline="Headline" modal></vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### Dismiss-Button-Aria-Label

The dismiss button is automatically given a localized version of the word "close".  
This can be overridden using `dismiss-button-aria-label`.

## Return Value

Use `returnValue` to get or set the return value.  
Often used to indicate which button the user pressed to close it.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { VButton, VDialog } from '@vonage/vivid-vue';
const returnValue = ref('');
const dialog = useTemplateRef<InstanceType<typeof VDialog>>('dialog');

function openDialog() {
	if (dialog.value?.element) {
		dialog.value.element.open = true;
	}
}

function handleClick(e: any) {
	const buttonType = e.currentTarget.label;
	console.log(buttonType);
	if (dialog.value?.element) {
		dialog.value.element.returnValue = buttonType;
		dialog.value.element.open = false;
	}
}

function onDialogClose() {
	if (dialog.value?.element) {
		returnValue.value = dialog.value.element.returnValue;
	}
}
</script>

<template>
	<div class="wrapper">
		<div>Returned Value: <span v-text="returnValue"></span></div>
		<VButton label="Open Dialog" appearance="outlined" @click="openDialog" />
	</div>
	<VDialog open ref="dialog" headline="Returning Dialog" @close="onDialogClose">
		<template #action-items>
			<VButton appearance="outlined" label="Cancel" @click="handleClick" />
			<VButton appearance="filled" label="Action" @click="handleClick" />
		</template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<div class="wrapper">
	<div>
		Returned Value:
		<span id="dialog-output"></span>
	</div>
	<vwc-button label="Open Dialog" appearance="outlined" onclick="openDialog()"></vwc-button>
</div>
<vwc-dialog open headline="Returning Dialog">
	<vwc-button slot="action-items" appearance="outlined" label="Cancel"></vwc-button>
	<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
</vwc-dialog>

<script>
	(function handleReturnValue() {
		function handleClick(e) {
			buttonType = e.currentTarget.label;
			console.log(buttonType);
			dialog.returnValue = buttonType;
			dialog.open = false;
		}

		cancelButton = document.querySelector('[label="Cancel"]');
		actionButton = document.querySelector('[label="Action"]');
		dialog = document.querySelector('vwc-dialog');
		dialogOutput = document.querySelector('#dialog-output');

		cancelButton.onclick = actionButton.onclick = handleClick;
		dialog.addEventListener('close', (e) => (dialogOutput.innerText = dialog.returnValue));
		window.handleClick = handleClick;
	})();

	function openDialog() {
		document.querySelector('vwc-dialog').open = true;
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Graphic Slot

Use the `graphic` slot in order to replace the icon.

The `graphic` slot overrides the [icon](/components/dialog/#icons) property.
Use the slot if a colored icon is needed or an icon with different dimensions.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog headline="Dialog With Graphic Slot" open icon-placement="side">
		<template #graphic><img src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5" /></template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-dialog headline="Dialog With Graphic Slot" open icon-placement="side">
	<img slot="graphic" src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5" />
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### Body Slot

Use the `body` slot in order to add custom HTML to the dialog.

<vwc-note connotation="information" headline="Body slot with top border">
	<vwc-icon name="info-line" slot="icon"></vwc-icon>
	
	When using body slot with a <code>subtitle</code> in the header, a separator will be added between the two.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 440px
<script setup lang="ts">
import { VButton, VDialog, VLayout, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog open headline="Dialog Content" subtitle="Dialog with body content">
		<template #body>
			<VLayout gutters="small-block">
				<form>
					<VLayout column-basis="block">
						<VTextField label="Name" />
						<VTextField label="Password" type="password" />
						<VButton label="Login" appearance="filled" />
					</VLayout>
				</form>
			</VLayout>
		</template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 440px
<vwc-dialog open headline="Dialog Content" subtitle="Dialog with body content">
	<vwc-layout slot="body" gutters="small-block">
		<form>
			<vwc-layout column-basis="block">
				<vwc-text-field label="Name"></vwc-text-field>
				<vwc-text-field label="Password" type="password"></vwc-text-field>
				<vwc-button label="Login" appearance="filled"></vwc-button>
			</vwc-layout>
		</form>
	</vwc-layout>
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

#### Full-Width-Body

To remove the body inline padding use `full-width-body`.  
Use `full-width-body` if Progress-Bar or Tabs are needed in the Dialog.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 400px
<script setup lang="ts">
import { VDialog, VLayout, VProgress, VTextArea, VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog open icon-placement="side" icon="info" headline="Dialog Headline" full-width-body>
		<template #body>
			<div class="dialog-body">
				<VProgress :min="0" :max="50" :value="12.5" shape="sharp" connotation="pacific" />
				<VLayout column-basis="block" gutters="medium-inline">
					<form>
						<VLayout column-basis="block">
							<VTextField label="Agent Name" placeholder="Search for an agent" icon="search-line" />
							<VTextArea label="Additional Note (Optional)" />
						</VLayout>
					</form>
				</VLayout>
			</div>
		</template>
	</VDialog>
</template>

<style>
.dialog-body {
	display: flex;
	flex-direction: column;
	gap: 24px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 400px
<vwc-dialog open icon-placement="side" icon="info" headline="Dialog Headline" full-width-body>
	<div slot="body" class="dialog-body">
		<vwc-progress min="0" max="50" value="12.5" shape="sharp" connotation="pacific"></vwc-progress>
		<vwc-layout column-basis="block" gutters="medium-inline">
			<form>
				<vwc-layout column-basis="block">
					<vwc-text-field label="Agent Name" placeholder="Search for an agent" icon="search-line"></vwc-text-field>
					<vwc-text-area label="Additional Note (Optional)"></vwc-text-area>
				</vwc-layout>
			</form>
		</vwc-layout>
	</div>
</vwc-dialog>

<style>
	.dialog-body {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Action Items Slot

Use the `action-items` slot to add action items to the bottom of the dialog.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VButton, VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog open headline="Dialog with primary and secondary actions" subtitle="This is an example of the dialog with slotted buttons">
		<template #action-items> <VButton slot="action-items" appearance="outlined" label="Cancel" /><VButton slot="action-items" appearance="filled" label="Action" /> </template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-dialog open headline="Dialog with primary and secondary actions" subtitle="This is an example of the dialog with slotted buttons">
	<vwc-button slot="action-items" appearance="outlined" label="Cancel"></vwc-button>
	<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### Footer Slot

Use the `footer` slot in order to add additional content to the bottom of the dialog.

<vwc-note connotation="information"  headline="Using Both Footer And Action-Items Slots">
	<vwc-icon name="info-line" slot="icon"></vwc-icon>
  
	When used in combination with <code>action-items</code> slot, the <code>footer</code> content will appear to the left of the action items.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VButton, VCheckbox, VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog open headline="Dialog with footer" subtitle="This is an example of the dialog with a checkbox inside footer">
		<template #footer><VCheckbox slot="footer" label="I agree" /></template>
		<template #action-items><VButton appearance="filled" label="Ok" /></template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-dialog open headline="Dialog with footer" subtitle="This is an example of the dialog with a checkbox inside footer">
	<vwc-checkbox slot="footer" label="I agree"></vwc-checkbox>
	<vwc-button slot="action-items" appearance="filled" label="Ok"></vwc-button>
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

### Main Slot

Dialog has predefined content style template.
Use the main slot to fully override a Dialog's predefined template with your own.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 130px
<script setup lang="ts">
import { VDialog, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog open>
		<template #main>
			<VLayout column-basis="block" gutters="medium"> Use main slot for your own layout and content </VLayout>
		</template>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 130px
<vwc-dialog open>
	<vwc-layout slot="main" column-basis="block" gutters="medium"> Use main slot for your own layout and content </vwc-layout>
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Z-index

Use `--dialog-z-index` for a different `z-index` value than 1.

<vwc-note connotation="information"  headline="Dialog z-index">
	<vwc-icon name="info-line" slot="icon"></vwc-icon>
	
	<code>z-index</code> will affect only id the Dialog is not <code>modal</code>.

</vwc-note>

### Inline min & max size

The dialog has default `--dialog-min-inline-size` and `--dialog-max-inline-size` values, which can be changed if needed.

Setting the same value for `--dialog-min-inline-size` and `--dialog-max-inline-size` will set a definitive width to the dialog.

<vwc-note connotation="information"  headline="Dialog in Mobile">
	<vwc-icon name="info-line" slot="icon"></vwc-icon>
  
	When setting a new value for <code>--dialog-min-inline-size</code> and <code>--dialog-max-inline-size</code> take in consideration if different values are needed for mobile.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 230px
<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog class="dialog" icon="info" headline="Headline" subtitle="Subtitle content" open />
</template>

<style>
.dialog {
	--dialog-min-inline-size: 560px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 230px
<vwc-dialog class="dialog" icon="info" headline="Headline" subtitle="Subtitle content" open></vwc-dialog>

<style>
	.dialog {
		--dialog-min-inline-size: 560px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Block-Size

The dialog has a default `--dialog-max-block-size`. If the content is larger, the dialog will be scrollable.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog class="dialog" icon="info" headline="Headline" subtitle="Subtitle content" open />
</template>

<style>
.dialog {
	--dialog-max-block-size: 100px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-dialog class="dialog" icon="info" headline="Headline" subtitle="Subtitle content" open></vwc-dialog>

<style>
	.dialog {
		--dialog-max-block-size: 100px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Inset

When the dialog is not used as a modal, you can overwrite default inset values using `--dialog-inset-inline` and `--dialog-inset-block` variables.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog class="dialog" icon="info" headline="Headline" subtitle="Subtitle content" open />
</template>

<style>
.dialog {
	--dialog-inset-inline: 50% 0;
	--dialog-inset-block: 24px 0;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-dialog class="dialog" icon="info" headline="Headline" subtitle="Subtitle content" open></vwc-dialog>

<style>
	.dialog {
		--dialog-inset-inline: 50% 0;
		--dialog-inset-block: 24px 0;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name                          | Type                                  | Description                                                                                                                                 |
| ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **dismiss-button-aria-label** | `string`                              | Sets a custom aria-label to the close button                                                                                                |
| **full-width-body**           | `boolean`                             | Sets the element's body to full width (no padding)                                                                                          |
| **headline**                  | `string`                              | Sets the element's headline                                                                                                                 |
| **icon**                      | Enum:<br/>`[icon-name]`               | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`'s |
| **icon-placement**            | Enum:<br/>`[side]` (default), `[top]` | Sets the element's icon placement                                                                                                           |
| **modal**                     | `boolean`                             | Sets the element's to be opened                                                                                                             |
| **no-dismiss-button**         | `boolean`                             | Remove the element's dismiss button                                                                                                         |
| **no-dismiss-on-esc**         | `boolean`                             | prevent a modal dialog from being dismissed by pressing esc                                                                                 |
| **no-light-dismiss**          | `boolean`                             | prevent a modal dialog from being dismissed by clicking outside of it.                                                                      |
| **non-dismissible**           | `boolean`                             | combines `no-light-dismiss`, `no-dismiss-on-esc`, and `no-dismiss-button`                                                                   |
| **open**                      | `boolean`                             | Sets the element's to be opened                                                                                                             |
| **returnValue**               | `string`                              | Sets the element's to be opened                                                                                                             |
| **subtitle**                  | `string`                              | Sets the element's return value                                                                                                             |
| **scrollable-body**           | `boolean`                             | Makes only the element's content area between the header and footer scrollable                                                              |

</div>

### Slots

<div class="table-wrapper">

| Name             | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| **action-items** | Use for adding action items to the bottom of the dialog    |
| **body**         | Add custom content to the dialog's body                    |
| **footer**       | Add additional content to the bottom of the dialog.        |
| **graphic**      | Add graphic element to dialog. Overrides the icon property |
| **main**         | Override a card's predefined template                      |

</div>

## Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                                                                                                                   |
| ---------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open**   | `CustomEvent<undefined>` | No      | Yes      | The `open` event fires when the dialog opens.                                                                                                                 |
| **close**  | `CustomEvent<string>`    | No      | Yes      | The `close` event fires when the dialog closes (either via user interaction or via the API). It returns the return value inside the event's details property. |
| **cancel** | `CustomEvent<undefined>` | No      | Yes      | The `cancel` event fires when the user requests to close the dialog. You can prevent the dialog from closing by calling `.preventDefault()` on the event.     |

</div>

## Methods

<div class="table-wrapper">

| Namen         | Returns | Description                                                                 |
| ------------- | ------- | --------------------------------------------------------------------------- |
| **show**      | `void`  | Shows the dialog.                                                           |
| **close**     | `void`  | Closes the dialog.                                                          |
| **showModal** | `void`  | Shows the dialog as a modal, irregardless of the value of the modal member. |

</div>
