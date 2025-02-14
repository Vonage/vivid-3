## Headline

The `headline` attribute provides the Note with headline text.

```html preview
<vwc-note headline="Headline Text"></vwc-note>
```

## Connotation

The `connotation` attribute to convey the Note's purpose through it's color.

```html preview blocks
<vwc-note
	connotation="accent"
	icon="megaphone-line"
	headline="Accent Note (default)"
></vwc-note>
<vwc-note
	connotation="alert"
	icon="error-line"
	headline="Alert Note"
></vwc-note>
<vwc-note
	connotation="success"
	icon="check-circle-line"
	headline="Success Note"
></vwc-note>
<vwc-note
	connotation="warning"
	icon="warning-line"
	headline="Warning Note"
></vwc-note>
<vwc-note
	connotation="information"
	icon="info-line"
	headline="Information Note"
></vwc-note>
<vwc-note
	connotation="announcement"
	icon="sparkles-line"
	headline="Announcement Note"
></vwc-note>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/).

Custom icons can be provided using the [icon slot](/components/note/code/#icon-slot).

```html preview
<vwc-note icon="home" headline="Note With Icon"></vwc-note>
```
