# Accordion

Use accordion when you want to toggle between hiding and showing large amounts of content.  
The vwc-accordion accepts [vwc-accordion-item](../../components/accordion-item) elements as children.

```js
<script type="module">
  import '@vonage/vivid/accordion';
</script>
```

```html preview full
<vwc-accordion>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
</vwc-accordion>
```

## Properties

### Multi

Add the `multi` attribute to the accordion to allow multiple items to be open at once.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion multi>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text>content</vwc-text>
  </vwc-accordion-item>
</vwc-accordion>
```

## Methods

### CloseAll

- Type: function
- Returns: `void`

 Closes all the accordion items from the open state.
