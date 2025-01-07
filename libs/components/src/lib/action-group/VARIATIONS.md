## Appearance

Set the `appearance` attribute to change the action-group's appearance.

```html preview
<p>fieldset appearance (default)</p>
<vwc-action-group appearance="fieldset">
	<vwc-button label="edit"></vwc-button>
	<vwc-button label="copy"></vwc-button>
	<vwc-button label="paste"></vwc-button>
	<vwc-button label="submit"></vwc-button>
</vwc-action-group>
<p>ghost appearance</p>
<vwc-action-group appearance="ghost">
	<vwc-button label="edit" appearance="filled"></vwc-button>
	<vwc-button label="copy" appearance="filled"></vwc-button>
	<vwc-button label="paste" appearance="filled"></vwc-button>
	<vwc-button label="submit" appearance="filled"></vwc-button>
</vwc-action-group>
```

## Shape

Use the `shape` attribute to set the action-group's border-radius.  
When using shape, remember to also set it on any slotted elements.

```html preview
<vwc-action-group shape="pill">
	<vwc-button shape="pill" label="edit"></vwc-button>
	<vwc-button shape="pill" label="copy"></vwc-button>
	<vwc-button shape="pill" label="paste"></vwc-button>
	<vwc-button shape="pill" label="submit"></vwc-button>
</vwc-action-group>
```

## Tight

Set the `tight` attribute if no outer padding or gaps between slotted item are needed

```html preview
<vwc-action-group tight appearance="fieldset">
	<vwc-audio-player
		class="audio"
		src="https://download.samplelib.com/mp3/sample-6s.mp3"
	>
	</vwc-audio-player>
	<vwc-button
		size="condensed"
		icon="delete-solid"
		aria-label="delete"
		class="delete"
	></vwc-button>
</vwc-action-group>

<style>
	.audio {
		min-inline-size: 250px;
	}
	.delete {
		margin-inline-end: 8px;
	}
</style>
```
