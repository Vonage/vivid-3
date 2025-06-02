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

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Dialog's headline.
To add custom icons or to postfix icons, use the [graphic slot](/components/dialog/code/#slots).

<!-- Remove comments when Icon slot is added
<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>
-->

```html preview 230px
<vwc-dialog icon="info" headline="Dialog's Icon" open></vwc-dialog>
```

### Icon-placement

The `icon-placement` attribute specifies where the dialog's icon should appear (relative to the headline).

```html preview 290px
<div class="wrapper">
	<div class="item">
		<vwc-dialog
			icon-placement="side"
			icon="info"
			headline="Side Icon Placemnet"
			subtitle="side is default"
			open
		></vwc-dialog>
	</div>
	<div class="item">
		<vwc-dialog
			icon-placement="top"
			icon="info"
			headline="Top Icon Placemnet"
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
