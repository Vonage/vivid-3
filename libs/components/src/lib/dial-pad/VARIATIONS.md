## Default Configuration

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad aria-label="Dial a telephone number" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad aria-label="Dial a telephone number"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## International Numbers

To support international numbers, you can use the pattern like `^\+?[0-9#*]*$` which allows an optional `+` at the beginning. Users can **long press** the `0` button or **long press the Space key** on the keyboard (when the input field is active) to insert a `+` symbol (commonly used for international numbers).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad pattern="^\+?[0-9#*]*$" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad pattern="^\+?[0-9#*]*$"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Labelling

### Helper Text

The `helper-text` attribute allows you give extra context to the number that is being displayed. The helper text is displayed under the phone number input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad helper-text="58 Meeting Room - Extension" value="1158" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad helper-text="58 Meeting Room - Extension" value="1158"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

### Call Button Label

Use the `call-button-label` attribute to change the call button label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad call-button-label="Dial" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad call-button-label="Dial"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

### End Call Button Label

Use the `end-call-button-label` attribute to change the end call button label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad end-call-button-label="End" call-active />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad end-call-button-label="End" call-active></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

### Placeholder

To give a hint to the user of what to enter in the input, use the `placeholder` attribute to set the text displayed in the input.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad placeholder="Enter number" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad placeholder="Enter number"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Call Active

The `call-active` attribute enables the "end call button" and hides the "dial button".

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad call-active value="01146869483" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad call-active value="01146869483"></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Pending

The `pending` attribute disables the call button and displays a processing indicator.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad pending />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad pending></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute controls the disabled state of the keypad, input and Call/End call buttons.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad disabled />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad disabled></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

## Removing Elements

### No Call

The `no-call` attribute removes call/end call functionality and hides the call/end call button.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad no-call />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad no-call></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>

### No Input

The `no-input` attribute removes the input field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDialPad } from '@vonage/vivid-vue';
</script>

<template>
	<VDialPad no-input />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-dial-pad no-input></vwc-dial-pad>
```

</vwc-tab-panel>
</vwc-tabs>
