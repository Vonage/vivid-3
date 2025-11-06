## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
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
</vwc-tabs>

## Slots

### Default Slot

Any slotted content will appear below the headline.

```html preview
<vwc-note headline="Note Headline" connotation="information">
	<vwc-icon slot="icon" name="home" label="User information:"></vwc-icon>
	<p>This is the text that explains about something important!</p>
</vwc-note>
```

### Icon Slot

Set the `icon` slot to show an icon before the note's headline.\
If set, the `icon`_(deprecated)_ attribute is ignored.

```html preview
<vwc-note headline="Task in my todo list">
	<vwc-icon slot="icon" name="check-circle-solid" connotation="success" label="Done"></vwc-icon>
</vwc-note>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                                   | Type                                                                             | Description                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **connotation**                        | `accent` (default), `alert`, `success`, `warning`, `information`, `announcement` | Sets the connotation                                                                                                                     |
| **headline**                           | `string`                                                                         | Sets the headline text                                                                                                                   |
| _(deprecated as of 05/25)_<br>**icon** | _Enum_:<br/>`[icon-name]`                                                        | Decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                  |
| ----------- | ---------------------------- |
| **default** | Main content of the Note     |
| **icon**    | Add an icon to the component |

</div>
