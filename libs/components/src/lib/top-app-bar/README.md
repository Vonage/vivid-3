# top-app-bar

```js
<script type="module">
    import '@vonage/vivid/top-app-bar';
</script>
```

```html preview
<vwc-top-app-bar>
    <vwc-button slot="meta" icon="menu-line"></vwc-button>
    <span slot="title">Top App Bar</span>
    <div slot="actionItems">
        <vwc-button icon="twitter-mono"></vwc-button>
        <vwc-button icon="facebook-mono"></vwc-button>
        <vwc-button icon="heart-solid"></vwc-button>
    </div>
</vwc-top-app-bar>
```

## Density

Use the `density` attribute to set the top-app-bar's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'`
- Default: `'normal'`


```html preview
<vwc-top-app-bar density='condensed'>
    <vwc-button slot="meta" icon="menu-line"></vwc-button>
    <span slot="title">Top App Bar</span>
    <div slot="actionItems">
        <vwc-button icon="twitter-mono"></vwc-button>
        <vwc-button icon="facebook-mono"></vwc-button>
        <vwc-button icon="heart-solid"></vwc-button>
    </div>
</vwc-top-app-bar>
```