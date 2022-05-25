# top-app-bar

```js
<script type="module">
    import '@vonage/vivid/top-app-bar';
</script>
```
## Properties
### Heading
Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `undefined`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>
<vwc-top-app-bar heading="Top App Bar"></vwc-top-app-bar>
```

## Density

Use the `density` attribute to set the top-app-bar's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'`
- Default: `'normal'`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>
<vwc-top-app-bar heading="Condensed Top App Bar" density='condensed'></vwc-top-app-bar>
```

## Fixed
Add the `fixed` attribute to set the top-app-bar's position to be fixed.

- Type: `boolean`
- Default: `false`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>
<vwc-top-app-bar heading="Fixed Top App Bar" fixed></vwc-top-app-bar>
```

## Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>
<vwc-top-app-bar heading="Alternate Top App Bar" alternate></vwc-top-app-bar>
```

## Slots

### Meta
The `meta` slot is for action content next to the heading.

```js
<vwc-button slot="meta" icon="menu-line"></vwc-button>
```

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>

<vwc-top-app-bar heading="With Meta">
    <vwc-button slot="meta" icon="menu-line"></vwc-button>
</vwc-top-app-bar>
```

### Action Items
Action items are displayed at the end of the top-app bar in the `actionItems` slot.

```js
<div slot="actionItems">
    <vwc-button icon="twitter-mono"></vwc-button>
    <vwc-button icon="facebook-mono"></vwc-button>
    <vwc-button icon="heart-solid"></vwc-button>
</div>
```

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>

<vwc-top-app-bar heading="With Action Items">
    <div slot="actionItems">
        <vwc-button icon="twitter-mono"></vwc-button>
        <vwc-button icon="facebook-mono"></vwc-button>
        <vwc-button icon="heart-solid"></vwc-button>
    </div>
</vwc-top-app-bar>
```

### App-content

To add content aside the side-drawer, add a slot called `app-content`.

```js
<div slot="app-content">
    <vwc-text font-face="body-1">
        This is the app-content slot!!!!
    </vwc-text>
</div>
```
```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
        margin:0;
    }
</style>
<vwc-top-app-bar heading="With App-content"></vwc-top-app-bar>
<vwc-text font-face="body-1" slot="app-content">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.
</vwc-text>
```

## CSS Custom Properties
### z-index
To control the top-app-bar z-index if needed.

- `--top-app-bar-z-index`

- Type: `String`
- Default: `undefined`


## Example Usage

### With Side-Drawer

This is an example of an `alternate`, `fixed`, `condensed` top-app-bar with the `meta`, `actionItems` and `app-content` slots.

```html preview
<style>
    body {
        margin:0;
    }
    vwc-side-drawer#sideDrawer{
        block-size: calc(100vh - 48px);
        --side-drawer-background-color: var(--vvd-color-neutral-10);
        --side-drawer-inline-size: 200px;
    }
</style>
<vwc-top-app-bar fixed alternate density='condensed' heading="Top App Bar with Side Drawer">
    <vwc-button slot="meta" icon="menu-line"></vwc-button>
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
        <div slot="app-content">
            <vwc-button id="button" shape="pill" icon='menu-solid'></vwc-button>
            <vwc-text font-face="body-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis ante est, ac porta sapien rutrum in. Fusce id pulvinar massa. In est erat, gravida sed velit id, tempus tempus metus. Proin mollis auctor orci. Curabitur vestibulum elementum imperdiet. Mauris ac nisl vel nisi auctor sodales. Vestibulum vel rutrum leo, a convallis tellus. Aliquam vel ultricies elit, eget malesuada orci. Praesent ut blandit nisl. Morbi ut ligula faucibus ante pellentesque condimentum sit amet ac dui. Suspendisse potenti. Ut et massa arcu. Pellentesque pellentesque id tortor at ornare.

                Sed in aliquet neque. Nam luctus dolor ut risus feugiat, ut vehicula dui rhoncus. Integer sit amet mi vel urna varius porttitor in nec metus. Phasellus et turpis et odio rhoncus volutpat. Morbi magna dui, ultricies venenatis velit nec, varius ultrices tellus. In hac habitasse platea dictumst. Donec posuere est vitae turpis dapibus, eu luctus nunc gravida. Duis orci felis, rhoncus eu sollicitudin quis, venenatis quis ex. Aliquam malesuada, ante ut tempus placerat, lectus est molestie mi, non egestas dui quam vitae massa. Sed pharetra, turpis eget dapibus lobortis, purus neque consectetur orci, id efficitur tellus ante non odio. Mauris porttitor vitae justo dapibus convallis. Sed mattis vel diam nec convallis.
            </vwc-text>
        </div>
    </vwc-side-drawer>
</vwc-top-app-bar>
```
