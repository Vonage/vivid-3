## Value

Providing a numeric value to the `value` attribute sets the amount of progress to be displayed in [determinate state](/components/progress/use-cases/#determinate-state). In order to present an [indeterminate state](/components/progress/use-cases/#indeterminate-state) provide a non-numeric value.

```html preview
<b>Determinate</b>
<vwc-progress
	value="50"
	aria-label="You are 50% through the process"
></vwc-progress>
<br /><b>Indeterminate</b>
<vwc-progress
	value="loading"
	aria-label="Loading search results"
></vwc-progress>
```

## Min / Max

Use `min` and `max` attributes to determine the range of the progress.

```html preview
<vwc-progress min="1" max="5" value="2" aria-label="Step 2 of 5"></vwc-progress>
```

## Connotation

The `connotation` attribute controls the color of the Progress component.

```html preview
<b>accent (default)</b>
<vwc-progress min="0" max="100" value="25" connotation="accent"></vwc-progress>
<br /><b>cta</b>
<vwc-progress min="0" max="100" value="25" connotation="cta"></vwc-progress>
<br /><b>success</b>
<vwc-progress min="0" max="100" value="25" connotation="success"></vwc-progress>
<br /><b>alert</b>
<vwc-progress min="0" max="100" value="25" connotation="alert"></vwc-progress>
<br /><b>pacific</b>
<vwc-progress min="0" max="100" value="25" connotation="pacific"></vwc-progress>
```

## Shape

The `shape` attribute the border radius.

```html preview
<b>rounded (default)</b>
<vwc-progress min="0" max="50" value="25" shape="rounded"></vwc-progress>
<br /><b>sharp</b>
<vwc-progress min="0" max="50" value="25" shape="sharp"></vwc-progress>
```

## Paused

The `paused` attribute shows a disabled / paused state of the progress.

```html preview
<b>Determinate</b>
<vwc-progress min="0" max="50" value="25" paused></vwc-progress>
<br /><b>Indeterminate</b>
<vwc-progress min="0" max="50" value="indeterminate" paused></vwc-progress>
```

## Reverse

The `reverse` attribute sets the progress from right to left.

```html preview
<b>Determinate</b>
<vwc-progress min="0" max="50" value="25" reverse></vwc-progress>
<br /><b>Indeterminate</b>
<vwc-progress min="0" max="50" value="indeterminate" reverse></vwc-progress>
```
