# vwc-side-drawer

```js
<script type='module'>
    import '@vonage/vivid/side-drawer';
</script>
```

## Open
Use the `open` attribute to indicate whether the side drawer is open.

- Type: `Boolean`
- Default: `false`
## Modal

Use the `modal` attribute to set the side drawer's type to modal.

- Type: `Boolean`
- Default: `false`

## HasTopBar

Use the `hasTopBar` attribute to add top bar to the side drawer.

- Type: `Boolean`
- Default: `false`
## Alternate

Use the `alternate` attribute to apply scheme alternate region.

- Type: `Boolean`
- Default: `false`
## Position

Use the `position` attribute to set the side of the side drawer.

- Type: `"start" | "end"`
- Default: `"start"`

## Methods

| Method | Type       | Description                                  |
| ------ | ---------- | -------------------------------------------- |
| `hide` | `(): void` | Closes the side drawer from the open state.  |
| `show` | `(): void` | Opens the side drawer from the closed state. |

## CSS Custom Properties

| Name                           | Default                                     | Description                                       |
| ------------------------------ | ------------------------------------------- | ------------------------------------------------- |
| `side-drawer-background-color` | "Current theme's canvas (background) color" | Controls the background of the side drawer        |
| `side-drawer-color`            | "Current theme's on-canvas (text) color"    | Controls the color of the side drawer             |
| `side-drawer-inline-size`      | "280px"                                     | Controls the inline size of the side drawer       |
| `side-drawer-padding-body`     | "16px"                                      | Controls the padding of the side drawer's body    |
| `side-drawer-padding-top-bar`  | "16px"                                      | Controls the padding of the side drawer's top bar |
| `side-drawer-z-index`          | 6                                           | Controls the z-index of the side drawer           |
