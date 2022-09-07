# Text-area

Represents a text-area custom element. It supports all native attributes of `textarea` in addition to some enhancements.

```js
<script type="module">import '@vonage/vivid/text-area';</script>
```

```html preview
<vwc-text-area label="Label" rows="2" value="This is the text we want to see!"></vwc-text-area>
```

## Members

### Label

- Type: `string` | `undefined`
- Default: `undefined`

Add a `label` attribute to add label to the text area.

```html preview
<vwc-text-area label="My Label"></vwc-text-area>
```

### Placeholder

- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the text area.

```html preview
<vwc-text-area placeholder="My Placeholder"></vwc-text-area>
```

### Value

- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the text area. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview
<vwc-text-area value="Default Value"></vwc-text-area>
```

### Helper text

Add the `helper-text` to add some helper text below the text area.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-text-area label="Helper text below" helper-text="Help text"></vwc-text-area>
```

### Disabled

Add the `disabled` attribute to disable the text area.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-text-area disabled value="disabled" label='fieldset'></vwc-text-area>
```

### Readonly

Add the `readonly` attribute to restrict user from changing the text area's value.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-text-area readonly value="readonly text" label='fieldset'></vwc-text-area>
```

### Rows

Use the `rows` attribute to set the number of rows in the text area.

Note that the text area has padding-block of 4 pixels and minimum height of 40 pixels. That means that:
- rows="1" will have a height of 40 pixels (which is the minimum height)
- rows="2" will have a height of 48 pixels
- rows 3 and on will add 20 pixels each (lineheight)

- Type: `number`
- Default: `2`
