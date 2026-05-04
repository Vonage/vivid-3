## Use Cases

### Country List

Use `Flag` alongside text in lists (for example a country picker or shipping destination list).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<div style="display: grid; gap: 8px;">
		<div style="display: flex; gap: 8px; align-items: center;">
			<VFlag code="DE" label="Germany" />
			<span>Germany</span>
		</div>
		<div style="display: flex; gap: 8px; align-items: center;">
			<VFlag code="JP" label="Japan" />
			<span>Japan</span>
		</div>
		<div style="display: flex; gap: 8px; align-items: center;">
			<VFlag code="US" label="United States" />
			<span>United States</span>
		</div>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div style="display: grid; gap: 8px;">
	<div style="display: flex; gap: 8px; align-items: center;">
		<vwc-flag code="DE" label="Germany"></vwc-flag>
		<span>Germany</span>
	</div>
	<div style="display: flex; gap: 8px; align-items: center;">
		<vwc-flag code="JP" label="Japan"></vwc-flag>
		<span>Japan</span>
	</div>
	<div style="display: flex; gap: 8px; align-items: center;">
		<vwc-flag code="US" label="United States"></vwc-flag>
		<span>United States</span>
	</div>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

### Decorative Flags in Text

If the country name is already present as text, omit `label` so the flag remains decorative.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<p><VFlag code="DE" /> Germany</p>
	<p><VFlag code="JP" /> Japan</p>
	<p><VFlag code="US" /> United States</p>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p><vwc-flag code="DE"></vwc-flag> Germany</p>
<p><vwc-flag code="JP"></vwc-flag> Japan</p>
<p><vwc-flag code="US"></vwc-flag> United States</p>
```

</vwc-tab-panel>
</vwc-tabs>
