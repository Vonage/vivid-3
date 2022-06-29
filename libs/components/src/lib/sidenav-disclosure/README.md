# Side Navigation

Represents a sidenav-disclosure custom element.

```js
<script type="module">
    import '@vonage/vivid/sidenav-disclosure';
</script>
```

## Slots

### Side Navigation Disclosure

In order to create a hierarchy of navigation elements, add the `vwc-sidenav-item` elements to the `vwc-sidenav-disclosure`.

```html preview
<vwc-sidenav-disclosure label="1st level item" icon="chat-line">
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
</vwc-sidenav-disclosure>
```
