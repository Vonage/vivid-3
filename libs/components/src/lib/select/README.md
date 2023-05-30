# Select

Represents a select custom element.

```js
<script type="module">
  import '@vonage/vivid/select';
</script>
```

## Members

### Label

Add a `label` attribute to add label to the Select.

- Type: `string` | `undefined`
- Default: `undefined`
```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {width: 150px;}
</style>
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Icon
Add an `icon` attribute to add an icon to the Select.  
Check out our [use case example](/#use-case)

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {width: 150px;}
</style>
<vwc-select label="choose one option" icon="search-line">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Multiple
Set the `mulitple` attribute to allow multiple selection. Note that in multiple state, the options will always be visible.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
    --select-width: 100%;
  }
  vwc-select {width: 150px;}
</style>
<vwc-select multiple label="choose how many options you want">
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
  <vwc-option value="1" text="Option 1" selected></vwc-option>
  <vwc-option value="2" text="Option 2 "></vwc-option>
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
</vwc-select>
```

### Helper text

Add the `helper-text` to add some helper text below the select.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    width: 150px;
  }
</style>
<vwc-select label="choose one option" helper-text="Helper text">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Success text

Add the `success-text` to add some success text below the select.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    width: 150px;
  }
</style>
<vwc-select label="choose one option" success-text="Success text">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Error text

It is possible to force the select error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overriden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    width: 150px;
  }
</style>
<vwc-select label="choose one option" error-text="Please pick one">
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
</vwc-select>
```

### Open

_Select_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`open` property from _popup_ propagate through _select_ and sets its open state.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-select open>
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

## Slots

### Default

Read more about [vwc-option](../../components/option).

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    width: 150px;
  }
</style>
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
```

### Meta

Set the `meta` slot to show meta information after the selected option label.

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    width: 250px;
  }
  .duration {
    color: var(--vvd-color-neutral-600);
    text-align: end;
    flex-grow: 1;
  }
</style>
<vwc-select>
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
  <span slot="meta">
    <vwc-badge connotation="success" text="Beta"></vwc-badge>
  </span>
</vwc-select>
<vwc-select>
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
  <span slot="meta" class="duration">00:00:00</span>
</vwc-select>
```

## Option Label

You can add a `label` attribute to the `vwc-option` to set a custom display value for the selected option.

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-select open>
  <vwc-option label="Custom Label 1" value="1" text="Option 1"></vwc-option>
  <vwc-option label="Custom Label 2" value="2" text="Option 2"></vwc-option>
  <vwc-option label="Custom Label 3" value="3" text="Option 3"></vwc-option>
</vwc-select>
```
## Dimensions

### Height (CSS Variable)
Use `--select-height` to set the height of the list-box containing the select options

Type: `string`  
Default: `fit-content`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select {
    --select-height: 200px;
  }
</style>
<vwc-select>
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
  <vwc-option value="4" text="Option 4"></vwc-option>
  <vwc-option value="5" text="Option 5"></vwc-option>
  <vwc-option value="6" text="Option 6"></vwc-option>
  <vwc-option value="7" text="Option 7"></vwc-option>
</vwc-select>
```

### Width
By default, the select width is `fit-content` and the same goes for the list-box containing the options.  

You can specify width on the `vwc-select` if required (the list-box will not be affected by this setting).


```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  vwc-select{
    width: 140px
  }
</style>
<vwc-select label="choose one option">
  <vwc-option value="1" text="Option 1: dogs"></vwc-option>
  <vwc-option value="2" text="Option 2: cats"></vwc-option>
  <vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-select>
```


## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Select component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.  
If needed a `z-index` value can be set on the host

## Use Case

```html preview
<style>
  html { /* for demo purposes */
    block-size: 250px;
  }
  vwc-select {width: 120px;}
</style>
<vwc-select label="country code" icon="flag-united-states">
  <vwc-option value="1" text="+1" icon="flag-united-states"></vwc-option>
  <vwc-option value="+49" text="+49" icon="flag-germany"></vwc-option>
  <vwc-option value="+355" text="+355" icon="flag-albania"></vwc-option>
</vwc-select>
<script>
const select = document.querySelector('vwc-select');
select?.addEventListener('change', (e) => {
	select.icon = select.selectedOptions[0].icon;
});
</script>
```
