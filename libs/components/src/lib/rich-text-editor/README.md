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

### Selection End

Use the `selectionEnd` attribute to get or set the end point of the marker. To set the marker without selection, set `selectionStart` and `selectionEnd` to the same value.

```html preview
<p>Focus using the keyboard into the component to see the selection</p>
<vwc-rich-text-editor></vwc-rich-text-editor>
<script>
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

### Set Text Block

Use the `setTextBlock` method to set the text block to one of three types: `title`, `subtitle` and `body`.

```html preview
<vwc-layout gutters="small" column-basis="block" row-spacing="small">
	<div id="controls">
		<vwc-button
			appearance="filled"
			label="Title"
			onclick="setTextBlock('title')"
		></vwc-button>
		<vwc-button
			appearance="filled"
			label="Subtitle"
			onclick="setTextBlock('subtitle')"
		></vwc-button>
		<vwc-button
			appearance="filled"
			label="Body"
			onclick="setTextBlock('body')"
		></vwc-button>
	</div>
	<vwc-rich-text-editor></vwc-rich-text-editor>
</vwc-layout>
<script>
	function setTextBlock(blockType) {
		rteComponent.setTextBlock(blockType);
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
		rteComponent.setTextBlock('title');
		moveMarkerToPosition(11);
		rteComponent.setTextBlock('subtitle');
		moveMarkerToPosition(20);
		rteComponent.setTextBlock('body');
	}

	async function moveMarkerToPosition(moveTo) {
		rteComponent.selectionStart = moveTo;
		await new Promise((res) => requestAnimationFrame(res));
	}

	rteComponent = document.querySelector('vwc-rich-text-editor');
	start();
</script>
```

### Placeholder

Use the `placeholder` property to set and get the placeholder text in case the editor is empty.

```html preview
<vwc-rich-text-editor
	placeholder="Custom placeholder text"
></vwc-rich-text-editor>
```

## Slots

### Menu Bar

Set the `menu-bar` slot to show `menubar` component. See the `menubar` documentation for more details. This slot will show only `menubar` components.

```html preview 250px
<vwc-layout gutters="small" column-basis="block" row-spacing="small">
	<vwc-rich-text-editor>
		<vwc-menubar
			slot="menu-bar"
			menu-items="textBlock textSize divider textDecoration divider"
		></vwc-menubar>
	</vwc-rich-text-editor>
</vwc-layout>
<script>
	function setTextBlock(blockType) {
		rteComponent.setTextBlock(blockType);
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
		rteComponent.setTextBlock('title');
		moveMarkerToPosition(11);
		rteComponent.setTextBlock('subtitle');
		moveMarkerToPosition(20);
		rteComponent.setTextBlock('body');
	}

	async function moveMarkerToPosition(moveTo) {
		rteComponent.selectionStart = moveTo;
		await new Promise((res) => requestAnimationFrame(res));
	}

	rteComponent = document.querySelector('vwc-rich-text-editor');
	start();
</script>
```

### Attachments

Set a component in the `attachments` slot to show them inside the editor area.

```html preview 250px
<style>
	vwc-rich-text-editor {
		block-size: 200px;

		> div {
			display: flex;
			flex-direction: column;
		}
	}

	#scroll-to-attachments {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
	}

	.hidden {
		display: none;
	}
</style>
<vwc-layout gutters="small" column-basis="block" row-spacing="small">
	<vwc-rich-text-editor>
		<div slot="attachments">
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
			<vwc-button label="Imagine I am a file atatchment"></vwc-button>
		</div>
	</vwc-rich-text-editor>
	<vwc-button
		id="scroll-to-attachments"
		hidden
		onclick="scrollToAttachments()"
		label="Scroll to Attachments"
	></vwc-button>
</vwc-layout>

<script>
	function scrollToAttachments() {
		rteComponent.scrollToAttachments(32);
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
		console.log('adding value');
		rteComponent.value = `
            <p>Technically sound</p><p>everlasting peace</p><p>no matter what you do</p><p>I'll stay around with you</p><p>and noone ever dared</p><p>to hook my piece of ware</p><p>no matter how it goes</p><p>the matter usually blows</p>
        `;
	}

	async function moveMarkerToPosition(moveTo) {
		rteComponent.selectionStart = moveTo;
		await new Promise((res) => requestAnimationFrame(res));
	}

	rteComponent = document.querySelector('vwc-rich-text-editor');

	observer = new IntersectionObserver(
		(entries) => {
			const entry = entries[0];
			document
				.querySelector('#scroll-to-attachments')
				.classList.toggle('hidden', entry.isIntersecting);
		},
		{
			root: null,
			threshold: 0.1,
		}
	);
	slottedElement = rteComponent.querySelector('[slot="attachments"]');
	observer.observe(slottedElement);
	start();
</script>
```

## Events

<div class="table-wrapper">

| Name                  | Type                     | Bubbles | Composed | Description                                                                                    |
| --------------------- | ------------------------ | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| **input**             | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'input' event when the content was edited by the user                           |
| **change**            | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the element is blurred and the content was edited           |
| **selection-changed** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'selection-changed' event when the selection in the editor changes              |
| **file-drop**         | `CustomEvent<FileList>`  | Yes     | Yes      | Fires when files are dropped onto the editor. The event’s `detail` contains the dropped files. |

</div>

## Methods

<div class="table-wrapper">

| Name                       | Returns | Description                                                                                                                                                                                                                                                                      |
| -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **setTextBlock**           |         | Accepts `title`, `subtitle` and `body` and changes the text node that holds the current marker/selection. Logs a warning if the block type is invalid.                                                                                                                           |
| **setSelectionDecoration** |         | Accepts a decoration type (`bold`, `italic`, `underline`, `strikethrough`, `monospace`) and applies it to the current selection in the editor. Logs a warning if the decoration type is invalid.                                                                                 |
| **setSelectionTextSize**   |         | Accepts a text size (`extra-large`, `large`, `normal`, or `small`) and applies it to the current selection in the editor.                                                                                                                                                        |
| **scrollToAttachments**    |         | Accepts `pixelsAddition` which defaults to 0 and scrolls to the top of the attachments area plus the `pixelsAddition` value.                                                                                                                                                     |
| **addInlineImage**         |         | Accepts an object with `file: File`, optional `position?: number`, and optional `alt?: string`. Inserts an inline image at the given position or at the current marker position if not provided. If `alt` is not provided, it defaults to `inline image from file ${file.name}`. |

</div>

## CSS Variables

## Menu Bar

Use the `<vwc-menubar>` component in the `menu-bar` slot for adding style controls.  
Supported menu bar items: `textBlock`, `textDecoration`, `textSize`, `divider`.  
Menu bar options and tooltips are localized.
