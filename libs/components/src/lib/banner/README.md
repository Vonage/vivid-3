# banner

Banners are meant to be used on top of pages, outside the main content.


```js
<script type="module">import '@vonage/vivid/banner';</script>
```

## Demo Usage

```html preview
<vwc-banner text="Here's some information that you may find important!" dismissible open></vwc-banner>
```

## API

### Open

- Type: `boolean`
- Default: `false`

The `open` attribute sets the banner to open or close. It will open using animation.

```html preview
<vwc-button appearance="filled" connotation="cta" label="Toggle open state" onclick="document.getElementById('toggled-banner').toggleAttribute('open')"></vwc-button>
<vwc-banner id="toggled-banner"
            text="Here's some information that you may find important!" 
            open></vwc-banner>
```

### Text

- Type: `string`
- Default: `''`

The `text` attribute adds a message to the banner.

```html preview
<vwc-banner text="Here's some information that you may find important!" open></vwc-banner>
```

### Connotation

The `connotation` attribute sets the colors according to the wanted connotation.

- Type: `'info'` | `'announcement'` | `'success'` | `'warning'` | `'alert'`
- Default: `'info'`

Note that the icon, if not specifically set, will change according to connotation.

```html preview
<style>
vwc-banner {
    clear: both;
}
</style>
<vwc-banner open text="Here's some information that you may find important!" connotation="info"></vwc-banner>
<vwc-banner open text="Here's some information that you may find important!" connotation="announcement"></vwc-banner>
<vwc-banner open text="Here's some information that you may find important!" connotation="success"></vwc-banner>
<vwc-banner open text="Here's some information that you may find important!" connotation="warning"></vwc-banner>
<vwc-banner open text="Here's some information that you may find important!" connotation="alert"></vwc-banner>
```

### Icon

- Type: `string`
- Default: `'info'`

The `icon` attribute will override the icon set by connotation.

```html preview
<vwc-banner open 
            text="Here's some information that you may find important!" 
            connotation="alert"
            icon="home-line"></vwc-banner>
```

### Dismissible

- Type: `boolean`
- Default: `false`

The `dismissible` attribute sets a dismiss button. On click it will close the banner.

```html preview
<vwc-banner open 
            text="Here's some information that you may find important!"
            dismissible></vwc-banner>
```

### Accessibility

The banner defaults its role to ‘status’ with a redundant aria-live attribute set to polite (to maximize compatibility when using this role). This indicates that the screen reader should wait until the user is idle before presenting updates to the user.
However, consumers can modify the above attributes (role and aria-live) to fit contextually. If the information is critical, by altering the banner's role to 'alert', assistive technologies will interrupt other processes and provide users with immediate notification.

1. The `role` attribute is set to `status` by default. This can be changed.
2. The `aria-live` attribute is set to `polite` by default. This can be changed.
3. The banner can be dismissed by hitting the `escape` key when it is in focus.

```html preview
<vwc-banner role="status"
            aria-live="polite"
            open 
            text="Here's some information that you may find important!"></vwc-banner>
```

### Events

| Event name           | Description                                                     |
|----------------------|-----------------------------------------------------------------|
| `vwc-banner:opening` | Fires whenever the the banner has started its opening animation |
| `vwc-banner:closing` | Fires whenever the the banner has started its closing animation |
| `vwc-banner:opened`  | Fires when the opening animation is done                        |
| `vwc-banner:closed`  | Fires when the closing animation is done                        |
