# Accordion

Use accordion when you want to toggle between hiding and showing content. Only one item can be open at a time, allowing the user to focus on the relevant content.  
The vwc-accordion accepts [vwc-accordion-item](../../components/accordion-item) elements as children.

```js
<script type="module">
  import '@vonage/vivid/accordion';
</script>
```

```html preview full
<vwc-accordion>
  <vwc-accordion-item heading="Accordion item 1" open>
    <vwc-text>This is the first item's accordion body. It is recommended to show it by default.</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 2">
    <vwc-text>This is the second item's accordion body. It is recommended to ensure all items contain the same content to prevent layout shifts on the page.</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 3">
    <vwc-text>This is the third item's accordion body. It is recommended to ensure all items contain the same content to prevent layout shifts on the page</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 4">
    <vwc-text>This is the fourth item's accordion body. It is recommended to ensure all items contain the same content to prevent layout shifts on the page</vwc-text>
  </vwc-accordion-item>
</vwc-accordion>
```

## Members

### Multi

Add the `multi` attribute to the accordion to allow multiple items to be open at once.

- Type: `boolean`
- Default: `false`

```html preview full
<vwc-accordion multi>
  <vwc-accordion-item heading="Accordion item 1" open>
    <vwc-text>This is the first item's accordion body. It is recommended to show it by default.</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 2">
    <vwc-text>This is the second item's accordion body. It is recommended to ensure all items contain the same content to prevent layout shifts on the page</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 3">
    <vwc-text>This is the third item's accordion body. It is recommended to ensure all items contain the same content to prevent layout shifts on the page</vwc-text>
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 4">
    <vwc-text>This is the fourth item's accordion body. It is recommended to ensure all items contain the same content to prevent layout shifts on the page</vwc-text>
  </vwc-accordion-item>
</vwc-accordion>
```

## Methods

### CloseAll

- Type: function
- Returns: `void`

 Closes all the accordion items from the open state.
