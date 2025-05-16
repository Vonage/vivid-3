## Labeling

### Headline

Use the `headline` attribute to set the dialog's headline.

```html preview 230px
<vwc-dialog headline="Headline" open></vwc-dialog>
```

### Subtitle

Use the `subtitle` attribute to set the dialog's subtitle.

```html preview 230px
<vwc-dialog headline="Headline" subtitle="Subtitle" open></vwc-dialog>
```

## Icons

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Dialog's headline.
To add custom icons or to postfix icons, use the [graphic slot](/components/dialog/code/#slots).

```html preview 230px
<vwc-dialog icon="info" headline="Dialog's Icon" open></vwc-dialog>
```

### Icon Placement

The `icon-placement` attribute specifies where the dialog's icon should appear (relative to the headline).

```html preview 290px
<div class="wrapper">
	<div class="item">
		<vwc-dialog
			icon-placement="side"
			icon="info"
			headline="Side Icon Placement"
			subtitle="side is default"
			open
		></vwc-dialog>
	</div>
	<div class="item">
		<vwc-dialog
			icon-placement="top"
			icon="info"
			headline="Top Icon Placement"
			subtitle="top is another option"
			open
		></vwc-dialog>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
	}
	.item {
		block-size: 280px;
		position: relative;
		flex: 1;
	}
</style>
```
