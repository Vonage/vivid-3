# File picker

The vwc-file-picker component enables users to select files either by opening a file selection dialog or by using drag-and-drop functionality. It provides a seamless and intuitive file selection experience, enhancing application usability and productivity.

```js
<script type="module">
    import '@vonage/vivid/file-picker';
</script>
```

```html preview
<vwc-file-picker></vwc-file-picker>
```

## Members

### Label

Use the `label` member to set the file picker's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker label='Label'></vwc-file-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the file picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="helper-text"></vwc-file-picker>
```

## Slots

### Default

Use the default slot to set the content of the file picker.

```html preview
<vwc-file-picker>Custom content</vwc-file-picker>
```

## CSS Variables

### File-picker-min-height

Control the height of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker style="--file-picker-min-height: 120px;"></vwc-file-picker>
```

### File-picker-min-width

Conrol the width of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker style=" --file-picker-min-width: 52px;"></vwc-file-picker>
```

## Methods

### chooseFile()

- Returns: `void`

Opens the file dialog box.


## Use Cases

### Link

```html preview
<style>
  a {
    color: var(--vvd-color-cta-600);
    text-decoration: underline;
  }
</style>
<vwc-file-picker id="filePicker">Drag & Drop files here or <a id="choose" onclick="filePicker.chooseFile()">choose file</a></vwc-file-picker>
```

### Button

```html preview
<vwc-file-picker id="filePicker">Drag & Drop files here or <vwc-button label='Select' appearance='outlined' shape='pill' onclick="filePicker.chooseFile()"></vwc-button></vwc-file-picker>
```
