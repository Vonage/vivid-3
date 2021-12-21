# vwc-badge

Represents a badge custom element.<br/>
Badge is a label that holds small amounts of information.<br/>
A badge can be used to display unread notifications, or to label a block of text.<br/>
Badges don’t work for navigation because they can't include a hyperlink.<br/>

```js
<script type="module">
    import '@vonage/vivid/badge';
</script>
```

## Badge text
adding the `text` property

```html preview
<vwc-badge text="text label"></vwc-badge>
```

## Badge layout
There are 3 type `filled`, `soft`, `outlined`

```html preview
<vwc-badge text="label" connotation="primary"></vwc-badge>
<vwc-badge text="label" connotation="primary" layout="soft"></vwc-badge>
<vwc-badge text="label" connotation="primary" layout="outlined"></vwc-badge>
```

## connotation
Sets the badge color with its connoted perception.
It accepts a subset of values from a globally pre-defined set.

- connotation types `primary`, `cta`, `success`, `alert`, `warning`, `info`
- Default `primary`

### Filled badge with connotation
```html preview
<vwc-badge text="label" connotation="primary"></vwc-badge>
<vwc-badge text="label" connotation="cta"></vwc-badge>
<vwc-badge text="label" connotation="info"></vwc-badge>
<vwc-badge text="label" connotation="success"></vwc-badge>
<vwc-badge text="label" connotation="warning"></vwc-badge>
<vwc-badge text="label" connotation="alert"></vwc-badge>
```

### Soft badge with connotation
```html preview
<vwc-badge text="label" layout="soft" connotation="primary"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="cta"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="info"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="success"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="warning"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="alert"></vwc-badge>
```

### outline badge with connotation
```html preview
<vwc-badge text="label" layout="outlined" connotation="primary"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="cta"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="info"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="success"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="warning"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="alert"></vwc-badge>
```

## Badge Sizes
There are 3 Badge sizes:
- dense
- regular (default)
- enlarged

```html preview
<vwc-badge text="label" size="small"></vwc-badge>
<vwc-badge text="label"></vwc-badge>
<vwc-badge text="label" size="large"></vwc-badge>
```

## Badge Shapes
There are 2 shapes for Badge:
- rounded
- pill

```html preview
<vwc-badge text="label" shape="rounded" enlarged></vwc-badge>
<vwc-badge text="label" shape="pill" enlarged></vwc-badge>
```

## Badge With Icon
Icon position options:
- prefixed icon: `icon="icon-name"`
- suffixed icon: `icontrailing="icon-name"`

```html preview
<vwc-badge text="label" icon="check-line"></vwc-badge>
<vwc-badge text="label" icon="check-line" icon-trailing></vwc-badge>
```
