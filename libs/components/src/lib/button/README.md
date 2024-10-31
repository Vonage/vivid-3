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

### Properties

<div class="table-wrapper">

| Name                    | Type                                                                                      | Description                                                                                                                                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **icon**                | _Enum_:<br/>`[icon-name]`                                                                 | A decorative icon the custom element should have. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s                                                                                                                                                                              |
| **icon-trailing**       | `boolean`                                                                                 | Indicates the icon affix alignment.                                                                                                                                                                                                                                                                                     |
| **aria-current**        | _Enum_:<br/>`page`<br/>`step`<br/>`location`<br/>`date`<br/>`time`<br/>`true`<br/>`false` | Indicates the element that represents the current item within a container or set of related elements.                                                                                                                                                                                                                   |
| **disabled**            | `boolean`                                                                                 | Sets the element's disabled state. A disabled element will not be included during form submission.                                                                                                                                                                                                                      |
| **value**               | `string`                                                                                  | The initial value of the form. This value sets the `value` property only when the `value` property has not been explicitly set.                                                                                                                                                                                         |
| **current-value**       | `string`                                                                                  | The current value of the element. This property serves as a mechanism to set the `value` property through both property assignment and the .setAttribute() method. This is useful for setting the field's value in UI libraries that bind data through the .setAttribute() API and don't support IDL attribute binding. |
| **name**                | `string`                                                                                  | The name of the element. This element's value will be surfaced during form submission under the provided name.                                                                                                                                                                                                          |
| **required**            | `boolean`                                                                                 | Require the field to be completed prior to form submission.                                                                                                                                                                                                                                                             |
| **autofocus**           | `boolean`                                                                                 | Determines if the element should receive document focus on page load.                                                                                                                                                                                                                                                   |
| **form**                | `string`                                                                                  | The id of a form to associate the element to.                                                                                                                                                                                                                                                                           |
| **formaction**          | `string`                                                                                  | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formenctype**         | `string`                                                                                  | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formmethod**          | `string`                                                                                  | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formnovalidate**      | `boolean`                                                                                 | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **formtarget**          | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top`                                 | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button                                                                                                                                                                                                                                                    |
| **type**                | _Enum_:<br/>`submit`<br/>`reset`<br/>`button`                                             | The button type.                                                                                                                                                                                                                                                                                                        |
| **title**               | `string`                                                                                  |                                                                                                                                                                                                                                                                                                                         |
| **connotation**         | _Enum_:<br/>`accent`<br/>`cta`<br/>`success`<br/>`alert`                                  | The connotation the button should have.                                                                                                                                                                                                                                                                                 |
| **shape**               | _Enum_:<br/>`rounded`<br/>`pill`                                                          | The shape the button should have.                                                                                                                                                                                                                                                                                       |
| **appearance**          | _Enum_:<br/>`filled`<br/>`outlined`<br/>`ghost`                                           | The appearance the button should have.                                                                                                                                                                                                                                                                                  |
| **size**                | _Enum_:<br/>`super-condensed`<br/>`condensed`<br/>`normal`<br/>`expanded`                 | The size the button should have.                                                                                                                                                                                                                                                                                        |
| **stacked**             | `boolean`                                                                                 | Indicates the icon is stacked.                                                                                                                                                                                                                                                                                          |
| **pending**             | `boolean`                                                                                 | Displays the button in pending state.                                                                                                                                                                                                                                                                                   |
| **active**              | `boolean`                                                                                 | Displays the button in active state.                                                                                                                                                                                                                                                                                    |
| **dropdown-indication** | `boolean`                                                                                 | Display a chevron to indicate that the button opens a dropdown.                                                                                                                                                                                                                                                         |
| **label**               | `string`                                                                                  | Indicates the button's label.                                                                                                                                                                                                                                                                                           |
| **href**                | `string`                                                                                  | Indicates the button's href.                                                                                                                                                                                                                                                                                            |
| **download**            | `string`                                                                                  | Indicates the button's download.                                                                                                                                                                                                                                                                                        |
| **hreflang**            | `string`                                                                                  | Indicates the button's hreflang.                                                                                                                                                                                                                                                                                        |
| **ping**                | `string`                                                                                  | Indicates the button's ping.                                                                                                                                                                                                                                                                                            |
| **referrerpolicy**      | `string`                                                                                  | Indicates the button's referrerpolicy.                                                                                                                                                                                                                                                                                  |
| **rel**                 | `string`                                                                                  | Indicates the button's rel.                                                                                                                                                                                                                                                                                             |
| **target**              | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top`                                 | Indicates the target's rel.                                                                                                                                                                                                                                                                                             |

</div>

### Events

<div class="table-wrapper">

| Name        | Event Type      | Description                                                                                                                                                |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **click**   | `MouseEvent`    | Fires when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element. |
| **focus**   | `FocusEvent`    | Fires when the element receives focus.                                                                                                                     |
| **blur**    | `FocusEvent`    | Fires when the element loses focus.                                                                                                                        |
| **keydown** | `KeyboardEvent` | Fires when a key is pressed.                                                                                                                               |
| **keyup**   | `KeyboardEvent` | Fires when a key is released.                                                                                                                              |
| **input**   | `Event`         | Fires when the value of an element has been changed.                                                                                                       |

</div>

### Slots

<div class="table-wrapper">

| Name     | Description                   |
| -------- | ----------------------------- |
| **icon** | Add an icon to the component. |

</div>
