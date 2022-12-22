# Badge

Badge is a label that holds small amounts of information.
A badge can be used to display unread notifications, or to label a block of text.
Badges don’t work for navigation because they can't include a hyperlink.

```js
<script type='module'>
  import '@vonage/vivid/badge';
</script>
```

## Members

### Text

Add a `text` attribute to add text to the badge.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-badge text='A default badge'></vwc-badge>
```


### Shape

Use the `shape` attribute to change the badge's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-badge text='rounded' shape='rounded'></vwc-badge>
<vwc-badge text='pill' shape='pill'></vwc-badge>
```

### Icon

Use `icon` to set an icon to the badge.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. If badge

- Type: `string`
- Default: `undefined`

```html preview
<vwc-badge appearance="filled" icon='message-sent-line'></vwc-badge>
<vwc-badge appearance="filled" icon='message-sent-line' shape="pill"></vwc-badge>
```

### Icon with Text

Badge text can be affixed by a decorative icon, either by its start or end.
Toggle `icon-trailing` to set the icon's horizontal alignment.

- Type: `boolean`
- Default: `undefined`

```html preview
<vwc-badge appearance="filled" text='icon' icon='check-line'></vwc-badge>
<vwc-badge appearance="filled" text='icon-trailing' icon='check-line' icon-trailing></vwc-badge>
```

### Appearance

Set the `appearance` attribute to change the badge's appearance.

- Type: `'filled'` | `'subtle'` | `'duotone'`
- Default: `'filled'`

```html preview
<vwc-badge text='filled' appearance='filled'></vwc-badge>
<vwc-badge text='subtle' appearance='subtle'></vwc-badge>
<vwc-badge text='duotone' appearance='duotone'></vwc-badge>
```

### Connotation

Set the `connotation` attribute to change the badge's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'` | `'warning'` | `'information'`
- Default: `'accent'`

#### Filled badge with connotation

```html preview
<vwc-badge text='accent' connotation='accent' appearance="filled"></vwc-badge>
<vwc-badge text='cta' connotation='cta' appearance="filled"></vwc-badge>
<vwc-badge text='information' connotation='information' appearance="filled"></vwc-badge>
<vwc-badge text='success' connotation='success'></vwc-badge>
<vwc-badge text='warning' connotation='warning'></vwc-badge>
<vwc-badge text='alert' connotation='alert'></vwc-badge>
```

#### Subtle badge with connotation

```html preview
<vwc-badge text='accent' appearance='subtle' connotation='accent'></vwc-badge>
<vwc-badge text='cta' appearance='subtle' connotation='cta'></vwc-badge>
<vwc-badge text='information' appearance='subtle' connotation='information'></vwc-badge>
<vwc-badge text='success' appearance='subtle' connotation='success'></vwc-badge>
<vwc-badge text='warning' appearance='subtle' connotation='warning'></vwc-badge>
<vwc-badge text='alert' appearance='subtle' connotation='alert'></vwc-badge>
```

#### Duotone badge with connotation

```html preview
<vwc-badge text='accent' appearance='duotone' connotation='accent'></vwc-badge>
<vwc-badge text='cta' appearance='duotone' connotation='cta'></vwc-badge>
<vwc-badge text='information' appearance='duotone' connotation='information'></vwc-badge>
<vwc-badge text='success' appearance='duotone' connotation='success'></vwc-badge>
<vwc-badge text='warning' appearance='duotone' connotation='warning'></vwc-badge>
<vwc-badge text='alert' appearance='duotone' connotation='alert'></vwc-badge>
```
