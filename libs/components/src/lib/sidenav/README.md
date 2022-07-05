# Side Navigation

Represents a side navigation custom element.

```js
<script type="module">
    import '@vonage/vivid/sidenav';
</script>
```

## Slots

### Side Navigation Item

In order to create a hierarchy of navigation elements, add the `vwc-sidenav-item` elements to the `vwc-sidenav`.

```html preview
<vwc-sidenav>
    <vwc-sidenav-item href="#" text="Profile"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="GitHub"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="lorem ipsum"></vwc-sidenav-item>
<vwc-sidenav>
```
