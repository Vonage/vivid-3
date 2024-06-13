# Accordion

An accordion set is a vertical list of headers that reveal or hide associated sections of content. Accordion item is a
header title, which gives the user a high level overview of the content, allowing the user to decide which sections to
choose.

The vwc-accordion accepts [vwc-accordion-item](/components/accordion-item/) elements as children.

```js
<script type="module">import '@vonage/vivid/accordion';</script>
```

```html preview full
<vwc-accordion>
	<vwc-accordion-item heading="Accordion item 1">
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

### Expand-mode

Use the `expand-mode` attribute to control the expand mode of the accordion, either allowing single or multiple item expansion.

- Type: `'multi'` | `'single'`
- Default: `'single'`

```html preview full
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item 1" expanded>
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

## Events

<div class="table-wrapper">

| Name     | Type                          | Bubbles | Composed | Description                                                |
| -------- | ----------------------------- | ------- | -------- | ---------------------------------------------------------- |
| `change` | `CustomEvent<string \| null>` | Yes     | Yes      | Fires a custom 'change' event when the active item changes |

</div>

## Methods

<div class="table-wrapper">

| Name       | Returns | Description                                                                               |
| ---------- | ------- | ----------------------------------------------------------------------------------------- |
| `closeAll` | `void`  | When `expand-mode` is set to `multi`, closes all the accordion items from the open state. |

</div>
