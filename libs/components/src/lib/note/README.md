# note

`vwc-note` component is designated to layout connotated notification content.

```js
<script type="module">import '@vonage/vivid/note';</script>
```

```html preview
<vwc-note></vwc-note>
```

## Properties

### header
Add the `header` attribute in order to set a header text.

- Type: `string`
- Default: `null`

```html preview
<vwc-note header="Header Text"></vwc-note>
```

### icon
Add the `icon` attribute in order to set an icon in the note.

- Type: `string`
- Default: `null`

```html preview
<vwc-note icon="home"></vwc-note>
```

### connotation
Set the `connotation` attribute to change the note's connotation.
It accepts a subset of predefined values.

- Type: `'success'` | `'alert'` | `'warning'` | `'info'` | `'announcement'`
- Default: `'announcement'`

```html preview
<vwc-note connotation="alert"></vwc-note>
<vwc-note connotation="success"></vwc-note>
<vwc-note connotation="warning"></vwc-note>
<vwc-note connotation="info"></vwc-note>
<vwc-note connotation="announcement"></vwc-note>
```

## Slots

### Default slot
Any slotted content will appear below the header.

```html preview
<vwc-note icon="home"
          header="Note Header"
          connotation="info">
          <p>This is the text that explains about something important!</p>
          </vwc-note>
```
