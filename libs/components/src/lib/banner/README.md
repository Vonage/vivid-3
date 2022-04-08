# banner

Banners are meant to be used on top of pages, outside the main content.


```js
<script type="module">import '@vonage/vivid/banner';</script>
```

## Demo Usage

```html preview
<div style="margin: auto;
    width: 40rem;
    height: 25rem;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 3px 2px rgb(0 0 0 / 10%);
    border: solid 1px #ccc;">
<vwc-banner message="Here's some information that you may find important!" dismissible open></vwc-banner>
</div>
```

## API

### Open

The `open` attribute sets the banner to open or close. It will open using animation.

```html preview
<vwc-banner id="toggled-banner"
            message="Here's some information that you may find important!" 
            open></vwc-banner>
<vwc-button appearance="filled" connotation="cta" label="Toggle open state" onclick="document.getElementById('toggled-banner').toggleAttribute('open')"></vwc-button>
```

### Message

The `message` attribute adds a message to the banner.

```html preview
<vwc-banner message="Here's some information that you may find important!" open></vwc-banner>
```

### Connotation

The `connotation` attribute sets the colors according to the wanted connotation. Possible connotations are:

`info | announcement | success | warning | alert;`.

Default connotation is `info`.

Note that the icon, if not specifically set, will change according to connotation.

```html preview
<style>
vwc-banner {
    clear: both;
}
</style>
<vwc-banner open message="Here's some information that you may find important!" connotation="info"></vwc-banner>
<vwc-banner open message="Here's some information that you may find important!" connotation="announcement"></vwc-banner>
<vwc-banner open message="Here's some information that you may find important!" connotation="success"></vwc-banner>
<vwc-banner open message="Here's some information that you may find important!" connotation="warning"></vwc-banner>
<vwc-banner open message="Here's some information that you may find important!" connotation="alert"></vwc-banner>
```

## Icon

The `icon` attribute will override the icon set by connotation.

```html preview
<vwc-banner open 
            message="Here's some information that you may find important!" 
            connotation="alert"
            icon="home-line"></vwc-banner>
```

### dismissible

The `dismissible` attribute sets a dismiss button. On click it will close the banner.

```html preview
<vwc-banner open 
            message="Here's some information that you may find important!"
            dismissible></vwc-banner>
```

### Accessibility

For accessibility, 3 features are set:

1. The `role` attribute is set to `status` by default. This can be changed.
2. The `aria-live` attribute is set to `polite` by default. This can be changed.
3. The banner can be dismissed by hitting the `escape` key when it is in focus.

```html preview
<vwc-banner role="status"
            aria-live="polite"
            open 
            message="Here's some information that you may find important!"></vwc-banner>
```
