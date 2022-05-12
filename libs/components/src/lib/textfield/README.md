# textfield

Textfield is meant to accept text input from the user. It supports the native attributes of `input` in addition to some enhancements.
Not that the textfield does not support `type="number"`. For this there is the `number-field` component.

```js
<script type="module">import '@vonage/vivid/textfield';</script>
```
## Properties

### Label
- Type: `string` | `undefined`
- Default: `undefined`

Add a `label` attribute to add label to the text field.

```html preview
    <vwc-textfield label="My Label" name="test-field"></vwc-textfield>
```

### Placeholder
- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the text field.

```html preview
    <vwc-textfield placeholder="My Placeholder"></vwc-textfield>
```

### Value
- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the text field. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview
    <vwc-textfield label="With default value"
                   value="5"
    </vwc-textfield>
```

### Helper-text

Add the `helper-text` to add some helper text below the text field.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
    <vwc-textfield label="Helper text below"
                   helper-text="Help me!!!">
    </vwc-textfield>
```

### char-count

- Type: `boolean`
- Default: `false`

Use the `char-count` attribute along with the `maxlength` attribute to show a character count.

```html preview
    <vwc-textfield label="Char count example" 
                   char-count
                   maxlength="15">
    </vwc-textfield>
```

### Density

Use the `density` attribute to set the textfield's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'`
- Default: `'normal'`

```html preview
<vwc-layout column-basis="block">
    <vwc-textfield label="condensed" density="condensed"></vwc-textfield>
    <vwc-textfield label="normal" density="normal"></vwc-textfield>
</vwc-layout>
```

### Shape

Use the `shape` attribute to change the button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-layout column-basis="block">
    <vwc-textfield label="Pill" shape="pill"></vwc-textfield>
    <vwc-textfield label="Rounded" shape="rounded"></vwc-textfield>
</vwc-layout>
```

### Appearance

Set the `appearance` attribute to change the button's appearance.

- Type: `'ghost'` | `'filled'` | `'outlined'`
- Default: `'outlined'`

```html preview
<vwc-layout column-basis="block">
    <vwc-textfield label='ghost' appearance='ghost'></vwc-textfield>
    <vwc-textfield label='filled' appearance='filled'></vwc-textfield>
    <vwc-textfield label='outlined' appearance='outlined'></vwc-textfield>
</vwc-layout>
```
