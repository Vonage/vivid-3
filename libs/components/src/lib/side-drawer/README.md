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

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-side-drawer open>

  <vwc-layout gutters="small">
    <vwc-text>
      Side Drawer content
    </vwc-text>
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    <vwc-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </vwc-text>
 </vwc-layout>

</vwc-side-drawer>
```

### Modal

Use the `modal` attribute to set the side drawer's type to modal.
Click on the `scrim` or press the `ESC` key (while drawer is focused) to close the modal side-drawer.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-side-drawer modal open>

  <vwc-layout gutters="small">
    <vwc-text>
      Side Drawer content
    </vwc-text>
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    <vwc-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </vwc-text>
 </vwc-layout>

</vwc-side-drawer>
```

### Alternate

Use the `alternate` attribute to apply scheme alternate region.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-side-drawer alternate open>

  <vwc-layout gutters="small">
    <vwc-text>
      Side Drawer content
    </vwc-text>
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    <vwc-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </vwc-text>
 </vwc-layout>

</vwc-side-drawer>
```

### Position

Use the `position` attribute to set the side of the side drawer.

- Type: `'start'` | `'end'`
- Default: `'start'`

```html preview full
<vwc-side-drawer position="end" open>

  <vwc-layout gutters="small">
    <vwc-text>
      Side Drawer content
    </vwc-text>
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    <vwc-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </vwc-text>
 </vwc-layout>

</vwc-side-drawer>
```

## Slots

### Default

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
    --side-drawer-app-content-offset: 230px;
  }

  vwc-fab { 
    position: fixed;
    inset: auto auto 8px 8px;
    z-index: 2;
  }
</style>

<vwc-side-drawer id="sidedrawer">
  <vwc-fab icon='menu-solid' slot="app-content" onclick="sidedrawer.open = !sidedrawer.open"></vwc-fab>
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-text>
      Toggle the side drawer by clicking the FAB.
      <br>
      Notice that the side drawer overlaps the application content.
    </vwc-text>
 </vwc-layout>
</vwc-side-drawer>
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
