## Text

The `text` attribute sets the banner's text.

```html preview full
<vwc-banner
	text="Here's some information that you may find important!"
></vwc-banner>
```

## Connotation

The `connotation` attribute controls the purpose of the banner, expressed in its colors.

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

<vwc-note connotation="information" icon="info-line">
The Banner icon, if not specifically set, defaults to a connotation-associated icon.

</vwc-note>

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which prefixes the Banner's text.
To add custom icons or to postfix icons, use the [icon slot](/components/banner/code/#icon-slot).

```html preview full
<vwc-banner
	icon="home-line"
	text="Banner with icon set by icon attribute"
></vwc-banner>
```

## Removable

The `removable` attribute adds a remove button. On click, it will remove the banner from the DOM.

```html preview full
<vwc-banner removable text="Banner that is removable"></vwc-banner>
```
