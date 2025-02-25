## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/my-component';
```

or, if you need to use a unique prefix:

```js
import { registerMyComponent' } from '@vonage/vivid';

registerMyComponent('your-prefix');
```

```html preview
<script type="module">
	import { registerMyComponent } from '@vonage/vivid';
	registerMyComponent('your-prefix');
</script>

<your-prefix-my-component></your-prefix-my-component>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VMyComponent } from '@vonage/vivid-vue';
</script>

<template>
	<VMyComponent>My Component</<VMyComponent>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

## CSS Variables

## API Reference

### Properties

<div class="table-wrapper">

| Name              | Type      | Description             |
| ----------------- | --------- | ----------------------- |
| **property-name** | `boolean` | Description of property |

</div>

### Slots

<div class="table-wrapper">

| Name          | Description      |
| ------------- | ---------------- |
| **slot-name** | Slot description |

</div>

### Events

<div class="table-wrapper">

| Name           | Event Type   | Description           |
| -------------- | ------------ | --------------------- |
| **event-name** | `MouseEvent` | Description of event. |

</div>

### Methods

<div class="table-wrapper">

| Name            | Returns | Description           |
| --------------- | ------- | --------------------- |
| **method-name** | `void`  | Description of method |

</div>
