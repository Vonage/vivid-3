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

## Badge layout
There are 3 type `filled`, `soft`, `outlined`

```html preview
<vwc-badge text="label" connotation="primary"></vwc-badge>
<vwc-badge text="label" connotation="primary" layout="soft"></vwc-badge>
<vwc-badge text="label" connotation="primary" layout="outlined"></vwc-badge>
```

## connotation
The connotation gives the badge its color.<br/>
Each color indicates a specific intention.

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
<vwc-badge text="label" dense></vwc-badge>
<vwc-badge text="label"></vwc-badge>
<vwc-badge text="label" enlarged></vwc-badge>
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
- before the text use: `icon="icon-name"`
- after the text use: `icontrailing="icon-name"`

```html preview
<vwc-badge text="label" icon="check-line"></vwc-badge>
<vwc-badge text="label" icontrailing="check-line"></vwc-badge>
```

## Properties

| Property       | Attribute      | Type                                                                                                                                         | Default  |
| -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `connotation`  | `connotation`  | `Primary \| CTA \| Success \| Alert\|`</br>`Warning \| Info \| undefined` | `primary`         
| `dense`        | `dense`        | `boolean`                                                                                                                                    | false    |
| `enlarged`     | `enlarged`     | `boolean`                                                                                                                                    | false    |
| `icon`         | `icon`         | `string \| undefined`                                                                                                                        |          |
| `iconTrailing` | `icontrailing` | `string \| undefined`                                                                                                                        |          |
| `layout`       | `layout`       | `filled \| outlined \| soft`                                                                                            | `filled` |
| `shape`        | `shape`        | `rounded \| pill \| undefined`                                                                                                   |          |
| `text`         | `text`         | `string \| undefined`                                                                                                                        |          |

## Slots

| Name      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| _default_ | This is a default/unnamed slot to assign text content. *deprecated* please use _text_ property instead |
