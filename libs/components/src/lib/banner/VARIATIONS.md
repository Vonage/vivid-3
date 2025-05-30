## Text

The `text` attribute sets the banner's text.

```html preview full
<vwc-banner
	text="Here's some information that you may find important!"
></vwc-banner>
```

## Connotation

The `connotation` attribute controls the purpose of the banner, expressed in its colors and icon.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
The Banner icon, if not specifically set, defaults to a connotation-associated icon.

</vwc-note>

```html preview
<vwc-banner
	connotation="information"
	text="Banner with connotation information (default conntation)"
></vwc-banner>
<vwc-banner
	connotation="announcement"
	text="Banner with connotation announcement"
></vwc-banner>
<vwc-banner
	connotation="success"
	text="Banner with connotation success"
></vwc-banner>
<vwc-banner
	connotation="warning"
	text="Banner with connotation warning"
></vwc-banner>
<vwc-banner
	connotation="alert"
	text="Banner with connotation alert"
></vwc-banner>
```

## Icon

The `icon` attribute displays an icon from the icon library](/icons/icons-gallery/).

The preferred way to add icons is to use the [icon slot](/components/banner/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview full
<vwc-banner
	text="Banner with icon set by icon attribute"
	icon="home-line"
></vwc-banner>
```

## Removable

The `removable` attribute adds a remove button. On click, it will remove the banner from the DOM.

```html preview full
<vwc-banner removable text="Banner that is removable"></vwc-banner>
```
