# Banner

Banners are meant to be used on top of pages, outside the main content.

```js
<script type="module">
  import '@vonage/vivid/banner';
</script>
```

## Members

### Text

- Type: `string`
- Default: `''`

Use the `text` attribute to set the banner's text.

```html preview full
<vwc-banner text="Here's some information that you may find important!"></vwc-banner>
```

### Icon

- Type: `string`
- Default: `'information'`

The `icon` attribute will override the icon set by connotation.

```html preview full
<vwc-banner text="Here's some information that you may find important!" icon="home-line"></vwc-banner>
```

### Connotation

The `connotation` attribute sets the colors according to the wanted connotation.

- Type: `'information'` | `'announcement'` | `'success'` | `'warning'` | `'alert'`
- Default: `'information'`

Note that icon, if not specifically set, defaults to a connotation-associated icon.

```html preview
<vwc-banner text="Here's some information that you may find useful!" connotation="information"></vwc-banner>
<vwc-banner text="Here's some information that you may find important!" connotation="announcement"></vwc-banner>
<vwc-banner text="Operation Successful!" connotation="success"></vwc-banner>
<vwc-banner text="Heads up - this is a warning" connotation="warning"></vwc-banner>
<vwc-banner text="ALERT! Something went wrong!" connotation="alert"></vwc-banner>
```

### Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button. On click it will remove the banner from the DOM.

```html preview full
<vwc-banner text="Here's some information that you may find important!" removable></vwc-banner>
```

## Slots

### Action Items

You can add action items using slotted content in a named slot `action-items`:

```html preview full
<vwc-banner text="A banner with an action button">
  <vwc-button slot="action-items" appearance="filled" connotation="accent" label="Learn More"></vwc-button>
</vwc-banner>
```

## Events

### Removing

Fires `removing` whenever the banner has started its removing animation.

### Removed

Fires `removed` when the removing animation is done.

## Methods

### remove()

- Type: `function`
- Returns: `void`

Removes the banner from the DOM.  Fires the `removing` event and starts the remove animation.  When the animation finishes, it emits the `removed` event and removes the banner from the DOM completely.  If you have a variable that refers to the banner element make sure to clear it otherwise it might cause a memory leak.

## Accessibility

The banner defaults its role to ‘status’ with a redundant aria-live attribute set to polite (to maximize compatibility when using this role). This indicates that the screen reader should wait until the user is idle before presenting updates to the user.
However, consumers can modify the above attributes (role and aria-live) to fit contextually. If the information is critical, by altering the banner's role to 'alert', assistive technologies will interrupt other processes and provide users with immediate notification.

- The `role` attribute is set to `status` by default. This can be changed.
- The `aria-live` attribute is set to `polite` by default. This can be changed.
- The banner can be dismissed by hitting the `escape` key when it is in focus.

```js
<vwc-banner role="status"
            aria-live="polite"
            text="Here's some information that you may find important!"></vwc-banner>
```

## Custom Colors

```html preview full variables
<vwc-banner connotation="$CONNOTATION" text="Here's some information that you may find important!"></vwc-banner>
```
