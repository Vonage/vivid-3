# Side Drawer

```js
<script type='module'>
  import '@vonage/vivid/side-drawer';
</script>
```

## Members

### Open

Use the `open` attribute to indicate whether the side drawer is open.
You can also close the side drawer by pressing the `ESC` key.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-side-drawer open>

  <vwc-layout gutters="small">
    <p>
      Side Drawer content
    </p>
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
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
    Side Drawer content
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </vwc-layout>

</vwc-side-drawer>
```

### Alternate

Use `alternate` to apply an alternate color-scheme, which is in contrast with the current global theme and applies on all assigned vivid components.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-side-drawer alternate open>

  <vwc-layout gutters="small">
    Side Drawer content
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
   </vwc-layout>

</vwc-side-drawer>
```

### Trailing

Use the `trailing` attribute to set the side of the drawer.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-side-drawer trailing open>

  <vwc-layout gutters="small">
    Side Drawer content
  </vwc-layout>

  <vwc-layout gutters="small" slot="app-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </vwc-layout>

</vwc-side-drawer>
```

## Slots

### Default

The default slot sets assigned nodes to the side drawer itself.

```html preview full 150px
<vwc-side-drawer open>

  <vwc-layout gutters="small">
    Side Drawer content
  </vwc-layout>

</vwc-side-drawer>
```

### App Content

The `app-content` slot sets assigned nodes to the main application content, the side drawer is opened next to.

```html preview full
<vwc-side-drawer open>

  <vwc-layout gutters="small" slot="app-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </vwc-layout>

</vwc-side-drawer>
```

## Events

<div class="table-wrapper">

| Name    | Description                                    |
| ------- | ---------------------------------------------- |
| `open`  | Fires `open` when the side drawer is opening.  |
| `close` | Fires `close` when the side drawer is closing. |


</div>

## CSS Variables

### Application Content Offset

When side drawer is opened, `--side-drawer-app-content-offset` controls the offset of the side drawer's application content from the window's edge.
some designs may choose side-drawer to overlap the app-content, so the app-content should be offset by the side-drawer's width.
Additionally, as the *base* element (which represents the actual side-drawer), is styled with `position: fixed`, customizing its inline size directly will not affect the application content offset interchangeably. Hence, using this CSS custom property is mandatory to account for side-drawer inline size altercations.

- Default: `280px`

```html preview full 150px
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

  <vwc-layout slot="app-content" gutters="medium">
    Toggle the side drawer by clicking the FAB.
    <br>
    Notice that the side drawer overlaps the application content.
 </vwc-layout>

<vwc-fab connotation="accent" icon='menu-solid' slot="app-content" onclick="sidedrawer.open = !sidedrawer.open"></vwc-fab>

</vwc-side-drawer>
```

## CSS Parts

### Base

Select `base` part to access the component's internal *base* element (which represents the actual side-drawer).

```html preview full 150px
<style>
  vwc-side-drawer::part(base) {
    background-color: var(--vvd-color-neutral-50);
  }
</style>

<vwc-side-drawer open>

  <vwc-layout gutters="small">
    Side Drawer content
  </vwc-layout>

</vwc-side-drawer>
```

## Use Cases

### Collapsible Side Drawer

```html preview full 250px
<style>
  vwc-fab {
    position: fixed;
    inset: auto auto 8px 8px;
    z-index: 2;
  }
  vwc-side-drawer::part(base) {
    transform: var(--demo-drawer-transform);
  }
  vwc-side-drawer {
    --demo-drawer-transform: translateX(0);
    --side-drawer-app-content-offset: 280px;
  }
  vwc-side-drawer.collapsed {
    --demo-drawer-transform: translateX(calc(-100% + 70px));
     --side-drawer-app-content-offset: 70px;
  }
</style>

<vwc-side-drawer id="sideDrawer" alternate open>
  <vwc-layout gutters="small" column-basis="block">
  <vwc-nav id="sideNav">
        <vwc-nav-item href="#" text="Calls" icon="call-line" data-value="Calls" onclick="onClick(this)" aria-current="page"></vwc-nav-item>
        <vwc-nav-item href="#" text="Voicemail" icon="voicemail-line" data-value="Voicemail" onclick="onClick(this)"></vwc-nav-item>
        <vwc-nav-item href="#" text="SMS" icon="chat-line" data-value="SMS" onclick="onClick(this)"></vwc-nav-item>
  </vwc-nav>
  </vwc-layout>
  <vwc-layout slot="app-content" gutters="medium">
  Toggle the side drawer by clicking the FAB.
  </vwc-layout>
  <vwc-fab icon='menu-solid' slot="app-content" onclick="onToggle()"></vwc-fab>
</vwc-side-drawer>

<script>
  function onToggle(){
    sideDrawer.classList.toggle('collapsed');
    const isCollapsed = sideDrawer.classList.contains('collapsed');

    for(let i = 0; i < sideNav.children.length; i++){
      const value = sideNav.children[i].dataset.value;
      sideNav.children[i].text = isCollapsed ? "" : value;
      sideNav.children[i].style.alignSelf = isCollapsed ? "flex-end" : "";
      // There must be an aria-label on nav-items with only an icon
      sideNav.children[i].ariaLabel = isCollapsed ? value : "";
    }
  }

  function onClick(el) {
    currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    el.setAttribute('aria-current', 'page');
  }
</script>
```

### Full content height
```html preview full 250px
<style>
  .side-drawer {
    block-size: 100vh;
  }
  .content {
    display: flex;
    align-items: center;
    background-color: var(--vvd-color-information-50);
    block-size: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
</style>
<vwc-side-drawer class="side-drawer" open>
	<vwc-layout gutters="small">
			Side Drawer content
  </vwc-layout>  
  <div class="content" slot="app-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 </div>

</vwc-side-drawer>
```
