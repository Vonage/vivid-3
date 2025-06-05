## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/badge';
```

or, if you need to use a unique prefix:

```js
import { registerBanner } from '@vonage/vivid';

registerBadge('your-prefix');
```

```html preview
<script type="module">
	import { registerBadge } from '@vonage/vivid';
	registerBadge('your-prefix');
</script>

<your-prefix-badge text="My Badge"></your-prefix-badge>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<VBadge connotation="success" text="My Badge" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

Use the `icon` slot to provide an icon.
If set, the `icon` attribute _(deprecated)_ will be ignored.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

For [informative icons](/components/icon/accessibility//#informative-vs-decorative-icons), provide an accessible label using the `label` attribute on the [Icon component](/components/icon/code/#label).

</vwc-note>

```html preview
<vwc-badge
	text="Accessibility testing"
	appearance="subtle-light"
	connotation="success"
	size="expanded"
>
	<vwc-icon
		label="Done:"
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
</vwc-badge>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                                   | Description                                                                                        | Description                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------- |
| **text**                               | `string`                                                                                           | Sets a text on the badge     |
| **connotation**                        | Enum\_:<br/>`accent` (default), `announcement`,`alert`, `cta`, `success`, `warning`, `information` | Sets the badge connotation   |
| _(deprecated as of 05/25)_<br>**icon** | Enum\_:<br/>`[icon-name]`                                                                          | Sets the element's icon      |
| **icon-trailing**                      | `string`                                                                                           | Sets icon as trailing        |
| **appearance**                         | Enum\_:<br/>`filled` (default), `duotone`, `subtle`, `subtle-light`                                | Sets the badge appearance    |
| **shape**                              | Enum\_:<br/>`rounded` (default), `pill`                                                            | Sets the badge border-radius |
| **size**                               | Enum\_:<br/>`normal` (default), `expanded`                                                         | Sets the badge size          |

</div>

### Slots

<div class="table-wrapper">

| Name     | Description                   |
| -------- | ----------------------------- |
| **Icon** | Add an icon to the component. |

</div>
