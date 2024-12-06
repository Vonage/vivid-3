Toggletip works differently to [Tooltip](/components/tooltip/) in that it requires a click to display and is keyboard accessible. This means it can display user actions such as links and buttons. The Toggletip's contents are provided using the `headline` attribute (below) the [default slot](/components/toggletip/code/#default-slot) or the [`action-items` slot](/components/toggletip/code/#æaction-items-slot).

## Headline

The `headline` attributes sets the Toggletip headline.

```html preview center 100px
<vwc-toggletip headline="This is the headline">
	<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	This is the content
</vwc-toggletip>
```

## Placement

The `placement` attribute sets the default placement of the Toggletip around its anchor element.

```html preview center 400px
<div class="grid">
	<div></div>
	<vwc-toggletip placement="top-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		top-start
	</vwc-toggletip>
	<vwc-toggletip placement="top">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		top
	</vwc-toggletip>
	<vwc-toggletip placement="top-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		top-end
	</vwc-toggletip>
	<div></div>

	<vwc-toggletip placement="left-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		left-start
	</vwc-toggletip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-toggletip placement="right-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		right-start
	</vwc-toggletip>

	<vwc-toggletip placement="left">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		left
	</vwc-toggletip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-toggletip placement="right">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		right
	</vwc-toggletip>

	<vwc-toggletip placement="left-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		left-end
	</vwc-toggletip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-toggletip placement="right-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		right-end
	</vwc-toggletip>

	<div></div>
	<vwc-toggletip placement="bottom-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		bottom-start
	</vwc-toggletip>
	<vwc-toggletip placement="bottom">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		bottom
	</vwc-toggletip>
	<vwc-toggletip placement="bottom-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
		bottom-end
	</vwc-toggletip>
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
	<p>The Tooggletip will attempt to position itself where the <code>placement</code> attribute dictates. If it is unable to do so, because of lack of available space on the screen, it will reposition itself to the most appropriate alternative placement.</p>
</vwc-note>

## Alternate

The `alternate` attribute changes the Toggletip's color scheme to the opposite of the currently select one (eg. from light to dark).

```html preview center 100px
<vwc-toggletip alternate>
	<vwc-button slot="anchor" icon="help-line" shape="pill" appearance="filled"></vwc-button>
	An alternate toggletip
</vwc-toggletip>
```
