# File picker

Represents a file picker custom element.

```js
<script type="module">
    import '@vonage/vivid/file-picker';
</script>
```

## Members

### Text

Add a `text` attribute to add text to the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-file-picker text="Drag & Drop files here"></vwc-file-picker>
```

### Label

Use the `label` member to set the file picker's label.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-file-picker label='Label'></vwc-file-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the file picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-file-picker helper-text="helper-text"></vwc-file-picker>
```

## CSS Variables

### File-picker-min-height

Control the height of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-file-picker style="--file-picker-min-height: 120px;"></vwc-file-picker>
```

### File-picker-min-width

Conrol the width of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-file-picker style=" --file-picker-min-width: 52px;"></vwc-file-picker>
```