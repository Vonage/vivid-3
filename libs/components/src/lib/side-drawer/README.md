# Side-Drawer

```js
<script type='module'>
    import '@vonage/vivid/side-drawer';
</script>
```

## Properties

### Open

Use the `open` attribute to indicate whether the side drawer is open.
You can also close the side drawer by pressing the `ESC` key.

- Type: `Boolean`
- Default: `false`

```html preview full
<style>
    html { 
        block-size: 200px; 
    }
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
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>

    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
   sideDrawer.open = !sideDrawer.open;
  }
</script>
```

### Modal

Use the `modal` attribute to set the side drawer's type to modal.
Click on the `scrim` or the `ESC` key to close the modal side-drawer.

- Type: `Boolean`
- Default: `false`

```html preview full
<style>
    html { 
        block-size: 200px; 
    }
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
 <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>

    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
   sideDrawer.open = !sideDrawer.open;
  }
</script>
```

### Alternate

Use the `alternate` attribute to apply scheme alternate region.

- Type: `Boolean`
- Default: `false`

```html preview full
<style>
    html { 
        block-size: 200px; 
    }
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
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>

    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
   sideDrawer.open = !sideDrawer.open;
  }
</script>
```

### Position

Use the `position` attribute to set the side of the side drawer.

- Type: `"start" | "end"`
- Default: `"start"`

```html preview full
<style>
    html { 
        block-size: 200px; 
    }
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
    vwc-button#button{
        margin-left: calc(100% - 40px);
    }
</style>
<vwc-side-drawer id="sideDrawer" open position="end">
 <div>
  <vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
 </div>
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>

    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
   sideDrawer.open = !sideDrawer.open;
  }
</script>
```

## Slots

### Header

To add a header to the side drawer, add a slot called `header`.

```html preview full
<style>
    html { 
        block-size: 200px; 
    }
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-side-drawer id="sideDrawer" open>
 <div slot="header">
        <vwc-text tight font-face="subtitle-1">VIVID</vwc-text>
    </div>
 <div>
  <vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
 </div>
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>

    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
   sideDrawer.open = !sideDrawer.open;
  }
</script>
```

### App-content

To add content aside the side-drawer, add a slot called `app-content`.

```html preview full
<style>
    html { 
        block-size: 200px; 
    }
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
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>

    <vwc-text font-face="body-1">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
   sideDrawer.open = !sideDrawer.open;
  }
</script>
```

## CSS Custom Properties

### Background-color

- `--side-drawer-background-color`
- Type: `String`
- Default: Current theme's canvas (background) color

Controls the background of the side drawer.

### Color

- `--side-drawer-color`
- Type: `String`
- Default: Current theme's on-canvas (text) color

Controls the color of the side drawer.

### Inline-size

- `--side-drawer-inline-size`
- Type: `Number`
- Default: `280px`

Controls the inline size of the side drawer.

### Padding-body

- `--side-drawer-padding-body`
- Type: `Number`
- Default: `16px`

Controls the padding of the side drawer's body.

### Padding-header

- `--side-drawer-padding-header`
- Type: `Number`
- Default: `16px`

Controls the padding of the side drawer's top bar.

### Z-index

- `--side-drawer-z-index`
- Type: `Number`
- Default: `6`

Controls the z-index of the side drawer.

## CSS Parts

### Base

### Header

### Body
