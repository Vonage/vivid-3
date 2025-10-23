## Visually Hidden Text

```html preview
Visually hidden text: <vwc-visually-hidden> This text is still available to assistive technology. </vwc-visually-hidden>
```

## Focusable Elements

```html preview
<vwc-button label="Visually hidden button ->" onclick="focusHiddenButton()"></vwc-button>
<vwc-visually-hidden>
	<vwc-button label="Only visible when focused"></vwc-button>
</vwc-visually-hidden>

<script>
	function focusHiddenButton() {
		document.querySelector('vwc-visually-hidden > vwc-button').focus();
	}
</script>
```
