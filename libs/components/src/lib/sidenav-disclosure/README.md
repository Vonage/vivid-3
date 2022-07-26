# Side Navigation Disclosure

By using the sidenav-disclosure, you can either collapse (hide) or expand (show) the content.
It has two elements: a disclosure button and a section of content whose visibility is controlled by the button.
The arrow points down when the controlled content is hidden, indicating that pressing the button will reveal additional content.
The arrow points up when the content is visible.

```js
<script type="module">
  import '@vonage/vivid/sidenav-disclosure';
</script>
```

## Members

### Label

- Type: `String`
- Default: `''`

Add a `label` attribute to add label to the sidenav disclosure.

```html preview
<vwc-sidenav>
    <vwc-sidenav-disclosure label="1st level item">
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
<vwc-sidenav>
```

### Open

- Type: `Boolean`
- Default: `false`

You can toggle the sidenav-disclosure by using the `open` attribute.

```html preview
<vwc-sidenav>
    <vwc-sidenav-disclosure label="1st level item" open>
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
<vwc-sidenav>
```

### Icon

- Type: `String`
- Default: `''`

Sidenav disclosure label can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-sidenav>
    <vwc-sidenav-disclosure label="1st level item" icon="profile">
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
<vwc-sidenav>
```

### Icon Only

If label is not applied.

```html preview
<vwc-sidenav>
    <vwc-sidenav-disclosure icon="profile">
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
<vwc-sidenav>
```

## Accessibility

The sidenav-disclosure has a `role` button.  
Sidenav-disclosure has `aria-expanded` set to true when the content is visible. Otherwise, it is set to false.  
Sidenav-disclosure has a value specified for `aria-controls` that refers to the content.
