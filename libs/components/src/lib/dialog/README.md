# Dialog

```js
<script type="module">import '@vonage/vivid/dialog';</script>
```

```html preview
<style>
  html { 
    block-size: 200px; 
  }
</style>

<vwc-dialog icon="info" headline="Headline" text="Text content" open></vwc-dialog>
```

## Members

### Headline

Use the `headline` attribute to set the dialog's headline.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dialog headline="Headline" open></vwc-dialog>
```

### Icon

Use the `icon` attribute to set the dialog's icon.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dialog icon="info" open></vwc-dialog>
```

### Text

Use the `text` attribute to set the dialog's text.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dialog text="Text content" open></vwc-dialog>
```

### Open

Sets or returns whether a dialog should be open or not

- Type: `boolean`
- Default: `false`

```html preview
<vwc-dialog id="dialog" text="Text content"></vwc-dialog>

<vwc-button label="Toggle Dialog Open" onclick="dialog.open = !dialog.open"></vwc-button>
```

### Return Value

Use `returnValue` to get or set the return value. Often used to indicate which button the user pressed to close it.

- Type: `string`
- Default: `""`

```html preview
<style>
    html { 
        block-size: 200px; 
    }
    .demo-footer {
        display: flex;
        justify-content: flex-end;
        column-gap: 8px;
        margin-top: 8px;

    }
</style>
<vwc-dialog open
            headline="Returning Dialog">
                <div slot="footer" class="demo-footer">
        <vwc-button appearance="outlined" label="Cancel"></vwc-button>
        <vwc-button appearance="filled" label="Action"></vwc-button>
    </div>
</vwc-dialog>
<div>Returned Value: <span id="dialog-output"></span></div>
<vwc-button label="Open Dialog"
            onclick="openDialog()"></vwc-button>
<script>
    (function handleReturnValue() {
        function handleClick(e) {
            const buttonType = e.target.label;
            console.log(buttonType);
            dialog.returnValue = buttonType;
            dialog.close();
        }
        
        const cancelButton = document.querySelector('[label="Cancel"]');
        const actionButton = document.querySelector('[label="Action"]');
        const dialog = document.querySelector('vwc-dialog');
        const dialogOutput = document.querySelector('#dialog-output');
        
        cancelButton.onclick = actionButton.onclick = handleClick;
        dialog.addEventListener('close', (e) => dialogOutput.innerText = dialog.returnValue);
        window.handleClick = handleClick;
    })();
</script>
<script>
    function openDialog() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.show();
    }
</script>
```

## Methods

### Show

Shows the dialog. Positioned in a top position by default.

```html preview
<vwc-dialog headline="Open Dialog">
</vwc-dialog>
<vwc-button label="Open Dialog"
            onclick="openDialog()"></vwc-button>
<script>
    function openDialog() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.show();
    }
</script>
```

### Show Modal

Shows the dialog and makes it the top-most modal dialog. Positioned in a center position by default.
Interaction outside the dialog is blocked and the content outside it is rendered inert.
For more information, see the native [Dialog.showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal).

```html preview
<vwc-dialog headline="Open Dialog">
</vwc-dialog>
<vwc-button label="Open Modal Dialog"
            onclick="openDialog()"></vwc-button>
<script>
    function openDialog() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.showModal();
    }
</script>
```

### Close

Closes the dialog.

```html preview
<vwc-dialog open
            headline="Open Dialog">
</vwc-dialog>
<vwc-button label="Close Dialog"
            onclick="closeDialog()"></vwc-button>
<script>
    function closeDialog() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.close();
    }
</script>
```

## Slots

### Graphic

Use the `graphic` slot in order to replace the icon.

```html preview
<vwc-dialog open>
            <img slot="graphic" src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5">
</vwc-dialog>
```

### Footer

Use the footer `slot` in order to add action buttons to the bottom of the dialog.

```html preview
<style>
    html { 
        block-size: 200px; 
    }
    .demo-footer {
        display: flex;
        justify-content: flex-end;
        column-gap: 8px;
        margin-top: 16px;

    }
</style>
<vwc-dialog open 
    headline="Dialog with footer"
    text="To quote Michael Carini, although we should never apologize for being ourselves, we should apologize for the times that we are not.">
    <div slot="footer" class="demo-footer">
        <vwc-button appearance="outlined" label="Cancel"></vwc-button>
        <vwc-button appearance="filled" label="Action"></vwc-button>
    </div>
</vwc-dialog>
```

### Main

Dialog is battery charged with an opinionated template.
Assign nodes to the main slot to fully override a dialog’s predefined flow and style with your own.
Note that all styles will be overridden including the dialog's padding. See the example below on how to set padding to a dialog using the `main` slot.

```html preview
<style>
.demo-main {
  padding: 8px;
}
vwc-text {
  text-align: center;
}
</style>

<vwc-dialog open>
  <div slot="main" class="demo-main">
    <vwc-text font-face="body-1-bold">Use main slot for your own layout and content</vwc-text>
  </div>
</vwc-dialog>
```

## CSS Custom Properties

### Z-index

When the dialog is not set as `modal` its initial z-index can be changed if needed.

`--dialog-z-index`

- Type: `String`
- Default: `undefined`

## Events

### Close

The `close` event fires when the dialog closes (either via user interaction or via the API).
It returns the return value inside the event's details property.

```html preview
<vwc-dialog open
            headline="Returning Dialog">
</vwc-dialog>
<vwc-button label="Close Dialog"
            onclick="closeDialog()"></vwc-button>
<script>
    function closeDialog() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.returnValue = 'Value';
        dialog.close();
    }
    (function() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.addEventListener('close', (e) => console.log(e.detail));
    })();
</script>
```

## A11y

The dialog's role is `dialog`.  When opened as a modal (via showModal) it adds `aria-modal` to the dialog.
It is consumer's concern to add `aria-label` to the dialog element.
`aria-labelledby` and `aria-describedby` can also be used.

```html
<vwc-dialog
 aria-label="An opened dialog" 
 headline="Open Dialog" 
 open
>
</vwc-dialog>
```

## Usage Examples

### Dialog Form

```html preview
<vwc-dialog headline="Open Dialog">
 <form slot="main" method="dialog">
  <vwc-button type="submit" label="Submit"></vwc-button>
 </form>
</vwc-dialog>

<vwc-button label="Open Modal Dialog" onclick="openDialog()">
</vwc-button>

<script>
 function openDialog() {
  const dialog = document.querySelector('vwc-dialog');
  dialog.showModal();
 }
</script>
```
