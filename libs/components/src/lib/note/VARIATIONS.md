## Headline

The `headline` attribute provides the Note with headline text.

```html preview
<vwc-note headline="Headline Text"></vwc-note>
```

## Icon

The `icon` attribute can set to display an icon from the [icon library](/icons/icons-gallery/) on the component.

The preferred way to add icons is to use the [icon slot](/components/note/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview
<vwc-note headline="Note With Icon" icon="home"></vwc-note>
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
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>
</vwc-note>
<vwc-note connotation="information" headline="Information Note">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
</vwc-note>
<vwc-note connotation="announcement" headline="Announcement Note">
	<vwc-icon slot="icon" name="sparkles-line"></vwc-icon>
</vwc-note>
```
