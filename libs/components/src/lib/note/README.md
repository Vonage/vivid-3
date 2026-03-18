## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNote } from '@vonage/vivid-vue';
</script>

<template>
	<VNote headline="Changes Saved Successfully" icon="check-circle" connotation="success" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerNote } from '@vonage/vivid';

registerNote('your-prefix');
```

```html preview
<script type="module">
	import { registerNote } from '@vonage/vivid';
	registerNote('your-prefix');
</script>

<your-prefix-note
	headline="Changes Saved"
	connotation="success"
>
	<your-prefix-icon slot="icon" name="check-circle" label="Success:"></your-prefix-icon>
	Your changes have been saved successfully. You can now continue working.
</your-prefix-icon>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

Any slotted content will appear below the headline.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNote, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VNote headline="Note Headline" connotation="information">
		<template #icon>
			<VIcon name="home" label="User information:" />
		</template>
		<p>This is the text that explains about something important!</p>
	</VNote>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-note headline="Note Headline" connotation="information">
	<vwc-icon slot="icon" name="home" label="User information:"></vwc-icon>
	<p>This is the text that explains about something important!</p>
</vwc-note>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Slot

Set the `icon` slot to show an icon before the note's headline.\
If set, the `icon`_(deprecated)_ attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNote, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VNote headline="Task in my todo list">
		<template #icon>
			<VIcon name="check-circle-solid" connotation="success" label="Done" />
		</template>
	</VNote>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-note headline="Task in my todo list">
	<vwc-icon slot="icon" name="check-circle-solid" connotation="success" label="Done"></vwc-icon>
</vwc-note>
```

</vwc-tab-panel>
</vwc-tabs>
