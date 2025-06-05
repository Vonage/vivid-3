## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/alert';
```

or, if you need to use a unique prefix:

```js
import { registerAlert } from '@vonage/vivid';

registerAlert('your-prefix');
```

```html preview 100px
<script type="module">
	import { registerAlert } from '@vonage/vivid';
	registerAlert('your-prefix');
</script>

<your-prefix-alert
	text="Some important information for you"
	open
></your-prefix-alert>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VAlert } from '@vonage/vivid-vue';
</script>
<template>
	<VAlert text="Some important information for you" open />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Opening and Closing

### Open

Use the `open` attribute to toggle the Alert open state.

```html preview
<vwc-alert text="Some important information for you"></vwc-alert>

<vwc-button
	appearance="outlined"
	label="Show/Hide Alert"
	onclick="toggleAlert()"
></vwc-button>

<script>
	alert = document.querySelector('vwc-alert');
	function toggleAlert() {
		alert.open = !alert.open;
	}
</script>
```

### Timeoutms

Use the `timeoutms` attribute to set the time in milliseconds after which the Alert will automatically close.

The default value is `0`, which means the Alert will not close automatically.

```html preview
<vwc-alert
	text="Some important information for you"
	timeoutms="2000"
></vwc-alert>

<vwc-button
	appearance="outlined"
	label="Show an Alert for 2 seconds"
	onclick="openAlert()"
></vwc-button>

<script>
	alert = document.querySelector('vwc-alert');
	function openAlert() {
		alert.open = true;
	}
</script>
```

## Position Strategy

The `strategy` attribute controls the position strategy of the Alert. The default is `fixed`, which will position the Alert relative to the viewport.

When set to `static`, placement will have no effect, and the Alert will behave as an element in page flow.

```html preview
<vwc-alert strategy="static" text="This Alert has position set to static" open>
	<vwc-icon slot="icon" name="megaphone-solid" label="Announcement"></vwc-icon>
</vwc-alert>
```

## Slots

### Main Slot

If you want to add rich content to an Alert, you can use the main slot.

```html preview 100px
<vwc-alert open>
	<vwc-switch slot="main" label="Do not show more Alerts"></vwc-switch>
</vwc-alert>
```

### Action Items Slot

You can add action items elements using the `action-items` slot. They will be displayed at the inline-end of the Alert.

```html preview 100px
<vwc-alert text="Some important information for you" open>
	<vwc-button
		slot="action-items"
		appearance="outlined"
		shape="pill"
		label="Action"
	></vwc-button>
</vwc-alert>
```

### Icon Slot

Set the `icon` slot to add an icon to the Alert. If set, the `icon` attribute (_deprecated_) is ignored.

```html preview 100px
<vwc-alert text="Some important information for you" open>
	<vwc-icon
		slot="icon"
		name="megaphone-solid"
		connotation="cta"
		label="Announcement:"
	></vwc-icon>
</vwc-alert>
```

## CSS Variables

### Minimum inline Size

Use the `--alert-min-inline-size` variable to set the Alert's minimum inline size. The default value is `420px`.

```html preview 100px
<vwc-alert
	style="--alert-min-inline-size: auto;"
	text="Very fitting!"
	open
></vwc-alert>
```

### Maximum inline Size

Use the `--alert-max-inline-size` variable to set the Alert's maximum inline size.
This is helpful to prevent the Alert from becoming too wide when displaying a long message.

The default value is `fit-content`, which allows the Alert to grow as needed.

```html preview 100px
<vwc-alert
	style="--alert-min-inline-size: auto; --alert-max-inline-size: 300px;"
	text="This text is very long and will wrap to the next line."
	open
></vwc-alert>
```

## API Reference

### Properties

| Name                                   | Type                                                                                              | Description                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **dismiss-button-aria-label**          | `string`                                                                                          | Allows setting a custom aria-label for the dismiss button.                      |
| **removable**                          | `boolean`                                                                                         | Adds a close button to the Alert.                                               |
| **placement**                          | _Enum_:<br/>`top`<br/>`top-start`<br/>`top-end`<br/>`bottom`<br/>`bottom-start`<br/>`bottom-end`  | The placement of the Alert on the screen.                                       |
| **headline**                           | `string`                                                                                          | Adds a headline to the Alert.                                                   |
| **text**                               | `string`                                                                                          | The main text of the Alert.                                                     |
| _(deprecated as of 05/25)_<br>**icon** | _Enum_:<br/>`[icon-name]`                                                                         | The icon to display in the Alert. Takes precedence over the connotation's icon. |
| **timeoutms**                          | `number`                                                                                          | Timeout after which the Alert will close.                                       |
| **connotation**                        | _Enum_:<br/>`accent`<br/>`information`<br/>`success`<br/>`warning`<br/>`announcement`<br/>`alert` | Sets an appropriate icon / icon color for the connotation.                      |
| **strategy**                           | _Enum_:<br/>`fixed`<br/>`static`                                                                  | Controls the `position` of the Alert.                                           |
| **open**                               | `boolean`                                                                                         | Open state of the Alert.                                                        |

### Slots

| Name             | Description                                |
| ---------------- | ------------------------------------------ |
| **main**         | The main content of the Alert.             |
| **action-items** | Add action items to Alert using this slot. |
| **icon**         | Add an icon to the component.              |

### Events

| Name      | Type                     | Bubbles | Composed | Description                    |
| --------- | ------------------------ | ------- | -------- | ------------------------------ |
| **open**  | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the Alert is opened |
| **close** | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the Alert is closed |
