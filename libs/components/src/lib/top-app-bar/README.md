# top-app-bar

```html
<script type="module">
    import '@vonage/vivid/top-app-bar';
</script>
```

## Properties

### Heading

Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `undefined`

```html preview full
<style>
    html { 
      block-size: 200px; 
    }
</style>
<vwc-top-app-bar heading="Top App Bar">
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-text tight font-face="headline-2">
      <h2>
        Scroll to see the effect.
      </h2>
    </vwc-text>

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
</vwc-top-app-bar>
```

### Fixed

Add the `fixed` attribute to set the top-app-bar's position to be fixed.

- Type: `boolean`
- Default: `false`

```html preview full
<style>
    html { 
      block-size: 200px; 
    }
</style>
<vwc-top-app-bar heading="Fixed Top App Bar" fixed>
  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-text tight font-face="headline-2">
      <h2>
        Scroll to see the effect.
      </h2>
    </vwc-text>

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
</vwc-top-app-bar>
```

### Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-top-app-bar heading="Alternate Top App Bar" alternate></vwc-top-app-bar>
```

## Slots

### Meta

The `meta` slot is for action content next to the heading.

```html preview full
<vwc-top-app-bar heading="With Meta">
    <vwc-button slot="meta" icon="menu-line"></vwc-button>
</vwc-top-app-bar>
```

### Action Items

Action items are displayed at the end of the top-app bar in the `actionItems` slot.

```html preview full
<vwc-top-app-bar heading="With Action Items">
    <div slot="actionItems">
        <vwc-button icon="twitter-mono"></vwc-button>
        <vwc-button icon="facebook-mono"></vwc-button>
        <vwc-button icon="heart-solid"></vwc-button>
    </div>
</vwc-top-app-bar>
```

### App-content

To add content below the top-app-bar, add a slot called `app-content`.

```html preview full
<vwc-top-app-bar heading="With App Content">
  <div slot="app-content">
    <vwc-text tight font-face="body-1">
        This is the app-content slot!!!!
    </vwc-text>
  </div>
</vwc-top-app-bar>
```

## Example Usage

### Fixed Top App Bar With Side-Drawer

This is an example of a `fixed` top-app-bar with the `meta`, `actionItems` and `app-content` slots.

```html preview full
<style>
   html { 
      block-size: 300px; 
    }
    vwc-side-drawer#sideDrawer{
        block-size: calc(100vh - var(--top-app-bar-height));
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-top-app-bar fixed heading="Top App Bar with Side Drawer">
  <vwc-button id="button" slot="meta" icon="menu-line"></vwc-button>
  <div slot="actionItems">
      <vwc-button icon="twitter-mono"></vwc-button>
      <vwc-button icon="facebook-mono"></vwc-button>
      <vwc-button icon="heart-solid"></vwc-button>
  </div>
  <vwc-side-drawer id="sideDrawer" open slot="app-content">
    <div>
        <vwc-sidenav-item href="#" text="1st level item" icon="home-line"></vwc-sidenav-item>
        <p><vwc-text font-face="body-2-bold">SECTION TITLE</vwc-text></p>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="1st level item" icon="chat-line"></vwc-sidenav-item>
    </div>
    <vwc-layout slot="app-content" column-basis="block" gutters="medium">
      <vwc-text tight font-face="headline-2">
        <h2>
          Scroll to see the effect.
        </h2>
      </vwc-text>

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
</vwc-top-app-bar>
<script>
  button.addEventListener('click', function() {
    sideDrawer.open = !sideDrawer.open;
  });
</script>
```

## CSS Custom Properties

### Z-index

Controls the z-index of the top-app-bar.

- `--top-app-bar-z-index`
- Type: `Number`
- Default: `7`

### Height

Controls the height of the top-app-bar.  

- `--top-app-bar-height`
- Type: `Number`
- Default: `64px`