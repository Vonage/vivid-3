## Avatar Dropdown

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { VMenu, VMenuItem, VButton, VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu aria-label="Menu example" placement="bottom-start">
		<VButton slot="anchor" label="Select a User's avatar" appearance="outlined" dropdown-indicator size="expanded">
			<VAvatar slot="icon" shape="pill" size="condensed">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
		</VButton>

		<VMenuItem text="Stone John" control-type="radio" check-appearance="tick-only" text-secondary="236521">
			<VAvatar slot="meta" size="condensed" shape="pill">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
		</VMenuItem>

		<VMenuItem text="Stanbrige Peter" control-type="radio" check-appearance="tick-only" text-secondary="963851">
			<VAvatar slot="meta" size="condensed" shape="pill">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
		</VMenuItem>

		<VMenuItem text="Kazantzis John" control-type="radio" check-appearance="tick-only" text-secondary="784632">
			<VAvatar slot="meta" size="condensed" shape="pill">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
		</VMenuItem>
	</VMenu>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview 300px
<vwc-menu aria-label="Menu example" placement="bottom-start">
	<vwc-button slot="anchor" label="Select a User's avatar" appearance="outlined" dropdown-indicator size="expanded">
		<vwc-avatar slot="icon" shape="pill" size="condensed"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
	</vwc-button>
	<vwc-menu-item text="Stone John" control-type="radio" check-appearance="tick-only" text-secondary="236521">
		<vwc-avatar slot="meta" size="condensed" shape="pill"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
	</vwc-menu-item>
	<vwc-menu-item text="Stanbrige Peter" control-type="radio" check-appearance="tick-only" text-secondary="963851">
		<vwc-avatar slot="meta" size="condensed" shape="pill"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
	</vwc-menu-item>
	<vwc-menu-item text="Kazantzis John" control-type="radio" check-appearance="tick-only" text-secondary="784632">
		<vwc-avatar slot="meta" size="condensed" shape="pill"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
	</vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## User Status

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VMenu, VMenuItem, VAvatar, VBadge, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu aria-label="Menu example" placement="right-start">
		<VAvatar slot="anchor" shape="pill" aria-label="See user details" class="avatar-status" clickable>
			<VIcon slot="icon" name="user-line" label="User's avatar" />
		</VAvatar>

		<VMenuItem text="Available">
			<VBadge slot="meta" appearance="filled" connotation="success" shape="pill">
				<VIcon slot="icon" name="check-solid" />
			</VBadge>
		</VMenuItem>

		<VMenuItem text="Away">
			<VBadge slot="meta" appearance="filled" connotation="warning" shape="pill">
				<VIcon slot="icon" name="clock-line" />
			</VBadge>
		</VMenuItem>

		<VMenuItem text="Busy">
			<VBadge slot="meta" appearance="filled" connotation="alert" shape="pill">
				<VIcon slot="icon" name="minus-solid" />
			</VBadge>
		</VMenuItem>
	</VMenu>
</template>

<style scoped>
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

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview 200px
<vwc-menu aria-label="Menu example" placement="right-start">
	<vwc-avatar slot="anchor" shape="pill" aria-label="See user details" class="avatar-status" clickable>
		<vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon>
	</vwc-avatar>
	<vwc-menu-item text="Available">
		<vwc-badge slot="meta" appearance="filled" connotation="success" shape="pill">
			<vwc-icon slot="icon" name="check-solid"></vwc-icon>
		</vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Away">
		<vwc-badge slot="meta" appearance="filled" connotation="warning" shape="pill">
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

</vwc-tab-panel>
</vwc-tabs>
