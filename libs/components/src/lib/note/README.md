## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/note';
```

or, if you need to use a unique prefix:

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
	headline="Changes Saved Successfully"
	icon="check-circle"
	connotation="success"
>
	Your changes have been saved successfully. You can now continue working.
</your-prefix-note>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VNote } from '@vonage/vivid-vue';
</script>

<template>
	<VNote label="First name" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default Slot

Any slotted content will appear below the headline.

```html preview
<vwc-note icon="home" headline="Note Headline" connotation="information">
	<p>This is the text that explains about something important!</p>
</vwc-note>
```

### Icon Slot

Set the `icon` slot to show an icon before the note's headline.
If set, the `icon` attribute is ignored.

```html preview
<vwc-note headline="Note With Icon Slot">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
</vwc-note>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                                                             | Description                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **connotation** | `accent` (default), `alert`, `success`, `warning`, `information`, `announcement` | Sets the connotation                                                                                                                     |
| **headline**    | `string`                                                                         | Sets the headline text                                                                                                                   |
| **icon**        | _Enum_:<br/>`[icon-name]`                                                        | Decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                  |
| ----------- | ---------------------------- |
| **default** | Main content of the Note     |
| **icon**    | Add an icon to the component |

</div>
