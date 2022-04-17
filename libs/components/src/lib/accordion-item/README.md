# vwc-accordion-item

```js
<script type="module">
    import '@vonage/vivid/accordion-item';
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
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
</div>
```

## Heading-Level
Use the `heading-level` attribute to change the accordion heading to fit the page hierarchy.```

- Type: `2` | `3` | `4` | `5` | `6`
- Default: `3`

```js
<h2 class="accordion-item-header">
	<button class="accordion-item-button"></button>
</h2>
<h3 class="accordion-item-header">
	<button class="accordion-item-button"></button>
</h3>
<h4 class="accordion-item-header">
	<button class="accordion-item-button"></button>
</h4>
<h5 class="accordion-item-header">
	<button class="accordion-item-button"></button>
</h5>
<h6 class="accordion-item-header">
	<button class="accordion-item-button"></button>
</h6>
```
## Open
Use the `open` attribute to indicate whether the accordion item is open.
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
 <vwc-accordion-item heading="Click to toggle accordion item" open>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
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
 <vwc-accordion-item heading="accordion item without indicator" no-indicator>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
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
 <vwc-accordion-item heading="accordion item with Metadata" meta="meta-data">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
</div>
```
## Dense
You can turn the accordion-item into dense mode by adding the `dense` attribute.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-accordion-item heading="accordion item with dense" dense>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
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
 <vwc-accordion-item heading="accordion item with Icon" icon="chat-solid">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
</div>
```

## Icon-Trailing
Add the `icon-trailing` attribute to add an icon to the right of the heading text.  Mind that `icon-trailing` will overide the Indicator.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 500px;
  }
</style>
<div class="wrapper">
 <vwc-accordion-item heading="accordion item with Icon-Trailing" icon="chat-solid" icon-trailing>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
</div>
```

  ## Methods

| Method       | Type       | Description                                      |
| ------------ | ---------- | ------------------------------------------------ |
| `hide`       | `(): void` | Closes the accordion item from the open state.  |
| `show`       | `(): void` | Opens the accordion item from the closed state. |
| `toggleOpen` | `(): void` | Toggles the accordion item.                     |