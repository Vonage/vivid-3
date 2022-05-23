# sidenav-item

This element's attributes include the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) attributes.

```js
<script type="module">import '@vonage/vivid/sidenav-item';</script>
```

## Text

- Type: `String`
- Default: `''`

Add a `text` attribute to add text to the sidenav item.

```html
<vwc-sidenav-item href="#" text="Profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="GitHub"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="lorem ipsum"></vwc-sidenav-item>
```

## Icon

Sidenav item text can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html
<vwc-sidenav-item href="#" text="Profile" icon="profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="GitHub" icon="github-mono"></vwc-sidenav-item>
<vwc-sidenav-item href="#" text="lorem ipsum" icon="delete-line"></vwc-sidenav-item>
```

## Icon Only

If text is not applied...

```html
<vwc-sidenav-item href="#" icon="profile"></vwc-sidenav-item>
<vwc-sidenav-item href="#" icon="github-mono"></vwc-sidenav-item>
<vwc-sidenav-item href="#" icon="delete-line"></vwc-sidenav-item>
```
