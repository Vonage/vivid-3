# Header

represents the top header of a page.

```html
<script type="module">
  import '@vonage/vivid/header';
</script>
```

```html preview full
<vwc-header>
  Header
</vwc-header>
```

## Members

### Elevation Shadow

Header is an elevated element and applies elevation surface background color (more noticeable in **dark** themes) but leaves out elevation shadow (more noticeable in **light** themes) for author's to opt-in.
Set `elevationShadow` on header to apply the elevation shadow corresponding with its surface background color.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-header elevation-shadow>
  Header with elevation shadow
</vwc-header>
```

### Alternate

Use `alternate` to apply an alternate color-scheme, which is in contrast with the current global theme.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-header alternate>
  Header with alternate color scheme
</vwc-header>
```

## Slots

### Default

The default slot sets assigned nodes to the start of the header.

```html preview full
<vwc-header>
  <vwc-button icon="menu-line"></vwc-button>
   Default Slot
</vwc-header>
```

### Action Items

Nodes assigned to `actionItems` slot will be set at the end of the header.

```html preview full
<vwc-header heading="With Action Items Slot">
  <vwc-button slot="actionItems" icon="twitter-mono"></vwc-button>
  <vwc-button slot="actionItems" icon="facebook-mono"></vwc-button>
  <vwc-button slot="actionItems" icon="heart-solid"></vwc-button>
</vwc-header>
```

### App Content

An optional approach to using header in application is to assign application context directly to the header's `app-content` slot, which will set content to follow, vertically, the header itself.

```html preview full
<vwc-header>
  Header & App Content
  <main slot="app-content">
    <vwc-layout gutters="small">
      <vwc-text>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </vwc-text>
    </vwc-layout>
  </main>
</vwc-header>
```

## CSS Custom Properties

### Block Size

Header block size is set definitively.
Often, it is needed to use the block size value of a header in accordance with other elements in the application.
`--_header-block-size` is a private custom property holding the block size value and is applied to header style internally.
This property isn't customizable by authors but does pierce in and can be set to apply style on assigned content.

```html preview full
<style>
  vwc-header::part(base) {
    position: fixed;
    top: 0;
  }

  main {
    padding-block-start: var(--_header-block-size);
  }
</style>

<vwc-header>
  Fixed Header with Side Drawer

  <main slot="app-content">
    <vwc-layout column-basis="block" gutters="medium">
      <vwc-text tight font-face="headline-1">
        <h1>
          Application content
        </h1>
      </vwc-text>
    </vwc-layout>
  </main>
</vwc-header>
```

## CSS Parts

### Base

The component's internal header element.

```html preview full
<style>
  vwc-header::part(base) {
    position: fixed;
    top: 0;
  }
</style>

<vwc-header>
  Customized header element style
</vwc-header>
```

## Usage Examples

### Fixed Header With Side-Drawer

A *fixed* Header with the *default*, `actionItems` and `app-content` slots.

```html preview full
<style>
  html { /* for demo purposes */
    block-size: 300px; 
  }

  vwc-header::part(base) {
    position: fixed;
    top: 0;
    z-index: 2;
  }

  vwc-side-drawer::part(base) {
    block-size: calc(100vh - var(--_header-block-size));
    bottom: 0;
    top: auto;
  }

  vwc-side-drawer > main {
    padding-block-start: var(--_header-block-size);
  }
</style>

<vwc-header>
  Fixed Header with Side Drawer

  <!-- drawer assigned to header 'app-content' -->
  <vwc-side-drawer id="sideDrawer" open slot="app-content">
    <span slot="header">
      Header...
    </span>
    <!-- main assigned to side-drawer 'app-content' -->
    <main slot="app-content">
      <vwc-layout column-basis="block" gutters="medium">
        <vwc-text tight font-face="headline-2">
          <h2>
            Scroll this window
          </h2>
        </vwc-text>

        <vwc-text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
          </p>
        </vwc-text>

        <vwc-text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
          </p>
        </vwc-text>
      </vwc-layout>
    </main>
  </vwc-side-drawer>
</vwc-header>
```

### Header with Banner

Banners are placed at the top of the screen below the Header.
The Banner in this example is set to stick in to top of the window.

```html preview full
<style>
  html { 
    block-size: 200px; 
  }

  vwc-banner {
    position: sticky;
    top: 0;
  }
</style>

<vwc-header>
  Header with Banner

  <vwc-banner slot="app-content" text="Here's some information that you may find important!"></vwc-banner>

  <vwc-layout slot="app-content" column-basis="block" gutters="medium">
    <vwc-text tight font-face="headline-1">
      <h1>
        Page Header
      </h1>
    </vwc-text>

    <vwc-text>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
      </p>
    </vwc-text>

    <vwc-text>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
      </p>
    </vwc-text>
  </vwc-layout>

</vwc-header>
```
