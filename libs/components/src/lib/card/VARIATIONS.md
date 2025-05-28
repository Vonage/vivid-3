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

```html preview
<vwc-card
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
>
	<vwc-icon slot="icon" name="chat-line"></vwc-icon>
</vwc-card>
```

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

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
