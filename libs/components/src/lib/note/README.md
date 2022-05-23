# note

`vwc-note` component is designated to layout connotated notification content.

```js
<script type="module">import '@vonage/vivid/note';</script>
```

```html preview
<vwc-note connotation="success"
          icon="check-circle"
          header="Pascal's theological argument">
    Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
</vwc-note>
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
<vwc-note connotation="alert" header="alert note"></vwc-note>
<vwc-note connotation="success" header="success note"></vwc-note>
<vwc-note connotation="warning" header="warning note"></vwc-note>
<vwc-note connotation="info" header="info note"></vwc-note>
<vwc-note connotation="announcement" header="announcement note"></vwc-note>
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
