## Label

The `label` attribute controls button's label text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<VButton label="Button Text" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-button label="Button Text"></vwc-button>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

The `appearance` attribute controls the style of button displayed.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>The <code>outlined-light</code> and <code>ghost-light</code> appearances are the same as <code>outlined</code> and <code>ghost</code> except their background colours have opacity when hovered.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 72px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton appearance="filled" label="Filled" />
		<VButton appearance="outlined" label="Outlined" />
		<VButton appearance="outlined-light" label="Outlined Light" />
		<VButton appearance="ghost" label="Ghost" />
		<VButton appearance="ghost-light" label="Ghost Light" />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Filled"></vwc-button>
	<vwc-button appearance="outlined" label="Outlined"></vwc-button>
	<vwc-button appearance="outlined-light" label="Outlined Light"></vwc-button>
	<vwc-button appearance="ghost" label="Ghost"></vwc-button>
	<vwc-button appearance="ghost-light" label="Ghost Light"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute controls the purpose of the button, expressed in it's colours.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton connotation="accent" appearance="filled" label="Accent" />
		<VButton connotation="accent" appearance="outlined" label="Accent" />
		<VButton connotation="accent" appearance="outlined-light" label="Accent" />
		<VButton connotation="accent" appearance="ghost" label="Accent" />
		<VButton connotation="accent" appearance="ghost-light" label="Accent" />
	</div>
	<div class="container">
		<VButton connotation="cta" appearance="filled" label="CTA" />
		<VButton connotation="cta" appearance="outlined" label="CTA" />
		<VButton connotation="cta" appearance="outlined-light" label="CTA" />
		<VButton connotation="cta" appearance="ghost" label="CTA" />
		<VButton connotation="cta" appearance="ghost-light" label="CTA" />
	</div>
	<div class="container">
		<VButton connotation="announcement" appearance="filled" label="Announcement" />
		<VButton connotation="announcement" appearance="outlined" label="Announcement" />
		<VButton connotation="announcement" appearance="outlined-light" label="Announcement" />
		<VButton connotation="announcement" appearance="ghost" label="Announcement" />
		<VButton connotation="announcement" appearance="ghost-light" label="Announcement" />
	</div>
	<div class="container">
		<VButton connotation="success" appearance="filled" label="Success" />
		<VButton connotation="success" appearance="outlined" label="Success" />
		<VButton connotation="success" appearance="outlined-light" label="Success" />
		<VButton connotation="success" appearance="ghost" label="Success" />
		<VButton connotation="success" appearance="ghost-light" label="Success" />
	</div>
	<div class="container">
		<VButton connotation="alert" appearance="filled" label="Alert" />
		<VButton connotation="alert" appearance="outlined" label="Alert" />
		<VButton connotation="alert" appearance="outlined-light" label="Alert" />
		<VButton connotation="alert" appearance="ghost" label="Alert" />
		<VButton connotation="alert" appearance="ghost-light" label="Alert" />
	</div>
</template>

