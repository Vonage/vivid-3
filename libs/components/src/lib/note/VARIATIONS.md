## Headline

The `headline` attribute provides the Note with headline text.

```html preview
<vwc-note headline="Headline Text"></vwc-note>
```

## Connotation

The `connotation` attribute to convey the Note's purpose through it's color.

```html preview blocks
<vwc-note connotation="accent" headline="Accent Note (default)">
	<vwc-icon slot="icon" name="megaphone-line"></vwc-icon>
</vwc-note>
<vwc-note connotation="alert" headline="Alert Note">
	<vwc-icon slot="icon" name="error-line"></vwc-icon>
</vwc-note>
<vwc-note connotation="success" headline="Success Note">
	<vwc-icon slot="icon" name="check-circle-line"></vwc-icon>
</vwc-note>
<vwc-note connotation="warning" headline="Warning Note">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>
</vwc-note>
<vwc-note connotation="information" headline="Information Note">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
</vwc-note>
<vwc-note connotation="announcement" headline="Announcement Note">
	<vwc-icon slot="icon" name="sparkles-line"></vwc-icon>
</vwc-note>
```

## Icon

Icons can be provided using the [icon slot](/components/note/code/#icon-slot).
The `icon`_(deprecated)_ attribute displays an icon from the [icon library](/icons/icons-gallery/).

```html preview
<vwc-note headline="Note With Icon">
	<vwc-icon slot="icon" name="home"></vwc-icon>
</vwc-note>
```
