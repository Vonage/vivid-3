## Connotation

Use the `connotation` attribute on Range Slider to control the color of the selected range.  
Below is an example of cta connotation.

```html preview blocks>
<vwc-range-slider connotation="cta"></vwc-range-slider>
```

## Markers

Use `markers` attribute to add tick marks on the slider.  
The markers are set by the value of [`step`](./code/#step).

```html preview blocks
<vwc-range-slider markers></vwc-range-slider>
```

## Orientation

The `orientation` attribute controls which axis the Range Slider is aligned.  
Below is an example of vertical alignment.

<vwc-note connotation="information" icon="info-line">
<p>When used vertically, the range slider fits the height of its container.</p>
</vwc-note>

```html preview center 300px
<vwc-range-slider orientation="vertical"></vwc-range-slider>
```

## Pin

Use `pin` attribute to display a tooltip at the start and end values.  
Use the [`valueTextFormatter`](/code/#value-text-formatter) member to customize the format of the values.

```html preview
<vwc-range-slider pin id="slider"></vwc-range-slider>
<vwc-range-slider
	orientation="vertical"
	style="height: 200px"
	pin
></vwc-range-slider>
<script>
	for (const slider of document.querySelectorAll('#slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

## Disabled

The `disabled` attribute disables the Range Slider.

```html preview blocks
<vwc-range-slider disabled></vwc-range-slider>
```
