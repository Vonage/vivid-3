**Nav** component goes along with slotted **[Nav Item](/components/navigation/code/#nav-item)** and **[Nav Disclosure](/components/navigation/code/#nav-disclosure)** components.

## Labeling

### Text

The `text` attribute on the **Nav Item** component provides the Nav Item text.

```html preview
<vwc-nav>
	<vwc-nav-item text="Account"></vwc-nav-item>
</vwc-nav>
```

### Label

The `label` attribute on the **Nav Disclosure** component provides the nav disclosure label.

```html preview 120px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item text="2nd level item" href="#"></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav></vwc-nav>
</vwc-nav>
```

## Icon

The `icon` attribute can be set on the **Nav Item** component and on the **Nav Disclosure** component, displays an icon from the [icon library](/icons/icons-gallery/) on the component.

The preferred way to add icons is to use the [icon slot](/components/navigation/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview 250px
<vwc-nav>
	<vwc-nav-item text="Account" href="#" icon="profile"></vwc-nav-item>
	<vwc-nav-item text="Inbox" href="#" icon="inbox-line"></vwc-nav-item>
	<vwc-nav-disclosure label="Tools" open icon="design-tools-line">
		<vwc-nav-item text="Edit" href="#" icon="edit-line"></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

### Icon Only

If the `text` is omitted, the **`Nav Item`** will be displayed as an icon-only Nav Item.

<vwc-note connotation="information" headline="Accessibility Tip">
<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

When an element has no visible text, provide an accessible name using the <nobr><code>aria-label</code></nobr>attribute. This ensures screen reader users can understand the element’s purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

```html preview 250px
<vwc-nav>
	<vwc-nav-item href="#" aria-label="Account">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item href="#" aria-label="Inbox">
		<vwc-icon slot="icon" name="inbox-line"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item href="#" aria-label="Tools">
		<vwc-icon slot="icon" name="design-tools-line"></vwc-icon>
	</vwc-nav-item>
	<vwc-nav-item href="#" aria-label="Edit">
		<vwc-icon slot="icon" name="edit-line"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
```

## Appearance

The `appearance` attribute controls the **Nav Item** and the **Nav Disclosure** components style.  
The default appearance is `ghost`. Below it is set to `ghost-light`.

```html preview
<vwc-nav>
	<vwc-nav-disclosure appearance="ghost-light" open href="#" label="Settings" current>
		<vwc-icon slot="icon" name="gear-line"></vwc-icon>
		<vwc-nav-item appearance="ghost-light" href="#" text="Ghost Light" current>
			<vwc-icon slot="icon" name="edit-line"></vwc-icon>
		</vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav-item appearance="ghost-light" href="#" text="Account">
		<vwc-icon slot="icon" name="profile"></vwc-icon>
	</vwc-nav-item>
</vwc-nav>
```

## Connotation

The `connotation` attribute controls the **Nav Item** and the **Nav Disclosure** components color of hover states the selected item.

```html preview
<div class="wrapper">
	<vwc-nav class="navigation">
		<vwc-nav-disclosure connotation="accent" appearance="ghost-light" open href="#" label="Settings" current>
			<vwc-icon slot="icon" name="gear-line"></vwc-icon>
			<vwc-nav-item connotation="accent" appearance="ghost-light" href="#" text="Cta connotation" current>
				<vwc-icon slot="icon" name="edit-line"></vwc-icon>
			</vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item connotation="accent" appearance="ghost-light" href="#" text="Account">
			<vwc-icon slot="icon" name="profile"></vwc-icon>
		</vwc-nav-item>
	</vwc-nav>
	<vwc-nav class="navigation">
		<vwc-nav-disclosure connotation="cta" appearance="ghost-light" open href="#" label="Settings" current>
			<vwc-icon slot="icon" name="gear-line"></vwc-icon>
			<vwc-nav-item connotation="cta" appearance="ghost-light" href="#" text="Accent connotation" current>
				<vwc-icon slot="icon" name="edit-line"></vwc-icon>
			</vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item connotation="cta" appearance="ghost-light" href="#" text="Account">
			<vwc-icon slot="icon" name="profile"></vwc-icon>
		</vwc-nav-item>
	</vwc-nav>
</div>

<style>
	.wrapper {
		display: flex;
		row-gap: 48px;
		column-gap: 16px;
		flex-wrap: wrap;
	}
	.navigation {
		min-inline-size: 240px;
	}
</style>
```
