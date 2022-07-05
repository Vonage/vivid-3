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

- Type: `'start'` | `'end'`
- Default: `'start'`

```html preview full
<vwc-side-drawer open position="end">
  <vwc-layout slot="app-content" gutters="small">
    <vwc-text>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
      </p>
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
```

## Slots

### App Content

To add content aside the side-drawer, add a slot called `app-content`.

```html preview full
<style>
  html { 
      block-size: 200px; 
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

### Application Content Offset

`--side-drawer-app-content-offset` controls the offset of the side drawer's app-content from the window's edge.
some designs may choose side-drawer to overlap the app-content, so the app-content should be offset by the side-drawer's width.
Additionally, as aside element (which represents the actual side-drawer), is styled with `position: fixed`, customizing its inline size directly will not affect the application content offset interchangeably. Hence, using this CSS custom property is mandatory to account for side-drawer inline size altercations.

- Type: `css-unit`
- Default: `280px`

```html preview full
<style>
  vwc-side-drawer {
    --side-drawer-app-content-offset: 280px;
  }

  vwc-fab { 
    position: absolute;
    inset: 8px 8px auto auto; 
  }
</style>

<vwc-side-drawer id="sideDrawer" open>
  <vwc-fab slot="app-content" id="button" shape="pill" icon='menu-solid'></vwc-fab>
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
<script>
  function toggleOpen() {
     sideDrawer.open = !sideDrawer.open;
  }

  button.addEventListener('click', toggleOpen);
</script>
```

## CSS Parts

### Base

Select `base` part to access the component's internal *aside* element.

```html preview full
<style>
  vwc-side-drawer::part(base) {
    background-color: var(--vvd-color-neutral-10);
  }
</style>

<vwc-side-drawer open>
  <vwc-text>
    Customised base part
  </vwc-text>
</vwc-side-drawer>
```
