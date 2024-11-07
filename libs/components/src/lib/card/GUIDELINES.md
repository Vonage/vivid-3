## Advantages of Card UI Design

Advantages of card UI design

### Highly Responsive

Probably the main advantage of UI cards is that they are very adaptive. It’s the rectangular shape that makes them transformative. That is why UI cards look good on all screen sizes.

### Easy-To-Understand

UI cards are rather minimalistic and understandable design elements. Small chunks of information they reveal are easy to consume.

### Intuitive and UX Friendly

Most users are familiar with the card interface design and can easily navigate through it. Rectangular shape and simple clickable elements make the user experience very intuitive.

### Attractive and Modern-Looking

Despite the fact that card-based design has been around for a decade now it is still an up-to-date design solution. Their key visual element makes it easy to make any product attractive using this layout.

## Appearance

### Elevated

<docs-do-dont no-gutters>

<div slot="description">

- default appearance
- can change the elevation to emphasis
</div>
<div>

```html preview center example 150px
<vwc-card elevation="12" headline="Card with Elevation 12"></vwc-card>
```

</div>
</docs-do-dont>

### Outlined

<docs-do-dont no-gutters>

<div slot="description">

</div>
<div>

```html preview center example 150px
<vwc-card
	appearance="outlined"
	headline="Card with Outlined Appearance"
	class="card-appearance"
></vwc-card>

<style>
	.card-appearance {
		margin: 16px;
	}
</style>
```

</div>
</docs-do-dont>

### Ghost

<docs-do-dont>
<docs-do slot="description" caption="use ghost appearance when using the card inside selectable box">

```html preview center example 170px
<vwc-selectable-box
	tight
	clickable-box
	connotation="cta"
	checked
	class="selectable-box"
>
	<vwc-card
		appearance="ghost"
		headline="Card with Ghost Appearance"
		subtitle="slotted inside selectable box"
	></vwc-card>
</vwc-selectable-box>

<style>
	.selectable-box {
		margin: 16px;
	}
</style>
```

</docs-do>

<docs-do dont caption="don't use ghost appearance when not slotted, this will make the card noticeable">

```html preview center example 150px
<vwc-card
	appearance="ghost"
	headline="Card with Ghost Appearance"
	class="card-appearance"
></vwc-card>

<style>
	.card-appearance {
		margin: 16px;
	}
</style>
```

</docs-do>
</docs-do-dont>
