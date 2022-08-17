# Accordion

Use accordion when you want to toggle between hiding and showing content. Only one item can be open at a time, allowing the user to focus on the relevant content.  
It is recommended to show the first item by default and to ensure all items contain the same content to prevent layout shifts on the page.
The vwc-accordion accepts [vwc-accordion-item](../../components/accordion-item) elements as children.

```js
<script type="module">
  import '@vonage/vivid/accordion';
</script>
```

```html preview full
<vwc-accordion>
  <vwc-accordion-item heading="Accordion item 1" open>
    This is the first item's accordion body.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 2">
    This is the second item's accordion body.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 3">
    This is the third item's accordion body.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 4">
    This is the fourth item's accordion body.
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
    This is the first item's accordion body.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 2">
    This is the second item's accordion body.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 3">
    This is the third item's accordion body.
  </vwc-accordion-item>
  <vwc-accordion-item heading="Accordion item 4">
    This is the fourth item's accordion body.
  </vwc-accordion-item>
</vwc-accordion>
```

## Methods

### closeAll()

- Type: function
- Returns: `void`

 Closes all the accordion items from the open state.
