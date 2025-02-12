## Label

The `label` attribute controls Fab's label text.

```html preview
<vwc-fab icon="cart-line" label="Add to cart"></vwc-fab>
```

## Connotation

The `connotation` attribute controls the purpose of the Fab, expressed in its colors.

```html preview
<vwc-fab icon="plus-line"></vwc-fab>
<vwc-fab icon="plus-line" connotation="accent"></vwc-fab>
<vwc-fab icon="plus-line" connotation="cta"></vwc-fab>
<vwc-fab icon="plus-line" connotation="announcement"></vwc-fab>
```

## Icons

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed on the leading (default) or trailing side (`icon-trailing`) of the Fab.

Custom icons can be provided using the [icon slot](/components/fab/code/#icon-slot).

```html preview
<vwc-fab icon="plus-line" label="Add Action"></vwc-fab>
<vwc-fab icon="cart-line" icon-trailing label="icon-trailing"></vwc-fab>
```

### Icon Only

If the `label` is omitted, the Fab will be displayed as an _icon-only_ Fab.

```html preview
<vwc-fab icon="check-line" aria-label="icon"></vwc-fab>
```

## Size

The `size` attribute controls the size of the Fab.

```html preview
<vwc-fab icon="thumbs-up-line" label="condensed" size="condensed"></vwc-fab>
<vwc-fab icon="thumbs-up-line" label="normal (default)" size="normal"></vwc-fab>
<vwc-fab icon="thumbs-up-line" label="expanded" size="expanded"></vwc-fab>
```

## Disabled

The `disabled` attribute disables the Fab and indicates that the action is not available.

```html preview
<vwc-fab icon="store-line" disabled></vwc-fab>
```
