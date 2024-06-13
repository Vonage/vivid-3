# Accordion Item

```js
<script type="module">import '@vonage/vivid/accordion-item';</script>
```

## Members

### Heading

Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `undefined`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with heading">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### Heading-Level

Use the `heading-level` attribute (or `headinglevel` property) to make the accordion heading level fit the page outline. Read more on [heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements).

- Type: `1` | `2` | `3` | `4` | `5` | `6`
- Default: `2`

The following sets the heading of accordion-item to level 3:

```html
<vwc-accordion-item heading="my heading" heading-level="3"></vwc-accordion-item>
```

### Expanded

Use the `expanded` attribute to set the accordion-item's open state.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Click to toggle accordion item" expanded>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### No-Indicator

Add the `no-indicator` attribute (or `noIndicator` property) to remove the indicator icon from the heading.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item without indicator" no-indicator>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### Meta

Add the `meta` attribute to add metadata to the heading.

- Type: `string`
- Default: `undefined`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with metadata" meta="meta-data">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### Icon

Add the `icon` attribute to add an icon to the heading.

- Type: `string`
- Default: `''`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with icon" icon="chat-solid">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### Icon-Trailing

Add the `icon-trailing` attribute (or `iconTrailing` property) to add an icon to the end of the heading text. Note that `icon-trailing` will override the default indicator.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		heading="Accordion item with icon-trailing"
		icon="chat-solid"
		icon-trailing
	>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

### Size

Use the `size` attribute to set the accordion-item's size.

- Type: `'condensed'` | `'normal'`
- Default: `'normal'`

```html preview full 230px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		heading="normal accordion item"
		meta="meta-data"
		icon="chat-solid"
	>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
<hr />
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		heading="condensed accordion item"
		size="condensed"
		meta="meta-data"
		icon="chat-solid"
	>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

## Slots

### Icon

Set the `icon` slot to show an icon before the accordion item's heading.
If set, the `icon` attribute is ignored.

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with icon">
		<vwc-icon
			slot="icon"
			name="check-circle-solid"
			connotation="success"
		></vwc-icon>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                              |
| -------- | ------------------------ | ------- | -------- | -------------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the button is invoked |

</div>
