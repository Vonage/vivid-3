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

<vwc-note connotation="information" icon="info-line" headline="Dialogs can be modal or non-modal">
<ul>
<li>Modal dialogs prevent users from interacting with the rest of the application until the dialog is closed and render a backdrop behind the dialog.</li>
<li>Non-modal dialogs allow users to interact with the rest of the application while the dialog is open.</li>
</ul>
</vwc-note>

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
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
```

## Open

Sets or returns whether a dialog should be open or not.

```html preview 230px
<vwc-button
	label="Toggle Dialog Open"
	onclick="dialog.open = !dialog.open"
	appearance="outlined"
></vwc-button>
<vwc-dialog
	id="dialog"
	headline="I'm a Dialog"
	subtitle="subtitle"
></vwc-dialog>
```

## Dismiss

<vwc-note connotation="warning" icon="warning-line" headline="Add dismiss options with caution">
<p>When using this attribute, ensure that the dialog can be closed by other means.</p>
</vwc-note>

### No-light-dismiss

Use the `no-light-dismiss` attribute to prevent a modal dialog from being dismissed by clicking outside it.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
	appearance="outlined"
></vwc-button>
<vwc-dialog no-light-dismiss headline="Headline" modal></vwc-dialog>
```

### No-Dismiss-On-Esc

Use the `no-dismiss-on-esc` attribute to prevent a modal dialog from being dismissed by pressing ESC.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
	appearance="outlined"
></vwc-button>
<vwc-dialog no-dismiss-on-esc headline="Headline" modal></vwc-dialog>
```

### No-Dismiss-Button

Use the `no-dismiss-button` attribute to remove the dismiss button from the dialog.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
	appearance="outlined"
></vwc-button>
<vwc-dialog no-dismiss-button headline="Headline" modal></vwc-dialog>
```

### Non-Dismissible

The `non-dismissible` attribute combines `no-light-dismiss`, `no-dismiss-on-esc`, and `no-dismiss-button`.

```html preview 230px
<vwc-button
	label="Open modal dialog"
	onclick="document.querySelector('vwc-dialog').open = true"
	appearance="outlined"
></vwc-button>
<vwc-dialog non-dismissible headline="Headline" modal></vwc-dialog>
```

### Dismiss-Button-Aria-Label

The dismiss button is automatically given a localized version of the word "close".  
This can be overridden using `dismiss-button-aria-label`.

## Return Value

Use `returnValue` to get or set the return value.  
Often used to indicate which button the user pressed to close it.

```html preview 250px
<div class="wrapper">
	<div>
		Returned Value:
		<span id="dialog-output"></span>
	</div>
	<vwc-button
		label="Open Dialog"
		appearance="outlined"
		onclick="openDialog()"
	></vwc-button>
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

The `graphic` slot overrides the [icon](/components/dialog/#icons) property.
Use the slot if a colored icon is needed or an icon with different dimensions.

```html preview 200px
<vwc-dialog headline="Dialog With Grapic Slot" open icon-placement="side">
	<img
		slot="graphic"
		src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5"
	/>
</vwc-dialog>
```

### Body Slot

Use the `body` slot in order to add custom HTML to the dialog.

<vwc-note connotation="information" icon="info-line" headline="body slot with top border">
<p>When using body slot with a <code>subtitle</code> in the header, a separator will be added between the two.</p>
</vwc-note>

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

#### Full-Width-Body

To remove the body inline padding use `full-width-body`.  
Use `full-width-body` if Progress-Bar or Tabs are needed in the Dialog.

```html preview 400px
<vwc-dialog
	open
	icon-placement="side"
	icon="info"
	headline="Dialog Headline"
	full-width-body
>
	<div slot="body" class="dialog-body">
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

<style>
	.dialog-body {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style>
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

<vwc-note connotation="information" icon="info-line" headline="Using Both Footer And Action-Items Slots">
<p>When used in combination with <code>action-items</code> slot, the <code>footer</code> content will appear to the left of the action items.
</p>
</vwc-note>

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

Dialog has predefined content style template.
Use the main slot to fully override a Dialog's predefined template with your own.

```html preview 130px
<vwc-dialog open>
	<vwc-layout slot="main" column-basis="block" gutters="medium">
		Use main slot for your own layout and content
	</dvwc-layout>
</vwc-dialog>
```

## CSS Variables

### Z-index

Use `--dialog-z-index` for a different `z-index `value than 1.

<vwc-note connotation="information" icon="info-line" headline="Dialog z-index">
<p><code>z-index</code> will affect only id the Dialog is not <code>modal</code>.
</p>
</vwc-note>

### Inline min & max size

The dialog has default `--dialog-min-inline-size` and `--dialog-max-inline-size` values, which can be changed if needed.

Setting the same value for `--dialog-min-inline-size` and `--dialog-max-inline-size` will set a definitive width to the dialog.

<vwc-note connotation="information" icon="info-line" headline="Dialog in Mobile">
<p>When setting a new value for <code>--dialog-min-inline-size</code> and <code>--dialog-max-inline-size</code> take in consideration if different values are needed for mobile.
</p>
</vwc-note>

```html preview 230px
<vwc-dialog
	class="dialog"
	icon="info"
	headline="Headline"
	subtitle="Subtitle content"
	open
></vwc-dialog>

<style>
	.dialog {
		--dialog-min-inline-size: 560px;
	}
</style>
```

### Block-Size

The dialog has a default `--dialog-max-block-size`. If the content is larger, the dialog will be scrollable.

```html preview 250px
<vwc-dialog
	class="dialog"
	icon="info"
	headline="Headline"
	subtitle="Subtitle content"
	open
></vwc-dialog>

<style>
	.dialog {
		--dialog-max-block-size: 100px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                        | Type                                    | Description                                                                                                                                |
| --------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `dismiss-button-aria-label` | `string`                                | Sets a custom aria-label to the close button                                                                                               |
| `full-width-body`           | `boolean`                               | Sets the element's body to full width (no padding))                                                                                        |
| `headline`                  | `string`                                | Sets the element's headline                                                                                                                |
| `icon`                      | Enum\_:<br/>`[icon-name]`               | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |
| `icon-placement`            | Enum\_:<br/>`[side]` (fefailt), `[top]` | Sets the element's icon placement                                                                                                          |
| `modal`                     | `boolean`                               | Sets the element's to be opened                                                                                                            |
| `no-dismiss-button`         | `boolean`                               | Remove the element's dismiss button                                                                                                        |
| `no-dismiss-on-esc`         | `boolean`                               | prevent a modal dialog from being dismissed by pressing esc                                                                                |
| `no-light-dismiss`          | `boolean`                               | prevent a modal dialog from being dismissed by clicking outside of it.                                                                     |
| `non-dismissible`           | `boolean`                               | combines `no-light-dismiss`, `no-dismiss-on-esc`, and `no-dismiss-button`                                                                  |
| `open`                      | `boolean`                               | Sets the element's to be opened                                                                                                            |
| `returnValue`               | `string`                                | Sets the element's to be opened                                                                                                            |
| `subtitle`                  | `string`                                | Sets the element's return value                                                                                                            |

> > > > > > > 0dae947d (new docs structure)

</div>

### Slots

<div class="table-wrapper">

| Name             | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| **Action-items** | Use for adding action items to the bottom of the dialog    |
| **Body**         | Add custom content to the dialog's body                    |
| **Footer**       | Add additional content to the bottom of the dialog.        |
| **Graphic**      | Add graphic element to dialog. Overrides the icon property |
| **Main**         | Override a card's predefined template                      |

</div>

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
