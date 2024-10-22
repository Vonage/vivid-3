## Card Texts

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

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Text Field's input element.
To add custom icons or to postfix icons, use the [graphic slot] (/components/card/code/#slots).

```html preview
<vwc-card
	icon="chat-line"
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
></vwc-card>
```

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
Card elevation default is `4`.  
Other elevation values: `2` | `4` | `8` | `12` | `16` | `24`. 

```html preview
<vwc-card
	elevation="12"
	headline="Vivid Card Component"
	subtitle="Extra text below the card headline"
></vwc-card>
```

