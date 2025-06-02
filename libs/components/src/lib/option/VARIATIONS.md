## Text

The `text` attribute set the text to be displayed in the option list item and in the parent element when selected.

The [label attribute](/components/option/code/#label) can be used to display different text in the parent element when selected.

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

Icons can be provided using the [icon slot](/components/option/code/#icon-slot). It is displayed at the start of the option, before the text.

The `icon`_(deprecated)_ attribute displays an icon from the [icon library](/icons/icons-gallery/)

```html preview
<div class="container">
	<vwc-option text="Option text" value="option1">
		<vwc-icon slot="icon" name="chat-line"></vwc-icon>
	</vwc-option>
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

## Matched Text

The `matched-text` attribute highlights a part of text as matching a search query.

```html preview
<div class="container">
	<vwc-option
		matched-text="text"
		text="Option text"
		value="option1"
	></vwc-option>
</div>

<style>
	.container {
		width: 250px;
	}
</style>
```
