# dialog

```js
<script type="module">import '@vonage/vivid/dialog';</script>
```

```html preview
<vwc-dialog icon="info" heading="Heading" content="Content" open>This is the content!</vwc-dialog>
```

## Methods
### show
Shows the dialog.
```html preview
<vwc-dialog heading="Open Dialog">
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

### showModal
Shows the dialog and makes it the top-most modal dialog.
```html preview
<vwc-dialog heading="Open Dialog">
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
### close
Closes the dialog.

```html preview
<vwc-dialog open
            heading="Open Dialog">
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
## Properties/Attributes

### open
Sets or returns whether a dialog should be open or not
- Type: `boolean`
- Default: `false`

```html preview
<vwc-dialog open
            heading="Open Dialog">
</vwc-dialog>
```

### returnValue
Sets or returns the dialog's return value when closing
- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-dialog open
            heading="Returning Dialog">
</vwc-dialog>
<script>
    (function() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.returnValue = 'Value';
        dialog.addEventListener('close', (e) => console.log(e.detail));
        dialog.close(); // will log the returnValue
        })();
</script>
```
### icon
### content
### heading

## Slots
### footer
### graphics
### main

## Events

## A11y
// TODO
