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
<vwc-sidenav-item href="#" text="Profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="GitHub"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="lorem ipsum"></vwc-sidenav-item>
```

### Aria-Current

- Type: `boolean`
- Default: `false`

Within a set of pagination links, set a sidenav item `aria-current` value to *page* to indicate the currently active link.

```html preview
<vwc-sidenav-item href="#" text="Profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="GitHub" ariaCurrent="page"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="lorem ipsum"></vwc-sidenav-item>
```

### Icon

Sidenav item text can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-sidenav-item href="#" text="Profile" icon="profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="GitHub" icon="github-mono"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="lorem ipsum" icon="delete-line"></vwc-sidenav-item>
```

### Icon Only

If text is not applied.

```html preview
<vwc-sidenav-item href="#" icon="profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" icon="github-mono"></vwc-sidenav-item>
<vwc-sidenav-item href="#" icon="delete-line"></vwc-sidenav-item>
```
