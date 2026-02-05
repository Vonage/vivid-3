## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>


```js
import { VTag, VTagGroup } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VTag, VTagGroup } from '@vonage/vivid-vue';
</script>
<template>
	<VTagGroup>
		<VTag label="Tag one" />
		<VTag label="Tag two" />
	</VTagGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTag, registerTagGroup } from '@vonage/vivid';

registerTag('your-prefix');
registerTagGroup('your-prefix');
```

```html preview
<script type="module">
	import { registerTag, registerTagGroup } from '@vonage/vivid';
	registerTag('your-prefix');
	registerTagGroup('your-prefix');
</script>

<your-prefix-tag-group>
	<your-prefix-tag label="Tag one"></your-prefix-tag>
	<your-prefix-tag label="Tag two"></your-prefix-tag>
</your-prefix-tag-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

Use the `icon` slot in the **Tag** component to customise icons. If set, the `icon` attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon, VTag, VTagGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VTagGroup>
		<VTag label="With icon">
			<template #icon><VIcon name="heart-solid" connotation="alert" /></template>
		</VTag>
	</VTagGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tag-group>
	<vwc-tag label="With icon">
		<vwc-icon slot="icon" name="heart-solid" connotation="alert"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Tag

#### Properties

<div class="table-wrapper">

| Name                                   | Type                                                                                               | Description                                                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **appearance**                         | Enum\:<br/>`subtle` (default), `subtle-light`, `duotone`                                           | Sets the appearance                                                                                             |
| **connotation**                        | Enum\:<br/>`accent` (default), `announcement`, `alert`, `cta`, `success`, `warning`, `information` | Sets the connotation                                                                                            |
| **disabled**                           | `boolean`                                                                                          | Sets the disabled state                                                                                         |
| _(deprecated as of 05/25)_<br>**icon** | Enum: `[icon-name]`                                                                                | A decorative icon the custom element should have. See the Vivid Icon Gallery for available icons and icon-names |
| **label**                              | `string`                                                                                           | Sets the label text                                                                                             |
| **selectable**                         | `boolean`                                                                                          | Enables the selectable behaviour                                                                                |
| **selected**                           | `boolean`                                                                                          | Sets the selected state                                                                                         |
| **shape**                              | `rounded` (default), `pill`                                                                        | Sets the shape                                                                                                  |
| **removable**                          | `boolean`                                                                                          | Enables the removable behaviour                                                                                 |

</div>

#### Events

<div class="table-wrapper">

| Name                | Type          | Bubbles | Composed | Description                             |
| ------------------- | ------------- | ------- | -------- | --------------------------------------- |
| **selected-change** | `CustomEvent` | Yes     | Yes      | Fires when the `selected` state changes |
| **removed**         | `CustomEvent` | Yes     | Yes      | Fires when a tag is removed             |

</div>

#### Methods

<div class="table-wrapper">

| Name       | Returns | Description                                                                                                                                                                                                              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **remove** | `void`  | Removes the tag from the DOM. Fires the `removed` event and removes the tag from the DOM completely. If you have a variable that refers to the tag element make sure to clear it otherwise it might cause a memory leak. |

</div>

### Tag Group

#### Properties

<div class="table-wrapper">

| Name           | Type     | Description               |
| -------------- | -------- | ------------------------- |
| **aria-label** | `string` | Sets the accessible label |

</div>

#### Slots

<div class="table-wrapper">

| Name        | Description                        |
| ----------- | ---------------------------------- |
| **default** | For a collection of Tag components |

</div>
