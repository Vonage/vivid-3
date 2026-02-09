## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Text Area.

<vwc-note connotation="information" headline="Accessibility Tip">
<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Your comments" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area label="Your comments"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/text-area/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea helper-text="Help text" label="Helper text below" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area helper-text="Help text" label="Helper text below"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

### Placeholder Text

The `placeholder` attribute provides an example of the type of input the user needs to enter.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea placeholder="My Placeholder" label="Text Area with placeholder" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area placeholder="My Placeholder" label="Text Area with placeholder"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

### Character Count

The `char-count` attribute can be use in combination with the `maxlength` attribute to provide a visual character count.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Char count example" char-count :maxlength="15" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area label="Char count example" char-count maxlength="15"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Your comments">
		<template #contextual-help>
			<VContextualHelp>This is the contextual help</VContextualHelp>
		</template>
	</VTextArea>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area label="Your comments">
	<vwc-contextual-help slot="contextual-help">This is the contextual help</vwc-contextual-help>
</vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

The `value` attribute can be used the set the default value for the Text Area input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea value="Default Value" label="text-area value" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area value="Default Value" label="text-area value"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea value="some text" label="Enter some text" error-text="Please take this seriously" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area value="some text" label="Enter some text" error-text="Please take this seriously"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Success text below" success-text="Success text" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area label="Success text below" success-text="Success text"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

## Rows

Use the `rows` attribute to set the number of visible rows of text in the Text Area.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-solid"></vwc-icon>
	Each addition line added 20px - the font size + line height.
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea :rows="1" value="1 row text area (36px)" label="text-area label" />
	<VTextArea :rows="2" value="2 rows text area are the default (56px)" label="text-area label" />
	<VTextArea :rows="3" value="3 rows text area (76px)" label="text-area label" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area rows="1" value="1 row text area (36px)" label="text-area label"></vwc-text-area>
<vwc-text-area rows="2" value="2 rows text area are the default (56px)" label="text-area label"></vwc-text-area>
<vwc-text-area rows="3" value="3 rows text area (76px)" label="text-area label"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the Text Area input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea disabled value="disabled" label="fieldset" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area disabled value="disabled" label="fieldset"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>

## Read Only

The `readonly` attribute prevents the user from changing the Text Area value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea readonly value="readonly text" label="fieldset" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-text-area readonly value="readonly text" label="fieldset"></vwc-text-area>
```

</vwc-tab-panel>
</vwc-tabs>
