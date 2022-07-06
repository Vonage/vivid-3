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
<vwc-dialog icon="info" headline="headline" content="Content" open>This is the content!</vwc-dialog>
```


## Members

### headline
Use the `headline` attribute to set the dialog's title.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-dialog open
            headline="This is the title">app
</vwc-dialog>
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


### open
Sets or returns whether a dialog should be open or not
- Type: `boolean`
- Default: `false`

```html preview
<vwc-dialog open
            headline="Open Dialog">
</vwc-dialog>
```

### returnValue
Sets or returns the dialog's return value when closing
- Type: `string` | `undefined`
- Default: `undefined`

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


## Methods
### show
Shows the dialog.
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

### showModal
Shows the dialog and makes it the top-most modal dialog.
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
### close
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
### graphics
Use the `graphics` slot in order to replace the icon.
```html preview
<vwc-dialog open
            headline="Open Dialog">
            <img slot="graphics" src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5">
</vwc-dialog>
```

### footer
Use the footer `slot` in order to add action buttons to the bottom of the dialog.
```html preview
<style>
.demo-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
.demo-footer  vwc-button {
    margin-left: 8px;
}
</style>
<vwc-dialog open 
    headline="Dialog with footer"
    content="To quote Michael Carini, although we should never apologize for being ourselves, we should apologize for the times that we are not.">
    <div slot="footer" class="demo-footer">
        <vwc-button appearance="outlined" label="Cancel"></vwc-button>
        <vwc-button appearance="filled" label="Action"></vwc-button>
    </div>
</vwc-dialog>
```

### main
Dialog is battery charged with an opinionated template.
Assign nodes to the main slot to fully override a dialog’s predefined flow and style with your own.

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
### Set dialog custom width

Dialog has a default `width: 50vw` in desktop and `90vw` in mobile.  
If needed can be set to a different size.

`--dialog-inline-size`

- Type: `String`
- Default: `undefined`



## Events

### close
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
<vwc-dialog aria-label="An opened dialog" 
            headline="Open Dialog" 
            open>
</vwc-dialog>
```

## Usage Examples

### Dialog Form
```html preview
<vwc-dialog headline="Open Dialog">
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
