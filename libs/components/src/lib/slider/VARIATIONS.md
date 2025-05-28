## Connotation

Use the `connotation` attribute on Slider to control the Slider track.

```html preview blocks>
<vwc-slider
	aria-label="Slider with the accent connotation"
	connotation="accent"
></vwc-slider>
<vwc-slider
	aria-label="Slider with the cta connotation"
	connotation="cta"
></vwc-slider>
```

## Markers

Use the `markers` attribute to add tick marks on the slider.  
The markers are set by the value of [`step`](/components/slider/code/#step).

```html preview blocks
<vwc-slider aria-label="Slider with markers" markers></vwc-slider>
```

## Orientation

The `orientation` attribute controls which axis the Slider is aligned.  
Below is an example of vertical alignment.

<vwc-note connotation="information">
<vwc-icon name="info-line" slot="icon"></vwc-icon>
<p>When used vertically, the Slider fits the height of its container.</p>
</vwc-note>

```html preview center 300px
<vwc-slider aria-label="Vertical slider" orientation="vertical"></vwc-slider>
```

## Pin

Use `pin` attribute to display a tooltip on the Slider knob.  
Use the [`valueTextFormatter`](/components/slider/code/#value-text-formatter) member to customize the format of the value.

```html preview
<vwc-slider aria-label="Slider with a pin" pin></vwc-slider>
<vwc-slider
	aria-label="Vertical slider with a pin"
	orientation="vertical"
	style="height: 200px"
	pin
></vwc-slider>

<script>
	for (const slider of document.querySelectorAll('vwc-slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

## Disabled

The `disabled` attribute disables the Slider.

```html preview blocks
<vwc-slider aria-label="Disabled slider" disabled></vwc-slider>
```
