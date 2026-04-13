## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/kbd-key';
import '@vonage/vivid/kbd-shortcut';
```

or, if you need to use a unique prefix:

```js
import { registerKbdKey, registerKbdShortcut } from '@vonage/vivid';

registerKbdKey('your-prefix');
registerKbdShortcut('your-prefix');
```

```html preview inline
<script type="module">
	import { registerKbdKey, registerKbdShortcut } from '@vonage/vivid';
	registerKbdKey('your-prefix');
	registerKbdShortcut('your-prefix');
</script>

<your-prefix-kbd-shortcut>
	<your-prefix-kbd-key name="Mod"></your-prefix-kbd-key>
	<your-prefix-kbd-key name="S"></your-prefix-kbd-key>
</your-prefix-kbd-shortcut>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VKbdKey, VKbdShortcut } from '@vonage/vivid-vue';
```

```vue preview inline
<script setup lang="ts">
import { VKbdKey, VKbdShortcut } from '@vonage/vivid-vue';
</script>

<template>
	<VKbdShortcut>
		<VKbdKey name="Mod" />
		<VKbdKey name="S" />
	</VKbdShortcut>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

Kbd Shortcut wraps one or more Kbd Key components to display them as shortcut.

Some components, like Tooltip and Menu Item, accept a Kbd Shortcut element in a `kbd-shortcut` slot. Display and accessibility will be handled automatically.

Kbd Shortcut can also be used outside the `kbd-shortcut` slot, e.g. in documentation pages.
