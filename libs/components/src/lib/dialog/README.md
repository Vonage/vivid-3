## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/dialog';
```

or, if you need to use a unique prefix:

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
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VDialog } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog headline="I'm a dialog" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information" icon="info-line">
	<p>The dialog uses the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)"><code>native dialog</code></a> element.</p>
</vwc-note>



## Modal

Use the `modal` attribute to set the dialog as Modal

```html preview 300px
<div class="buttons-wrapper">
	<vwc-radio-group>
		<vwc-radio label="Non-modal" value="false" checked></vwc-radio>
		<vwc-radio label="Modal" value="true"></vwc-radio>
	</vwc-radio-group>
	<vwc-button
		appearance="filled"
		label="Open Dialog"
		onclick="openDialog()"
	></vwc-button>
</div>

<vwc-dialog id="vwc-dialog" icon="info" headline="Headline" subtitle="subtitle">
	<vwc-checkbox slot="footer" label="Checkbox"></vwc-checkbox>
	<vwc-button
		slot="action-items"
		label="Cancel"
		appearance="outlined"
		onclick="closeDialog()"
	></vwc-button>
	<vwc-button
		slot="action-items"
		label="Ok"
		appearance="filled"
		onclick="closeDialog()"
	></vwc-button>
</vwc-dialog>

<script>
	const dialog = document.querySelector('#vwc-dialog');

	function openDialog() {
		dialog.open = true;
	}

	document.querySelector('vwc-radio-group').addEventListener('change', (e) => {
		dialog.modal = e.target.value === 'true';
	});

	function closeDialog() {
		dialog.open = false;
	}
</script>

<style>
.buttons-wrapper {
display: flex; align-items: center; gap: 16px;
}
</style>
```


## Open

Sets or returns whether a dialog should be open or not.

```html preview 230px
<vwc-button
	label="Toggle Dialog Open"
	onclick="dialog.open = !dialog.open"
></vwc-button>
<vwc-dialog id="dialog" headline="I'm a Dialog" subtitle="subtitle"></vwc-dialog>
```


## Dismiss
<vwc-note connotation="warning" icon="warning-line" headline="Remove dismiss options with caution">
<p>When using this attribute, ensure that the dialog can be closed by other means.</p>
</vwc-note>
### No-light-dismiss

Use the `no-light-dismiss` attribute to prevent a modal dialog from being dismissed by clicking outside it.


```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
></vwc-button>
<vwc-dialog no-light-dismiss headline="Headline" modal></vwc-dialog>
```

### No-Dismiss-On-Esc

Use the `no-dismiss-on-esc` attribute to prevent a modal dialog from being dismissed by pressing ESC.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
></vwc-button>
<vwc-dialog no-dismiss-on-esc headline="Headline" modal></vwc-dialog>
```

### No-Dismiss-Button

Use the `no-dismiss-button` attribute to remove the dismiss button from the dialog.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
></vwc-button>
<vwc-dialog no-dismiss-button headline="Headline" modal></vwc-dialog>
```

### Non-Dismissible

The `non-dismissible` attribute combines `no-light-dismiss`, `no-dismiss-on-esc`, and `no-dismiss-button`.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
></vwc-button>
<vwc-dialog non-dismissible headline="Headline" modal></vwc-dialog>
```


## Return Value

Use `returnValue` to get or set the return value.  
Often used to indicate which button the user pressed to close it.

```html preview 250px
<div class="wrapper">
<div>
	Returned Value:
	<span id="dialog-output"></span>
</div>
<vwc-button label="Open Dialog" appearance="outlined" onclick="openDialog()"></vwc-button>
</div>
<vwc-dialog open headline="Returning Dialog">
	<vwc-button
		slot="action-items"
		appearance="outlined"
		label="Cancel"
	></vwc-button>
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Action"
	></vwc-button>
</vwc-dialog>


<script>
	(function handleReturnValue() {
		function handleClick(e) {
			buttonType = e.target.label;
			console.log(buttonType);
			dialog.returnValue = buttonType;
			dialog.open = false;
		}

		cancelButton = document.querySelector('[label="Cancel"]');
		actionButton = document.querySelector('[label="Action"]');
		dialog = document.querySelector('vwc-dialog');
		dialogOutput = document.querySelector('#dialog-output');

		cancelButton.onclick = actionButton.onclick = handleClick;
		dialog.addEventListener(
			'close',
			(e) => (dialogOutput.innerText = dialog.returnValue)
		);
		window.handleClick = handleClick;
	})();

	function openDialog() {
		document.querySelector('vwc-dialog').open = true;
	}
</script>
```

