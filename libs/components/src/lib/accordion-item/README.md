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

Use the `heading-level` attribute (or `headingLevel` property) to set the accordion heading level so it fits correctly within the outline of the page. Read more on [heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements).

- Type: `2` | `3` | `4` | `5` | `6`
- Default: `3`

The following sets the heading of accordion-item to level 2

```html
<vwc-accordion-item heading="my heading" heading-level="2"></vwc-accordion-item>
```

which will output the shadow tree heading element to be rendered as a `<h2>` tag

e.g.

```html
<h2 class="header">
  <button>
    <!-- ... -->
  </button>
</h2>
```

### Open

Use the `open` attribute to set the accordion-item's open state.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion-item heading="Click to toggle accordion item" open>
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

Add the `icon` attribute to add an icon to the heading.

- Type: `string`
- Default: `''`

```html preview full
<vwc-accordion-item heading="Accordion item with icon" icon="chat-solid">
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

### Icon-Trailing

Add the `icon-trailing` attribute (or `iconTrailing` property) to add an icon to the right of the heading text.  Mind that `icon-trailing` will override the Indicator.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion-item heading="Accordion item with icon-trailing" icon="chat-solid" icon-trailing>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</vwc-accordion-item>
```

## Accessibility

The accordion-item has a `role` button.
Accordion-item has `aria-expanded` set to true when the content is visible. Otherwise, it is set to false.
Accordion-item has a value specified for `aria-controls` that refers to the content.
