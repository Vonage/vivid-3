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
		<span data-os="apple">macOS content</span>
		<span data-os="windows">Windows content</span>
		<span>Default content</span>
	</VPlatformSwitch>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Filtering

Each child element can declare constraints via `data-*` attributes. The component shows the first child whose constraints all match and hides the rest.

A child without any `data-*` filter attributes acts as a fallback — it matches any platform.

### OS Filter

The built-in `os` filter detects the user's operating system. Supported values are `apple`, `windows`, `linux`, `android`, and `chromeos`.

```html preview inline
<vwc-platform-switch>
	<span data-os="apple">🍎 You are on macOS / iOS</span>
	<span data-os="windows">🪟 You are on Windows</span>
	<span data-os="linux">🐧 You are on Linux</span>
	<span>Your platform was not detected</span>
</vwc-platform-switch>
```

## API Reference

### Slots

<div class="table-wrapper">

| Name        | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| **default** | Accepts children with optional `data-*` filter attributes. The first matching child is displayed. |

</div>

### Static Properties

<div class="table-wrapper">

| Name          | Type                           | Description                                                              |
| ------------- | ------------------------------ | ------------------------------------------------------------------------ |
| **resolvers** | `Record<string, () => string>` | Custom filter resolvers. Each key maps to a `data-<key>` attribute name. |

</div>
