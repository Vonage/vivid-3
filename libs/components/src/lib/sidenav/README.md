# Side Navigation

Represents a sidenav custom element.

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

### Side Navigation Disclosure

In order to create a hierarchy of navigation elements, add the `vwc-sidenav-item` elements to the `vwc-sidenav-disclosure`.

```html preview
<vwc-sidenav>
    <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
    <vwc-sidenav-disclosure label="1st level item" icon="chat-line">
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
    </vwc-sidenav-disclosure>
    <vwc-sidenav-disclosure label="1st level item" icon="chat-line">
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
        <vwc-sidenav-disclosure label="2nd level item" icon="chat-line">
            <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
            <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
            <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        </vwc-sidenav-disclosure>
    </vwc-sidenav-disclosure>
</vwc-sidenav>
```
