## Swatches

The `swatches` attribute sets a color palette from which users can select colors.

It accepts an array of objects with `value` and `label` properties: `[{"label": "Red", "value": "#ff0000"}, {"value": "#00ff00"}]`. The optional `label` property provides descriptive text for screen readers, improving accessibility.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	
	It is **highly recommended** to provide a descriptive `label` attribute for each color swatch, which will be announced by screen readers.
	
</vwc-note>

```html preview 180px
<vwc-simple-color-picker id="picker">
	<vwc-button aria-label="Pick color" slot="anchor" size="super-condensed" shape="pill" appearance="outlined">
		<vwc-icon id="icon" slot="icon" name="textcolor-solid"></vwc-icon>
	</vwc-button>
</vwc-simple-color-picker>
<script>
	const swatches = [
		{
			label: 'Black',
			value: '#000000',
		},
		{
			label: 'Maroon',
			value: '#6E0000',
		},
		{
			label: 'Burnt Orange',
			value: '#BE5702',
		},
		{
			label: 'Forest Green',
			value: '#183A1E',
		},
		{
			label: 'Navy Blue',
			value: '#0E306D',
		},
		{
			label: 'Indigo',
			value: '#440291',
		},
		{
			label: 'Magenta',
			value: '#620256',
		},
		{
			label: 'Grey',
			value: '#757575',
		},
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Purple',
			value: '#9941FF',
		},
		{
			label: 'Pink',
			value: '#D6219C',
		},
	];

	const picker = document.getElementById('picker');
	const buttonIcon = document.getElementById('icon');
	picker.swatches = swatches;

	picker.addEventListener('change', (e) => {
		const selectedColor = e.target.value;
		buttonIcon.setAttribute('style', `color: ${selectedColor}; `);
	});
</script>
```

## Swatches Per Row

The `swatches-per-row` attribute controls how many swatches should be displayed in a single row of the color palette's grid.

- Type: `number`
- Default: `7`

```html preview 160px
<vwc-simple-color-picker id="picker" swatches-per-row="3">
	<vwc-button aria-label="Pick color" slot="anchor" size="super-condensed" shape="pill" appearance="outlined">
		<vwc-icon id="icon" slot="icon" name="textcolor-solid"></vwc-icon>
	</vwc-button>
</vwc-simple-color-picker>

<script>
	const swatches = [
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Purple',
			value: '#9941FF',
		},
		{
			label: 'Pink',
			value: '#D6219C',
		},
	];

	const picker = document.getElementById('picker');
	const buttonIcon = document.getElementById('icon');
	picker.swatches = swatches;

	picker.addEventListener('change', (e) => {
		const selectedColor = e.target.value;
		buttonIcon.setAttribute('style', `color: ${selectedColor}; `);
	});
</script>
```

## Placement

The `placement` attribute sets the default placement of the Simple Color Picker's popup around its anchor element.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `top-start`

```html preview center 160px
<div class="wrapper">
	<vwc-simple-color-picker id="picker" placement="top">
		<vwc-button aria-label="Pick color" slot="anchor" size="super-condensed" shape="pill" appearance="outlined">
			<vwc-icon id="icon" slot="icon" name="textcolor-solid"></vwc-icon>
		</vwc-button>
	</vwc-simple-color-picker>
</div>

<style>
	.wrapper {
		padding-block-start: 100px;
	}
</style>

<script>
	const swatches = [
		{
			label: 'Black',
			value: '#000000',
		},
		{
			label: 'Maroon',
			value: '#6E0000',
		},
		{
			label: 'Burnt Orange',
			value: '#BE5702',
		},
		{
			label: 'Forest Green',
			value: '#183A1E',
		},
		{
			label: 'Navy Blue',
			value: '#0E306D',
		},
		{
			label: 'Indigo',
			value: '#440291',
		},
		{
			label: 'Magenta',
			value: '#620256',
		},
		{
			label: 'Grey',
			value: '#757575',
		},
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Purple',
			value: '#9941FF',
		},
		{
			label: 'Pink',
			value: '#D6219C',
		},
	];

	const picker = document.getElementById('picker');
	const buttonIcon = document.getElementById('icon');
	picker.swatches = swatches;

	picker.addEventListener('change', (e) => {
		const selectedColor = e.target.value;
		buttonIcon.setAttribute('style', `color: ${selectedColor}; `);
	});
</script>
```
