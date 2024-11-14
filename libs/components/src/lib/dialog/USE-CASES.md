Dialogs can be modal or non-modal. Modal dialogs prevent users from interacting with the rest of the application until the dialog is closed and render a backdrop behind the dialog. Non-modal dialogs allow users to interact with the rest of the application while the dialog is open.


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



