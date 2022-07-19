# card

A “card” is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.

```js
<script type="module">
    import '@vonage/vivid/card';
</script>
```

## Members

### Headline

Add a `headline` attribute to add card headline title

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component"></vwc-card>
```

### Subtitle

Add a `subtitle` attribute to add card subtitle

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component" subtitle="extra text to the card headline"></vwc-card>
```

### Elevation

Control the elevation depth by adding the `elevation` attribute

- Type: `0` | `2` | `4` | `8` | `12` | `16` | `24`
- Default: `4`

```html preview
<vwc-card elevation="12" headline="Vivid Card Component" subtitle="extra text to the card headline" icon="chat-line" text="the card can contain multiple lines of text"></vwc-card>
```

### Icon

Add a `icon='icon-name'` attribute to add icon on the right of the card headline

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component" subtitle="extra text to the card headline" icon="chat-line"></vwc-card>
```

### Text

Add a `text` attribute to add text to the card

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card headline="Vivid Card Component" subtitle="extra text to the card headline" text="the card can contain multiple lines of text"></vwc-card>
```

## Slots

### Graphic

The graphic slot overide the icon property

```html preview
<vwc-card headline="Vivid Card Component" subtitle="extra text to the card headline">
  <vwc-icon slot="graphic" type="android-mono" style="font-size: 44px; color: var(--vvd-color-sucess)" ></vwc-icon>
</vwc-card>
```

### Media

The media slot is mainly for images or video content above the card header

```html preview
<vwc-card headline="Card with Media" text="here is the card text" style="max-inline-size: 300px">
  <img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor"style="width: 100%; height: 150px; object-fit: cover;"/>
</vwc-card>
```

### Meta

The meta slot is for action content in the card header

```html preview
<vwc-card headline="Vivid Card Component" subtitle="extra text to the card headline">
<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
</vwc-card>
```

### Footer

footer slot main purpose is for action button

```html preview
<vwc-card headline="All Options on Deck" subtitle="subtitle" icon="chat-line" text="here is the card text">
  <div slot="media" style="height: 150px; width: 100%; background-color: rebeccapurple;"></div>
  <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  <vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
</vwc-card>
```

### Main

Card is battery charged with opinionated template.  
Assign nodes to `main` slot to fully override a card's predefined flow and style with your own.

```html preview
<vwc-card>
  <vwc-layout gutters="small" slot="main">
    <vwc-text>
      assign custom template using "main" slot
    </vwc-text>
  </vwc-layout>
</vwc-card>
```

## CSS Custom Properties

### Trim headline & subtitle

The card headline and the subtitle can be trimmed to your preferable number of lines.
The number of lines are controlled by css variable:

- `--headline-line-clamp`
- `--subtitle-line-clamp`

- Type: `String`
- Default: `undefined`

```html preview
<style>
  vwc-card {
    --headline-line-clamp: 1;
    --subtitle-line-clamp: 2;

    max-inline-size: 42ch;
  }
</style>

<vwc-card
  headline="Vivid Card Component with long headline to trim"
  subtitle="extra text to the card headline that is set to be trimmed after 2 lines so the card will not be too long"
>
</vwc-card>
```
