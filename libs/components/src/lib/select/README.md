# Select

Represents a select custom element.

```js
<script type="module">
  import '@vonage/vivid/select';
</script>
```

```html preview
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1" selected></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

## Members

### Label

- Type: `string` | `undefined`
- Default: `undefined`

Add a `label` attribute to add label to the Select.
```html preview
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Helper text

Add the `helper-text` to add some helper text below the Select.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-select label="choose one option" helper-text="try picking the right one">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Appearance
Set the `appearance` attribute to change the Select appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

(`'ghost'` is typically used within a composition such as action group / toolbar).

```html preview
<vwc-select appearance="ghost">
  <vwc-option value="1" text="Option 1" selected disabled></vwc-option>
  <vwc-option value="2" text="Option 2 "></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Shape
Use the `shape` attribute to change the Select edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-select shape="pill">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Disabled

Add the `disabled` attribute to disable the Select.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-select disabled>
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

## Slots

## CSS Variables

## Events

## Methods

## Accessibility

## Use Cases
