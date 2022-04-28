# FAB

A floating action button (FAB) is a circled icon that floats above the user interface. You should use it for actions that strongly define your app, so that it stands out among the rest of the UI.

```js
<script type="module">
    import '@vonage/vivid/fab';
</script>
```

## Icon

Use the `icon` attribute to change the FAB's icon.
You can choose an icon from the [vivid icons search platform](https://icons.vivid.vonage.com).

- Type: `string`
- Default: `''`

```html preview
<vwc-fab icon="plus-line"></vwc-fab>
```
