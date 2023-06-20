# Header

Represents the top header of a page.

```js
<script type="module">
  import '@vonage/vivid/header';
</script>
```

## Members

### Elevation Shadow

As an elevated element, the Header applies an elevation surface background color (more noticeable in dark themes) but leaves out elevation shadow (more noticeable in light themes) for author's to opt-in.
Set `elevation-shadow` on header to apply the elevation shadow corresponding with its surface background color.

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

Nodes assigned to `action-items` slot will be set at the end of the header.

```html preview full
<vwc-header>
  <vwc-button slot="action-items" icon="twitter-mono"></vwc-button>
  <vwc-button slot="action-items" icon="facebook-mono"></vwc-button>
  <vwc-button slot="action-items" icon="heart-solid"></vwc-button>
</vwc-header>
```

### App Content

It is also possible to assign application context directly to the header's `app-content` slot, which will allow content to follow, vertically, the header.

```html preview full
<vwc-header>
  Header content
  <main slot="app-content">
    <vwc-layout gutters="small">
      Application content
    </vwc-layout>
  </main>
</vwc-header>
```

## CSS Variables

### Block Size

The size of the header block is set definitively. A header's block size value is often used in conjunction with other elements in the application. The `--vvd-header-block-size` private custom property is applied internally to header styles and holds the block size value. This property isn't customizable by authors but does pierce in and can be set to apply style to assigned content.

- Type: [`length`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Accessibility: `read-only`
- Value: `64px`

```html preview full
<style>
  vwc-header::part(base) {
    position: fixed;
    top: 0;
  }

  main {
    padding-block-start: var(--vvd-header-block-size);
  }
</style>

<vwc-header>
  Header content

  <main slot="app-content">
    <vwc-layout column-basis="block" gutters="medium">
      <h1>
        Application content
      </h1>
    </vwc-layout>
  </main>
</vwc-header>
```


###  Header background-color
Use `--header-bg-color` to set a custom background color for the header

```html preview full
<style>
  vwc-header {--header-bg-color: var(--vvd-color-neutral-200)}
</style>

<vwc-header>
  Header content
</vwc-header>
```


## CSS Parts

### Base

The component's internal *header* element.

```html preview full
<style>
  html { /* for demo purposes */
    block-size: 350px;
  }
  
  vwc-header::part(base) {
    position: fixed;
    top: 0;
    z-index: 2;
  }
  main {
    padding-block-start: var(--vvd-header-block-size);
  }
</style>
<vwc-header alternate>
  Header content
  <main slot="app-content">
      <vwc-layout gutters="small" column-basis="block">
        <h2>
          Scroll this window
        </h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
        </p>
      </vwc-layout>
    </main>
</vwc-header>
```

## Use Cases

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
    block-size: calc(100vh - var(--vvd-header-block-size));
    bottom: 0;
    top: auto;
  }

  vwc-side-drawer > main {
    padding-block-start: var(--vvd-header-block-size);
  }
</style>

<vwc-header>
  Header content

  <!-- side drawer custom element assigned to header's 'app-content' slot -->
  <vwc-side-drawer open slot="app-content">

    <vwc-layout gutters="small">
      Side Drawer content
    </vwc-layout>

    <!-- main element assigned to side-drawer's 'app-content' slot -->
    <main slot="app-content">
      <vwc-layout gutters="small" column-basis="block">
        <h2>
          Scroll this window
        </h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
        </p>
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
    border-right: 1px solid var(--vvd-color-neutral-100);
  }
</style>

<vwc-side-drawer open>

  <vwc-layout gutters="small">
    Side Drawer content
  </vwc-layout>

  <!-- header custom element assigned to side drawer's 'app-content' slot -->
  <vwc-header slot="app-content">

    <vwc-layout gutters="small">
      Header content
    </vwc-layout>

    <!-- main element assigned to header's 'app-content' slot -->
    <main slot="app-content">
      <vwc-layout gutters="small" column-basis="block">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
        </p>
      </vwc-layout>
    </main>
  </vwc-header>

</vwc-side-drawer>
```

### Header with Banner

Banners are placed at the top of the screen below the Header.
In this example, the banner sticks to the top of the window.

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
    <h1>
      Page Header
    </h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
    </p>
  </vwc-layout>

</vwc-header>
```
