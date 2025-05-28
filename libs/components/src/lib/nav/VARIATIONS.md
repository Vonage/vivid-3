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

Custom icons can be provided using the [icon slot](/components/navigation/code/#icon-slot).

```html preview 250px
<vwc-nav>
	<vwc-nav-item icon="profile" text="Account" href="#"></vwc-nav-item>
	<vwc-nav-item icon="inbox-line" text="Inbox" href="#"></vwc-nav-item>
	<vwc-nav-disclosure icon="design-tools-line" label="Tools" open>
		<vwc-nav-item icon="edit-line" text="Edit" href="#"></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

### Icon Only

If the `text` is omitted, the **`Nav Item`** will be displayed as an icon-only Nav Item.

<vwc-note connotation="information" icon="accessibility-line" headline="Accessibility Tip">

When an element has no visible text, provide an accessible name using the <nobr><code>aria-label</code></nobr>attribute. This ensures screen reader users can understand the element’s purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

```html preview 250px
<vwc-nav>
	<vwc-nav-item href="#" icon="profile" aria-label="Account"></vwc-nav-item>
	<vwc-nav-item href="#" icon="inbox-line" aria-label="Inbox"></vwc-nav-item>
	<vwc-nav-item
		href="#"
		icon="design-tools-line"
		aria-label="Tools"
	></vwc-nav-item>
	<vwc-nav-item href="#" icon="edit-line" aria-label="Edit"></vwc-nav-item>
</vwc-nav>
```

## Appearance

The `appearance` attribute controls the **Nav Item** and the **Nav Disclosure** components style.  
The default appearance is `ghost`. Below it is set to `ghost-light`.

```html preview
<vwc-nav>
	<vwc-nav-disclosure
		appearance="ghost-light"
		open
		href="#"
		icon="gear-line"
		label="Settings"
		aria-current="true"
	>
		<vwc-nav-item
			appearance="ghost-light"
			href="#"
			aria-current="page"
			icon="edit-line"
			text="Ghost Light"
		></vwc-nav-item>
	</vwc-nav-disclosure>
	<vwc-nav-item
		appearance="ghost-light"
		href="#"
		icon="profile"
		text="Account"
	></vwc-nav-item>
</vwc-nav>
```

## Connotation

The `connotation` attribute controls the **Nav Item** and the **Nav Disclosure** components color of hover states the selected item.

```html preview
<div class="wrapper">
	<vwc-nav class="navigation">
		<vwc-nav-disclosure
			connotation="accent"
			appearance="ghost-light"
			open
			href="#"
			icon="gear-line"
			label="Settings"
			aria-current="true"
		>
			<vwc-nav-item
				connotation="accent"
				appearance="ghost-light"
				href="#"
				aria-current="page"
				icon="edit-line"
				text="Cta connotation"
			></vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item
			connotation="accent"
			appearance="ghost-light"
			href="#"
			icon="profile"
			text="Account"
		></vwc-nav-item>
	</vwc-nav>
	<vwc-nav class="navigation">
		<vwc-nav-disclosure
			connotation="cta"
			appearance="ghost-light"
			open
			href="#"
			icon="gear-line"
			label="Settings"
			aria-current="true"
		>
			<vwc-nav-item
				connotation="cta"
				appearance="ghost-light"
				href="#"
				aria-current="page"
				icon="edit-line"
				text="Accent connotation"
			></vwc-nav-item>
		</vwc-nav-disclosure>
		<vwc-nav-item
			connotation="cta"
			appearance="ghost-light"
			href="#"
			icon="profile"
			text="Account"
		></vwc-nav-item>
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
