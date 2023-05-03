# Toggletip

Toggletips provide supplementary or clarifying information. The main differences with tooltips is that they require a click to display and are keyboard accessible.
This means they can display user actions such as links or buttons.

```js
<script type="module">
	import '@vonage/vivid/toggletip';
</script>
```

## Members

### Anchor

Use the `anchor` attribute to link the toggletip to the element responsible for showing and hiding it. It can be the ID or a reference to said element.

The anchor must be clickable and in most cases, will be a button displaying an information glyph as in the example below.

- Type: `string | HTMLElement`
- Default: `undefined`

```html preview center
<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip anchor="button1">My anchor is an ID</vwc-toggletip>

<vwc-button id="button2" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip id="toggletip">My anchor is a reference</vwc-toggletip>

<script>
	toggletip.anchor = button2;
</script>
```

### Open

You can toggle toggletip's display by using the `open` attribute.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip anchor="button1" open>I'm open by default</vwc-toggletip>
```

### Headline

Use the `headline` attribute to set the toggletip's headline.

- Type: `string`
- Default: `undefined`

```html preview center
<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip anchor="button1" headline="This is the headline">This is the content</vwc-toggletip>
```

### Alternate

Add the `alternate` attribute to change the toggletip's color-scheme to the opposite of the currently selected one.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>
<vwc-toggletip anchor="button1" alternate>An alternate toggletip</vwc-toggletip>
```

### Placement

Use the `placement` attribute to control the position of the toggletip relative to its anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'` | `'left'` | `'left-start'` | `'left-end'`
- Default: `'right'`

```html preview center
<style>
	body {
		height: 200px;
	}
</style>

<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>

<vwc-toggletip anchor="button1" placement="top">top</vwc-toggletip>
<vwc-toggletip anchor="button1" placement="right">right</vwc-toggletip>
<vwc-toggletip anchor="button1" placement="bottom">bottom</vwc-toggletip>
<vwc-toggletip anchor="button1" placement="left">left</vwc-toggletip>
```

## Slots

### Action Items

You can add action items elements using the `action-items` slot. They will be displayed right-aligned at the bottom of the toggletip.

```html preview center
<vwc-button id="button1" icon="help-solid" shape="pill"></vwc-button>

<vwc-toggletip anchor="button1">
	This is a toggletip with action items
	<vwc-button appearance='outlined' label='Action' shape='pill' slot="action-items"></vwc-button>
	<vwc-button appearance='filled' label='Action' shape='pill' slot="action-items"></vwc-button>
</vwc-toggletip>
```
