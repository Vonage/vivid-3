# sidenav

This element's attributes include the [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) attributes.

```js
<script type="module">
    import '@vonage/vivid/sidenav';
</script>
```

## Slots

### SideNavItem

In order to create a hierarchy of navigation elements, add the `vwc-sidenav-item` elements to the `vwc-sidenav`.

```html preview
<vwc-sidenav>
    <vwc-sidenav-item href="#" text="Profile"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="GitHub"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="lorem ipsum"></vwc-sidenav-item>
<vwc-sidenav>
```

### SideNavHeading

In order to add headings to the hierarchy of navigation elements, add `vwc-sidenav-heading` elements to the `vwc-sidenav`.

```html preview
<vwc-sidenav>
    <vwc-sidenav-item href="#" text="Section 1"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="Section 2"></vwc-sidenav-item>
    <vwc-text font-face="subtitle-2">CATEGORY 1</vwc-text>
    <vwc-sidenav-item href="#" text="Section 3"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="Section 4"></vwc-sidenav-item>
    <vwc-text font-face="subtitle-2">CATEGORY 2</vwc-text>
    <vwc-sidenav-item href="#" text="Section 5"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="Section 6"></vwc-sidenav-item>
<vwc-sidenav>
```
