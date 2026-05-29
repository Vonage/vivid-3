## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 170px
<script setup lang="ts">
import { VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
</script>
<template>
	<VNav>
		<VNavItem text="Navigation" />
		<VNavDisclosure label="Disclosure">
			<VNavItem text="Navigation" />
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerNav, registerNavItem, registerNavDisclosure } from '@vonage/vivid';

registerNav('your-prefix');
registerNavItem('your-prefix');
registerNavDisclosure('your-prefix');
```

```html preview 170px
<script type="module">
	import { registerNav, registerNavItem, registerNavDisclosure } from '@vonage/vivid';
	registerNav('your-prefix');
	registerNavItem('your-prefix');
	registerNavDisclosure('your-prefix');
</script>

<your-prefix-nav>
	<your-prefix-nav-item text="Navigation"></your-prefix-nav-item>
	<your-prefix-nav-disclosure label="Disclosure">
		<your-prefix-nav-item text="Navigation"></your-prefix-nav-item>
	</your-prefix-nav-disclosure>
</your-prefix-nav>
```

</vwc-tab-panel>
</vwc-tabs>

## Href

Use `href` to set the URL that the **Nav Item** links to.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNav, VNavItem } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavItem href="#" text="Variations" />
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Variations"></vwc-nav-item>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>

## Current

Use the `current` attribute on **Nav Item** to indicate the currently active link.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNav, VNavItem } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavItem href="#" text="Current Nav Item" current />
		<VNavItem href="#" text="Nav Item" />
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-nav>
	<vwc-nav-item href="#" text="Current Nav Item" current></vwc-nav-item>
	<vwc-nav-item href="#" text="Nav Item"></vwc-nav-item>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>

Use the `current` attribute on **Nav Disclosure** to indicate the currently active disclosure.  
Only when the **Nav Disclosure** is closed the `current` will be set.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VIcon, VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavDisclosure label="1st level item" current>
			<template #icon><VIcon name="profile" /></template>
			<VNavItem href="#" text="2nd level item" current />
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" current>
		<vwc-icon slot="icon" name="profile"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item" current></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="warning" headline="Deprecated Prop: aria-current">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>

The `aria-current` prop is deprecated in both **Nav Item** and **Nav Disclosure** (as of 05/25) and directly replaced with `current`. `aria-current` is still functional in the component, but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

## Open

Use the `open` attribute to toggle the **Nav Disclosure** open state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavDisclosure label="1st level item" open>
			<VNavItem href="#" text="2nd level item" />
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Meta Slot

Use the `meta` slot to add additional content to the **Nav Item** and the **Nav Disclosure**.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VBadge, VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavDisclosure label="1st level item" open>
			<template #meta><VBadge text="beta" connotation="success" appearance="subtle" shape="pill" /></template>
			<VNavItem href="#" text="2nd level item">
				<template #meta><VBadge text="in progress" connotation="warning" appearance="subtle" shape="pill" /></template>
			</VNavItem>
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-badge slot="meta" text="beta" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
		<vwc-nav-item href="#" text="2nd level item">
			<vwc-badge slot="meta" text="in progress" connotation="warning" appearance="subtle" shape="pill"></vwc-badge>
		</vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>

When a **Nav Item** is in icon-only mode (icon set, no text), the `meta` slot is displayed as a floating element centered on the top-right corner of the icon.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge, VIcon, VNav, VNavItem } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavItem href="#" aria-label="Messages">
			<template #icon><VIcon name="chat-line" /></template>
			<template #meta><VBadge aria-label="3 new messages" text="3" connotation="alert" shape="pill" /></template>
		</VNavItem>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-nav>
	<vwc-nav-item href="#" aria-label="Messages">
		<vwc-icon slot="icon" name="chat-line"></vwc-icon>
		<vwc-badge slot="meta" aria-label="3 new messages" text="3" connotation="alert" shape="pill"></vwc-badge>
	</vwc-nav-item>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Slot

Set the `icon` slot to add an icon to the **Nav Item** and the **Nav Disclosure**.
If set, the `icon` attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VIcon, VNav, VNavItem, VNavDisclosure } from '@vonage/vivid-vue';
</script>

<template>
	<VNav>
		<VNavDisclosure label="1st level item" open>
			<template #icon><VIcon name="check-circle-solid" connotation="success" /></template>
			<VNavItem href="#" text="2nd level item">
				<template #icon><VIcon name="close-circle-solid" connotation="alert" /></template>
			</VNavItem>
		</VNavDisclosure>
	</VNav>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-nav>
	<vwc-nav-disclosure label="1st level item" open>
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
		<vwc-nav-item href="#" text="2nd level item">
			<vwc-icon slot="icon" name="close-circle-solid" connotation="alert"></vwc-icon>
		</vwc-nav-item>
	</vwc-nav-disclosure>
</vwc-nav>
```

</vwc-tab-panel>
</vwc-tabs>
