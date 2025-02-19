## Value

Providing a numeric value to the `value` attribute sets the amount of progress to be displayed in [determinate state](/components/progress-ring/use-cases/#determinate-state). In order to present an [indeterminate state](/components/progress-ring/use-cases/#indeterminate-state) either omit the `value` attribute or provide a non-numeric value.

```html preview
<b>Determinate</b>
<vwc-progress-ring
	value="50"
	aria-label="You are 50% through the process"
></vwc-progress-ring>
<br /><b>Indeterminate</b>
<vwc-progress-ring aria-label="Loading search results"></vwc-progress-ring>
```

## Min / Max

Use `min` and `max` attributes to determine the range of the progress.

```html preview blocks
<vwc-progress-ring min="0" max="50" value="12.5"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50"></vwc-progress-ring>
<vwc-progress-ring min="0" max="100" value="50"></vwc-progress-ring>
```

## Connotation

The `connotation` attribute controls the color of the Progress Ring component.

```html preview
<b>accent (default)</b>
<vwc-progress-ring connotation="accent"></vwc-progress-ring>
<br /><b>cta</b>
<vwc-progress-ring connotation="cta"></vwc-progress-ring>
<br /><b>success</b>
<vwc-progress-ring connotation="success"></vwc-progress-ring>
<br /><b>alert</b> <vwc-progress-ring connotation="alert"></vwc-progress-ring>
```

## Size

Use the `size` attribute to set the progress ring's size. Set a numeric value from `-6` to `5`. The default is `0`.

```html preview blocks
<vwc-progress-ring min="0" max="50" value="50" size="-6"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="-5"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="-4"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="-3"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="-2"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="-1"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="0"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="1"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="2"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="3"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="4"></vwc-progress-ring>
<vwc-progress-ring min="0" max="50" value="50" size="5"></vwc-progress-ring>
```

## Paused

The `paused` attribute shows a disabled / paused state of the progress.

```html preview
<vwc-progress-ring min="0" max="50" value="25" paused></vwc-progress-ring>
```
