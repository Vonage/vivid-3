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

### Set Text Size

Use the `setTextSize` method to set the text size to three sizes: `title`, `subtitle` and `body`.

```html preview
<vwc-layout gutters="small" column-basis="block" row-spacing="small">
	<div id="controls">
		<vwc-button
			appearance="filled"
			label="Title"
			onclick="setTextSize('title')"
		></vwc-button>
		<vwc-button
			appearance="filled"
			label="Subtitle"
			onclick="setTextSize('subtitle')"
		></vwc-button>
		<vwc-button
			appearance="filled"
			label="Body"
			onclick="setTextSize('body')"
		></vwc-button>
	</div>
	<vwc-rich-text-editor></vwc-rich-text-editor>
</vwc-layout>
<script>
	function setTextSize(size) {
		rteComponent.setTextSize(size);
	}
	async function waitForEditorReady() {
		await new Promise((res) => {
			const interval = setInterval(() => {
				if (!rteComponent.value) return;
				clearInterval(interval);
				res();
			});
		});
	}

	async function start() {
		await waitForEditorReady();
		rteComponent.value = `
			<p>Title</p>
			<p>Sub Title</p>
			<p>Body</p>
		`;
		moveMarkerToPosition(2);
		rteComponent.setTextSize('title');
		moveMarkerToPosition(11);
		rteComponent.setTextSize('subtitle');
		moveMarkerToPosition(20);
		rteComponent.setTextSize('body');
	}

	async function moveMarkerToPosition(moveTo) {
		rteComponent.selectionStart = moveTo;
		await new Promise((res) => requestAnimationFrame(res));
	}

	// waiting for the component to load so using interval. A better mechanism is in the works.
	rteComponent = document.querySelector('vwc-rich-text-editor');

	start();
</script>
```

## Slots

### Menu Bar

Set the `menu-bar` slot to show `menubar` component. See the `menubar` documentation for more details. This slot will show only `menubar` components.

```html preview 250px
<vwc-layout gutters="small" column-basis="block" row-spacing="small">
	<vwc-rich-text-editor>
		<vwc-menubar slot="menu-bar" menu-items="textSize"></vwc-menubar>
	</vwc-rich-text-editor>
</vwc-layout>
<script>
	function setTextSize(size) {
		rteComponent.setTextSize(size);
	}
	async function waitForEditorReady() {
		await new Promise((res) => {
			const interval = setInterval(() => {
				if (!rteComponent.value) return;
				clearInterval(interval);
				res();
			});
		});
	}

	async function start() {
		await waitForEditorReady();
		rteComponent.value = `
			<p>Title</p>
			<p>Sub Title</p>
			<p>Body</p>
		`;
		moveMarkerToPosition(2);
		rteComponent.setTextSize('title');
		moveMarkerToPosition(11);
		rteComponent.setTextSize('subtitle');
		moveMarkerToPosition(20);
		rteComponent.setTextSize('body');
	}

	async function moveMarkerToPosition(moveTo) {
		rteComponent.selectionStart = moveTo;
		await new Promise((res) => requestAnimationFrame(res));
	}

	// waiting for the component to load so using interval. A better mechanism is in the works.
	rteComponent = document.querySelector('vwc-rich-text-editor');

	start();
</script>
```

## CSS Variables

## Events

<div class="table-wrapper">

| Name                  | Type                     | Bubbles | Composed | Description                                                                           |
| --------------------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------- |
| **input**             | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'input' event when the content was editted by the user                 |
| **change**            | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the element is blurred and the content was editted |
| **selection-changed** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'selection-changed' event when the selection in the editor changed     |

</div>

## Methods

<div class="table-wrapper">

| Name            | Returns | Description                                                                                              |
| --------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| **setTextSize** |         | Accepts `title`, `subtitle` and `body` and changes the text node that holds the current marker/selection |

</div>
