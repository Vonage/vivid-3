## Dropdown Menu with Checkbox

```html preview 350px
<vwc-menu
	placement="bottom-start"
	open
	trigger="auto"
	aria-label="Menu example"
>
	<vwc-button
		slot="anchor"
		label="Select"
		appearance="filled"
		dropdown-indicator
	></vwc-button>
	<vwc-text-field
		slot="header"
		placeholder="Search"
		icon="search"
		autofocus
	></vwc-text-field>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 3"></vwc-menu-item>
	<vwc-button
		slot="action-items"
		appearance="outlined"
		label="Close"
	></vwc-button>
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Select"
	></vwc-button>
</vwc-menu>
```

## Links Menu

```html preview 250px
<vwc-menu placement="bottom-start" open aria-label="Menu example">
	<vwc-button slot="anchor" aria-label="Close menu">
		<vwc-icon slot="icon" name="close-line"></vwc-icon>
	</vwc-button>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="My Addresses"
			icon="address-book-line"
		></vwc-menu-item>
	</a>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="My Profile"
			icon="profile-line"
		></vwc-menu-item>
	</a>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="Team"
			icon="group-line"
		></vwc-menu-item>
	</a>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="Logout"
			icon="quit-line"
		></vwc-menu-item>
	</a>
</vwc-menu>
```
