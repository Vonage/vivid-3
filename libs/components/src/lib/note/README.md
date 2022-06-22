# note

`vwc-note` component is designated to layout connotated notification content.

```js
<script type="module">import '@vonage/vivid/note';</script>
```

```html preview
<vwc-note connotation="success" icon="check-circle" headline="Pascal's theological argument">
 Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
</vwc-note>
```

## Properties

### Headline

Add the `headline` attribute in order to set a headline text.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-note headline="Headline Text"></vwc-note>
```

### icon

Use the `icon` attribute to set a decorative icon.
Note that if not set, icon will default to the connotation-associated icon type.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-note icon="home"></vwc-note>
```

### connotation

Set the `connotation` attribute to change the note's connotation.
It accepts a subset of predefined values.

- Type: `'success'` | `'alert'` | `'warning'` | `'info'` | `'announcement'`
- Default: `'announcement'`

```html preview blocks
<vwc-note connotation="alert" headline="alert note"></vwc-note>
<vwc-note connotation="success" headline="success note"></vwc-note>
<vwc-note connotation="warning" headline="warning note"></vwc-note>
<vwc-note connotation="info" headline="info note"></vwc-note>
<vwc-note connotation="announcement" headline="announcement note"></vwc-note>
```

## Slots

### Default slot

Any slotted content will appear below the headline.

```html preview
<vwc-note icon="home" headline="Note Headline" connotation="info">
 <p>This is the text that explains about something important!</p>
</vwc-note>
```
