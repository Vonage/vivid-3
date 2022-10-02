# Tab

Represents a tab custom element.

```js
<script type="module">import '@vonage/vivid/tab';</script>
```

## Members

### Label

- Type: `string`
- Default: `''`

Add a `label` attribute to add label to the tab.

```html preview
<vwc-tabs>
  <vwc-tab label="Account"></vwc-tab>
</vwc-tabs>
```

### Icon

Use `icon` to set an icon to the tab.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the tab's context.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tabs>
 <vwc-tab icon="profile" aria-label="Account"></vwc-tab>
</vwc-tabs>
```

### Icon with Label

Tab label can be prefixed by a decorative icon.

```html preview
<vwc-tabs>
 <vwc-tab icon="profile" label="Account"></vwc-tab>
</vwc-tabs>
```

### Disabled

The disabled state of the element

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tabs>
 <vwc-tab disabled label="Disabled Tab"></vwc-tab>
</vwc-tabs>
```
