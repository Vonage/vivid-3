## Text

The `text` attribute set the text to be displayed in the option list item and in the parent element when selected.

The [label attribute](/components/option/code/#label) can be used xsto display different text in the parent element when selected.

```html preview
<div class="container">
	<vwc-option text="Option text" value="option1"></vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

## Selected

The `selected` attribute indicates that the option is selected.

```html preview
<div class="container">
	<vwc-option selected text="Option text" value="option1"></vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

## Icons

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which is displayed at the start of the option, before the text.

Custom icons can be provided using the [icon slot](/components/option/code/#icon-slot).

```html preview
<div class="container">
	<vwc-option icon="chat-line" text="Option text" value="option1"></vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```

## Disabled

The `disabled` attribute indicates that the option is disabled and can not be selected.

```html preview
<div class="container">
	<vwc-option disabled text="Option text" value="option1"></vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```