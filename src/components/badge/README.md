# vwc-badge

Represents a badge custom element.
badge is a label that holds small amounts of information. A badge can be used to display unread notifications, or to label a block of text. Badges don’t work for navigation because they can't include a hyperlink.

```html preview
<div>hello</div>
```

## Properties

| Property       | Attribute      | Type                                                                                                                                         | Default  |
| -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `connotation`  | `connotation`  | `Connotation.Primary \| Connotation.CTA \| Connotation.Success \| Connotation.Alert \| Connotation.Warning \| Connotation.Info \| undefined` |          |
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
