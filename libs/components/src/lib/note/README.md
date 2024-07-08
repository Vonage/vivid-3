# Note

The note component is used to display a short message to the user.

```js
<script type="module">import '@vonage/vivid/note';</script>
```

```html preview
<vwc-note
	connotation="success"
	icon="check-circle"
	headline="Changes saved successfully"
>
	Your changes have been saved successfully. You can now continue working.
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
<vwc-note icon="home" headline="Note With Icon"></vwc-note>
```

### Connotation

Set the `connotation` attribute to change the note's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'success'` | `'alert'` | `'warning'` | `'information'` | `'announcement'`
- Default: `'accent'`

```html preview blocks
<vwc-note
	connotation="alert"
	icon="error-solid"
	headline="alert note"
></vwc-note>
<vwc-note
	connotation="success"
	icon="check-circle-solid"
	headline="success note"
></vwc-note>
<vwc-note
	connotation="warning"
	icon="warning-solid"
	headline="warning note"
></vwc-note>
<vwc-note
	connotation="information"
	icon="info-solid"
	headline="information note"
></vwc-note>
<vwc-note
	connotation="announcement"
	icon="sparkles-solid"
	headline="announcement note"
></vwc-note>
<vwc-note
	connotation="accent"
	icon="megaphone-solid"
	headline="accent note"
></vwc-note>
```

## Slots

### Default

Any slotted content will appear below the headline.

```html preview
<vwc-note icon="home" headline="Note Headline" connotation="information">
	<p>This is the text that explains about something important!</p>
</vwc-note>
```

### Icon

Set the `icon` slot to show an icon before the note's headline.
If set, the `icon` attribute is ignored.

```html preview
<vwc-note headline="Note With Icon Slot">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
</vwc-note>
```
