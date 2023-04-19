# Alert

Alerts are meant to be used on top of pages, outside the main content.

```js
<script type="module">
  import '@vonage/vivid/alert';
</script>
```

## Members

### Headline

- Type: `string`
- Default: `''`

Use the `headline` attribute to set the alert's headline.

```html preview full
<vwc-alert headline="Alert title"></vwc-alert>
```

### Subtitle

- Type: `string`
- Default: `''`

Use the `subtitle` attribute to set the alert's subtitle.

```html preview full
<vwc-alert headline="Alert title" subtitle="What an important info!!!"></vwc-alert>
```

### Icon

- Type: `string`
- Default: `'information'`

The `icon` attribute will override the icon set by connotation.

```html preview full
<vwc-alert headline="Alert title" icon="megaphone-line"></vwc-alert>
```

### Connotation

The `connotation` attribute sets the colors according to the wanted connotation.

- Type: `'accent'` | `'information'` | `'success'` | `'warning'` | `'alert'`
- Default: `'accent'`

Note that icon, if not specifically set, defaults to a connotation-associated icon.

```html preview
<vwc-alert headline="Alert title" connotation="accent"></vwc-alert>
<vwc-alert headline="Here's some information that you may find useful!" connotation="information"></vwc-alert>
<vwc-alert headline="Operation Successful!" connotation="success"></vwc-alert>
<vwc-alert headline="Heads up - this is a warning" connotation="warning"></vwc-alert>
<vwc-alert headline="ALERT! Something went wrong!" connotation="alert"></vwc-alert>
```

### Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button. On click it will remove the alert from the DOM.

```html preview full
<vwc-alert headline="Alert title" removable></vwc-alert>
```

## Slots

### Action Items

You can add action items using slotted content in a named slot `action-items`:

```html preview full
<vwc-alert headline="A alert with an action button">
  <vwc-button slot="action-items" appearance="filled" connotation="accent" label="Learn More"></vwc-button>
</vwc-alert>
```

## Events

### Removing

Fires `removing` whenever the alert has started its removing animation.

### Removed

Fires `removed` when the removing animation is done.

## Methods

### remove()

- Type: `function`
- Returns: `void`

Removes the alert from the DOM.  Fires the `removing` event and starts the remove animation.  When the animation finishes, it emits the `removed` event and removes the alert from the DOM completely.  If you have a variable that refers to the alert element make sure to clear it otherwise it might cause a memory leak.
