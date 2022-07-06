# Header

represents the top header of a page.

```html
<script type="module">
  import '@vonage/vivid/header';
</script>
```

## Members

### Elevation Shadow

Header is an elevated element and applies elevation surface background color (more noticeable in **dark** themes) but leaves out elevation shadow (more noticeable in **light** themes) for author's to opt-in.
Set `elevationShadow` on header to apply the elevation shadow corresponding with its surface background color.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-header elevation-shadow>
  Header content
</vwc-header>
```

### Alternate

Use `alternate` to apply an alternate color-scheme, which is in contrast with the current global theme and applies on all assigned vivid components.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-header alternate>
  Header content
</vwc-header>
```

## Slots

### Default

The default slot sets assigned nodes to the start of the header.

```html preview full
<vwc-header>
   Header content
</vwc-header>
```

### Action Items

Nodes assigned to `actionItems` slot will be set at the end of the header.

```html preview full
<vwc-header>
  <vwc-button slot="actionItems" icon="twitter-mono"></vwc-button>
  <vwc-button slot="actionItems" icon="facebook-mono"></vwc-button>
  <vwc-button slot="actionItems" icon="heart-solid"></vwc-button>
</vwc-header>
```

### App Content

An optional approach to using header in application is to assign application context directly to the header's `app-content` slot, which will set content to follow, vertically, the header itself.

```html preview full
<vwc-header>
  Header content
  <main slot="app-content">
    <vwc-layout gutters="small">
      <vwc-text>
        Application content
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

- Type: `css-unit`
- Accessibility: `read-only`
- Value: `64px`

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
  Header content

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

The component's internal *header* element.

```html preview full
<style>
  vwc-header::part(base) {
    background-color: var(--vvd-color-neutral-20);
  }
</style>

<vwc-header>
  Header content
</vwc-header>
```

## Usage Examples

### Fixed Header with Side Drawer

A *fixed* Header as primary element containing a Side Drawer containing application content.

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
  Header content

  <!-- side drawer custom element assigned to header's 'app-content' slot -->
  <vwc-side-drawer open slot="app-content">

    <vwc-layout gutters="small">
      <vwc-text>
        Side Drawer content
      </vwc-text>
    </vwc-layout>

    <!-- main element assigned to side-drawer's 'app-content' slot -->
    <main slot="app-content">
      <vwc-layout gutters="small" column-basis="block">
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

### Side Drawer with Header

A Side Drawer as primary element containing a Header containing application content.

```html preview full
<style>
  vwc-side-drawer::part(base) {
    border-right: 1px solid var(--vvd-color-neutral-20);
  }
</style>

<vwc-side-drawer open>

  <vwc-layout gutters="small">
    <vwc-text>
      Side Drawer content
    </vwc-text>
  </vwc-layout>

  <!-- header custom element assigned to side drawer's 'app-content' slot -->
  <vwc-header slot="app-content">

    <vwc-layout gutters="small">
      <vwc-text>
        Header content
      </vwc-text>
    </vwc-layout>

    <!-- main element assigned to header's 'app-content' slot -->
    <main slot="app-content">
      <vwc-layout gutters="small" column-basis="block">

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
  </vwc-header>

</vwc-side-drawer>
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
