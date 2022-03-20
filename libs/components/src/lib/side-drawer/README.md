# vwc-side-drawer

```js
<script type='module'>
    import '@vonage/vivid/side-drawer';
</script>
```

<style>
    .cbd-demo{
        padding: 0;
    }
</style>

## Open
Use the `open` attribute to indicate whether the side drawer is open.
Alternatively, you can use the `show()` and `hide()` methods as well as `ESC`.

- Type: `Boolean`
- Default: `false`

```html preview
<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<div slot="app-content">
         <vwc-text font-face="body-1">
            <vwc-button id="button" appearance='outlined' label='Click on me!'></vwc-button>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
</vwc-side-drawer>
<script>
  const sideDrawer = document.getElementById("sideDrawer");
  const button = document.getElementById("button");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  sideDrawer.open = !sideDrawer.open;
  }
</script>
```
## Top Bar

To add a top bar to the side drawer, add a slot called `top-bar`.

```js
<div slot="top-bar">
    <vwc-text>VIVID</vwc-text>
</div>
```
```html preview
<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open>
	<div slot="top-bar">
        <vwc-text font-face="subtitle-1">VIVID</vwc-text>
    </div>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<div slot="app-content">
         <vwc-text font-face="body-1">
            <vwc-button id="button" appearance='outlined' label='Click on me!'></vwc-button>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
</vwc-side-drawer>
<script>
  const sideDrawer = document.getElementById("sideDrawer");
  const button = document.getElementById("button");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  sideDrawer.open = !sideDrawer.open;
  }
</script>
```
## Modal

Use the `modal` attribute to set the side drawer's type to modal.
Click on the `scrim` or the `ESC` key to close the modal side-drawer.

- Type: `Boolean`
- Default: `false`

```html preview
<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open modal>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<div slot="app-content">
         <vwc-text font-face="body-1">
            <vwc-button id="button" appearance='outlined' label='Click on me!'></vwc-button>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
</vwc-side-drawer>
<script>
  const sideDrawer = document.getElementById("sideDrawer");
  const button = document.getElementById("button");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  sideDrawer.open = !sideDrawer.open;
  }
</script>
```
## Alternate

Use the `alternate` attribute to apply scheme alternate region.

- Type: `Boolean`
- Default: `false`

```html preview
<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open alternate>
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<div slot="app-content">
         <vwc-text font-face="body-1">
            <vwc-button id="button" appearance='outlined' label='Click on me!'></vwc-button>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
</vwc-side-drawer>
<script>
  const sideDrawer = document.getElementById("sideDrawer");
  const button = document.getElementById("button");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  sideDrawer.open = !sideDrawer.open;
  }
</script>
```
## Position

Use the `position` attribute to set the side of the side drawer.

- Type: `"start" | "end"`
- Default: `"start"`

```html preview
<style>
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open position="end">
	<div>
		<vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
	</div>
	<div slot="app-content">
         <vwc-text font-face="body-1">
            <vwc-button id="button" appearance='outlined' label='Click on me!'></vwc-button>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
            a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum.
        </vwc-text>
	</div>
</vwc-side-drawer>
<script>
  const sideDrawer = document.getElementById("sideDrawer");
  const button = document.getElementById("button");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  sideDrawer.open = !sideDrawer.open;
  }
</script>
```

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
