# Text Field

TextField is meant to accept text input from the user. It supports the native attributes of `input` in addition to some enhancements.
Note that the text field does not support `type="number"`. For this there is the `number-field` component.

```js
<script type="module">import '@vonage/vivid/text-field';</script>
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

Use the `density` attribute to set the text field's to one of the predefined block size extent.

- Type: `'normal'` | `'extended'`
- Default: `'normal'`

```html preview
<vwc-layout column-basis="block">
  <vwc-text-field label="normal" density="normal"></vwc-text-field>
  <vwc-text-field label="extended" density="extended"></vwc-text-field>
</vwc-layout>
```

## Icon

Text field input can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-text-field icon="search-line" label="Search..."></vwc-text-field>
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

(`'ghost'` is typically used within a composition such as action group / toolbar).

```html preview
<vwc-text-field placeholder='ghost' appearance='ghost'></vwc-text-field>
<vwc-text-field label='fieldset' appearance='fieldset'></vwc-text-field>
```


## Use cases

### Validation

You can validate the text field like any other native `input`.  Here's an example using `pattern`. The value is 5, which is not of the pattern `123`.  In addition, we programatically `dirtied` the field and then called `validate` because the change was not done by a user.

```html preview
<vwc-text-field id="invalid-text-field" label="invalid" pattern="123" value="5"></vwc-text-field>
<script>
  document.getElementById("#invalid-text-field").dirtyValue = true;
  document.getElementById("#invalid-text-field").validate();
</script>
```
### Input Types
