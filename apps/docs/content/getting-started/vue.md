---
title: Vue
order: 2
---

# Getting Started With Vue

Vivid comes with a library of native Vue components that wrap the Vivid web components, called **Vivid Vue**.

While web components can also be used with Vue directly, Vivid Vue provides a seamless integration with Vue and reduces the amount of boilerplate required.

## Features

### Native Bindings

Vivid Vue components can be imported and used like any other Vue component, including features like `v-model` and slots.

It comes with full type definitions providing type safety and auto-complete in your IDE.

### Complete and Up-To-Date

Vivid Vue is generated from the Vivid web components automatically, so it is always up-to-date with the latest version of Vivid.

The version number is kept in sync with Vivid.

### Supports Vue 2 & Vue 3

There is no additional setup required, just install the library, and you are ready to go!

## Installation

Add the NPM package to your repository:

{% packageInstallation "@vonage/vivid-vue" %}

## Setup

<vwc-tabs gutters="none">
<vwc-tab label="Vue 3"></vwc-tab>
<vwc-tab-panel>

Use the `vividVue` plugin to initialize the library.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>

    The import name `vivid3` has been deprecated. While it is still available for now, it will be removed in a future release.
    Please update your imports to use the new name: <code>vividVue</code>.

    Make sure to update all relevant imports in your codebase.

</vwc-note>

```ts
// main.ts
import { createApp } from 'vue';
import { vividVue } from '@vonage/vivid-vue';
import App from './App.vue';

createApp(App)
	.use(vividVue, {
		font: 'spezia',
		customComponentPrefix: 'my-app',
	})
	.mount('#app');
```

The plugin accepts the following options:

<div class="table-wrapper">

| Option                | Type                          | Default   | Description                                                                                                                                                                                                                                   |
| --------------------- | ----------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokens                | `'light \| 'dark' \| 'none'`  | `'light'` | The theme of tokens to use.                                                                                                                                                                                                                   |
| font                  | `'oss' \| 'spezia' \| 'none'` | `'oss'`   | Use `'spezia'` to load the Vonage-specific Spezia font.                                                                                                                                                                                       |
| customComponentPrefix | `string`                      | `'vvd3'`  | The prefix to use for custom components. It is recommended to set a prefix unique to your app to prevent conflicts if multiple instances or versions of Vivid are used in the same page. [Learn more about custom prefixes.](/guides/prefix/) |
| styles                | `Style[]`                     | `[]`      | An array of optional styles to use.                                                                                                                                                                                                           |
| addRootClassTo        | `'root' \| 'app' \| 'none'`   | `'root'`  | Where to apply the `vvd-root` class to.<br/> - `root`: The `<html>` element<br/> - `app`: The `App` component                                                                                                                                 |

</div>

#### Loading Optional Styles

To load optional styles, pass them to the `styles` option.

See the [list of styles that come with Vivid](/guides/styles/) for more information.

```ts
// main.ts
import { createApp } from 'vue';
import { optionalStyles, vividVue } from '@vonage/vivid-vue';
import App from './App.vue';

createApp(App)
	.use(vividVue, {
		styles: [
			optionalStyles.theme,
			optionalStyles.typography,
			optionalStyles.vivid2Compat,
		],
	})
	.mount('#app');
```

</vwc-tab-panel>
<vwc-tab label="Vue 2"></vwc-tab>
<vwc-tab-panel>

#### Adding the vvd-root Class

The Vivid tokens require a `vvd-root` class to be present. It is recommended to add it on the `<html>` element, but it can also be added to your App component to scope it to the application.

<vwc-tabs gutters="none">
<vwc-tab label="Global"></vwc-tab>
<vwc-tab-panel>

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en" class="vvd-root">
	<!-- ... -->
</html>
```

</vwc-tab-panel>
<vwc-tab label="App Scoped"></vwc-tab>
<vwc-tab-panel>

```html
<!-- App.vue -->
<template>
	<div class="vvd-root">
		<RouterView />
	</div>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

#### Importing the Styles

Modify your `App.vue` file to import the Vivid styles.

See the [list of styles that come with Vivid](/guides/styles/) for more information.

<vwc-tabs gutters="none">
<vwc-tab label="CSS"></vwc-tab>
<vwc-tab-panel>

