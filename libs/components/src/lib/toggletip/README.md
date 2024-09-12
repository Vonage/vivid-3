# Toggletip

Toggletips provide supplementary or clarifying information. The main differences with tooltips is that they require a click to display and are keyboard accessible.
This means they can display user actions such as links or buttons.

```js
<script type="module">import '@vonage/vivid/toggletip';</script>
```

```html preview center 100px
<vwc-toggletip>
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	I'm a toggletip
</vwc-toggletip>
```

## Members

### Open

You can toggle toggletip's display by using the `open` attribute.

- Type: `boolean`
- Default: `false`

```html preview center 100px
<vwc-toggletip open>
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	I'm open by default
</vwc-toggletip>
```

### Headline

Use the `headline` attribute to set the toggletip's headline.

- Type: `string`
- Default: `undefined`

```html preview center 100px
<vwc-toggletip headline="This is the headline">
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	This is the content
</vwc-toggletip>
```

### Alternate

Add the `alternate` attribute to change the toggletip's color-scheme to the opposite of the currently selected one.

- Type: `boolean`
- Default: `false`

```html preview center 100px
<vwc-toggletip alternate>
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	An alternate toggletip
</vwc-toggletip>
```

### Placement

Use the `placement` attribute to control the position of the toggletip relative to its anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'`
- Default: `'right'`

```html preview center 400px
<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, auto);
		gap: 4px;
	}
</style>
<div class="grid">
	<div></div>
	<vwc-toggletip placement="top-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		top-start
	</vwc-toggletip>
	<vwc-toggletip placement="top">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		top
	</vwc-toggletip>
	<vwc-toggletip placement="top-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		top-end
	</vwc-toggletip>
	<div></div>

	<vwc-toggletip placement="left-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		left-start
	</vwc-toggletip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-toggletip placement="right-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		right-start
	</vwc-toggletip>

	<vwc-toggletip placement="left">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		left
	</vwc-toggletip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-toggletip placement="right">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		right
	</vwc-toggletip>

	<vwc-toggletip placement="left-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		left-end
	</vwc-toggletip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-toggletip placement="right-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		right-end
	</vwc-toggletip>

	<div></div>
	<vwc-toggletip placement="bottom-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		bottom-start
	</vwc-toggletip>
	<vwc-toggletip placement="bottom">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		bottom
	</vwc-toggletip>
	<vwc-toggletip placement="bottom-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
		bottom-end
	</vwc-toggletip>
	<div></div>
</div>
```

### Anchor

It's best to use the [`anchor` slot](#anchor-1) to set the anchor, but you can also use the `anchor` member.

Either set it to the `id` of the anchor element or pass the anchor element itself.

- Type: `string | HTMLElement`
- Default: `undefined`

```html preview center 100px
<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip anchor="button1">My anchor is an ID</vwc-toggletip>

<vwc-button id="button2" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip id="toggletip">My anchor is a reference</vwc-toggletip>

<script>
	document.querySelector('#toggletip').anchor =
		document.querySelector('#button2');
</script>
```

## Slots

### Anchor

Toggletips need to be anchored to an element. Place the anchor element inside the `anchor` slot of the toggletip.

The anchor must be clickable and in most cases, will be a button displaying an information glyph as in the example below.

```html preview center 100px
<vwc-toggletip>
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	I'm a toggletip
</vwc-toggletip>
```

### Action Items

You can add action items elements using the `action-items` slot. They will be displayed right-aligned at the bottom of the toggletip.

```html preview center 150px
<vwc-toggletip>
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	This is a toggletip with action items
	<vwc-button
		appearance="outlined"
		label="Action"
		shape="pill"
		slot="action-items"
	></vwc-button>
	<vwc-button
		appearance="filled"
		label="Action"
		shape="pill"
		slot="action-items"
	></vwc-button>
</vwc-toggletip>
```

## CSS Variables

### Max Inline Size

Use the `--toggletip-max-inline-size` variable to set the toggletip's max inline size.

- Default: `30ch`

```html preview center 250px
<style>
	.toggletip {
		--toggletip-max-inline-size: 50ch;
	}
</style>

<vwc-toggletip class="toggletip" placement="top">
	<vwc-button slot="anchor" icon="help-solid" shape="pill"></vwc-button>
	Turn on to receive notifications for important updates and alerts directly to
	your email or mobile device.
</vwc-toggletip>
```
