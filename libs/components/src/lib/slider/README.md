# Slider

Represents a slider custom element.

```js
<script type="module">import '@vonage/vivid/slider';</script>
```

```html preview
<vwc-slider></vwc-slider>
```

## Members

### Orientation

When used vertically, the slider fills the height of its container.

- Type: `'horizontal'` | `'vertical'`
- Default: `horizontal`

```html preview blocks
<div style="height: 200px">
 	<vwc-slider orientation="vertical"></vwc-slider>
 </div>
```

### Markers

Toggles markers display.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider markers></vwc-slider>
```
### Disabled

Toggle the `disabled` member to disable/enable the slider.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider disabled></vwc-slider>
```
