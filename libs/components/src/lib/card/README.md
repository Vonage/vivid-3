## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/card';
```

or, if you need to use a unique prefix:

```js
import { registerCard } from '@vonage/vivid';

registerCard('your-prefix');
```

```html preview
<script type="module">
	import { registerCard } from '@vonage/vivid';
	registerCard('your-prefix');
</script>

<your-prefix-card headline="I'm a card"></your-prefix-text-card>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VCard } from '@vonage/vivid-vue';
</script>

<template>
	<VCard headline="I'm a card" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Clickable Cards

Card component supports two **clickable** modes:

### Card as a Link

Use the `href` attribute to change the card wrapper to a link. When doing so, all of the native attributes of [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) are supported, including `target`.

```html preview
<vwc-card
	headline="Vivid Card as a Link"
	subtitle="Clicking on this card will navigate you to the documentation homepage"
	href="https://vivid.deno.dev"
	target="_blank"
>
</vwc-card>
```

<vwc-note connotation="information" headline="Usage With Vue Router">
	<vwc-icon slot="icon" name="vue-color"></vwc-icon>

See [Client-Side Navigation](/getting-started/vue/#client-side-navigation) for more information on how to integrate with Vue Router.

</vwc-note>

### Card as a Button

Setting the `clickable-card` attribute switches the card wrapper to a `<button>`, allowing you to trigger programmatic actions e.g. using the `click` event.

```html preview
<vwc-card
	headline="Vivid Card as a Button"
	subtitle="Clicking on this card will trigger displaying its headline as an alert"
	type="button"
	clickable-card
	onclick="onClick(event)"
>
</vwc-card>

<script>
	function onClick(event) {
		const headline = event.currentTarget.headline;
		alert(headline);
	}
</script>
```

<vwc-note connotation="warning" headline="Do not nest any interactive elements within clickable cards">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>
The HTML specification does not allow one interactive element to be nested within another. Therefore, you should not use any links or buttons inside slots when using the `href` or `clickable-card` attributes.
</vwc-note>

## Slots

### Graphic Slot

The graphic slot overrides the icon property.  
Use the slot if a colored icon is needed or an icon with different dimensions.

```html preview
<vwc-card
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
>
	<vwc-icon
		slot="graphic"
		name="android-mono"
		style="font-size: 44px; color: #A4C439"
	></vwc-icon>
</vwc-card>
```

### Media Slot

The media slot can be used to display images or video content above the card header.

```html preview
<vwc-card
	headline="Card with Media Slot"
	subtitle="Extra text below the card headline"
	class="card-media"
>
	<img
		slot="media"
		src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
		alt="Sitting on Floor"
		style="width: 100%; height: 150px; object-fit: cover;"
	/>
</vwc-card>

<style>
	.card-media {
		max-inline-size: 300px;
	}
</style>
```

### Meta Slot

The meta slot is for action content in the card header.

```html preview 220px
<vwc-card
	headline="Card with Meta Slot"
	subtitle="Extra text below the card headline"
>
	<div slot="meta">
		<vwc-menu aria-label="Card options" placement="bottom-start" trigger="auto">
			<vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
				<vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
			</vwc-button>
			<vwc-menu-item text="save card"></vwc-menu-item>
			<vwc-menu-item text="remove card"></vwc-menu-item>
		</vwc-menu>
	</div>
</vwc-card>
```

### Footer Slot

The footer slot is for content in the card footer.  
Use it for adding buttons or action items.  
By default - items inside footer slot are aligned to the end.

```html preview
<vwc-card
	headline="Card with Footer Slot"
	subtitle="Extra text below the card headline"
>
	<vwc-button slot="footer" shape="pill" label="Action" appearance="outlined">
		<vwc-icon slot="icon" name="arrow-bold-right-line"></vwc-icon>
	</vwc-button>
</vwc-card>
```

### Main Slot

Card has predefined content style template.  
Use the `main` slot to fully override a card's predefined template with your own. When using main - only appearance and elevation are applied on the card.

```html preview
<vwc-card>
	<vwc-layout gutters="small" slot="main">
		Assign custom template using "main" slot.
	</vwc-layout>
</vwc-card>
```

## CSS Variables

### Trim headline

The card headline can be trimmed to your preferable number of lines.
The number of lines is controlled by the css variable `--headline-line-clamp`.

```html preview
<vwc-card
	class="vwc-card"
	headline="Card with long headline that has trim into one line"
></vwc-card>

<style>
	.vwc-card {
		--headline-line-clamp: 1;
		max-inline-size: 42ch;
	}
</style>
```

### Trim subtitle

The card subtitle can be trimmed to your preferable number of lines.
The number of lines is controlled by css variable `--subtitle-line-clamp`.

```html preview
<vwc-card
	class="vwc-card"
	headline="Card with Trimmed Subtitle"
	subtitle="This subtitle is extremely long and will be trimmed after 2 lines. This way you can control the size of the card."
></vwc-card>

<style>
	.vwc-card {
		--subtitle-line-clamp: 2;
		max-inline-size: 42ch;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name               | Type                                                      | Description                                          |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------- |
| **appearance**     | `elevated` (default), `outlined`, `ghost`                 | Sets the element's appearance.                       |
| **elevation**      | `2`, `4` (default), `8`, `12`, `16`, `24`                 | Sets the element's elevation.                        |
| **headline**       | `string`                                                  | Sets the element's headline.                         |
| **icon**           | `string`                                                  | Sets the element's icon.                             |
| **subtitle**       | `string`                                                  | Sets the element's subtitle.                         |
| **text**           | `string`                                                  | Sets the element's text.                             |
| **clickable-card** | `boolean`                                                 | Indicates whether card should be a `<button>`.       |
| **href**           | `string`                                                  | Sets the element's href, changes card tag to `<a>` . |
| **download**       | `string`                                                  | Sets the element's download.                         |
| **hreflang**       | `string`                                                  | Sets the element's hreflang.                         |
| **ping**           | `string`                                                  | Sets the element's ping.                             |
| **referrerpolicy** | `string`                                                  | Sets the element's referrerpolicy.                   |
| **rel**            | `string`                                                  | Sets the element's rel.                              |
| **target**         | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top` | Sets the target's rel.                               |

</div>

### Events

The following events are available when the `clickable-card` attribute is set:

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

| Name        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| **Graphic** | Add graphic element to card. Overrides the icon property     |
| **Media**   | Use to display images or video content above the card header |
| **Meta**    | Use for adding action content, of info in the card header    |
| **Footer**  | Content in the card footer.                                  |
| **Main**    | Override a card's predefined template                        |

</div>
