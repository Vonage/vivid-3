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

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VKbdKey, VKbdShortcut } from '@vonage/vivid-vue';
</script>

<template>
	<VKbdShortcut>
		<VKbdKey name="Ctrl" />
		<VKbdKey name="C" />
	</VKbdShortcut>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slotted Kbd Key Elements

Place Kbd Key elements as children. They are automatically separated by a "+" symbol.

```html preview inline
<vwc-kbd-shortcut>
	<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
	<vwc-kbd-key name="C"></vwc-kbd-key>
</vwc-kbd-shortcut>
```

## API Reference

### Slots

<div class="table-wrapper">

| Name        | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| **default** | Accepts Kbd Key elements to display as a keyboard shortcut combination. |

</div>
