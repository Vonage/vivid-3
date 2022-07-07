# Side Navigation Item

This element's attributes include the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) attributes.

```js
<script type="module">
  import '@vonage/vivid/sidenav-item';
</script>
```

## Members

### Text

- Type: `string`
- Default: `''`

Add a `text` attribute to add text to the sidenav item.

```html preview
<vwc-sidenav-item href="#" text="Account"></vwc-sidenav-item>
```

### Icon

Use `icon` to set an icon to the sidenav item.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the sidenav item's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-sidenav-item href="#" icon="profile" aria-label="Account"></vwc-sidenav-item>
```

### Icon with Text

Sidenav item text can be prefixed by a decorative icon.

```html preview
<vwc-sidenav-item href="#" icon="profile" text="Account"></vwc-sidenav-item>
```

### Aria Current

- Type: `boolean`
- Default: `false`

Within a set of pagination links, set a sidenav item `aria-current` value to *page* to indicate the currently active link.

```html preview
<vwc-sidenav-item href="#" text="Account"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="Shop" aria-current="page"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="My Cart"></vwc-sidenav-item>
```
