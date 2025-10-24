### File Drop

```html preview 250px
<vwc-layout gutters="small" column-basis="block" row-spacing="small">
	<vwc-rich-text-editor>
		<vwc-menubar slot="menu-bar" menu-items="textBlock textSize divider textDecoration divider"></vwc-menubar>
	</vwc-rich-text-editor>
</vwc-layout>
<script>
	const rteComponent = document.querySelector('vwc-rich-text-editor');
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
		rteComponent.addEventListener('file-drop', (event) => {
			console.log(event.detail);
			rteComponent.addInlineImage({
				file: event.detail[0],
				position: 3,
				alt: 'this is a test inline image',
			});
		});
	}

	start();
</script>
```
