## Card Text Content

### Headline

Add a `headline` attribute to add card headline title.

```html preview
<vwc-card headline="Vivid Card Component"></vwc-card>
```

### Subtitle

Add a `subtitle` attribute to add card subtitle.

```html preview
<vwc-card
	subtitle="Extra text below the card headline"
	headline="Vivid Card Component"
></vwc-card>
```

### Text

Add a `text` attribute to add text to the card.

```html preview
<vwc-card
	text="The card can contain multiple lines of text."
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
></vwc-card>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Card's headline.  
To add custom icons or to postfix icons, use the [graphic slot](/components/card/code/#slots).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview
<vwc-card
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
	icon="chat-line"
></vwc-card>
```

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
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The HTML specification does not allow one interactive element to be nested within another. Therefore, you should not use any links or buttons inside slots when using the `href` or `clickable-card` attributes.

</vwc-note>

## Appearance

The `appearance` attribute to change the card's appearance.

```html preview
<vwc-layout>
	<vwc-card
		appearance="elevated"
		headline="Elevated"
		subtitle="this is the card default appearance"
	></vwc-card>
	<vwc-card
		appearance="outlined"
		headline="Outlined"
		subtitle="this appearance set a border to the card same as elevation='0' "
	></vwc-card>
	<vwc-card
		appearance="ghost"
		headline="Ghost"
		subtitle="present the card template without background or shadow"
	></vwc-card>
</vwc-layout>
```

## Elevation

Control the elevation depth by adding the `elevation` attribute.  
The elevation is applied only with the default appearance (`appearance='elevated'`).

```html preview
<vwc-layout>
	<vwc-card
		elevation="2"
		headline="Elevation 2"
		class="card-elevated"
	></vwc-card>
	<vwc-card
		elevation="4"
		headline="Elevation 4 - default"
		class="card-elevated"
	></vwc-card>
	<vwc-card
		elevation="8"
		headline="Elevation 8"
		class="card-elevated"
	></vwc-card>
	<vwc-card
		elevation="12"
		headline="Elevation 12"
		class="card-elevated"
	></vwc-card>
	<vwc-card
		elevation="16"
		headline="Elevation 16"
		class="card-elevated"
	></vwc-card>
	<vwc-card
		elevation="24"
		headline="Elevation 24"
		class="card-elevated"
	></vwc-card>
</vwc-layout>

<style>
	.card-elevated {
		margin: 16px;
	}
</style>
```
