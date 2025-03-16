## Usage

```js
<script type="module">import '@vonage/vivid/rich-text-editor';</script>
```

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>
```

## Members

### Value

The `value` property sets and gets the HTML content of the Rich Text Editor component.

```html preview
<vwc-rich-text-editor></vwc-rich-text-editor>
<script>
	// waiting for the component to load so using interval. A better mechanism is in the works.
	rteComponent = document.querySelector('vwc-rich-text-editor');
	const interval = setInterval(() => {
		if (!rteComponent.value) return;
		console.log(rteComponent.value);
		clearInterval(interval);
		rteComponent.value = '12345567';
	}, 10);
</script>
```

### Selection Start

Use the `selectionStart` attribute to get or set the starting point of the marker. To set the marker without selection, set `selectionStart` and `selectionEnd` to the same value.

```html preview
<p>Focus using the keyboard into the component to see the selection</p>
<vwc-rich-text-editor></vwc-rich-text-editor>
<script>
	// waiting for the component to load so using interval. A better mechanism is in the works.
	rteComponent = document.querySelector('vwc-rich-text-editor');
	const interval = setInterval(() => {
		if (!rteComponent.value) return;
		console.log(rteComponent.value);
		clearInterval(interval);
		rteComponent.value = '12345567';

		rteComponent.selectionStart = 4;
		rteComponent.selectionEnd = 7;
	}, 10);
</script>
```

### Selectio End

Use the `selectionEnd` attribute to get or set the end point of the marker. To set the marker without selection, set `selectionStart` and `selectionEnd` to the same value.

```html preview
<p>Focus using the keyboard into the component to see the selection</p>
<vwc-rich-text-editor></vwc-rich-text-editor>
<script>
	// waiting for the component to load so using interval. A better mechanism is in the works.
	rteComponent = document.querySelector('vwc-rich-text-editor');
	const interval = setInterval(() => {
		if (!rteComponent.value) return;
		console.log(rteComponent.value);
		clearInterval(interval);
		rteComponent.value = '12345567';

		rteComponent.selectionStart = 4;
		rteComponent.selectionEnd = 7;
	}, 10);
</script>
```

## Slots

## CSS Variables

## Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                                           |
| ---------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the element is blurred and the content was editted |

</div>

## Methods

<div class="table-wrapper">

| Name | Returns | Description |
| ---- | ------- | ----------- |
|      |         |             |

</div>
