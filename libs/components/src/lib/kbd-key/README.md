## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/kbd-key';
```

or, if you need to use a unique prefix:

```js
import { registerKbdKey } from '@vonage/vivid';

registerKbdKey('your-prefix');
```

```html preview
<script type="module">
	import { registerKbdKey } from '@vonage/vivid';
	registerKbdKey('your-prefix');
</script>

<your-prefix-kbd-key name="Enter"></your-prefix-kbd-key>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VKbdKey } from '@vonage/vivid-vue';
</script>

<template>
	<VKbdKey name="Enter" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Name

The `name` attribute controls which key is displayed. Some keys render as Unicode symbols (e.g., `Cmd` renders as ⌘), while others display as text.

```html preview blocks
<vwc-kbd-key name="Cmd"></vwc-kbd-key>
<vwc-kbd-key name="Shift"></vwc-kbd-key>
<vwc-kbd-key name="Enter"></vwc-kbd-key>
<vwc-kbd-key name="A"></vwc-kbd-key>
```

## Mod Key

The `Mod` key adapts to the current platform. On Apple platforms it displays as `⌘` (Cmd), on all other platforms it displays as `Ctrl`.

```html preview blocks
<vwc-kbd-key name="Mod"></vwc-kbd-key>
```

## Custom Content

Set `name="Custom"` to slot in arbitrary content.

```html preview blocks
<vwc-kbd-key name="Custom">Fn</vwc-kbd-key> <vwc-kbd-key name="Custom">PgUp</vwc-kbd-key>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name     | Type         | Description                                                                                                                                         |
| -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **name** | `KbdKeyName` | The key to display. Accepts key names like `Enter`, `Cmd`, `Shift`, `Mod`, letters, digits, function keys, or `Custom`. `Mod` adapts to the platform. |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| **default** | Custom content displayed inside the keycap when `name` is `Custom`. |

</div>
