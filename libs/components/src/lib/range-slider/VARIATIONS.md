## Connotation

Use the `connotation` attribute on Range Slider to control the color of the selected range.

```html preview blocks>
<vwc-range-slider
	connotation="accent"
	aria-label="Accent connotation example"
></vwc-range-slider>
<vwc-range-slider
	connotation="cta"
	aria-label="CTA connotation example"
></vwc-range-slider>
```

## Markers

Use the `markers` attribute to add tick marks on the slider.  
The markers are set by the value of [`step`](/components/range-slider/code/#step).

```html preview blocks
<vwc-range-slider markers aria-label="Example with markers"></vwc-range-slider>
```

## Orientation

The `orientation` attribute controls which axis the Range Slider is aligned.  
Below is an example of vertical alignment.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>When used vertically, the range slider fits the height of its container.</p>
</vwc-note>

```html preview center 300px
<vwc-range-slider
	orientation="vertical"
	aria-label="Vertical orientation example"
></vwc-range-slider>
```

## Pin

Use `pin` attribute to display a tooltip at the start and end values.  
Use the [`valueTextFormatter`](/components/range-slider/code/#value-text-formatter) member to customize the format of the values.

```html preview
<vwc-range-slider
	pin
	id="slider"
	aria-label="Horizontal example with pins"
></vwc-range-slider>
<vwc-range-slider
	orientation="vertical"
	style="height: 200px"
	pin
	aria-label="Vertical example with pins"
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
<vwc-range-slider disabled aria-label="Disabled example"></vwc-range-slider>
```
