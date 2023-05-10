# Note

`vwc-note` component is designated to layout connotated notification content.

```js
<script type="module">
  import '@vonage/vivid/note';
</script>
```

```html preview
<vwc-note connotation="success" icon="check-circle" headline="Pascal's theological argument">
  Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
</vwc-note>
```

## Members

### Headline

Add the `headline` attribute in order to set a headline text.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-note headline="Headline Text"></vwc-note>
```

### Icon
Add a `icon='icon-name'` attribute to set a decorative icon.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-note icon="home"></vwc-note>
```

### Connotation

Set the `connotation` attribute to change the note's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'success'` | `'alert'` | `'warning'` | `'information'`
- Default: `'accent'`

```html preview blocks
<vwc-note connotation="alert" icon="error-solid" headline="alert note"></vwc-note>
<vwc-note connotation="success" icon="check-circle-solid" headline="success note"></vwc-note>
<vwc-note connotation="warning" icon="warning-solid" headline="warning note"></vwc-note>
<vwc-note connotation="information" icon="info-solid" headline="information note"></vwc-note>
<vwc-note connotation="accent" icon="megaphone-solid" headline="accent note"></vwc-note>
```

## Slots

### Default

Any slotted content will appear below the headline.

```html preview
<vwc-note icon="home" headline="Note Headline" connotation="information">
  <p>This is the text that explains about something important!</p>
</vwc-note>
```

## Custom Colors

```html preview variables
<vwc-note connotation="$CONNOTATION" icon="check-circle" headline="Pascal's theological argument">
  Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
</vwc-note>
```
