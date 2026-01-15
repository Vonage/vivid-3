## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Combobox.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox label="Search for something">
		<VOption text="First Option" />
		<VOption text="Second Option" />
	</VCombobox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-combobox label="Search for something">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` attribute provides additional information about the purpose of the Combobox.

To add HTML to the helper text, use the [helper-text slot](/components/combobox/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 320px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox helper-text="We use this information in to help inform our marketing strategy" label="Where did you hear about us?" placeholder="Select an option" class="marketing">
		<VOption value="friend" text="A friend" />
		<VOption value="net" text="Internet search" />
		<VOption value="online-ad" text="Online advert" />
		<VOption value="radio-ad" text="Radio advert" />
		<VOption value="other" text="Other" />
	</VCombobox>
</template>

<style scoped>
.marketing {
	min-inline-size: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 320px
<vwc-combobox helper-text="We use this information in to help inform our marketing strategy" label="Where did you hear about us?" placeholder="Select an option" class="marketing">
	<vwc-option value="friend" text="A friend"></vwc-option>
	<vwc-option value="net" text="Internet search"></vwc-option>
	<vwc-option value="online-ad" text="Online advert"></vwc-option>
	<vwc-option value="radio-ad" text="Radio advert"></vwc-option>
	<vwc-option value="other" text="Other"></vwc-option>
</vwc-combobox>

<style>
	.marketing {
		min-inline-size: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Placeholder Text

The `placeholder` attribute provides some text to be displayed when no option has been Combobox.

<vwc-note connotation="information" headline="Accessibility Tip">
  <vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	
    Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox placeholder="placeholder" label="Combobox with placeholder">
		<VOption text="First Option" />
		<VOption text="Second Option" />
	</VCombobox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-combobox placeholder="placeholder" label="Combobox with placeholder">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 320px
<script setup lang="ts">
import { VCombobox, VContextualHelp, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox label="What's your favorite club?" placeholder="Select an option" class="sport">
		<VOption value="friend" text="Ironclad Rovers FC" />
		<VOption value="net" text="Stormhaven United" />
		<VOption value="online-ad" text="Blackpeak Athletic" />
		<VOption value="radio-ad" text="Crimson Harbor FC" />
		<VOption value="other" text="Valewind Wanderers" />
		<template #contextual-help>
			<VContextualHelp>Choose your favorite club</VContextualHelp>
		</template>
	</VCombobox>
</template>

<style scoped>
.sport {
	min-inline-size: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 320px
<vwc-combobox label="What's your favorite club?" placeholder="Select an option" class="sport">
	<vwc-option value="friend" text="Ironclad Rovers FC"></vwc-option>
	<vwc-option value="net" text="Stormhaven United"></vwc-option>
	<vwc-option value="online-ad" text="Blackpeak Athletic"></vwc-option>
	<vwc-option value="radio-ad" text="Crimson Harbor FC"></vwc-option>
	<vwc-option value="other" text="Valewind Wanderers"></vwc-option>
	<vwc-contextual-help slot="contextual-help">Choose your favorite club</vwc-contextual-help>
</vwc-combobox>

<style>
	.sport {
		min-inline-size: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox success-text="Rome is the correct answer" placeholder="Select an option" label="What is the capital of Italy?" class="question">
		<VOption value="madrid" text="Madrid" />
		<VOption value="paris" text="Paris" />
		<VOption value="london" text="London" />
		<VOption value="rome" text="Rome" default-selected />
	</VCombobox>
</template>

<style scoped>
.question {
	min-inline-size: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-combobox success-text="Rome is the correct answer" placeholder="Select an option" label="What is the capital of Italy?" class="question">
	<vwc-option value="madrid" text="Madrid"></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome" selected></vwc-option>
</vwc-combobox>

<style>
	.question {
		min-inline-size: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox error-text="Madrid is incorrect" placeholder="Select an option" label="What is the capital of Italy?" class="question">
		<VOption value="madrid" text="Madrid" default-selected />
		<VOption value="paris" text="Paris" />
		<VOption value="london" text="London" />
		<VOption value="rome" text="Rome" />
	</VCombobox>
</template>

<style scoped>
.question {
	min-inline-size: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-combobox error-text="Madrid is incorrect" placeholder="Select an option" label="What is the capital of Italy?" class="question">
	<vwc-option value="madrid" text="Madrid" selected></vwc-option>
	<vwc-option value="paris" text="Paris"></vwc-option>
	<vwc-option value="london" text="London"></vwc-option>
	<vwc-option value="rome" text="Rome"></vwc-option>
</vwc-combobox>

<style>
	.question {
		min-inline-size: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the icon library](/icons/icons-gallery/).

The preferred way to add icons is to use the [icon slot](/components/banner/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { ref, computed } from 'vue';
import { VCombobox, VOption } from '@vonage/vivid-vue';

const countries = [
	{ value: '1', text: 'United States', label: '+1', icon: 'flag-united-states' },
	{ value: '44', text: 'United Kingdom', label: '+44', icon: 'flag-united-kingdom' },
	{ value: '49', text: 'Germany', label: '+49', icon: 'flag-germany' },
	{ value: '355', text: 'Albania', label: '+355', icon: 'flag-albania' },
];

const selectedCountry = ref('');

const selectedIcon = computed(() => {
	const country = countries.find((c) => c.text === selectedCountry.value);
	return country?.icon || 'search-line';
});
</script>

<template>
	<VCombobox v-model="selectedCountry" label="Country code" class="country-code" :icon="selectedIcon">
		<VOption v-for="country in countries" :key="country.value" :value="country.value" :text="country.text" :label="country.label" :icon="country.icon" />
	</VCombobox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<vwc-combobox label="Country code" class="country-code" id="country-code" icon="search-line">
	<vwc-option value="1" text="United States" label="+1" icon="flag-united-states"></vwc-option>
	<vwc-option value="44" text="United Kingdom" label="+44" icon="flag-united-kingdom"></vwc-option>
	<vwc-option value="49" text="Germany" label="+49" icon="flag-germany"></vwc-option>
	<vwc-option value="355" text="Albania" label="+355" icon="flag-albania"></vwc-option>
</vwc-combobox>

<script>
	const combobox = document.getElementById('country-code');
	combobox?.addEventListener('change', (e) => {
		combobox.icon = combobox.selectedOptions[0].icon;
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Scale

The `scale` attribute controls the combobox element display size.  
Use `condensed` in situations when space is limited, for example, inside a Data Grid cell.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VCombobox scale="normal" label="Normal" placeholder="Select an option">
			<VOption value="mr" text="Mr" />
			<VOption value="mrs" text="Mrs" />
			<VOption value="miss" text="Miss" />
			<VOption value="ms" text="Ms" />
		</VCombobox>

		<VCombobox scale="condensed" label="Condensed" placeholder="Select an option">
			<VOption value="mr" text="Mr" />
			<VOption value="mrs" text="Mrs" />
			<VOption value="miss" text="Miss" />
			<VOption value="ms" text="Ms" />
		</VCombobox>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<div class="container">
	<vwc-combobox scale="normal" label="Normal" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>

	<vwc-combobox scale="condensed" label="Condensed" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information" headline="Scale instead of Size">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>The reason for using <code>scale</code> for form elements and not <code>size</code> (as used in other components such as Button), is that <code>size</code> is a HTML attribute that can be used on <code>input</code> elements (and also Text Field) to control the width of the input.</p>
</vwc-note>

## Shape

The `shape` attribute controls the border radius of the Combobox input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 270px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VCombobox shape="rounded" label="Rounded" placeholder="Select an option">
			<VOption value="mr" text="Mr" />
			<VOption value="mrs" text="Mrs" />
			<VOption value="miss" text="Miss" />
			<VOption value="ms" text="Ms" />
		</VCombobox>

		<VCombobox shape="pill" label="Pill" placeholder="Select an option">
			<VOption value="mr" text="Mr" />
			<VOption value="mrs" text="Mrs" />
			<VOption value="miss" text="Miss" />
			<VOption value="ms" text="Ms" />
		</VCombobox>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 270px
<div class="container">
	<vwc-combobox shape="rounded" label="Rounded" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>

	<vwc-combobox shape="pill" label="Pill" placeholder="Select an option">
		<vwc-option value="mr" text="Mr"></vwc-option>
		<vwc-option value="mrs" text="Mrs"></vwc-option>
		<vwc-option value="miss" text="Miss"></vwc-option>
		<vwc-option value="ms" text="Ms"></vwc-option>
	</vwc-combobox>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

The `appearance` attribute controls the style of the Combobox element.<br />
Use `ghost` in combination with a containing element which provides a border, for example when used inside the [leading action items slot of Text Field](/components/text-field/code/#leading-action-items-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 200px
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox label="fieldset" appearance="fieldset" placeholder="appearance">
		<VOption text="First Option" />
		<VOption text="Second Option" />
	</VCombobox>
	<VCombobox label="ghost" appearance="ghost" placeholder="appearance">
		<VOption text="First Option" />
		<VOption text="Second Option" />
	</VCombobox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 200px
<vwc-combobox label="fieldset" appearance="fieldset" placeholder="appearance">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
<vwc-combobox label="ghost" appearance="ghost" placeholder="appearance">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

</vwc-tab-panel>
</vwc-tabs>

## Placement

Set the `placement` attribute to set the combobox's placement in accordance to its anchor.  
Placement options are: `top-start` , `top` , `top-end` , `bottom-start` (default) , `bottom` and `bottom-end`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<div class="combobox-wrapper">
		<VCombobox placement="top-start" aria-label="combobox with default placement of bottom-start">
			<VOption text="First Option" />
			<VOption text="Second Option" />
		</VCombobox>
	</div>
</template>

<style scoped>
.combobox-wrapper {
	block-size: 140px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: start;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="combobox-wrapper">
	<vwc-combobox placement="top-start" aria-label="combobox with default placement of bottom-start">
		<vwc-option text="First Option"></vwc-option>
		<vwc-option text="Second Option"></vwc-option>
	</vwc-combobox>
</div>

<style>
	.combobox-wrapper {
		block-size: 140px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: start;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the Combobox element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VCombobox disabled label="disabled combobox">
		<VOption text="First Option" />
		<VOption text="Second Option" />
	</VCombobox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-combobox disabled label="disabled combobox">
	<vwc-option text="First Option"></vwc-option>
	<vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

</vwc-tab-panel>
</vwc-tabs>
