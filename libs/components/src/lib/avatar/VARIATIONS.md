## Appearance

Set the `appearance` attribute to change the avatar's appearance.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<div class="grid">
		<VAvatar appearance="filled">
			<VIcon slot="icon" name="user-line" label="User's avatar" />
		</VAvatar>
		<span>filled (default)</span>

		<VAvatar appearance="subtle">
			<VIcon slot="icon" name="user-line" label="User's avatar" />
		</VAvatar>
		<span>subtle</span>

		<VAvatar appearance="duotone">
			<VIcon slot="icon" name="user-line" label="User's avatar" />
		</VAvatar>
		<span>duotone</span>

		<VAvatar appearance="outlined">
			<VIcon slot="icon" name="user-line" label="User's avatar" />
		</VAvatar>
		<span>outlined</span>
	</div>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 40px 1fr;
	align-items: center;
	gap: 8px;
}
</style>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<div class="grid">
	<vwc-avatar appearance="filled">
		<vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon>
	</vwc-avatar>
	<span>filled (default)</span>

	<vwc-avatar appearance="subtle">
		<vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon>
	</vwc-avatar>
	<span>subtle</span>

	<vwc-avatar appearance="duotone">
		<vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon>
	</vwc-avatar>
	<span>duotone</span>

	<vwc-avatar appearance="outlined">
		<vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon>
	</vwc-avatar>
	<span>outlined</span>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		gap: 8px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

