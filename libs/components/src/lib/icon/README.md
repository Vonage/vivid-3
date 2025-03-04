## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/icon';
```

or, if you need to use a unique prefix:

```js
import { registerIcon } from '@vonage/vivid';

registerIcon('your-prefix');
```

```html preview
<script type="module">
	import { registerIcon } from '@vonage/vivid';
	registerIcon('your-prefix');
</script>

<your-prefix-icon name="close-line" aria-hidden="true"></your-prefix-icon>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VIcon } from '@vonage/vivid-vue';
</script>
<template>
	<VIcon name="close-line" aria-hidden="true" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Size

If the component is used without a `size`, it will use the current `font-size` value.

```html preview
<vwc-icon name="close-line" class="small-icon" aria-hidden="true"></vwc-icon>
30px

<style>
	.small-icon {
		font-size: 30px;
	}
</style>
```

## Custom Color

If the component is used without a `connotation`, it will use the current text color.

```html preview
<vwc-icon class="icon" name="heart-solid"></vwc-icon>

<style>
	.icon {
		color: var(--vvd-color-announcement-400);
	}
</style>
```

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
