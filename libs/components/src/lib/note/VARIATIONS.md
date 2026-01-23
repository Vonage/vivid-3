## Headline

The `headline` attribute provides the Note with headline text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNote } from '@vonage/vivid-vue';
</script>

<template>
	<VNote headline="Headline Text" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-note headline="Headline Text"></vwc-note>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute to convey the Note's purpose through it's color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNote, VIcon, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout row-spacing="medium">
		<VNote connotation="accent" headline="Accent Note (default)">
			<template #icon>
				<VIcon name="megaphone-line" label="Announcement:" />
			</template>
		</VNote>
		<VNote connotation="alert" headline="Alert Note">
			<template #icon>
				<VIcon name="error-line" label="Alert:" />
			</template>
		</VNote>
		<VNote connotation="success" headline="Success Note">
			<template #icon>
				<VIcon name="check-circle-line" label="Success" />
			</template>
		</VNote>
		<VNote connotation="warning" headline="Warning Note">
			<template #icon>
				<VIcon name="warning-line" label="Warning:" />
			</template>
		</VNote>
		<VNote connotation="information" headline="Information Note">
			<template #icon>
				<VIcon name="info-line" label="Note:" />
			</template>
		</VNote>
		<VNote connotation="announcement" headline="Announcement Note">
			<template #icon>
				<VIcon name="sparkles-line" label="Key Fact:" />
			</template>
		</VNote>
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout row-spacing="medium">
	<vwc-note connotation="accent" headline="Accent Note (default)">
		<vwc-icon slot="icon" name="megaphone-line" label="Announcement:"></vwc-icon>
	</vwc-note>
	<vwc-note connotation="alert" headline="Alert Note">
		<vwc-icon slot="icon" name="error-line" label="Alert:"></vwc-icon>
	</vwc-note>
	<vwc-note connotation="success" headline="Success Note">
		<vwc-icon slot="icon" name="check-circle-line" label="Success"></vwc-icon>
	</vwc-note>
	<vwc-note connotation="warning" headline="Warning Note">
		<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>
	</vwc-note>
	<vwc-note connotation="information" headline="Information Note">
		<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	</vwc-note>
	<vwc-note connotation="announcement" headline="Announcement Note">
		<vwc-icon slot="icon" name="sparkles-line" label="Key Fact:"></vwc-icon>
	</vwc-note>
</vwc-layout>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute can be set to display an icon from the [icon library](/icons/icons-gallery/) on the component.

The preferred way to add icons is to use the [icon slot](/components/note/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>
