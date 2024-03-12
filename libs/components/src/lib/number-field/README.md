# Number Field

The number-field component allows users to enter a number in a text field. It follows the [native number field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) specification.

The component is not appropriate for values that only happen to consist of numbers but aren't strictly speaking a number, e.g. phone numbers or ZIP codes. 
Use the [`text-field`](/components/text-field/) component instead.

```js
<script type="module">
  import '@vonage/vivid/number-field';
</script>
```

```html preview
<vwc-number-field label="Quantity"></vwc-number-field>
```

## Members

### Label
Add a `label` attribute to add label to the number field.  
The label is important to help users understand what is needed. In case you choose not to add one, mind our [accessibility notice](#accessibility).

- Type: `string` | `undefined`
- Default: `undefined`


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

### Min

- Type: `number` | `undefined`
- Default: `undefined`

Set the `min` attribute to set the minimum value for the number field.

```html preview
<vwc-number-field label="With minimum" min="100"></vwc-number-field>
```

### Max

- Type: `number` | `undefined`
- Default: `undefined`

Set the `max` attribute to set the maximum value for the number field.

```html preview
<vwc-number-field label="With maximum" max="2"></vwc-number-field>
```

### Helper text

Add the `helper-text` to add some helper text below the number field. If you need to add HTML to the helper text, use the `helper-text` slot.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-number-field label="Helper text below" helper-text="Help text"></vwc-number-field>
```

### Success text

Add the `success-text` to add some success text below the number field.
If provided, `success-text` will take precedence over errors.

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

## Slots

### Helper-Text

The `helper-text` slot allows you to use rich content as the number field's helper text.

Example showing a link in the helper text:
```html preview
<vwc-number-field label="Timeout">
	<span slot="helper-text">The timeout in seconds. <a href="#">Guide to setting timeouts</a></span>
</vwc-number-field>
```

## Methods

<div class="table-wrapper">

| Name            | Returns  | Description                                   |
|-----------------|----------|-----------------------------------------------|
| `stepUp`        | `void`   | Increase value by step (1 if step is not set) |
| `stepDown`      | `void`   | Decrease value by step (1 if step is not set) |

</div>

## Accessibility

- If no label is set - it is highly recommended that `aria-label` will be added.
- The add / subtract buttons are automatically given a localized version of the words "Increment" and "Decrement" respectively. These can be overriden using `increment-button-aria-label` and `decrement-button-aria-label`.

```html
<vwc-number-field
  aria-label="choose a number"
  increment-button-aria-label="Add"
  decrement-button-aria-label="Subtract"
></vwc-number-field>
```

## Known issues

- Constraint validation with `minlength` and `maxlength` is not supported.