```html
<!-- App.vue -->
<template>
	<RouterView />
</template>

<style>
	/* Import Tokens For Light or Dark Theme */
	@import '@vonage/vivid/styles/tokens/theme-light.css';
	/* (Vonage only) Load Spezia Variable fonts */
	@import '@vonage/vivid/styles/fonts/spezia-variable.css';
	/* (Optional) Import Theme Styles */
	@import '@vonage/vivid/styles/core/theme.css';
	/* (Optional) Import Typography Styles */
	@import '@vonage/vivid/styles/core/typography.css';
	/* (Optional) Import Vivid 2 Compatibility Styles */
	@import '@vonage/vivid/styles/tokens/vivid-2-compat.css';
</style>
```

</vwc-tab-panel>
<vwc-tab label="SCSS"></vwc-tab>
<vwc-tab-panel>

```html
<!-- App.vue -->
<template>
	<RouterView />
</template>

<style lang="scss">
	/* Import Tokens For Light or Dark Theme */
	@forward '@vonage/vivid/styles/tokens/theme-light.css';
	/* (Vonage only) Load Spezia Variable fonts */
	@forward '@vonage/vivid/styles/fonts/spezia-variable.css';
	/* (Optional) Import Theme Styles */
	@forward '@vonage/vivid/styles/core/theme.css';
	/* (Optional) Import Typography Styles */
	@forward '@vonage/vivid/styles/core/typography.css';
	/* (Optional) Import Vivid 2 Compatibility Styles */
	@forward '@vonage/vivid/styles/tokens/vivid-2-compat.css';
</style>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-action-group style="inline-size: 100%">
<vwc-accordion expand-mode="multi" style="inline-size: 100%">
<vwc-accordion-item heading="Not a Vonage Project?" expanded="false">

Vonage uses the brand-specific Spezia font.

If you are not working on a Vonage project, you should use the Montserrat and Roboto Mono fonts.

Add the following to your `<head>` to load them from Google Fonts:

```html
<head>
	<!-- ... -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
	<!-- ... -->
</head>
```

</vwc-accordion-item>
</vwc-accordion>
</vwc-action-group>

#### Setting Custom Component Prefix (optional)

It is recommended to set a [custom component prefix](/guides/prefix/) unique to your app. This will prevent conflicts if multiple instances or versions of Vivid are used in the same page.

To set a custom component prefix, use the `setCustomComponentPrefix` function in your `main.ts` file.

```ts
// main.ts
import Vue from 'vue';
import { setCustomComponentPrefix } from '@vonage/vivid-vue';
import App from './App.vue';

// set custom component prefix for the whole application (e.g. fraud-detection, etc.)
setCustomComponentPrefix('my-app');

new Vue({
	el: '#app',
	components: { App },
	template: '<App/>',
});
```

</vwc-tab-panel>
</vwc-tabs>

#### Installing the ESLint Plugin (optional)

You should also install our [ESLint Plugin](/guides/eslint-plugin/), which can catch common issues and mistakes when using Vivid Vue.

## Usage

You are now ready to use the components in your application.

```html
<script setup lang="ts">
	import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<VButton label="Click me" />
</template>
```

### Using v-model

The `v-model` syntax allows us to implement a two-way binding in between a variable and the matching component.

This is an example of a two-way binding implementation for a web component:

```html
<vwc-text-field
	label="Search"
	:value="searchText"
	@input="searchText = $event.currentTarget.value"
/>
```

This works fine, but with Vivid Vue we can use the `v-model` syntax to shorten this to:

```html
<VTextField label="Search" v-model="searchText" />
```

### Default Slots

The `default` slot maps to the same syntax in both Vivid Vue & web components.

**Web component**

```html
<vwc-icon size="3">
	<img src="/custom-logo.svg" />
</vwc-icon>
```

**Vivid Vue**

```html
<VIcon size="3">
	<img src="/custom-logo.svg" />
</VIcon>
```

### Named Slots

While the default slots work the same, the web component's named slots are mapped to Vue named slots.

**Web component**

```html
<vwc-banner text="A banner with an action button">
	<vwc-button
		slot="action-items"
		appearance="filled"
		connotation="accent"
		label="Filled"
	/>
	<vwc-button
		slot="action-items"
		appearance="outlined"
		connotation="accent"
		label="Outlined"
	/>
</vwc-banner>
```

**Vivid Vue**

```html
<VBanner text="A banner with an action button">
	<template #action-items>
		<VButton appearance="filled" connotation="accent" label="Filled" />
		<VButton appearance="outlined" connotation="accent" label="Outlined" />
	</template>
</VBanner>
```

#### Text Nodes in Named Slots

Vivid Vue will automatically wrap text nodes in the necessary `<span>` element when using named slots.

**Web component**

```html
<vwc-banner text="A banner with text content">
	<span slot="action-items">Text content</span>
