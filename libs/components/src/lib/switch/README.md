## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerSwitch } from '@vonage/vivid';

registerSwitch('your-prefix');
```

```html preview
<script type="module">
	import { registerSwitch } from '@vonage/vivid';
	registerSwitch('your-prefix');
</script>

<your-prefix-switch label="Email notifications"></your-prefix-switch>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSwitch } from '@vonage/vivid-vue';
</script>
<template>
	<VSwitch label="Email notifications" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Name and Value

Use the `name` and `value` attribute when including the Switch as part of a form.

```html preview
<vwc-layout column-basis="small">
	<form id="settings">
		<vwc-layout row-spacing="small" column-basis="block">
			<div>Marketing settings</div>
			<vwc-switch value="yes" name="email" label="Email notifications"></vwc-switch>
			<vwc-switch value="yes" name="text" label="Text messages"></vwc-switch>
			<vwc-switch value="yes" name="phone" label="Phone calls"></vwc-switch>
			<div>
				<vwc-button type="submit" label="Submit" appearance="filled" connotation="cta"></vwc-button>
			</div>
		</vwc-layout>
	</form>
	<div>Form Results:<br /><code id="results"></code></div>
</vwc-layout>

<script>
	const results = document.getElementById('results');
	document.getElementById('settings').addEventListener('submit', (e) => {
		e.preventDefault();
		const formData = new FormData(document.forms.settings);
		results.innerHTML = `
      email: ${formData.get('email')}<br />
      text: ${formData.get('text')}<br />
      phone: ${formData.get('phone')}
    `;
	});
</script>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                                           | Description                                                 |
| --------------- | -------------------------------------------------------------- | ----------------------------------------------------------- |
| **checked**     | `boolean`                                                      | Controls the checked state                                  |
| **connotation** | `primary` (default), `cta`, `announcement`, `success`, `alert` | Controls the color of the Switch                            |
| **disabled**    | `boolean`                                                      | Controls the disabled state                                 |
| **label**       | `string`                                                       | Provides the label for the Switch                           |
| **name**        | `string`                                                       | Provides a identifier when used inside of a form            |
| **readonly**    | `boolean`                                                      | Controls the read only state                                |
| **value**       | `string`                                                       | Provides a value to be submitted when used inside of a form |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                |
| ---------- | ------------------------ | ------- | -------- | ---------------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Emits a custom change event when the checked state changes |

</div>
