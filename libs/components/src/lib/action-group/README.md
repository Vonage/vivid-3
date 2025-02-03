## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/action-group';
```

or, if you need to use a unique prefix:

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
	<vwc-button label="copy"></vwc-button>
	<vwc-button label="paste"></vwc-button>
</your-prefix-action-group>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VActionGroup } from '@vonage/vivid-vue';
</script>
<template>
	<VActionGroup>
		<VButton appearance="filled" label="Click me" />
	</VActionGroup>
</template>
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
