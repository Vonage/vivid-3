# Header

```html
<script type="module">
    import '@vonage/vivid/header';
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
<vwc-header heading="Header">
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
</vwc-header>
```

### Fixed

Add the `fixed` attribute to set the header's position to be fixed.

- Type: `boolean`
- Default: `false`

```html preview full
<style>
    html { 
      block-size: 200px; 
    }
</style>
<vwc-header heading="Fixed Header" fixed>
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
</vwc-header>
```

### Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-header heading="Alternate Header" alternate></vwc-header>
```

## Slots

### Default

The default slot is for action content next to the heading.

```html preview full
<vwc-header heading="With Default Slot">
    <vwc-button icon="menu-line"></vwc-button>
</vwc-header>
```

### Action Items

Action items are displayed at the end of the header in the `actionItems` slot.

```html preview full
<vwc-header heading="With Action Items Slot">
    <div slot="actionItems">
        <vwc-button icon="twitter-mono"></vwc-button>
        <vwc-button icon="facebook-mono"></vwc-button>
        <vwc-button icon="heart-solid"></vwc-button>
    </div>
</vwc-header>
```

### App-content

To add content below the header, add a slot called `app-content`.

```html preview full
<vwc-header heading="With App Content Slot">
  <div slot="app-content">
    <vwc-text tight font-face="body-1">
        This is the app-content slot!!!!
    </vwc-text>
  </div>
</vwc-header>
```

## Example Usage

### Header wrapping a [Side-drawer](../../components/side-drawer)

[An example of a Side-drawer wrapping a Header can be found here.](../../components/side-drawer/#side-drawer-wrapping-a-header)

```html preview full
<style>
   html { 
      block-size: 300px; 
    }
    vwc-side-drawer#sideDrawer{
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-header fixed heading="Header with Side Drawer">
  <vwc-button id="button" icon="menu-line"></vwc-button>
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
</vwc-header>
<script>
  button.addEventListener('click', function() {
    sideDrawer.open = !sideDrawer.open;
  });
</script>
```

### Header with [Banner](../../components/banner)

Banners are placed at the top of the screen below the Header.

```html preview full
<style>
  html { 
    block-size: 200px; 
  }
</style>
<vwc-header heading="With Banner" fixed>
  <div slot="app-content">
    <vwc-banner text="Here's some information that you may find important!"></vwc-banner>
    <vwc-layout column-basis="block" gutters="medium">
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
  </div>
</vwc-header>
```

## CSS Custom Properties

### Z-index

Use the `--header-z-index` to control the z-index of the header.

- Type: `Number`
- Default: `7`
