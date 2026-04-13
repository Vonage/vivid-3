## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/kbd-shortcut-text';
```

or, if you need to use a unique prefix:

```js
import { registerKbdShortcutText } from '@vonage/vivid';

registerKbdShortcutText('your-prefix');
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VKbdShortcutText } from '@vonage/vivid-vue';
</script>

<template>
	<VKbdShortcutText>Control+C</VKbdShortcutText>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Text Content

Place text in the default slot using the [`aria-keyshortcuts`](https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts) format. The component parses the string and renders the corresponding [Kbd Key](/components/kbd-key/) elements.

Keys within a chord are separated by `+`. Alternative shortcuts are separated by a space.

```html preview inline
<vwc-kbd-shortcut-text>Control+C</vwc-kbd-shortcut-text>
```

### Key Name Mapping

The component maps `aria-keyshortcuts` key names to the Kbd Key component names:

| aria-keyshortcuts | Kbd Key   |
| ----------------- | --------- |
| `Control`         | `Ctrl`    |
| `Meta`            | `Cmd`     |
| `Alt`             | `Alt`     |
| `Shift`           | `Shift`   |
| `Enter`           | `Enter`   |
| `Tab`             | `Tab`     |
| `Space`           | `Space`   |
| `Escape`          | `Escape`  |
| `ArrowUp`         | `ArrowUp` |
| Letters (`A`–`Z`) | Uppercase |
| Digits (`0`–`9`)  | As-is     |
| `F1`–`F12`        | Uppercase |

Key names are case-insensitive.

## API Reference

### Slots

<div class="table-wrapper">

| Name        | Description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| **default** | Text content in `aria-keyshortcuts` format to parse and display as key visuals |

</div>
