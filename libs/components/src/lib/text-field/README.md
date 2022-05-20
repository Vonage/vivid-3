# Text Field

TextField is meant to accept text input from the user. It supports the native attributes of `input` in addition to some enhancements.
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
<form method="post" action="">
  <vwc-text-field label="My Label" type="email" name="email" autocomplete="email"></vwc-text-field>
</form>
```

### Placeholder
- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the text field.

```html preview
<vwc-text-field placeholder="My Placeholder"></vwc-text-field>
```

### Value
- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the text field. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview
<vwc-text-field label="With default value" value="5"></vwc-text-field>
```

### Helper text

Add the `helper-text` to add some helper text below the text field.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-text-field label="Helper text below" helper-text="Help me!!!"></vwc-text-field>
```

### Character Count

- Type: `boolean`
- Default: `false`

Use the `char-count` attribute along with the `maxlength` attribute to show a character count.

```html preview
<vwc-text-field label="Char count example" char-count maxlength="15"></vwc-text-field>
```

### Density

Use the `density` attribute to set the textfield's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'`
- Default: `'normal'`

```html preview
<vwc-layout column-basis="block">
  <vwc-text-field label="condensed" density="condensed"></vwc-text-field>
  <vwc-text-field label="normal" density="normal"></vwc-text-field>
</vwc-layout>
```

### Shape

Use the `shape` attribute to change the button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-layout column-basis="block">
  <vwc-text-field label="Pill" shape="pill"></vwc-text-field>
  <vwc-text-field label="Rounded" shape="rounded"></vwc-text-field>
</vwc-layout>
```

### Appearance

Set the `appearance` attribute to change the button's appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

```html preview
<vwc-layout column-basis="block">
  <vwc-textfield label='ghost' appearance='ghost'></vwc-textfield>
  <vwc-textfield label='fieldset' appearance='fieldset'></vwc-textfield>
</vwc-layout>
```


## Use cases

### Validation

You can validate the textfield like any other native `input`.  Here's an example using `pattern`. The value is 5, which is not of the pattern `123`.  In addition, we programatically `dirtied` the field and then called `validate` because the change was not done by a user.

```html preview
<vwc-text-field id="invalid-textfield" label="invalid" pattern="123" value="5"></vwc-text-field>
<script>
  document.getElementById("#invalid-textfield").dirtyValue = true;
  document.getElementById("#invalid-textfield").validate();
</script>
```
### Input Types
