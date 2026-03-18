## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDialPad } from '@vonage/vivid';

registerDialPad('your-prefix');
```

```html preview 500px
<script type="module">
	import { registerDialPad } from '@vonage/vivid';
	registerDialPad('your-prefix');
</script>

<your-prefix-dial-pad></your-prefix-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

To set the value of the input, use the `value` attribute to set the text displayed in the input.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad value="1234567890" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad value="1234567890"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Pattern

Use the `pattern` attribute to set the regex string of allowed characters in the input.  
Read more about [vwc-text-field validation](/components/text-field/#validation).
It defaults to `^[0-9#*]*$` (key pad buttons).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad placeholder="Only digits" pattern="^[0-9]*$" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad placeholder="Only digits" pattern="^[0-9]*$"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>
