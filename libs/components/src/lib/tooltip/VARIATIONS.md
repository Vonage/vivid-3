## Text

The `text` attribute sets the text content of the Tooltip.

```html preview center 150px
<vwc-tooltip text="I'm a tooltip">
	<vwc-button slot="anchor" shape="pill" appearance="filled">
		<vwc-icon slot="icon" name="help-line"></vwc-icon>
	</vwc-button>
</vwc-tooltip>
```

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>The Tooltip itself never receives focus and is not in the tabbing order, so a tooltip can not contain interactive elements like links, inputs, or buttons.</p>
</vwc-note>

## Placement

The `placement` attribute sets the default placement of the Tooltip around its anchor element.

```html preview center 400px
<div class="grid">
	<vwc-tooltip text="top-start" placement="top-start" class="grid-col-2">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top" placement="top">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top-end" placement="top-end">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="left-start" placement="left-start" class="grid-col-1">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="right-start" placement="right-start" class="grid-col-5">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="left" placement="left" class="grid-col-1">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="right" placement="right" class="grid-col-5">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="left-end" placement="left-end" class="grid-col-1">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="right-end" placement="right-end" class="grid-col-5">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom-start" placement="bottom-start" class="grid-col-2">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom" placement="bottom">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom-end" placement="bottom-end">
		<vwc-button slot="anchor" shape="pill" appearance="filled">
			<vwc-icon slot="icon" name="help-line"></vwc-icon>
		</vwc-button>
	</vwc-tooltip>
	<div></div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, auto);
		grid-template-rows: repeat(5, 40px);
		gap: 4px;
	}
	.grid-col-1 {
		grid-column: 1;
	}
	.grid-col-2 {
		grid-column: 2;
	}
	.grid-col-5 {
		grid-column: 5;
	}
</style>
```

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>The Tooltip will attempt to position itself where the <code>placement</code> attribute dictates (or the default of <code>bottom</code> if not set). If it is unable to do so, because of lack of available space on the screen, it will reposition itself to the most appropriate alternative placement.</p>
</vwc-note>
