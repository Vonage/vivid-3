# Tag

```js
<script type='module'>
  import '@vonage/vivid/tag';
</script>
```

## Members

### Label

Add a `label` attribute to add label to the tag.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag-group>
  <vwc-tag label='tag'></vwc-tag>
</vwc-tag-group>
```


### Shape

Use the `shape` attribute to change the tag's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-tag-group>
  <vwc-tag label='rounded' shape='rounded'></vwc-tag>
  <vwc-tag label='pill' shape='pill'></vwc-tag>
</vwc-tag-group>
```

### Icon

Use `icon` to set an icon to the tag.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag-group>
  <vwc-tag label='icon' icon='pin-line'></vwc-tag>
</vwc-tag-group>
```

### Appearance

Set the `appearance` attribute to change the tag's appearance.

- Type: `'subtle'` | `'duotone'`
- Default: `'subtle'`

```html preview
<vwc-tag-group>
  <vwc-tag label='subtle' appearance='subtle'></vwc-tag>
  <vwc-tag label='duotone' appearance='duotone'></vwc-tag>
</vwc-tag-group>
```

### Connotation

Set the `connotation` attribute to change the tag's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

#### Subtle tag with connotation

```html preview
<vwc-tag-group>
  <vwc-tag label='accent' appearance='subtle' connotation='accent'></vwc-tag>
  <vwc-tag label='cta' appearance='subtle' connotation='cta'></vwc-tag>
</vwc-tag-group>
```

#### Duotone tag with connotation

```html preview
<vwc-tag-group>
  <vwc-tag label='accent' appearance='duotone' connotation='accent'></vwc-tag>
  <vwc-tag label='cta' appearance='duotone' connotation='cta'></vwc-tag>
</vwc-tag-group>
```

### Disabled

Add the `disabled` attribute to disable the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag-group>
  <vwc-tag label="disabled" disabled></vwc-tag>
</vwc-tag-group>
```

### Selectable

Add the `selectable` attribute to be able to select the tag.
Toggle the `selected` attribute to select and deselect the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag-group>
  <vwc-tag label="selectable" selectable selected></vwc-tag>
</vwc-tag-group>
```

### Removable

The `removable` attribute sets a remove button. On click it will remove the tag from the DOM.
You can also remove the tag by pressing the `Delete` `Backspace` or  key.

Notice that it works only if the tag is `removable` and not `selectable`.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag-group>
  <vwc-tag label="removable" removable></vwc-tag>
</vwc-tag-group>
```

## Events

### Removed

Fires `removed` when the tag removed.

### Selected Change

Fires a custom 'selected-change' event when a tag has been selected.


## Methods

### remove()

- Type: `function`
- Returns: `void`

Removes the tag from the DOM.  Fires the `removed` event and removes the tag from the DOM completely.  If you have a variable that refers to the tag element make sure to clear it otherwise it might cause a memory leak.

## Custom Colors

```html preview variables
<vwc-tag-group>
  <vwc-tag connotation="$CONNOTATION" label='subtle' appearance='subtle'></vwc-tag>
  <vwc-tag connotation="$CONNOTATION" label='duotone' appearance='duotone'></vwc-tag>
</vwc-tag-group>
```
