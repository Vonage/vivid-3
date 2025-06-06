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

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>
The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.
</vwc-note>

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item with icon">
		<vwc-icon slot="icon" name="chat-solid"></vwc-icon>
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
	<vwc-accordion-item heading="normal accordion item" meta="meta-data">
		<vwc-icon slot="icon" name="chat-solid"></vwc-icon>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
<hr />
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		heading="condensed accordion item"
		size="condensed"
		meta="meta-data"
	>
		<vwc-icon slot="icon" name="chat-solid"></vwc-icon>
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

## Slots

### Heading Slot

Set the `heading` slot to add content to the accordion item's heading.
If set, the `heading` attribute is ignored.

```html preview 120px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item" expanded>
		<span slot="heading">Accordion item <span class="highlight">(slotted)</span></span>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>

<style>
  .highlight { color: var(--vvd-color-cta-500); }
</style>
```

### Meta Slot

Set the `meta` slot to add additional content to the accordion item's heading.
If set, the `meta` attribute is ignored.

```html preview 120px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item" meta="Meta data" expanded>
		<span slot="heading">Accordion item (slotted)</span>
		<span slot="meta">Meta(slotted)</span>
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</vwc-accordion-item>
</vwc-accordion>
```

## CSS Variables

### Meta-data Max-inline-size

Use `--accordion-item-meta-inline-size` to set a custom inline-size to the meta-data text.

- Default: `20%`

```html preview full
<vwc-accordion
	expand-mode="multi"
	style="--accordion-item-meta-inline-size: 230px;"
>
	<vwc-accordion-item
		heading="Accordion item"
		meta="meta-data with custom width"
	>
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
