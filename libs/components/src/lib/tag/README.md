# Tag

```js
<script type='module'>
  import '@vonage/vivid/tag';
</script>
```

## Members

### Text

Add a `text` attribute to add text to the tag.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag text='tag'></vwc-tag>
```


### Shape

Use the `shape` attribute to change the tag's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-tag text='rounded' shape='rounded'></vwc-tag>
<vwc-tag text='pill' shape='pill'></vwc-tag>
```

### Size

Use the `size` attribute to set the tag's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-tag text='condensed' size='condensed'></vwc-tag>
<vwc-tag text='normal' size='normal'></vwc-tag>
<vwc-tag text='expanded' size='expanded'></vwc-tag>
```

### Icon

Use `icon` to set an icon to the tag.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag text='icon' icon='pin-line'></vwc-tag>
```

### Appearance

Set the `appearance` attribute to change the tag's appearance.

- Type: `'subtle'` | `'duotone'`
- Default: `'filled'`

```html preview
<vwc-tag text='subtle' appearance='subtle'></vwc-tag>
<vwc-tag text='duotone' appearance='duotone'></vwc-tag>
```

### Connotation

Set the `connotation` attribute to change the tag's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

#### Subtle tag with connotation

```html preview
<vwc-tag text='accent' appearance='subtle' connotation='accent'></vwc-tag>
<vwc-tag text='cta' appearance='subtle' connotation='cta'></vwc-tag>
```

#### Duotone tag with connotation

```html preview
<vwc-tag text='accent' appearance='duotone' connotation='accent'></vwc-tag>
<vwc-tag text='cta' appearance='duotone' connotation='cta'></vwc-tag>
```

### Disabled

Add the `disabled` attribute to disable the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag text="disabled" disabled></vwc-tag>
```

### Selectable

Add the `selectable` attribute to select the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag text="selectable" selectable></vwc-tag>
```

### Removable

The `removable` attribute sets a remove button. On click it will remove the tag from the DOM.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag text="removable" removable></vwc-tag>
```

## Events

### Removed

Fires `removed` when the tag removed.

### Selected Change

Fires a custom `selected-change` event when the selected state changes.

## Methods

### remove()

- Type: `function`
- Returns: `void`

Removes the tag from the DOM.  Fires the `removed` event and removes the tag from the DOM completely.  If you have a variable that refers to the tag element make sure to clear it otherwise it might cause a memory leak.


### Accessibility

Authors MUST ensure tags default to role option are contained in, or owned by, a tags set which default to the listbox role. Options not associated with a listbox might not be correctly mapped to an accessibility API