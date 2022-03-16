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

```html preview
<vwc-side-drawer open>
	<div slot="top-bar">
		<vwc-icon type="vonage-mono"></vwc-icon>
		<vwc-text font-face="body-1-bold"> VONAGE</vwc-text>
	</div>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<div slot="app-content">
        <vwc-text font-face="body-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
</vwc-side-drawer>
```
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