## Slots

### Graphic Slot

Use the `graphic` slot in order to replace the icon.

```html preview 200px
<vwc-dialog open>
	<img
		slot="graphic"
		src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5"
	/>
</vwc-dialog>
```

### Body Slot

Use the `body` slot in order to add custom HTML to the dialog.

When using in combination with a `subheader`, a separator will be added between the two.

```html preview 420px
<style>
	html {
		--dialog-max-block-size: 360px;
	}
	div {
		margin-block-start: 24px;
	}
</style>
<vwc-dialog open headline="Dialog Content" subtitle="Dialog with body content">
	<div slot="body">
		<form>
			<vwc-layout column-basis="block">
				<vwc-text-field label="Name"></vwc-text-field>
				<vwc-text-field label="Password" type="password"></vwc-text-field>
				<vwc-button label="Login" appearance="filled"></vwc-button>
			</vwc-layout>
		</form>
	</div>
</vwc-dialog>
```

#### Full-Width-Body

To remove the body inline padding use `full-width-body`.

- Type: boolean
- Default: false

```html preview 400px
<style>
	vwc-progress {
		margin-block-end: 24px;
		display: block;
	}
</style>
<vwc-dialog
	open
	icon-placement="side"
	icon="info"
	headline="Dialog Headline"
	full-width-body
>
	<div slot="body">
		<vwc-progress
			min="0"
			max="50"
			value="12.5"
			shape="sharp"
			connotation="pacific"
		></vwc-progress>
		<vwc-layout column-basis="block" gutters="medium-inline">
			<form>
				<vwc-layout column-basis="block">
					<vwc-text-field
						label="Agent Name"
						placeholder="Search for an agent"
						icon="search-line"
					></vwc-text-field>
					<vwc-text-area label="Additional Note (Optional)"></vwc-text-area>
				</vwc-layout>
			</form>
		</vwc-layout>
	</div>
</vwc-dialog>
```

### Action Items Slot

Use the `action-items` slot to add action items to the bottom of the dialog.

```html preview 250px
<vwc-dialog
	open
	headline="Dialog with primary and secondary actions"
	subtitle="This is an example of the dialog with slotted buttons"
>
	<vwc-button
		slot="action-items"
		appearance="outlined"
		label="Cancel"
	></vwc-button>
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Action"
	></vwc-button>
</vwc-dialog>
```

### Footer Slot

Use the `footer` slot in order to add additional content to the bottom of the dialog.

When used in combination with `action-items` slot, the `footer` content will appear to the left of the action items.

```html preview 250px
<vwc-dialog
	open
	headline="Dialog with footer"
	subtitle="This is an example of the dialog with a checkbox inside footer"
>
	<vwc-checkbox slot="footer" label="I agree"></vwc-checkbox>
	<vwc-button slot="action-items" appearance="filled" label="Ok"></vwc-button>
</vwc-dialog>
```

### Main Slot

Dialog is battery charged with an opinionated template.
Assign nodes to the `main` slot to fully override a dialog’s predefined template with your own.
Note that all styles will be overridden including the dialog's padding. See the example below on how to set padding to a dialog using the `main` slot.

```html preview 100px
<style>
	.demo-main {
		padding: 8px;
	}
</style>

<vwc-dialog open>
	<div slot="main" class="demo-main">
		Use main slot for your own layout and content
	</div>
</vwc-dialog>
```

## CSS Variables

### Z-index

When the dialog is not modal its initial z-index can be changed if needed by setting `--dialog-z-index`.

### Inline min & max size

The dialog has a default `--dialog-min-inline-size` and `--dialog-max-inline-size`, which can be changed if needed.

