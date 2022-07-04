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
### icon
Use the `icon` attribute to set the dialog's icon.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-dialog open
            icon="info">
</vwc-dialog>
```

### content
Use the `content` attribute to set the dialog's text.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-dialog open
            content="This is the content">
</vwc-dialog>
```

### heading
Use the `heading` attribute to set the dialog's title.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-dialog open
            heading="This is the title">
</vwc-dialog>
```

## Slots
### footer
Use the footer `slot` in order to add action buttons to the bottom of the dialog.
### graphics
Use the `graphics` slot in order to replace the icon.
### main
Dialog is battery charged with an opinionated template.
Assign nodes to the main slot to fully override a dialog’s predefined flow and style with your own.

## Events

### close
The `close` event fires when the dialog closes (either via user interaction or via the API).
It returns the return value inside the event's details property.
```html preview
<vwc-dialog open
            heading="Returning Dialog">
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

```html preview
<vwc-dialog heading="Open Dialog" open aria-label="An opened dialog">
    <form slot="main" method="dialog">
                <button type="submit">Close</button>
            </form>
</vwc-dialog>
```

## Dialog Form
```html preview
<vwc-dialog heading="Open Dialog">
    <form slot="main" method="dialog">
                <button type="submit">Close</button>
            </form>
</vwc-dialog>
<vwc-button label="Open Modal Dialog"
            onclick="openDialog()">
            
            </vwc-button>
<script>
    function openDialog() {
        const dialog = document.querySelector('vwc-dialog');
        dialog.showModal();
    }
</script>
```
