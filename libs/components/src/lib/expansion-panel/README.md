# vwc-expansion-panel

```js
<script type="module">
    import '@vonage/vivid/expansion-panel';
</script>
```
## Heading
Add the `heading` attribute to set the heading text.

- Type: `string`
- Default: `''`
  
```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
  <vwc-expansion-panel heading="Expansion panel with heading">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```

## Heading-Level
Use the `heading-level` attribute to change the expansion panel's size.

- Type: `2` | `3` | `4` | `5` | `6`
- Default: `3`

```js
<h2 class="expansion-panel-header">
	<button class="expansion-panel-button"></button>
</h2>
<h3 class="expansion-panel-header">
	<button class="expansion-panel-button"></button>
</h3>
<h4 class="expansion-panel-header">
	<button class="expansion-panel-button"></button>
</h4>
<h5 class="expansion-panel-header">
	<button class="expansion-panel-button"></button>
</h5>
<h6 class="expansion-panel-header">
	<button class="expansion-panel-button"></button>
</h6>
```
## Open
Use the `open` attribute to indicate whether the expansion panel is open.
Alternatively, you can use the `show()` and `hide()` methods as well as `toggleOpen()`.
- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-expansion-panel heading="Click to toggle expansion panel" open>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```
## No-Indicator
Add the `no-indicator` attribute to remove the indicator icon from the heading.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-expansion-panel heading="Without indicator" no-indicator>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```

## Icon
Add the `icon` attribute to add an icon to the heading. 

- Type: `string`
- Default: `''`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-expansion-panel heading="With Icon" icon="chat-solid">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```

## Icon-Trailing
Add the `icon-trailing` attribute to add an icon to the right of the heading text.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-expansion-panel heading="With Icon-Trailing" icon="chat-solid" icon-trailing>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```

## Meta
Add the `meta` attribute to add metadata to the heading. 

- Type: `string`
- Default: `''`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-expansion-panel heading="With Metadata" meta="meta-data">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```
## Dense
You can turn the expansion-panel into dense mode by adding the `dense` attribute.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-expansion-panel heading="With dense" dense>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-expansion-panel>
</div>
```

  ## Methods

| Method       | Type       | Description                                      |
| ------------ | ---------- | ------------------------------------------------ |
| `hide`       | `(): void` | Closes the expansion panel from the open state.  |
| `show`       | `(): void` | Opens the expansion panel from the closed state. |
| `toggleOpen` | `(): void` | Toggles the expansion panel.                     |