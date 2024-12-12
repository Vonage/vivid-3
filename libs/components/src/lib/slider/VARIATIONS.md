## Connotation

Use the `connotation` attribute on Slider to control the Slider track.  
Below is an example of cta connotation.

```html preview blocks>
<vwc-slider connotation="cta"></vwc-slider>
```

## Markers

Use the `markers` attribute to add tick marks on the slider.  
The markers are set by the value of [`step`](./code/#step).

```html preview blocks
<vwc-slider markers></vwc-slider>
```

## Orientation

The `orientation` attribute controls which axis the Slider is aligned.  
Below is an example of vertical alignment.

<vwc-note connotation="information" icon="info-line">
<p>When used vertically, the Slider fits the height of its container.</p>
</vwc-note>

```html preview center 300px
<vwc-slider orientation="vertical"></vwc-slider>
```

## Pin

Use `pin` attribute to display a tooltip on the Slider knob.  
Use the [`valueTextFormatter`](/components/slider/code/#value-text-formatter) member to customize the format of the value.

```html preview
<vwc-slider pin></vwc-slider>
<vwc-slider orientation="vertical" style="height: 200px" pin></vwc-slider>

<script>
	for (const slider of document.querySelectorAll('vwc-slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

## Disabled

The `disabled` attribute disables the Slider.

```html preview blocks
<vwc-slider disabled></vwc-slider>
```
