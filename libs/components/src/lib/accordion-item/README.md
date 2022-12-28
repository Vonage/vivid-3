# Accordion Item

```js
<script type="module">
  import '@vonage/vivid/accordion-item';
</script>
```

## Members

### Heading

Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `undefined`

```html preview full
<vwc-accordion-item heading="Accordion item with heading">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
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
<vwc-accordion-item heading="Click to toggle accordion item" expanded>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

### Leading

Add the `leading` attribute to place the indicator at the start of the accordion-item.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion-item heading="Accordion item with a leading indicator" leading>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

### No-Indicator

Add the `no-indicator` attribute (or `noIndicator` property) to remove the indicator icon from the heading.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion-item heading="Accordion item without indicator" no-indicator>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

### Meta

Add the `meta` attribute to add metadata to the heading.

- Type: `string`
- Default: `undefined`

```html preview full
<vwc-accordion-item heading="Accordion item with metadata" meta="meta-data">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

### Icon

Add the `icon` attribute to add an icon to the heading. Note that `icon` will override the leading indicator.

- Type: `string`
- Default: `''`

```html preview full
<vwc-accordion-item heading="Accordion item with icon" icon="chat-solid">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

### Icon-Trailing

Add the `icon-trailing` attribute (or `iconTrailing` property) to add an icon to the end of the heading text. Note that `icon-trailing` will override the trailing indicator.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion-item heading="Accordion item with icon-trailing" icon="chat-solid" icon-trailing>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

## Accessibility

The accordion-item has a button `role` (it is a button).
Accordion-item has `aria-expanded` set to true when the content is visible. Otherwise, it is set to false.
Accordion-item has a value specified for `aria-controls` that refers to the content.
