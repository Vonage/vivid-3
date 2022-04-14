# card

A “card” is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.
```js
<script type="module">import '@vonage/vivid/card';</script>
```

## Card Heading
- Type: `String`
- Default: `'''`

Add a `heading` attribute to add card heading title

```html preview
<div style="width: 300px; height: 400px;">
<vwc-card heading="Vivid Card Component"></vwc-card>
</div>
```

## Card Subtitle
- Type: `String`
- Default: `'''`

Add a `subtitle` attribute to add card subtitle

```html preview
<div style="width: 300px; height: 400px;">
<vwc-card heading="Vivid Card Component" subtitle="extra text to the card heading"></vwc-card>
</div>
```

## Card Icon
- Type: `String`
- Default: `'''`

Add a `icon='icon-name''` attribute to add icon on the right of the card heading

```html preview
<div style="width: 300px; height: 400px;">
<vwc-card heading="Vivid Card Component" subtitle="extra text to the card heading" icon="chat-line"></vwc-card>
</div>
```

## Graphic Slot
- Type: `String`
- Default: `'''`

The graphic slot overide the icon property.

```html preview
<div style="width: 300px; height: 400px;">
<vwc-card heading="Vivid Card Component" subtitle="extra text to the card heading">
<vwc-icon slot="graphic" type="android-mono" style="font-size: 44px; color: var(--vvd-color-sucess)" ></vwc-icon>
</vwc-card>
</div>
```

## Card Text
- Type: `String`
- Default: `'''`

Add a `text` attribute to add text to the card

```html preview
<div style="width: 300px; height: 400px;">
<vwc-card heading="Vivid Card Component" subtitle="extra text to the card heading" icon="chat-line" text="the card can contain multiple lines of text"></vwc-card>
</div>
```

## Footer Slot
footer slot main purpose is for action button

```html preview
<div style="width: 300px; height: 500px;">
<vwc-card heading="All Options on Deck" subtitle="Subtitle" icon="chat-line" text="here is the card text">
<div style="height: 150px; width: 100%; background-color: rebeccapurple;" slot="media"></div>
<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
<vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
</vwc-card>
</div>
```

### ToDO:
- trim title and subtitle
- maybe change heading to Title os subtitle to subheading
- add variable to the docs + code snippet
- in grid - ?
- fix code - that footer with no slotted content - display: none
