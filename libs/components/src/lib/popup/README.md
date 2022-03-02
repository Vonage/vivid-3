# vwc-popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content.   
To trigger the Popup, it should be paired with an anchor (e.g., a button).

```js
<script type='module'>
    import '@vonage/vivid/popup';
</script>
```

<!-- ## Anchor

Use the `anchor` attribute to reference the ID to element in the popup’s owner document.

- Type: `string`
- Default: `''`

```html preview
<vwc-icon id="anchor" type='info-line'></vwc-icon>
<vwc-popup anchor="anchor" open>
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
<style>
    .cbd-demo{
      height: 100px;
      display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vvd-color-neutral-10);
  }
  .content {
			width: 200px;
			text-align: left;
			padding: 1rem;
		}
  .line {
    border-bottom: 1px solid var(--vvd-color-neutral-40);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
``` -->

## Open

Use the `open` attribute to indicate whether the popup is open.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-button id="buttonAnchor" appearance='filled' label='Click on me!'></vwc-button>

<vwc-popup id="popup" arrow anchor="buttonAnchor">
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
<script>
  const popup = document.getElementById("popup");
  const button = document.getElementById("buttonAnchor");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  popup.open = !popup.open;
}
</script>
<style>
    .cbd-demo{
      height: 300px;
      width: 100%;
      display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--vvd-color-neutral-10);
  }
  .content {
			width: 200px;
			text-align: left;
			padding: 1rem;
		}
  .line {
    border-bottom: 1px solid var(--vvd-color-neutral-40);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
```

<!--
## Dismissible

Use the `dismissible` attribute to add close button to the popup.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-icon id="dismissibleAnchor" type='info-line'></vwc-icon>
<vwc-popup anchor="dismissibleAnchor" open dismissible>
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
```

## Corner

Use the `corner` attribute to set the placement of the popup.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview
<vwc-icon id="cornerAnchor" type='info-line'></vwc-icon>
<vwc-popup anchor="cornerAnchor" open corner="right">
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
```

## Arrow

Use the `strategy` attribute to add small triangle to indicate the trigger element.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-icon id="arrowAnchor" type='info-line'></vwc-icon>
<vwc-popup anchor="arrowAnchor" open arrow>
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
```

## Alternate

Use the `alternate` attribute to set the color-scheme to dark.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-icon id="alternateAnchor" type='info-line'></vwc-icon>
<vwc-popup anchor="alternateAnchor" open alternate>
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
```

## Strategy

Use the `strategy` attribute to set the position of the popup.

- Type: `'fixed'` | `'absolute'`
- Default: `'fixed'`

```html preview
<vwc-icon id="strategyAnchor" type='info-line'></vwc-icon>
<vwc-popup anchor="strategyAnchor" open strategy="absolute">
    <div class="content">
      <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
      <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
    </div>
</vwc-popup>
``` -->