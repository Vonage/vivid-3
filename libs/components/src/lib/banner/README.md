# vwc-banner

Banners are meant to be used on top of pages, outside the main content.


```js
<script type="module">import '@vonage/vivid/banner';</script>
```

```html preview
<vwc-banner text="Here's some information that you may find important!" removable></vwc-banner>
```

## Text

- Type: `string`
- Default: `''`

The `text` attribute adds a message to the banner.

```html preview
<vwc-banner text="Here's some information that you may find important!"></vwc-banner>
```

## Connotation

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
<vwc-banner text="Here's some information that you may find important!" connotation="info"></vwc-banner>
<vwc-banner text="Here's some information that you may find important!" connotation="announcement"></vwc-banner>
<vwc-banner text="Here's some information that you may find important!" connotation="success"></vwc-banner>
<vwc-banner text="Here's some information that you may find important!" connotation="warning"></vwc-banner>
<vwc-banner text="Here's some information that you may find important!" connotation="alert"></vwc-banner>
```

## Icon

- Type: `string`
- Default: `'info'`

The `icon` attribute will override the icon set by connotation.

```html preview
<vwc-banner text="Here's some information that you may find important!" 
            connotation="alert"
            icon="home-line"></vwc-banner>
```

## Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button. On click it will remove the banner from the DOM.  

```html preview
<vwc-banner text="Here's some information that you may find important!"
            removable></vwc-banner>
```

## action-text

Adds a button with the given text when `action-text` is set.

```html preview
<vwc-banner text="A banner with an action button"
            action-text="Call to action!"></vwc-banner>
```

## action-href

Changes the button into an anchor that refers to the value of the `action-href`. Note that if `action-text` is not set, nothing will show.

```html preview
<vwc-banner text="A banner with an action button"
            action-text="Going to google!"
            action-href="https://google.com"></vwc-banner>
```

## Methods

### remove()

- Type: function
- Returns: void

Removes the banner from the DOM.  Fires the `vwc-banner:removing` event and starts the remove animation.  When the animation finishes, it emits the `vwc-banner:removed` event and removes the banner from the DOM completely.  If you have a variable that refers to the banner element make sure to clear it otherwise it might cause a memory leak.

## Accessibility

The banner defaults its role to ‘status’ with a redundant aria-live attribute set to polite (to maximize compatibility when using this role). This indicates that the screen reader should wait until the user is idle before presenting updates to the user.
However, consumers can modify the above attributes (role and aria-live) to fit contextually. If the information is critical, by altering the banner's role to 'alert', assistive technologies will interrupt other processes and provide users with immediate notification.

1. The `role` attribute is set to `status` by default. This can be changed.
2. The `aria-live` attribute is set to `polite` by default. This can be changed.
3. The banner can be dismissed by hitting the `escape` key when it is in focus.

```html preview
<vwc-banner role="status"
            aria-live="polite"
            text="Here's some information that you may find important!"></vwc-banner>
```

## Events

| Event name           | Description                                                     |
|----------------------|-----------------------------------------------------------------|
| `vwc-banner:removing`| Fires whenever the the banner has started its removing animation|
| `vwc-banner:removed` | Fires when the removing animation is done                       |