Setting the same value for `--dialog-min-inline-size` and `--dialog-max-inline-size` will set a definitive width to the dialog.

When setting a new value for `--dialog-min-inline-size` and `--dialog-max-inline-size` take in consideration if different values are needed for mobile.

```html preview 230px
<style>
	vwc-dialog {
		--dialog-min-inline-size: 560px;
	}
</style>

<vwc-dialog
	icon="info"
	headline="Headline"
	subtitle="Subtitle content"
	open
></vwc-dialog>
```

### Block-Size

The dialog has a default `--dialog-max-block-size`. If the content is larger, the dialog will be scrollable.

```html preview 250px
<style>
	vwc-dialog {
		--dialog-max-block-size: 100px;
	}
</style>

<vwc-dialog
	icon="info"
	headline="Headline"
	subtitle="Subtitle content"
	open
></vwc-dialog>
```

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                                                                                                                                   |
| -------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`   | `CustomEvent<undefined>` | No      | Yes      | The `open` event fires when the dialog opens.                                                                                                                 |
| `close`  | `CustomEvent<string>`    | No      | Yes      | The `close` event fires when the dialog closes (either via user interaction or via the API). It returns the return value inside the event's details property. |
| `cancel` | `CustomEvent<undefined>` | No      | Yes      | The `cancel` event fires when the user requests to close the dialog. You can prevent the dialog from closing by calling `.preventDefault()` on the event.     |

</div>

## Methods

<div class="table-wrapper">

| Namen       | Returns | Description                                                                 |
| ----------- | ------- | --------------------------------------------------------------------------- |
| `show`      | `void`  | Shows the dialog.                                                           |
| `close`     | `void`  | Closes the dialog.                                                          |
| `showModal` | `void`  | Shows the dialog as a modal, irregardless of the value of the modal member. |

</div>

## Accessibility

- The dialog's role is `dialog`. When opened as a modal (via showModal) it adds `aria-modal` to the dialog.
- It is the consumer's concern to add `aria-label` to the dialog element.
- The dismiss button is automatically given a localized version of the word "Close". This can be overridden using `dismiss-button-aria-label`.
- If you disable the built-in dismiss methods, you must ensure that the way to close the dialog remains accessible.

## Use Cases

### Dialog Form

You can use a `form` with `method=dialog` inside a dialog. This will make the dialog close when the form is submitted.

```html preview 400px
<vwc-dialog headline="Dialog With Form" open>
	<form slot="body" method="dialog">
		<vwc-layout column-basis="block">
			<vwc-text-field
				label="Agent Name"
				placeholder="Search for an agent"
				icon="search-line"
			></vwc-text-field>
			<vwc-text-area label="Additional Note (Optional)"></vwc-text-area>
			<vwc-button type="submit" label="Submit"></vwc-button>
		</vwc-layout>
	</form>
</vwc-dialog>
```

### Confirm Closing of Dialog

```html preview 400px
<style>
	vwc-text-area {
		width: 100%;
	}
</style>
<vwc-button label="Open Dialog" onclick="openDialog()"></vwc-button>
<vwc-dialog id="dialog" headline="Dialog" modal open>
	<vwc-text-area
		id="input"
		slot="body"
		label="Important Data"
		value="Some important data"
	></vwc-text-area>
	<vwc-button
		slot="action-items"
		label="Cancel"
		appearance="outlined"
		onclick="closeDialog()"
	></vwc-button>
	<vwc-button
		slot="action-items"
		label="Save"
		appearance="filled"
		onclick="closeDialog()"
	></vwc-button>
</vwc-dialog>
<vwc-dialog
	id="confirm"
	headline="Unsaved Changes"
	subtitle="Are you sure you want to discard your changes?"
	modal
>
	<vwc-button
		slot="action-items"
		label="Cancel"
		appearance="outlined"
		onclick="closeConfirm()"
	></vwc-button>
	<vwc-button
		autofocus
		slot="action-items"
		label="Discard"
		appearance="filled"
		connotation="alert"
		onclick="discardChanges()"
	></vwc-button>
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



