# Select

Represents a select custom element.

```js
<script type="module">
  import '@vonage/vivid/select';
</script>
```

## Slots

### Default

Read more about [vwc-option](../../components/option).

```html preview
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1" selected></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

## Members

### Label

Add a `label` attribute to add label to the Select.

- Type: `string` | `undefined`
- Default: `undefined`
```html preview
<vwc-select label="choose one option">
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


### Open

_Select_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`open` property from _popup_ propagate through _select_ and sets its open state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-select open>
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```


## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Combobox component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.
