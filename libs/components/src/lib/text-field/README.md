# Text Field

TextField is meant to accept text input from the user.
All native `input` attributes of the text-field are supported as well as some enhancements.
While `text-field` follows [the W3C specifictation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), the following are the only supported types:

- `text` (default)
- `email`
- `password`
- `tel`
- `url`

If you wish to use `type="number"`, refer to the [`number-field`](/number-field) component.

```js
<script type="module">
  import '@vonage/vivid/text-field';
</script>
```

## Members

### Label
Add a `label` attribute to add label to the text field.  
The label is important to help users understand what is needed. I case you choose not to add mind our [accessibility notice](#accessibility)
- Type: `string` | `undefined`
- Default: `undefined`



```html preview
<vwc-text-field label="My Label"></vwc-text-field>
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
<vwc-text-field label="Helper text below" helper-text="Help text"></vwc-text-field>
```

### Success text

Add the `success-text` to add some success text below the text field.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-text-field label="Username" value="Vlad" success-text="Valid username"></vwc-text-field>
```

### Error text

It is possible to force the text field's error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overriden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-text-field value="some text" label='Enter some text' error-text="Please take this seriously"></vwc-text-field>
```

### Character Count

- Type: `boolean`
- Default: `false`

Use the `char-count` attribute along with the `maxlength` attribute to show a character count.

```html preview
<vwc-text-field label="Char count example" char-count maxlength="15"></vwc-text-field>
```


### Icon

Text field input can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-text-field icon="search-line" label="Search..."></vwc-text-field>
```

### Shape

Use the `shape` attribute to change the text field's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview blocks
<vwc-text-field label="Pill" shape="pill"></vwc-text-field>
<vwc-text-field label="Rounded" shape="rounded"></vwc-text-field>
```

### Appearance

Set the `appearance` attribute to change the text field's appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

(`'ghost'` is typically used within a composition such as action group / toolbar).

```html preview blocks
<vwc-text-field placeholder="appearance" label='fieldset' appearance='fieldset'></vwc-text-field>
<vwc-text-field placeholder="appearance" label='ghost' appearance='ghost'></vwc-text-field>
```

### Disabled

Add the `disabled` attribute to disable the text field.

- Type: `boolean`
- Default: `false`

```html preview 
<vwc-text-field disabled icon="chat-line" value="disabled" label='fieldset' appearance='fieldset'></vwc-text-field>
```

### Readonly

Add the `readonly` attribute to restrict user from changing the text field's value.

- Type: `boolean`
- Default: `false`

```html preview 
<vwc-text-field readonly icon="chat-line" value="readonly text" label='fieldset' appearance='fieldset'></vwc-text-field>
```

## Slots
### Action-items
You can add action items elements using the `action-items` slot.

```html preview
<vwc-text-field icon="search" placeholder="search" label='search' appearance='fieldset' class="text-field">
	<vwc-button slot="action-items" size='condensed' icon="close-line" aria-label='clear field' appearance='ghost'></vwc-button>
</vwc-text-field>
```

## CSS Variables
### Inline end-Padding
Use `--text-field-inline-end-padding` variable to set the text-field inline-end padding when using the `action-tiems` slot.


## Use Cases
```html preview
<style>
.text-field {
  --text-field-inline-end-padding: 106px;
}
</style>
<vwc-text-field icon="search" placeholder="search" label='search our documentation' appearance='fieldset' class="text-field" shape='pill'>
	<vwc-button slot="action-items" size='condensed' icon="image-line" aria-label='search images' shape='pill' appearance='ghost'></vwc-button>
	<vwc-button slot="action-items" size='condensed' icon="microphone-2-line" aria-label='record' shape='pill' appearance='ghost'></vwc-button>
	<vwc-button slot="action-items" size='condensed' icon="close-line" aria-label='clear field' shape='pill' appearance='ghost'></vwc-button>
</vwc-text-field>
```

### Validation

You can validate the text field like any other native `input`.
Here's an example using `pattern`; its required pattern is `123` but we set its value to `5`, which is not of that pattern.
In addition, we programatically *"dirtied"* the field and then called `validate` because the change was not done by a user.

```html preview
<vwc-text-field pattern="123"></vwc-text-field>

<script>
  textField = document.querySelector('vwc-text-field');
  interval = setInterval(() => {
    if (!textField.checkValidity) return;
    textField.value = 5;
    textField.dirtyValue = true;
    textField.checkValidity();
    clearInterval(interval);
  }, 50);
</script>
```

### In Form

```html preview blocks
<style>
vwc-button {
  justify-self: flex-start;
}
</style>
<form method="post" action="">
  <vwc-layout column-spacing="small" column-basis="block">
    <vwc-text-field required label="Add email" placeholder="e.g. john@doe.dev" type="email" name="email" autocomplete="email" icon="search" maxlength="30" char-count style="justify-self: flex-start;"></vwc-text-field>
    <vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
  </vwc-layout>
</form>
```

## Accessibility
If no label is set - it is highly recommended that `aria-label` will be added.

```html
<vwc-text-field  aria-label="your name" placeholder="your name"></vwc-text-field>
```