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
<vwc-tag label='tag'></vwc-tag>
```


### Shape

Use the `shape` attribute to change the tag's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-tag label='rounded' shape='rounded'></vwc-tag>
<vwc-tag label='pill' shape='pill'></vwc-tag>
```

### Size

Use the `size` attribute to set the tag's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-tag label='condensed' size='condensed'></vwc-tag>
<vwc-tag label='normal' size='normal'></vwc-tag>
<vwc-tag label='expanded' size='expanded'></vwc-tag>
```

### Icon

Use `icon` to set an icon to the tag.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tag label='icon' icon='pin-line'></vwc-tag>
```

### Appearance

Set the `appearance` attribute to change the tag's appearance.

- Type: `'subtle'` | `'duotone'`
- Default: `'filled'`

```html preview
<vwc-tag label='subtle' appearance='subtle'></vwc-tag>
<vwc-tag label='duotone' appearance='duotone'></vwc-tag>
```

### Connotation

Set the `connotation` attribute to change the tag's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

#### Subtle tag with connotation

```html preview
<vwc-tag label='accent' appearance='subtle' connotation='accent'></vwc-tag>
<vwc-tag label='cta' appearance='subtle' connotation='cta'></vwc-tag>
```

#### Duotone tag with connotation

```html preview
<vwc-tag label='accent' appearance='duotone' connotation='accent'></vwc-tag>
<vwc-tag label='cta' appearance='duotone' connotation='cta'></vwc-tag>
```

### Disabled

Add the `disabled` attribute to disable the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag label="disabled" disabled></vwc-tag>
```

### Selectable

Add the `selectable` attribute to be able to select the tag.
Toggle the `selected` attribute to select and deselect the tag.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag label="selectable" selectable selected></vwc-tag>
```

### Removable

The `removable` attribute sets a remove button. On click it will remove the tag from the DOM.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tag label="removable" removable></vwc-tag>
```

## Events

### Removed

Fires `removed` when the tag removed.

## Methods

### remove()

- Type: `function`
- Returns: `void`

Removes the tag from the DOM.  Fires the `removed` event and removes the tag from the DOM completely.  If you have a variable that refers to the tag element make sure to clear it otherwise it might cause a memory leak.


