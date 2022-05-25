# top-app-bar

```js
<script type="module">
    import '@vonage/vivid/top-app-bar';
</script>
```

## Heading
Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `undefined`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
    }
</style>
<vwc-top-app-bar heading="Top App Bar">
</vwc-top-app-bar>
```

## Density

Use the `density` attribute to set the top-app-bar's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'`
- Default: `'normal'`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
    }
</style>
<vwc-top-app-bar heading="Condensed Top App Bar" density='condensed'>
</vwc-top-app-bar>
```

## Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
    }
</style>
<vwc-top-app-bar heading="Alternate Top App Bar" alternate>
</vwc-top-app-bar>
```

## Slots

### Meta
The `meta` slot is for action content next to the heading.

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
    }
</style>

<vwc-top-app-bar heading="With Meta">
    <vwc-button slot="meta" icon="menu-line"></vwc-button>
</vwc-top-app-bar>
```

### Action Items
Action items are displayed at the end of the top-app bar in the `actionItems` slot.

```html preview
<style>
    body {
        background-color: var(--vvd-color-neutral-10);
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