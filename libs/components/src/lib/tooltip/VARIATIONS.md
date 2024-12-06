## Text

The `text` attribute sets the text content of the Tooltip.

```html preview center 150px
<vwc-tooltip text="I'm a tooltip">
	<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
</vwc-tooltip>
```

<vwc-note connotation="information" icon="info-line">
	<p>The Tooltip itself never receives focus and is not in the tabbing order, so a tooltip can not contain interactive elements like links, inputs, or buttons.</p>
</vwc-note>

## Placement

The `placement` attribute sets the default placement of the Tooltip around its anchor element.

```html preview center 400px
<div class="grid">
	<div></div>
	<vwc-tooltip text="top-start" placement="top-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top" placement="top">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top-end" placement="top-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<div></div>

	<vwc-tooltip text="left-start" placement="left-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" size="expanded" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-tooltip text="right-start" placement="right-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" size="expanded" appearance="filled"></vwc-button>
	</vwc-tooltip>

	<vwc-tooltip text="left" placement="left">
		<vwc-button slot="anchor" icon="help-line" shape="pill" size="expanded" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-tooltip text="right" placement="right">
		<vwc-button slot="anchor" icon="help-line" shape="pill" size="expanded" appearance="filled"></vwc-button>
	</vwc-tooltip>

	<vwc-tooltip text="left-end" placement="left-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" size="expanded" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-tooltip text="right-end" placement="right-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" size="expanded" appearance="filled"></vwc-button>
	</vwc-tooltip>

	<div></div>
	<vwc-tooltip text="bottom-start" placement="bottom-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom" placement="bottom">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom-end" placement="bottom-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	</vwc-tooltip>
	<div></div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, auto);
		gap: 4px;
	}
</style>
```

<vwc-note connotation="information" icon="info-line">
	<p>The Tooltip will attempt to position itself where the <code>placement</code> attribute dictates. If it is unable to do so, because of lack of available space on the screen, it will reposition itself to the most appropriate alternative placement.</p>
</vwc-note>