Set the `connotation` attribute to set the avatar's color.  
Avatar has `accent` connotation (default) and `cta`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<div class="grid">
		<div>
			<VAvatar connotation="accent">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>filled, accent</span>
		</div>
		<div>
			<VAvatar connotation="cta">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>filled, cta</span>
		</div>
		<div>
			<VAvatar connotation="accent" appearance="subtle">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>subtle, accent</span>
		</div>
		<div>
			<VAvatar connotation="cta" appearance="subtle">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>subtle, cta</span>
		</div>
		<div>
			<VAvatar connotation="accent" appearance="duotone">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>duotone, accent</span>
		</div>
		<div>
			<VAvatar connotation="cta" appearance="duotone">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>duotone, cta</span>
		</div>
		<div>
			<VAvatar connotation="accent" appearance="outlined">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>outlined, accent</span>
		</div>
		<div>
			<VAvatar connotation="cta" appearance="outlined">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>outlined, cta</span>
		</div>
	</div>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 200px 200px;
	align-items: center;
	gap: 8px;
}
div span {
	display: inline-block;
	padding-inline: 8px;
}
</style>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<div class="grid">
	<div>
		<vwc-avatar connotation="accent"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>filled, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>filled, cta</span>
	</div>
	<div>
		<vwc-avatar connotation="accent" appearance="subtle"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>subtle, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta" appearance="subtle"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>subtle, cta</span>
	</div>
	<div>
		<vwc-avatar connotation="accent" appearance="duotone"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>duotone, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta" appearance="duotone"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>duotone, cta</span>
	</div>
	<div>
		<vwc-avatar connotation="accent" appearance="outlined"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>outlined, accent</span>
	</div>
	<div>
		<vwc-avatar connotation="cta" appearance="outlined"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>outlined, cta</span>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 200px 200px;
		align-items: center;
		gap: 8px;
	}
	div span {
		padding-inline: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

Set the `shape` attribute to change the avatar's edges.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar } from '@vonage/vivid-vue';
</script>

<template>
	<div class="grid">
		<VAvatar shape="rounded"></VAvatar>
		<span>rounded</span>

		<VAvatar shape="pill"></VAvatar>
		<span>pill</span>
	</div>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 40px 1fr;
	align-items: center;
	gap: 8px;
}
</style>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<div class="grid"><vwc-avatar shape="rounded"></vwc-avatar><span>rounded</span> <vwc-avatar shape="pill"></vwc-avatar><span>pill</span></div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		gap: 8px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/) on the Avatar other then the default `user-line` icon.

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

    The `icon` prop is **deprecated (as of 06/25)** and directly replaced with the [`icon` slot](/components/avatar/code/#icon). `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar } from '@vonage/vivid-vue';
</script>

<template>
	<VAvatar icon="group-2-solid" aria-label="avatar for group"></VAvatar>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-avatar icon="group-2-solid" aria-label="avatar for group"></vwc-avatar>
```

</vwc-tab-panel>
</vwc-tabs>

## Initials

Set the `initials` attribute to set avatar's initials. This will cause the avatar to present the initials as its content instead of an icon.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar } from '@vonage/vivid-vue';
</script>

<template>
	<VAvatar initials="JD" aria-label="John Do"></VAvatar>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-avatar initials="JD" aria-label="John Do"></vwc-avatar>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

Use the `size` attribute/property to set the avatar's size.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<div class="grid">
		<div>
			<VAvatar size="condensed" initials="JD"></VAvatar>
			<span>condensed (initials)</span>
		</div>
		<div>
			<VAvatar size="condensed" shape="pill">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>condensed (icon)</span>
		</div>
		<div>
			<VAvatar size="normal" initials="JD"></VAvatar>
			<span>normal (initials)</span>
		</div>
		<div>
			<VAvatar size="normal" shape="pill">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>normal (icon)</span>
		</div>
		<div>
			<VAvatar size="expanded" initials="JD"></VAvatar>
			<span>expanded (initials)</span>
		</div>
		<div>
			<VAvatar size="expanded" shape="pill">
				<VIcon slot="icon" name="user-line" label="User's avatar" />
			</VAvatar>
			<span>expanded (icon)</span>
		</div>
	</div>
</template>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: 200px 200px;
	align-items: center;
	gap: 8px;
}
div span {
	display: inline-block;
	padding-inline: 8px;
}
</style>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<div class="grid">
	<div>
		<vwc-avatar size="condensed" initials="JD"></vwc-avatar>
		<span>condensed (initials)</span>
	</div>
	<div>
		<vwc-avatar size="condensed" shape="pill"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>condensed (icon)</span>
	</div>
	<div>
		<vwc-avatar size="normal" initials="JD"></vwc-avatar>
		<span>normal (initials)</span>
	</div>
	<div>
		<vwc-avatar size="normal" shape="pill"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>normal (icon)</span>
	</div>
	<div>
		<vwc-avatar size="expanded" initials="JD"></vwc-avatar>
		<span>expanded (initials)</span>
	</div>
	<div>
		<vwc-avatar size="expanded" shape="pill"> <vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon></vwc-avatar>
		<span>expanded (icon)</span>
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 200px 200px;
		align-items: center;
		gap: 8px;
	}
	div span {
		display: inline-block;
		padding-inline: 4px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Clickable Avatar

### Avatar as a Link

Use the `href` attribute to change the avatar wrapper to a link. When doing so, all of the native attributes of `<a>` are supported, including target.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VAvatar href="https://vivid.deno.dev" target="_blank" aria-label="Link to the Vivid documentation">
		<VIcon slot="icon" name="chain-solid" label="Link" />
	</VAvatar>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-avatar href="https://vivid.deno.dev" target="_blank" aria-label="Link to the Vivid documentation">
	<vwc-icon slot="icon" name="chain-solid" label="Link"></vwc-icon>
</vwc-avatar>
```

</vwc-tab-panel>
</vwc-tabs>

### Avatar as a Button

Setting the `clickable-avatar` attribute switches the avatar wrapper to a `<button>`, allowing you to trigger programmatic actions e.g. using the click event.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab> 
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VAvatar, VIcon, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu aria-label="Menu example" placement="bottom-end">
		<VAvatar slot="anchor" appearance="subtle" aria-label="Open menu" clickable>
			<VIcon slot="icon" name="more-vertical-solid" label="Menu" />
		</VAvatar>
		<VMenuItem text="Menu item 1" />
		<VMenuItem text="Menu item 2" />
	</VMenu>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview 200px
<vwc-menu aria-label="Menu example" placement="bottom-end">
	<vwc-avatar slot="anchor" appearance="subtle" aria-label="Open menu" clickable>
		<vwc-icon slot="icon" name="more-vertical-solid" label="Menu"></vwc-icon>
	</vwc-avatar>
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

    To ensure accessibility, **always** add the `aria-level` attribute when using the `href` or `clickable` attributes.

</vwc-note>
