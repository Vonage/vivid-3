## Heading

Use the `heading` attribute on **Accordion Item** to set the heading text.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

    To ensure [accessible heading levels](/components/accordion/accessibility/#heading-levels) use the [`heading-level` attribute](/components/accordion/code/#heading-level).

</vwc-note>

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

## Expand Mode

Use the `expand-mode` attribute on **Accordion** to determine if multiple items can opened at once or single (default).

### Single

In `single` mode only one Accordion Item can be expanded at a time. By default, the first Accordion Item will be expanded when the component is initialized.

```html preview 250px
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
```

### Multi

In `multi` mode multiple Accordion Items can be expanded.

```html preview 320px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item heading="Accordion item 1" expanded>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 2" expanded>
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
	<vwc-accordion-item
		expanded
		heading="Accordion item 2 with expanded attribute"
	>
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Appearance

Use the `appearance` attribute to change the **Accordion Item** appearance.

- Type: `'ghost'` | `'ghost-light'` | `'filled'`
- Default: `'ghost'`

```html preview blocks
<vwc-accordion>
	<vwc-accordion-item heading="Accordion item 1">
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item
		heading="Accordion item 2"
		appearance="ghost-light"
		expanded
	>
		This is the second item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item heading="Accordion item 3" appearance="filled">
		This is the third item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the **Accordion Item**'s heading.

The preferred way to add icons is to use the [icon slot](/components/accordion/code/#icon-slot).

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview 200px
<vwc-accordion>
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

```html preview 260px
<vwc-accordion expand-mode="multi">
	<vwc-accordion-item
		class="accordion-item"
		icon-trailing
		heading="Accordion item 1"
		expanded
	>
		<vwc-icon slot="icon" name="minus-line"></vwc-icon>
		This is the first item's accordion body.
	</vwc-accordion-item>
	<vwc-accordion-item
		class="accordion-item"
		icon-trailing
		icon="plus-line"
		heading="Accordion item 2"
	>
		This is the second item's accordion body.
	</vwc-accordion-item>
</vwc-accordion>

<script>
	document.querySelectorAll('.accordion-item').forEach((item) => {
		item.addEventListener('change', (e) => {
			if (e.target !== item) {
				return;
			}
			const iconName = item.getAttribute('icon');
			iconName === 'minus-line'
				? item.setAttribute('icon', 'plus-line')
				: item.setAttribute('icon', 'minus-line');
		});
	});
</script>
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

```html preview 425px
<div class="container">
	<div class="example">
		<b>Normal</b>
		<vwc-accordion class="accordion" expand-mode="multiple">
			<vwc-accordion-item size="normal" heading="Accordion item 1">
				This is the first item's accordion body.
			</vwc-accordion-item>
			<vwc-accordion-item size="normal" heading="Accordion item 2">
				This is the second item's accordion body.
			</vwc-accordion-item>
		</vwc-accordion>
	</div>
	<div class="example">
		<b>Condensed</b>
		<vwc-accordion class="accordion" expand-mode="multiple">
			<vwc-accordion-item size="condensed" heading="Accordion item 1">
				This is the first item's accordion body.
			</vwc-accordion-item>
			<vwc-accordion-item size="condensed" heading="Accordion item 2">
				This is the second item's accordion body.
			</vwc-accordion-item>
		</vwc-accordion>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 48px;
		inline-size: 100%;
	}
	.example {
		flex-grow: 1;
		inline-size: 100%;
	}
	.accordion {
		margin-top: 16px;
		display: block;
	}
</style>
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
