## Label

The `label` attribute controls Fab's label text.

```html preview
<vwc-fab label="Add to cart">
	<vwc-icon slot="icon" name="cart-line"></vwc-icon>
</vwc-fab>
```

## Connotation

The `connotation` attribute controls the purpose of the Fab, expressed in its colors.

```html preview
<vwc-fab label="Add default">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="Add accent" connotation="accent">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="Add CTA" connotation="cta">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="Add announcement" connotation="announcement">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
```

## Icons

Icons can be provided using the [icon slot](/components/fab/code/#icon-slot). It can be displayed on the leading (default) or trailing side (`icon-trailing`) of the Fab.

The `icon` _(deprecated)_ attribute displays an icon from the [icon library](/icons/icons-gallery/).

```html preview
<vwc-fab label="Add Action">
	<vwc-icon slot="icon" name="plus-line"></vwc-icon>
</vwc-fab>
<vwc-fab icon-trailing label="icon-trailing">
	<vwc-icon slot="icon" name="cart-line"></vwc-icon>
</vwc-fab>
```

### Icon Only

If the `label` is omitted, the Fab will be displayed as an _icon-only_ Fab.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

When an element has no visible text, provide an accessible name using the <nobr><code>aria-label</code></nobr>attribute. This ensures screen reader users can understand the element’s purpose, even when it's represented only by an icon or visual styling.

</vwc-note>

```html preview
<vwc-fab aria-label="Icon only FAB button">
	<vwc-icon slot="icon" name="check-line"></vwc-icon>
</vwc-fab>
```

## Size

The `size` attribute controls the size of the Fab.

```html preview
<vwc-fab label="condensed" size="condensed">
	<vwc-icon slot="icon" name="thumbs-up-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="normal (default)" size="normal">
	<vwc-icon slot="icon" name="thumbs-up-line"></vwc-icon>
</vwc-fab>
<vwc-fab label="expanded" size="expanded">
	<vwc-icon slot="icon" name="thumbs-up-line"></vwc-icon>
</vwc-fab>
```

## Disabled

The `disabled` attribute disables the Fab and indicates that the action is not available.

```html preview
<vwc-fab disabled>
	<vwc-icon slot="icon" name="store-line"></vwc-icon>
</vwc-fab>
```
