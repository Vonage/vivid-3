# Card

A card is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.

```js
<script type="module">
  import '@vonage/vivid/card';
</script>
```

## Members

### Headline

Add a `headline` attribute to add card headline title.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component"></vwc-card>
```

### Subtitle

Add a `subtitle` attribute to add card subtitle.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline"></vwc-card>
```

### Appearance

- Type: `elevated` | `outlined` | `ghost`
- Default: `elevated`

```html preview
<vwc-layout>
<vwc-card appearance="elevated" headline="Vivid Card - Appearance Elevated" subtitle="this is the default appearance"></vwc-card>
<vwc-card appearance="outlined" headline="Vivid Card - Appearance Outlined" subtitle="set a border to the card same as elevation='0' "></vwc-card>
<vwc-card appearance="ghost" headline="Vivid Card - Appearance Ghost" subtitle="present the card tepmlat without background or shadow"></vwc-card>
</vwc-layout>
```

### Elevation

Control the elevation depth by adding the `elevation` attribute.  
The elevation is applied only with the default appearance (`appearance='elevated'`).

- Type: `2` | `4` | `8` | `12` | `16` | `24`
- Default: `4`

```html preview
<vwc-card elevation="12" headline="Vivid Card Component" subtitle="Extra text below the card headline"></vwc-card>
```


### Icon

Add the `icon` attribute to add icon on the right of the card headline.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline" icon="chat-line"></vwc-card>
```

### Text

Add a `text` attribute to add text to the card.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline" text="The card can contain multiple lines of text."></vwc-card>
```

## Slots

### Graphic

The graphic slot overrides the icon property.

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline">
  <vwc-icon slot="graphic" name="android-mono" style="font-size: 44px; color: #A4C439" ></vwc-icon>
</vwc-card>
```

### Media

The media slot can be used to display images or video content above the card header.

```html preview
<vwc-card headline="Card with Media" subtitle="Extra text below the card headline" style="max-inline-size: 300px">
  <img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor"style="width: 100%; height: 150px; object-fit: cover;"/>
</vwc-card>
```

### Meta

The meta slot is for action content in the card header.

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline">
  <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
</vwc-card>
```

### Footer

The footer slot is for content in the card footer.

```html preview
<vwc-card headline="Vivid Card Component" subtitle="Extra text below the card headline">
  <vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
</vwc-card>
```

### Main

Card is battery charged with opinionated template.
Assign nodes to `main` slot to fully override a card's predefined template with your own.

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
<style>
  vwc-card {
    --headline-line-clamp: 1;
    max-inline-size: 42ch;
  }
</style>

<vwc-card
  headline="Vivid Card Component with long headline to trim"
>
</vwc-card>
```

### Trim subtitle

The card subtitle can be trimmed to your preferable number of lines.
The number of lines is controlled by css variable `--subtitle-line-clamp`.

```html preview
<style>
  vwc-card {
    --subtitle-line-clamp: 2;
    max-inline-size: 42ch;
  }
</style>

<vwc-card
  headline="Vivid Card Component"
  subtitle="This subtitle is extremely long and will be trimmed after 2 lines. This way you can control the size of the card."
>
</vwc-card>
```

## Use case
```html preview
<vwc-layout>
	<vwc-card headline="Cards in layout" subtitle="Subtitle" icon="chat-line" text="Here is the card's text.">
		<div slot="media" style="height: 150px; width: 100%; background-color: rebeccapurple;"></div>
		<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
		<vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
	</vwc-card>
	<vwc-card headline="Cards in layout" subtitle="Subtitle" icon="chat-line" text="Here is the card's text.">
		<div slot="media" style="height: 150px; width: 100%; background-color: rebeccapurple;"></div>
		<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
		<vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
	</vwc-card>
	<vwc-card headline="Cards in layout" subtitle="Subtitle" icon="chat-line" text="Here is the card's text.">
		<div slot="media" style="height: 150px; width: 100%; background-color: rebeccapurple;"></div>
		<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
		<vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
	</vwc-card>
</vwc-layout>
```
