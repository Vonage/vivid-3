# vwc-badge

Represents a badge custom element.
badge is a label that holds small amounts of information. A badge can be used to display unread notifications, or to label a block of text. Badges don’t work for navigation because they can't include a hyperlink.

```js
<script type="module">
    import '@vonage/vivid/badge';
</script>
```

## connotation

- Type `'primary' | 'cta' | 'success' | 'alert' | 'warning' | 'info'`
- Default `primary`

```html preview
<vwc-badge text="label" connotation="primary"></vwc-badge>
<vwc-badge text="label" connotation="cta"></vwc-badge>
<vwc-badge text="label" connotation="info"></vwc-badge>
<vwc-badge text="label" connotation="success"></vwc-badge>
<vwc-badge text="label" connotation="warning"></vwc-badge>
<vwc-badge text="label" connotation="alert"></vwc-badge>
```

## soft

```html preview
<vwc-badge text="label" layout="soft" connotation="primary"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="cta"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="info"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="success"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="warning"></vwc-badge>
<vwc-badge text="label" layout="soft" connotation="alert"></vwc-badge>
```

## outline

```html preview
<vwc-badge text="label" layout="outlined" connotation="primary"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="cta"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="info"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="success"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="warning"></vwc-badge>
<vwc-badge text="label" layout="outlined" connotation="alert"></vwc-badge>
```

```html preview
<vwc-badge text="label" dense></vwc-badge>
<vwc-badge text="label"></vwc-badge>
<vwc-badge text="label" enlarged></vwc-badge>
```

```html preview
<vwc-badge text="label" shape="rounded"></vwc-badge>
<vwc-badge text="label" shape="pill"></vwc-badge>
```

```html preview
<vwc-badge text="label" icon="check-line"></vwc-badge>
<vwc-badge text="label" icontrailing="check-line"></vwc-badge>
```

## Properties

| Property       | Attribute      | Type                                                                                                                                         | Default  |
| -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `connotation`  | `connotation`  | `Primary \| CTA \| Success \| Alert \| Warning \| Info \| undefined` |          |
| `dense`        | `dense`        | `boolean`                                                                                                                                    | false    |
| `enlarged`     | `enlarged`     | `boolean`                                                                                                                                    | false    |
| `icon`         | `icon`         | `string \| undefined`                                                                                                                        |          |
| `iconTrailing` | `iconTrailing` | `string \| undefined`                                                                                                                        |          |
| `layout`       | `layout`       | `Layout.Filled \| Layout.Outlined \| Layout.Soft`                                                                                            | "filled" |
| `shape`        | `shape`        | `Shape.Rounded \| Shape.Pill \| undefined`                                                                                                   |          |
| `text`         | `text`         | `string \| undefined`                                                                                                                        |          |

## Slots

| Name      | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| _default_ | This is a default/unnamed slot to assign text content. *deprecated* please use _text_ property instead |