<style>
.container {
	display: flex;
	flex-basis: 100%;
	width: 100%;
	gap: 8px;
	margin-block-end: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<div class="container">
	<vwc-button connotation="accent" appearance="filled" label="Accent"></vwc-button>
	<vwc-button connotation="accent" appearance="outlined" label="Accent"></vwc-button>
	<vwc-button connotation="accent" appearance="outlined-light" label="Accent"></vwc-button>
	<vwc-button connotation="accent" appearance="ghost" label="Accent"></vwc-button>
	<vwc-button connotation="accent" appearance="ghost-light" label="Accent"></vwc-button>
</div>
<div class="container">
	<vwc-button connotation="cta" appearance="filled" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="outlined" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="outlined-light" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="ghost" label="CTA"></vwc-button>
	<vwc-button connotation="cta" appearance="ghost-light" label="CTA"></vwc-button>
</div>
<div class="container">
	<vwc-button connotation="announcement" appearance="filled" label="Announcement"></vwc-button>
	<vwc-button connotation="announcement" appearance="outlined" label="Announcement"></vwc-button>
	<vwc-button connotation="announcement" appearance="outlined-light" label="Announcement"></vwc-button>
	<vwc-button connotation="announcement" appearance="ghost" label="Announcement"></vwc-button>
	<vwc-button connotation="announcement" appearance="ghost-light" label="Announcement"></vwc-button>
</div>
<div class="container">
	<vwc-button connotation="success" appearance="filled" label="Success"></vwc-button>
	<vwc-button connotation="success" appearance="outlined" label="Success"></vwc-button>
	<vwc-button connotation="success" appearance="outlined-light" label="Success"></vwc-button>
	<vwc-button connotation="success" appearance="ghost" label="Success"></vwc-button>
	<vwc-button connotation="success" appearance="ghost-light" label="Success"></vwc-button>
</div>
<div class="container">
	<vwc-button connotation="alert" appearance="filled" label="Alert"></vwc-button>
	<vwc-button connotation="alert" appearance="outlined" label="Alert"></vwc-button>
	<vwc-button connotation="alert" appearance="outlined-light" label="Alert"></vwc-button>
	<vwc-button connotation="alert" appearance="ghost" label="Alert"></vwc-button>
	<vwc-button connotation="alert" appearance="ghost-light" label="Alert"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		flex-basis: 100%;
		width: 100%;
		gap: 8px;
		margin-block-end: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed on the leading (default) or trailing side (`icon-trailing`) of the badge.

The preferred way to add icons is to use the [icon slot](/components/badge/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 72px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton appearance="outlined" label="Copy document" icon="copy-line" />
		<VButton appearance="outlined" label="Continue" icon="chevron-right-line" icon-trailing />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 72px
<div class="container">
	<vwc-button appearance="outlined" label="Copy document" icon="copy-line"></vwc-button>
	<vwc-button appearance="outlined" label="Continue" icon="chevron-right-line" icon-trailing></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Only

If the `label` is omitted, the button will be displayed as an _icon-only_ button.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

When an element has no visible text, provide an accessible name using the <nobr><code>aria-label</code></nobr>attribute. This ensures screen reader users can understand the element’s purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 72px
<script setup lang="ts">
import { VButton, VTooltip, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VTooltip text="Send Message" placement="right-start">
		<template #anchor>
			<VButton appearance="filled" connotation="cta" aria-label="Send Message">
				<template #icon><VIcon name="message-sent-line" /></template>
			</VButton>
		</template>
	</VTooltip>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 72px
<vwc-tooltip text="Send Message" placement="right-start">
	<vwc-button slot="anchor" appearance="filled" connotation="cta" aria-label="Send Message">
		<vwc-icon name="message-sent-line" slot="icon"></vwc-icon>
	</vwc-button>
</vwc-tooltip>
```

</vwc-tab-panel>
</vwc-tabs>

### Stacked

When using an icon, the `stacked` attribute causes the button to be displayed in a stacked format. This layout is only available with the 'rounded' [shape](#shape).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton stacked appearance="filled" label="Leading">
			<template #icon><VIcon name="compose-line" /></template>
		</VButton>
		<VButton stacked appearance="filled" label="Trailing" icon-trailing>
			<template #icon><VIcon name="compose-line" /></template>
		</VButton>
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-button stacked appearance="filled" label="Leading">
		<vwc-icon name="compose-line" slot="icon"></vwc-icon>
	</vwc-button>
	<vwc-button stacked appearance="filled" label="Trailing" icon-trailing>
		<vwc-icon name="compose-line" slot="icon"></vwc-icon>
	</vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

The `size` attribute controls the size of the button.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 100px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton size="super-condensed" appearance="filled" label="Super-condensed" />
		<VButton size="condensed" appearance="filled" label="Condensed" />
		<VButton size="normal" appearance="filled" label="Normal" />
		<VButton size="expanded" appearance="filled" label="Expanded" />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
	align-items: start;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 100px
<div class="container">
	<vwc-button size="super-condensed" appearance="filled" label="Super-condensed"></vwc-button>
	<vwc-button size="condensed" appearance="filled" label="Condensed"></vwc-button>
	<vwc-button size="normal" appearance="filled" label="Normal"></vwc-button>
	<vwc-button size="expanded" appearance="filled" label="Expanded"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
		align-items: start;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

The `shape` attribute controls the shape of the button.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 72px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton appearance="filled" label="Rounded shape" />
		<VButton appearance="filled" label="Pill shape" shape="pill" />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Rounded shape"></vwc-button>
	<vwc-button appearance="filled" label="Pill shape" shape="pill"></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Pending

The `pending` attribute triggers the pending state, which indicates that the action is being processed.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton appearance="filled" label="Pending" pending>
			<template #icon><VIcon name="compose-line" /></template>
		</VButton>
		<VButton appearance="filled" label="Pending" pending>
			<template #icon><VIcon name="compose-line" /></template
		></VButton>
		<VButton appearance="outlined" label="Pending" pending>
			<template #icon><VIcon name="compose-line" /></template>
		</VButton>
		<VButton appearance="ghost" label="Pending" pending>
			<template #icon><VIcon name="compose-line" /></template>
		</VButton>
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-button appearance="filled" label="Pending" pending>
		<vwc-icon name="compose-line" slot="icon"></vwc-icon>
	</vwc-button>
	<vwc-button appearance="filled" label="Pending" pending>
		<vwc-icon name="compose-line" slot="icon"></vwc-icon>
	</vwc-button>
	<vwc-button appearance="outlined" label="Pending" pending>
		<vwc-icon name="compose-line" slot="icon"></vwc-icon>
	</vwc-button>
	<vwc-button appearance="ghost" label="Pending" pending>
		<vwc-icon name="compose-line" slot="icon"></vwc-icon>
	</vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	
The spinner is not displayed when using the `super-condensed` size.

</vwc-note>

## Disabled

The `disabled` attribute disables the buttons and indicates that the action is not available.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>
	
Disabled buttons should be used with caution. Read our [guidelines for when to disabled buttons](/components/button/guidelines/#disabled).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 72px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton appearance="filled" label="Disabled" disabled />
		<VButton appearance="outlined" label="Disabled" disabled />
		<VButton appearance="ghost" label="Disabled" disabled />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Disabled" disabled></vwc-button>
	<vwc-button appearance="outlined" label="Disabled" disabled></vwc-button>
	<vwc-button appearance="ghost" label="Disabled" disabled></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Active

The `active` attribute causes the button to appear in its active state. Use it to indicate that the action was triggered by some other means.

Do not use this attribute to indicate a selected or pressed state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 72px
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VButton appearance="filled" label="Active" active />
		<VButton appearance="outlined" label="Active" active />
		<VButton appearance="outlined-light" label="Active" active />
		<VButton appearance="ghost" label="Active" active />
		<VButton appearance="ghost-light" label="Active" active />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 72px
<div class="container">
	<vwc-button appearance="filled" label="Active" active></vwc-button>
	<vwc-button appearance="outlined" label="Active" active></vwc-button>
	<vwc-button appearance="outlined-light" label="Active" active></vwc-button>
	<vwc-button appearance="ghost" label="Active" active></vwc-button>
	<vwc-button appearance="ghost-light" label="Active" active></vwc-button>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Dropdown Indicator

When the button is used to trigger a menu / dropdown, you can set `dropdown-indicator` to add a chevron to the button.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>When setting <code>dropdown-indicator</code> the Button's content alignment changes from center to start. You can change it back to center using <code>--button-content-alignment</code> CSS variable </p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 220px
<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu auto-dismiss placement="bottom-start">
		<template #anchor>
			<VButton appearance="outlined-light" label="Menu" dropdown-indicator />
		</template>
		<VMenuItem icon="copy-line" text="Copy" />
		<VMenuItem icon="inbox-line" text="Share" />
		<VMenuItem icon="delete-line" text="Archive" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 220px
<vwc-menu auto-dismiss placement="bottom-start">
	<vwc-button slot="anchor" appearance="outlined-light" label="Menu" dropdown-indicator></vwc-button>
	<vwc-menu-item icon="copy-line" text="Copy"></vwc-menu-item>
	<vwc-menu-item icon="inbox-line" text="Share"></vwc-menu-item>
	<vwc-menu-item icon="delete-line" text="Archive"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>
