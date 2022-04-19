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
  <vwc-accordion-item heading="accordion item with heading">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
```

## Heading-Level
Use the `heading-level` attribute (or `headingLevel` property) to change the accordion heading to fit the page hierarchy. We should select the appropriate heading level for where the accordion will appear on the page, based on the webpage structure. It could be anything from an `<h2 />` to an `<h6 />`. You can read about it [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements).

- Type: `2` | `3` | `4` | `5` | `6`
- Default: `3`

In our example, we're using the `<h6 />` heading:
```js
<vwc-accordion-item heading="heading" heading-level="6"></vwc-accordion-item>
```
The following will be the output:
```js
<h6 class="header">
	<button class="button"></button>
</h6>
```
## Open
Use the `open` attribute to set the accordion-item's open state.

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-accordion-item heading="Click to toggle accordion item" open>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
```
## No-Indicator
Add the `no-indicator` attribute (or `noIndicator` property) to remove the indicator icon from the heading.

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-accordion-item heading="accordion item without indicator" no-indicator>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
```
## Meta
Add the `meta` attribute to add metadata to the heading. 

- Type: `string`
- Default: `''`

```html preview
 <vwc-accordion-item heading="accordion item with metadata" meta="meta-data">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
```

## Icon
Add the `icon` attribute to add an icon to the heading. 

- Type: `string`
- Default: `''`

```html preview
 <vwc-accordion-item heading="accordion item with icon" icon="chat-solid">
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
```

## Icon-Trailing
Add the `icon-trailing` attribute (or `iconTrailing` property) to add an icon to the right of the heading text.  Mind that `icon-trailing` will override the Indicator.

- Type: `boolean`
- Default: `false`

```html preview
 <vwc-accordion-item heading="accordion item with icon-trailing" icon="chat-solid" icon-trailing>
    <vwc-text font-face="body-1">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </vwc-text>
  </vwc-accordion-item>
```