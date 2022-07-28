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
<vwc-sidenav>
  <vwc-sidenav-item href="#" text="Account"></vwc-sidenav-item>
</vwc-sidenav>
```

### Icon

Use `icon` to set an icon to the sidenav item.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the sidenav item's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-sidenav>
 <vwc-sidenav-item href="#" icon="profile" aria-label="Account"></vwc-sidenav-item>
</vwc-sidenav>
```

### Icon with Text

Sidenav item text can be prefixed by a decorative icon.

```html preview
<vwc-sidenav>
 <vwc-sidenav-item href="#" icon="profile" text="Account"></vwc-sidenav-item>
</vwc-sidenav>
```

### Aria Current

- Type: `boolean`
- Default: `false`

Within a set of pagination links, set a sidenav item `aria-current` value to *page* to indicate the currently active link.

```html preview
<vwc-sidenav>
 <vwc-sidenav-item href="#" text="Account" onclick="onClick(event)"></vwc-sidenav-item>
 <vwc-sidenav-item href="#" text="Shop" onclick="onClick(event)" aria-current="page"></vwc-sidenav-item>
 <vwc-sidenav-item href="#" text="My Cart" onclick="onClick(event)"></vwc-sidenav-item>
</vwc-sidenav>

<script>
  function onClick(event) {  
    const currentSidenavItem = document.querySelector('vwc-sidenav-item[aria-current="page"]');
    currentSidenavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```
