# banner

Banners are meant to be used on top of pages, outside the main content.


```js
<script type="module">import '@vonage/vivid/banner';</script>
```

```html preview
<vwc-banner text="Here's some information that you may find important!"></vwc-banner>
```

## Text

- Type: `string`
- Default: `''`

Use the `text` attribute to set the banner's text.

```html preview
<vwc-banner text="Here's some information that you may find important!"></vwc-banner>
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

## Connotation

The `connotation` attribute sets the colors according to the wanted connotation.

- Type: `'info'` | `'announcement'` | `'success'` | `'warning'` | `'alert'`
- Default: `'info'`

Note that icon, if not specifically set, defaults to a connotation-associated icon.

const infoMessage = "I'm here to give you advice (Like, use the controls for options)";
const announcementMessage = "I'm here to give you some info (Terms and Conditions changed... jk)";
const successMessage = "I'm here to give you good news (Thanks for giving us money!)";
const warningMessage = "I'm here to give you a warning (Your zip is down)";
const alertMessage = "I'm here to tell you something's wrong (The horror, the horror)";

```html preview
<style>
vwc-banner {
    clear: both;
}
</style>
<vwc-banner text="Here's some information that you may find useful!" connotation="info"></vwc-banner>
<vwc-banner text="Here's some information that you may find important!" connotation="announcement"></vwc-banner>
<vwc-banner text="Operation Successful!" connotation="success"></vwc-banner>
<vwc-banner text="Heads up - this is a warning" connotation="warning"></vwc-banner>
<vwc-banner text="ALERT! Something went wrong!" connotation="alert"></vwc-banner>
```

## Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button. On click it will remove the banner from the DOM.  

```html preview
<vwc-banner text="Here's some information that you may find important!"
            removable></vwc-banner>
```

## Action Items

You can add action items using slotted content in a named slot `actionItems`:

```html preview
<vwc-banner text="A banner with an action button">
    <vwc-button slot="actionItems" appearance="filled" connotation="brand" label="Learn More"></vwc-button>
</vwc-banner>
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
