# card

A “card” is a UI design pattern that groups related information in a flexible-size container visually resembling a playing card.
```js
<script type="module">
    import '@vonage/vivid/card';
</script>
```

## Heading

Add a `heading` attribute to add card heading title

- Type: `String`
- Default: `''`


```html preview
<vwc-card heading="Vivid Card Component"></vwc-card>
```

## Icon
Add a `icon='icon-name'` attribute to add icon on the right of the card heading

- Type: `String`
- Default: `''`


```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading" icon="chat-line"></vwc-card>
```

## Subheading
Add a `subheading` attribute to add card subheading

- Type: `String`
- Default: `''`


```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading"></vwc-card>
```

## Text
Add a `text` attribute to add text to the card

- Type: `String`
- Default: `''`


```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading" icon="chat-line" text="the card can contain multiple lines of text"></vwc-card>
```

## Elevation
the `elevation` control the elevation depth

- Type: `0` | `2` | `4` | `8` | `12` | `16` | `24`
- Default: `4`

```html preview
<vwc-card elevation="12" heading="Vivid Card Component" subheading="extra text to the card heading" icon="chat-line" text="the card can contain multiple lines of text"></vwc-card>
```


## Trim Heading & subheading
The card heading and the subheading can be trimmed to your preferable number of lines.  
The number of lines are controlled by css variable:
- `--heading-line-clamp`
- `--subheading-line-clamp`

- Type: `String`
- Default: `''`


```html preview
<vwc-card style="--heading-line-clamp: 1; --subheading-line-clamp: 2;" heading="Vivid Card Component with long heading to trim" subheading="extra text to the card heading that is set to be trimmed after 2 lines so the card will not be too long"></vwc-card>
```

## Slots
### Graphic 
The graphic slot overide the icon property.

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading">
<vwc-icon slot="graphic" type="android-mono" style="font-size: 44px; color: var(--vvd-color-sucess)" ></vwc-icon>
</vwc-card>
```

### Meta
The meta slot is for action content in the card header.
.

```html preview
<vwc-card heading="Vivid Card Component" subheading="extra text to the card heading">
<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
</vwc-card>
```


### Footer
footer slot main purpose is for action button

```html preview
<div style="block-size: 400px">
<vwc-card heading="All Options on Deck" subheading="subheading" icon="chat-line" text="here is the card text">
<div style="height: 150px; width: 100%; background-color: rebeccapurple;" slot="media"></div>
<vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
<vwc-button slot="footer" icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></vwc-button>
</vwc-card>
</div>
```

### Content
If the content structure is not fitting the desired content, the heading, subheading and text can overide.

```html preview
<vwc-card >
<div slot="content">If you need diferant structure - use this slot</div>
</vwc-card>
```





### TODO:
- in grid - ?
