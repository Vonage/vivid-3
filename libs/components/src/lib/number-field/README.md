# number-field

Represents a number-field custom element. Follows the [`HTMLInput` of `type=text` specifications](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text).
If you'd like to know why we follow the `text` field type, you can read more about it [here](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/).

```js
<script type="module">
  import '@vonage/vivid/number-field';
</script>
```

```html preview
<vwc-number-field maxlength="4" minlength="2"></vwc-number-field>
```

## Members

### Label

- Type: `string` | `undefined`
- Default: `undefined`

Add a `label` attribute to add label to the number field.

```html preview
<vwc-number-field label="My Label"></vwc-number-field>
```

### Placeholder

- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the number field.

```html preview
<vwc-number-field placeholder="My Placeholder"></vwc-number-field>
```

### Value

- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the number field. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview
<vwc-number-field label="With default value" value="5"></vwc-number-field>
```

### Helper text

Add the `helper-text` to add some helper text below the number field.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-number-field label="Helper text below" helper-text="Help text"></vwc-number-field>
```

### Success text

Add the `success-text` to add some success text below the number field.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-number-field label="Valid value" success-text="Great success"></vwc-number-field>
```

### Shape

Use the `shape` attribute to change the number field's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview blocks
<vwc-number-field label="Pill" shape="pill"></vwc-number-field>
<vwc-number-field label="Rounded" shape="rounded"></vwc-number-field>
```

### Appearance

Set the `appearance` attribute to change the number filed's appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

(`'ghost'` is typically used within a composition such as action group / toolbar).

```html preview blocks
<vwc-number-field placeholder="appearance" label='fieldset' appearance='fieldset'></vwc-number-field>
<vwc-number-field placeholder="appearance" label='ghost' appearance='ghost'></vwc-number-field>
```

### Disabled

Add the `disabled` attribute to disable the number field.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-number-field disabled value="disabled" label='fieldset' appearance='fieldset'></vwc-number-field>
```

### Readonly

Add the `readonly` attribute to restrict user from changing the number field's value.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-number-field readonly value="8" label='fieldset' appearance='fieldset'></vwc-number-field>
```
