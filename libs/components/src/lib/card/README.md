# card

A “card” is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.

```js
<script type="module">
    import '@vonage/vivid/card';
</script>
```

## Properties

### Heading

Add a `heading` attribute to add card heading title

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card heading="Vivid Card Component"></vwc-card>
```

### Subheading

Add a `subheading` attribute to add card subheading

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading"></vwc-card>
```

### Elevation

Control the elevation depth by adding the `elevation` attribute

- Type: `0` | `2` | `4` | `8` | `12` | `16` | `24`
- Default: `4`

```html preview
<vwc-card elevation="12" heading="Vivid Card Component" subheading="extra text to the card heading" icon="chat-line" text="the card can contain multiple lines of text"></vwc-card>
```

### Icon

Add a `icon='icon-name'` attribute to add icon on the right of the card heading

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading" icon="chat-line"></vwc-card>
```

### Text

Add a `text` attribute to add text to the card

- Type: `String`
- Default: `undefined`

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading" text="the card can contain multiple lines of text"></vwc-card>
```

## Slots

### Graphic

The graphic slot overide the icon property

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading">
  <vwc-icon slot="graphic" type="android-mono" style="font-size: 44px; color: var(--vvd-color-sucess)" ></vwc-icon>
</vwc-card>
```

### Media

The media slot is mainly for images or video content above the card header

```html preview
<vwc-card heading="Card with Media" text="here is the card text">
  <img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor"style="width: 100%; height: 150px; object-fit: cover;"/>
</vwc-card>
</div>
```

### Meta

The meta slot is for action content in the card header

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading">
<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
</vwc-card>
```

### Footer

footer slot main purpose is for action button

```html preview
<vwc-card heading="All Options on Deck" subheading="subheading" icon="chat-line" text="here is the card text">
  <div style="height: 150px; width: 100%; background-color: rebeccapurple;" slot="media"></div>
  <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  <vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
</vwc-card>
```

### Default

default slot is for overriding the content structure of the whole card.

```html preview
<vwc-card >
  <vwc-layout>
    <vwc-text>
      If you need different structure - use this slot
    </vwc-text>
  </vwc-layout>
</vwc-card>
```

## CSS Custom Properties

### Trim Heading & subheading

The card heading and the subheading can be trimmed to your preferable number of lines.
The number of lines are controlled by css variable:

- `--heading-line-clamp`
- `--subheading-line-clamp`

- Type: `String`
- Default: `undefined`

```html preview
<style>
  vwc-card {
    --heading-line-clamp: 1;
    --subheading-line-clamp: 2;

    display: block;
    max-inline-size: 42ch;
  }
</style>

<vwc-card
  heading="Vivid Card Component with long heading to trim"
  subheading="extra text to the card heading that is set to be trimmed after 2 lines so the card will not be too long"
>
</vwc-card>
```
