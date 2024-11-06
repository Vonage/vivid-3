## Heading

Use the `heading` attribute on **Accordion Item** to set the heading text.

```html preview 250px
<vwc-accordion>
	<vwc-accordion-item heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

<vwc-note connotation="information" icon="info-line">

    To ensure [accessible heading levels](/components/accordion/accessibility/#heading-levels) use the [`heading-level` attribute](/components/accordion/code/#heading-level).

</vwc-note>

## Expand Mode

Use the `expand-mode` attribute on **Accordion** to determine if multiple items can opened at once or single (default).

```html preview 500px
<b>Single</b>
<vwc-accordion expand-mode="single">
	<vwc-accordion-item heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 3">
		This is the third item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
<br /><b>Multiple</b>
<vwc-accordion expand-mode="multiple">
	<vwc-accordion-item heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 3">
		This is the third item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Expanded

Use the `expanded` attribute on **Accordion Item** to set it's open state.

```html preview 250px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item expanded heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the **Accordion Item**'s heading.

To add custom icons, use the [icon slot](/components/accordion/code/#icon-slot).

```html preview 200px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item icon="accessibility-line" heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item icon="ai-line" heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

### Icon Trailing

Use the `icon-trailing` attribute to postfix the icon in place of the **Accordion Item**'s chevron.

```html preview 200px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		icon-trailing
		icon="accessibility-line"
		heading="Accordion item 1"
	>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item icon-trailing icon="ai-line" heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Meta

Use the `meta` attribute to add meta data to the **Accordion Item**'s heading.

```html preview 200px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item meta="Meta 1" heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item meta="Meta 2" heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Size

Use the `size` attribute to control the size of the **Accordion Item**.

```html preview 350px
<b>Normal</b>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item size="normal" heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item size="normal" heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
<br /><b>Condensed</b>
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item size="condensed" heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item size="condensed" heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## No Indicator

Use the `no-indicator` attribute on **Accordion Item** to remove indicator icon from the heading element.

```html preview 250px
<vwc-accordion>
	<vwc-accordion-item no-indicator heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item no-indicator heading="Accordion item 2">
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```
