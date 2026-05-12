## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerPlatformSwitch } from '@vonage/vivid';

registerPlatformSwitch('your-prefix');
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VPlatformSwitch } from '@vonage/vivid-vue';
</script>

<template>
	<VPlatformSwitch>
		<span data-keyboard="apple">Apple content</span>
		<span>Default content</span>
	</VPlatformSwitch>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

Platform Switch takes multiple direct child elements but renders at most one of them based on the detected platform. Children declare platform constraints using data attributes. The first child with matching constraints is displayed.

## Constraints

### Keyboard

A child with `data-keyboard="apple"` is shown only on Apple platforms.

```html preview inline
<vwc-platform-switch>
	<vwc-kbd-shortcut data-keyboard="apple">
		<vwc-kbd-key name="Mod" keyboard="apple"></vwc-kbd-key>
		<vwc-kbd-key name="C"></vwc-kbd-key>
	</vwc-kbd-shortcut>
	<vwc-kbd-shortcut>
		<vwc-kbd-key name="Alt"></vwc-kbd-key>
		<vwc-kbd-key name="C"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</vwc-platform-switch>
```

### Fallback

A child without a `data-keyboard` attribute always matches. Use it as the last child to ensure content is shown on all platforms.

```html preview inline
<vwc-platform-switch>
	<span data-keyboard="apple">Apple</span>
	<span>Fallback (all other platforms)</span>
</vwc-platform-switch>
```
