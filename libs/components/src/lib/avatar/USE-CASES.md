## Avatar Dropdown

```html preview 300px
<vwc-menu aria-label="Menu example" placement="bottom-start" trigger="auto">
	<vwc-button
		slot="anchor"
		label="Select a User"
		appearance="outlined"
		dropdown-indicator
		size="expanded"
	>
		<vwc-avatar slot="icon" shape="pill" size="condensed">
			<vwc-icon slot="icon" name="user-line" label="User"></vwc-icon
		></vwc-avatar>
	</vwc-button>
	<vwc-menu-item
		text="Stone John"
		control-type="radio"
		check-appearance="tick-only"
		text-secondary="236521"
	>
		<vwc-avatar slot="meta" size="condensed" shape="pill">
			<vwc-icon slot="icon" name="user-line" label="User"></vwc-icon
		></vwc-avatar>
	</vwc-menu-item>
	<vwc-menu-item
		text="Stanbrige Peter"
		control-type="radio"
		check-appearance="tick-only"
		text-secondary="963851"
	>
		<vwc-avatar slot="meta" size="condensed" shape="pill">
			<vwc-icon slot="icon" name="user-line" label="User"></vwc-icon
		></vwc-avatar>
	</vwc-menu-item>
	<vwc-menu-item
		text="Kazantzis John"
		control-type="radio"
		check-appearance="tick-only"
		text-secondary="784632"
	>
		<vwc-avatar slot="meta" size="condensed" shape="pill">
			<vwc-icon slot="icon" name="user-line" label="User"></vwc-icon
		></vwc-avatar>
	</vwc-menu-item>
</vwc-menu>
```

## User Status

```html preview 200px
<vwc-menu aria-label="Menu example" placement="right-start" trigger="auto">
	<vwc-avatar
		slot="anchor"
		shape="pill"
		aria-label="See user details"
		class="avatar-status"
		clickable
	>
		<vwc-icon slot="icon" name="user-line" label="User"></vwc-icon>
	</vwc-avatar>
	<vwc-menu-item text="Available">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="success"
			shape="pill"
		>
			<vwc-icon slot="icon" name="check-solid"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Away">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="warning"
			shape="pill"
		>
			<vwc-icon slot="icon" name="clock-line"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Busy">
		<vwc-badge slot="meta" appearance="filled" connotation="alert" shape="pill">
			<vwc-icon slot="icon" name="minus-solid"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
</vwc-menu>

<style>
	.avatar-status {
		position: relative;
		display: inline-block;
	}
	.avatar-status::after {
		position: absolute;
		content: '';
		inline-size: 14px;
		aspect-ratio: 1;
		bottom: -2px;
		background-color: var(--vvd-color-alert-500);
		border-radius: 50%;
		right: -2px;
	}
</style>
```
