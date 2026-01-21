## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<p>I <VIcon name="heart-line" connotation="alert" label="Love" /> VIVID!</p>
</template>

<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerIcon } from '@vonage/vivid';

registerIcon('your-prefix');
```

```html preview
<script type="module">
	import { registerIcon } from '@vonage/vivid';
	registerIcon('your-prefix');
</script>

<p>I <your-prefix-icon name="heart-line" connotation="alert" label="Love"></your-prefix-icon> VIVID!</p>
```

</vwc-tab-panel>
</vwc-tabs>

## Label

Use the `label` attribute to provide the Icon with a descriptive label so that it's meaning can be conveyed to screen reader users.

See the [Accessibility section](/components/icon/accessibility/) for more information.

<vwc-note connotation="information" headline="Accessibility note">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

The `label` attribute was added as an alternative to using the `aria-label` attribute. It is preferable because using `aria-label` on non-interactive elements (like Icon) idoes not work consistantly across screen readers.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VIcon label="Close dialog" name="close-line" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-icon label="Close dialog" name="close-line"></vwc-icon>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Size

If the component is used without a `size`, it will use the current `font-size` value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>

<template><VIcon name="close-line" label="Close dialog" class="small-icon" /> 30px</template>

<style>
.small-icon {
	font-size: 30px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-icon name="close-line" label="Close dialog" class="small-icon"></vwc-icon>
30px

<style>
	.small-icon {
		font-size: 30px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Color

If the component is used without a `connotation`, it will use the current text color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VIcon class="icon" label="Heart icon" name="heart-solid" />
</template>

<style>
.icon {
	color: var(--vvd-color-announcement-400);
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-icon class="icon" label="Heart icon" name="heart-solid"></vwc-icon>

<style>
	.icon {
		color: var(--vvd-color-announcement-400);
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

| Name             | Type                                                                                      | Description                                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **aria-current** | _Enum_:<br/>`page`<br/>`step`<br/>`location`<br/>`date`<br/>`time`<br/>`true`<br/>`false` | Indicates the element that represents the current item within a container or set of related elements.            |
| **connotation**  | _Enum_:<br/>`accent`<br/>`cta`<br/>`success`<br/>`alert`<br/>`warning`<br/>`information`  | The connotation the icon should have.                                                                            |
| **size**         | _Enum_:<br/>-6<br/>-5<br/>-4<br/>-3<br/>-2<br/>-1<br/>0<br/>1<br/>2<br/>3<br/>4<br/>5     |                                                                                                                  |
| **name**         | _Enum_:<br/>`[icon-name]`                                                                 | Indicates which icon to resolve. See the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/ |

### Events

| Name      | Event Type   | Description                                                                                                                                                |
| --------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **click** | `MouseEvent` | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |

### Slots

| Name        | Description   |
| ----------- | ------------- |
| **default** | Default slot. |
