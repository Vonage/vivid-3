## Text

The `text` attribute sets the text content.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 100px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem text="Menu item" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Secondary Text

The Menu Item can be given extra context using the `text-secondary` attribute.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

    To improve readability, **avoid long text and multiple lines** where possible.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 150px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem text="Menu item" text-secondary="Secondary text" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 150px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item" text-secondary="Secondary text"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute sets an icon.

View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

<!-- Uncomment when Icon slot is implemented
<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>
-->

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 100px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem icon="file-pdf-line" text="Export to PDF" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item icon="file-pdf-line" text="Export to PDF"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Control Type

The `control-type` attribute allows the Menu Item to become checkable and behave either as a checkbox or radio button.

When `control-type` is `radio`, only one Menu Item can be checked in the current section. Sections are separated by Dividers.

<vwc-note connotation="warning" headline="Deprecated Prop: role">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

Previously, the `role` attribute was used to set the control type. This is now deprecated (as of 05/25) and replaced with the `control-type` attribute. Using `role` is still functional, but will be removed in a future major release.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 330px
<script setup lang="ts">
import { VDivider, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Formatting">
		<VMenuItem control-type="checkbox" text="Bold" />
		<VMenuItem control-type="checkbox" text="Italic" />
		<VMenuItem control-type="checkbox" text="Underlined" />
		<VDivider />
		<VMenuItem control-type="radio" text="Small" />
		<VMenuItem control-type="radio" text="Medium" />
		<VMenuItem control-type="radio" text="Large" />
		<VDivider />
		<VMenuItem text="Clear formatting" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 330px
<vwc-menu open aria-label="Formatting">
	<vwc-menu-item control-type="checkbox" text="Bold"></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Italic"></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Underlined"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item control-type="radio" text="Small"></vwc-menu-item>
	<vwc-menu-item control-type="radio" text="Medium"></vwc-menu-item>
	<vwc-menu-item control-type="radio" text="Large"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item text="Clear formatting"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Check Trailing

When `control-type` is set, the `check-trailing` attribute places the checkbox / radio indicator at the end of the Menu Item.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

If the `icon` attribute is present, the indicator will be trailing by default.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 280px
<script setup lang="ts">
import { VDivider, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem control-type="checkbox" text="Checkbox 1" check-trailing />
		<VMenuItem control-type="checkbox" text="Checkbox 2" check-trailing />
		<VMenuItem icon="image-line" control-type="checkbox" text="Checkbox 3" />
		<VDivider />
		<VMenuItem control-type="radio" text="Radio 1" check-trailing />
		<VMenuItem control-type="radio" text="Radio 2" check-trailing />
		<VMenuItem icon="image-line" control-type="radio" text="Radio 3" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 280px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item control-type="checkbox" text="Checkbox 1" check-trailing></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Checkbox 2" check-trailing></vwc-menu-item>
	<vwc-menu-item icon="image-line" control-type="checkbox" text="Checkbox 3"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item control-type="radio" text="Radio 1" check-trailing></vwc-menu-item>
	<vwc-menu-item control-type="radio" text="Radio 2" check-trailing></vwc-menu-item>
	<vwc-menu-item icon="image-line" control-type="radio" text="Radio 3"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Check Appearance

When `control-type` is set, the `check-appearance` attribute changes the appearance of the checkbox / radio indicator.

In the example below it is set to `tick-only` (default is `normal`).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 250px
<script setup lang="ts">
import { VDivider, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem control-type="checkbox" text="Checkbox 1" check-appearance="tick-only" checked />
		<VMenuItem control-type="checkbox" text="Checkbox 2" check-appearance="tick-only" checked />
		<VMenuItem control-type="checkbox" text="Checkbox 3" check-appearance="tick-only" />
		<VDivider />
		<VMenuItem control-type="radio" text="Radio 1" check-appearance="tick-only" />
		<VMenuItem control-type="radio" text="Radio 2" check-appearance="tick-only" checked />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 250px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item control-type="checkbox" text="Checkbox 1" check-appearance="tick-only" checked></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Checkbox 2" check-appearance="tick-only" checked></vwc-menu-item>
	<vwc-menu-item control-type="checkbox" text="Checkbox 3" check-appearance="tick-only"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item control-type="radio" text="Radio 1" check-appearance="tick-only"></vwc-menu-item>
	<vwc-menu-item control-type="radio" text="Radio 2" check-appearance="tick-only" checked></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

### Checked

When `control-type` is set, the `checked` attribute sets the checked state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 100px
<script setup lang="ts">
import { VDivider, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem checked control-type="checkbox" text="Checked Checkbox Menu Item" />
		<VDivider />
		<VMenuItem checked control-type="radio" text="Checked Radio Menu Item" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item checked control-type="checkbox" text="Checked Checkbox Menu Item"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item checked control-type="radio" text="Checked Radio Menu Item"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute controls the checked color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 110px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu" style="--menu-block-size: auto;">
		<VMenuItem control-type="checkbox" checked text="Accent (default)" />
		<VMenuItem connotation="cta" control-type="checkbox" checked text="CTA" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 110px
<vwc-menu open aria-label="Example menu" style="--menu-block-size: auto;">
	<vwc-menu-item control-type="checkbox" checked text="Accent (default)"></vwc-menu-item>
	<vwc-menu-item connotation="cta" control-type="checkbox" checked text="CTA"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute controls the disabled state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 100px
<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>

<template>
	<VMenu open aria-label="Example menu">
		<VMenuItem disabled text="Disabled Menu item" />
	</VMenu>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item disabled text="Disabled Menu item"></vwc-menu-item>
</vwc-menu>
```

</vwc-tab-panel>
</vwc-tabs>
