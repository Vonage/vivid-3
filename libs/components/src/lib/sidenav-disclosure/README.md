# Side Navigation Disclosure

Represents a sidenav-disclosure custom element.

```js
<script type="module">
    import '@vonage/vivid/sidenav-disclosure';
</script>
```

## Properties

### Label

- Type: `String`
- Default: `''`

Add a `label` attribute to add label to the sidenav disclosure.

```html preview
<vwc-sidenav-item href="#" text="1st level item"></vwc-sidenav-item>
<vwc-sidenav-disclosure label="1st level item">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
<vwc-sidenav-disclosure label="1st level item">
    <vwc-sidenav-disclosure label="2nd level item">
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
    <vwc-sidenav-disclosure label="2nd level item">
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
    <vwc-sidenav-disclosure label="2nd level item">
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
</vwc-sidenav-disclosure>
<vwc-sidenav-item href="#" text="1st level item"></vwc-sidenav-item>
<vwc-sidenav-disclosure label="1st level item">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-disclosure label="2nd level item">
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
</vwc-sidenav-disclosure>
```

### Icon

Sidenav disclosure label can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-sidenav-disclosure label="1st level item" icon="profile">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
<vwc-sidenav-disclosure label="1st level item" icon="github-mono">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
<vwc-sidenav-disclosure label="1st level item" icon="delete-line">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
```

### Icon Only

If label is not applied.

```html preview
<vwc-sidenav-disclosure icon="profile">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
<vwc-sidenav-disclosure icon="github-mono">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
<vwc-sidenav-disclosure icon="delete-line">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
```
