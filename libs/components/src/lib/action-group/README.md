## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VActionGroup, VButton } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VActionGroup, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<VActionGroup>
		<VButton icon="reply-line" />
		<VButton label="copy" />
		<VButton label="paste" />
		<VButton label="submit" />
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerActionGroup } from '@vonage/vivid';

registerActionGroup('your-prefix');
```

```html preview
<script type="module">
	import { registerActionGroup } from '@vonage/vivid';
	registerActionGroup('your-prefix');
</script>

<your-prefix-action-group>
	<vwc-button icon="reply-line"></vwc-button>
	<vwc-button label="copy"></vwc-button>
	<vwc-button label="paste"></vwc-button>
	<vwc-button label="submit"></vwc-button>
</your-prefix-action-group>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name           | Type                                 | Description                      |
| -------------- | ------------------------------------ | -------------------------------- |
| **appearance** | _Enum_:`fieldset` (default), `ghost` | Sets the element's appearance    |
| **shape**      | _Enum_:`rounded`(default), `pill`    | Sets the element's border-radius |
| **tight**      | `boolean`                            | Remove padding and gaps          |

</div>
