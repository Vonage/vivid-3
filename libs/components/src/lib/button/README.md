## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/button';
```

or, if you need to use a unique prefix:

```js
import { registerButton } from '@vonage/vivid';

registerButton('your-prefix');
```

```html preview
<script type="module">
	import { registerButton } from '@vonage/vivid';
	registerButton('your-prefix');
</script>

<your-prefix-button label="My Button"></your-prefix-button>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VButton appearance="filled" label="Click me" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Link Buttons

Use the `href` attribute to change the button to a link.
When doing so, all of the native attributes of [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) are supported, including `target`.

<vwc-note connotation="warning" icon="warning-line" headline="Use link buttons with caution">
Semantically, buttons are usually used for triggering actions, while links are used for navigation. Mixing these semantics might lead to confusion or unexpected behavior for users.
</vwc-note>

```html preview
<vwc-button
	label="Button as a link"
	href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
	target="_blank"
	icon="chevron-right-line"
	icon-trailing
	appearance="filled"
	connotation="cta"
></vwc-button>
```

<vwc-note icon="vue-color" connotation="information" headline="Usage With Vue Router">

See [Client-Side Navigation](/getting-started/vue/#client-side-navigation) for more information on how to integrate with Vue Router.

</vwc-note>

## Slots

### Icon Slot

Use the `icon` slot to customise icons. If set, the icon attribute is ignored.

```html preview
<vwc-button aria-label="Mute" appearance="outlined">
	<vwc-icon slot="icon">
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g>
				<path
					d="M5.5 9.6C5.5 13.1344 8.41037 16 12 16C15.5896 16 18.5 13.1344 18.5 9.6V6.4C18.5 2.8656 15.5896 0 12 0C8.41037 0 5.5 2.8656 5.5 6.4V9.6Z"
					fill="var(--vvd-color-success-400)"
				/>
				<path
					d="M5.5 9.6C5.5 13.1344 8.41037 16 12 16C15.5896 16 18.5 13.1344 18.5 9.6V6.4C18.5 2.8656 15.5896 0 12 0C8.41037 0 5.5 2.8656 5.5 6.4V9.6Z"
					fill="currentColor"
					id="animation"
					class="color-animation"
				/>
				<path
					d="M3 10.3333C3 9.59695 2.32843 9 1.5 9C0.671573 9 0 9.59695 0 10.3333C0 15.7728 4.58052 20.2613 10.5 20.9175V24H13.5V20.9175C19.4195 20.2613 24 15.7728 24 10.3333C24 9.59695 23.3284 9 22.5 9C21.6716 9 21 9.59695 21 10.3333C21 14.7516 16.9706 18.3333 12 18.3333C7.02943 18.3333 3 14.7516 3 10.3333Z"
					fill="currentColor"
				/>
			</g>
		</svg>
	</vwc-icon>
</vwc-button>

<style>
	.color-animation {
		animation: heightChange 1.5s infinite;
	}
	@keyframes heightChange {
		0% {
			clip-path: inset(0% 0% 0% 0%);
		}
		25% {
			clip-path: inset(0% 0% 45% 0%);
		}
		50% {
			clip-path: inset(0% 0% 80% 0%);
		}
		100% {
			clip-path: inset(0% 0% 0% 0%);
		}
	}
</style>
```

## CSS Variables

### Button Content Alignment

When `dropdown-indicator` is set button, the content alignment is set to start.  
If center is needed, set `--button-content-alignment: center;`.

```html preview
<vwc-button
	class="button"
	dropdown-indicator
	appearance="outlined-light"
	label="Aligned to start content"
></vwc-button>
<vwc-button
	class="button button-center"
	dropdown-indicator
	appearance="outlined-light"
	label="Centered content"
></vwc-button>

<style>
	.button {
		inline-size: 300px;
	}
	.button-center {
		--button-content-alignment: center;
	}
</style>
```

## API Reference

{% apiReference "button" %}
