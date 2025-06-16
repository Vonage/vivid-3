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

## Scrollable Body

Use the `scrollable-body` property to make only the content area between the header and footer scrollable (instead of a whole dialog).

The dialog has a default `--dialog-body-max-block-size`, you can overwrite it to fit your use case.

```html preview 540px
<vwc-dialog
	headline="Keep Your Project Up to Date with Vivid"
	subtitle="Why Staying Up to Date with Vivid Packages Matters"
	scrollable-body
	open
>
	<div slot="body">
		<p>
			In this article, we’re going to outline the benefits of staying current
			with Vivid package updates, explain why major upgrades are now
			straightforward, and provide useful advice for keeping your Vue and React
			projects up to date.
		</p>
		<strong>Ongoing Bug Fixes and Reliability</strong>
		<p>
			Every Vivid package update addresses bugs that may impact your product’s
			stability. For example,
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.22.0"
				target="_blank"
				>v4.22.0</a
			>
			fixed spacing issues in alerts and improved input handling in date & time
			pickers, while
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.17.0"
				target="_blank"
				>v4.17.0</a
			>
			handled incorrect autofocus behavior of <code>searchable-select</code>.
			These fixes ensure your application remains reliable and visually
			consistent, benefiting both developers & end users experience.
		</p>
		<strong>Accessibility Tweaks</strong>
		<p>
			Vivid updates include accessibility improvements. The
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.22.0"
				target="_blank"
				>v4.22.0</a
			>
			release added <code>aria-checked</code> attributes to menu items, while
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.18.0"
				target="_blank"
				>v4.18.0</a
			>
			fixed <code>radio</code> and <code>radio-group</code> structures to make
			them work well with screen readers. Such enhancements help your products
			meet WCAG standards, making your interfaces more inclusive and reducing
			compliance risks.
		</p>
		<strong>New Features and Performance Improvements</strong>
		<p>
			Vivid package updates often bring new features and optimizations. The
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.18.0"
				target="_blank"
				>v4.18.0</a
			>
			release introduced a <code>date-time-picker</code> component, and
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.20.0"
				target="_blank"
				>v4.20.0</a
			>
			refined focus styles for a better accessibility and user experience.
			Performance enhancements are also regularly included: for example,
			<a
				href="https://github.com/Vonage/vivid-3/releases/tag/vivid-v4.5.0"
				target="_blank"
				>v4.5.0</a
			>
			announced tree-shaking support, allowing unused components to be excluded
			from your production bundle for faster load times.
		</p>
	</div>
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Read full article"
		href="https://vivid.deno.dev/whats-new/why-staying-up-to-date-with-vivid-packages-matters/"
		target="_blank"
		icon-trailing
	>
		<vwc-icon name="arrow-bold-right-line" slot="icon"></vwc-icon>
	</vwc-button>
</vwc-dialog>
```
