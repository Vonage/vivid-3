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
		<vwc-avatar slot="icon" shape="pill" size="condensed"></vwc-avatar>
	</vwc-button>
	<vwc-menu-item
		text="Stone John"
		role="menuitemradio"
		check-appearance="tick-only"
		text-secondary="236521"
	>
		<vwc-avatar slot="meta" size="condensed" shape="pill"></vwc-avatar>
	</vwc-menu-item>
	<vwc-menu-item
		text="Stanbrige Peter"
		role="menuitemradio"
		check-appearance="tick-only"
		text-secondary="963851"
	>
		<vwc-avatar slot="meta" size="condensed" shape="pill"></vwc-avatar>
	</vwc-menu-item>
	<vwc-menu-item
		text="Kazantzis John"
		role="menuitemradio"
		check-appearance="tick-only"
		text-secondary="784632"
	>
		<vwc-avatar slot="meta" size="condensed" shape="pill"></vwc-avatar>
	</vwc-menu-item>
</vwc-menu>
```

## User Status

```html preview 200px
<vwc-menu aria-label="Menu example" placement="right-start" trigger="auto">
	<button class="button" aria-label="see user details" slot="anchor">
		<span class="avatar-satus">
			<vwc-avatar shape="pill"></vwc-avatar>
		</span>
	</button>
	<vwc-menu-item text="Available">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="success"
			shape="pill"
			icon="check-solid"
		></vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Away">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="warning"
			shape="pill"
			icon="clock-line"
		></vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Busy">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="alert"
			shape="pill"
			icon="minus-solid"
		></vwc-badge>
	</vwc-menu-item>
</vwc-menu>

<style>
	.button {
		padding: 0;
		margin: 0;
		box-shadow: none;
		border: none;
		cursor: pointer;
		background: none;
	}
	.avatar-satus {
		position: relative;
		display: inline-block;
	}
	.avatar-satus::after {
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