</vwc-banner>
```

**Vivid Vue**

```html
<VBanner text="A banner with text content">
	<template #action-items>Text content</template>
</VBanner>
```

### Forwarding Slots

You can forward slots from your component to the Vivid component:

```html
<VAccordionItem>
	<slot></slot>
	<template #icon><slot name="icon"></slot></template>
</VAccordionItem>
```

### Using Events

When using event listeners, `$event` will refer to native event with improved type definitions.

To access the web component itself, use `$event.currentTarget`. Avoid using `target` instead of `currentTarget` as it may not always refer to the component itself.

```html
<template>
	<VPagination @pagination-change="onPageChange($event.detail.selectedIndex)" />
	<VTag @selected-change="onSelectedChange($event.currentTarget.selected)" />
</template>
```

You can also get the type of each event from `VEvents`.

```html
<script setup lang="ts">
	import { VPagination, type VEvents } from '@vonage/vivid-vue';

	const onPageChange = (event: VEvents['VPagination']['pagination-change']) => {
		console.log('Selected index:', event.detail.selectedIndex);
	};
</script>
<template>
	<VPagination @pagination-change="onPageChange" />
</template>
```

### Accessing the Component Instance

You can get a reference to the Vivid Vue component instance the same way as any other Vue component.

<vwc-tabs>
<vwc-tab label="useTemplateRef() [Vue 3.5+]"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { useTemplateRef } from 'vue';
	import { VAudioPlayer } from '@vonage/vivid-vue';
	const audioPlayer = useTemplateRef('audio-player');
</script>

<template>
	<VAudioPlayer ref="audio-player" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="ref()"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { ref } from 'vue';
	import { VAudioPlayer } from '@vonage/vivid-vue';
	const audioPlayer = ref<InstanceType<typeof VAudioPlayer>>();
</script>

<template>
	<VAudioPlayer ref="audioPlayer" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

#### Calling Methods

The component instance will forward all methods to the web component:

```ts
audioPlayer.value?.play();
```

#### Accessing the Web Component

The web component element itself is available as `element` on the instance.

Note: While the built-in `$el` can also be used to access the web component, `element` will have the appropriate type.

```ts
if (audioPlayer.value?.element?.paused) {
	// ...
}
```

You can also import the type of the web component itself from the `@vonage/vivid` library:

```ts
import type { VwcAudioPlayerElement } from '@vonage/vivid';

function play(element: VwcAudioPlayerElement) {
	element.play();
}
```

### Styling Components

Components can be styled like any other Vue components, e.g. by using `class` or `id` attributes.

Although possible, avoid targeting the custom elements directly by their name (e.g. `vwc-header`), as you might need to change the prefix in the future.

```html
<template>
	<VHeader class="header">Header Content</VHeader>
</template>
<style scoped lang="css">
	.header {
		margin-block-end: 12px;
		--header-bg-color: var(--vvd-color-neutral-200);
	}
	.header::part(base) {
		position: fixed;
	}
</style>
```

### Client-Side Navigation

Components like `VNavItem`, `VBreadcrumbItem` or `VButton` become links when using the `href` prop.

They will render a regular `<a>` tag and therefore navigate to the specified URL with a full page reload.

If you are using Vue Router and want to perform client-side navigation, wrap the component with `RouterLink`:

```html
<RouterLink v-slot="{ href, navigate }" to="/page" custom>
	<VButton :href="href" label="Page" @click="navigate" />
</RouterLink>
```

### Types

Vivid Vue comes with full type definitions. If you are using VSCode, make sure to install the [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension to get the best experience in your IDE.

Additionally, the `VProps`, `VEvents` and `VSlots` types allow you to access the typings for each component.

For example, to get the type of the `appearance` prop of the `VButton` component:

```ts
import type { VProps } from '@vonage/vivid-vue';

defineProps<{
	buttonAppearance: VProps['VButton']['appearance'];
}>();
```

You can use this to create a component that forwards all props, events and slots to a Vivid component while maintaining type safety (requires Vue 3.3+).

```html
<script setup lang="ts">
	import { VTextField, type VProps, type VSlots } from '@vonage/vivid-vue';

	const props = withDefaults(defineProps<VProps['VTextField']>(), {
		label: 'Default label',
		shape: 'pill',
	});
	const slots = defineSlots<VSlots['VTextField']>();
</script>
<template>
	<VTextField v-bind="props">
		<template v-for="(_, name) in slots" v-slot:[name]>
			<slot :name="name" />
		</template>
	</VTextField>
</template>
```

## Examples

You can find examples for each component in the [Vivid Vue Examples Library](/vivid-vue/components/).
