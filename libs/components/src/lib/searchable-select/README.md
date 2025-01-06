# Searchable Select

Searchable Select allows users to select one or multiple items from a list of options. It provides a search input field to filter the options.

```js
<script type="module">import '@vonage/vivid/searchable-select';</script>
```

```html preview 500px
<style>
	vwc-searchable-select {
		width: 400px;
	}
</style>
<vwc-searchable-select label="Countries" clearable multiple>
	<vwc-icon slot="icon" name="globe-line"></vwc-icon>
	<vwc-option
		icon="flag-afghanistan"
		value="afghanistan"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="albania" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="algeria" text="Algeria"></vwc-option>
	<vwc-option
		icon="flag-argentina"
		value="argentina"
		text="Argentina"
	></vwc-option>
	<vwc-option icon="flag-armenia" value="armenia" text="Armenia"></vwc-option>
	<vwc-option icon="flag-aruba" value="aruba" text="Aruba"></vwc-option>
	<vwc-option
		icon="flag-australia"
		value="australia"
		text="Australia"
	></vwc-option>
	<vwc-option icon="flag-austria" value="austria" text="Austria"></vwc-option>
	<vwc-option icon="flag-bahamas" value="bahamas" text="Bahamas"></vwc-option>
	<vwc-option icon="flag-bahrain" value="bahrain" text="Bahrain"></vwc-option>
	<vwc-option icon="flag-belarus" value="belarus" text="Belarus"></vwc-option>
	<vwc-option icon="flag-belgium" value="belgium" text="Belgium"></vwc-option>
	<vwc-option icon="flag-benin" value="benin" text="Benin"></vwc-option>
	<vwc-option icon="flag-bolivia" value="bolivia" text="Bolivia"></vwc-option>
	<vwc-option
		icon="flag-botswana"
		value="botswana"
		text="Botswana"
	></vwc-option>
	<vwc-option icon="flag-brazil" value="brazil" text="Brazil"></vwc-option>
	<vwc-option
		icon="flag-bulgaria"
		value="bulgaria"
		text="Bulgaria"
	></vwc-option>
	<vwc-option
		icon="flag-burkina-faso"
		value="burkina-faso"
		text="Burkina Faso"
	></vwc-option>
	<vwc-option
		icon="flag-cambodia"
		value="cambodia"
		text="Cambodia"
	></vwc-option>
	<vwc-option icon="flag-canada" value="canada" text="Canada"></vwc-option>
	<vwc-option
		icon="flag-cayman-islands"
		value="cayman-islands"
		text="Cayman Islands"
	></vwc-option>
	<vwc-option
		icon="flag-central-african-republic"
		value="central-african-republic"
		text="Central African Republic"
	></vwc-option>
	<vwc-option icon="flag-chad" value="chad" text="Chad"></vwc-option>
	<vwc-option icon="flag-chile" value="chile" text="Chile"></vwc-option>
	<vwc-option icon="flag-china" value="china" text="China"></vwc-option>
	<vwc-option
		icon="flag-colombia"
		value="colombia"
		text="Colombia"
	></vwc-option>
	<vwc-option
		icon="flag-costa-rica"
		value="costa-rica"
		text="Costa Rica"
	></vwc-option>
	<vwc-option icon="flag-croatia" value="croatia" text="Croatia"></vwc-option>
	<vwc-option icon="flag-cyprus" value="cyprus" text="Cyprus"></vwc-option>
	<vwc-option icon="flag-denmark" value="denmark" text="Denmark"></vwc-option>
	<vwc-option
		icon="flag-dominican-republic"
		value="dominican-republic"
		text="Dominican Republic"
	></vwc-option>
	<vwc-option icon="flag-egypt" value="egypt" text="Egypt"></vwc-option>
	<vwc-option
		icon="flag-el-salvador"
		value="el-salvador"
		text="El Salvador"
	></vwc-option>
	<vwc-option icon="flag-estonia" value="estonia" text="Estonia"></vwc-option>
	<vwc-option
		icon="flag-european-union"
		value="european-union"
		text="European Union"
	></vwc-option>
	<vwc-option icon="flag-finland" value="finland" text="Finland"></vwc-option>
	<vwc-option icon="flag-france" value="france" text="France"></vwc-option>
	<vwc-option icon="flag-georgia" value="georgia" text="Georgia"></vwc-option>
	<vwc-option icon="flag-germany" value="germany" text="Germany"></vwc-option>
	<vwc-option icon="flag-ghana" value="ghana" text="Ghana"></vwc-option>
	<vwc-option icon="flag-grenada" value="grenada" text="Grenada"></vwc-option>
	<vwc-option
		icon="flag-guatemala"
		value="guatemala"
		text="Guatemala"
	></vwc-option>
	<vwc-option
		icon="flag-honduras"
		value="honduras"
		text="Honduras"
	></vwc-option>
	<vwc-option
		icon="flag-hong-kong"
		value="hong-kong"
		text="Hong Kong"
	></vwc-option>
	<vwc-option icon="flag-hungary" value="hungary" text="Hungary"></vwc-option>
	<vwc-option icon="flag-iceland" value="iceland" text="Iceland"></vwc-option>
	<vwc-option icon="flag-india" value="india" text="India"></vwc-option>
	<vwc-option
		icon="flag-indonesia"
		value="indonesia"
		text="Indonesia"
	></vwc-option>
	<vwc-option icon="flag-ireland" value="ireland" text="Ireland"></vwc-option>
	<vwc-option icon="flag-israel" value="israel" text="Israel"></vwc-option>
	<vwc-option icon="flag-italy" value="italy" text="Italy"></vwc-option>
	<vwc-option icon="flag-jamaica" value="jamaica" text="Jamaica"></vwc-option>
	<vwc-option icon="flag-japan" value="japan" text="Japan"></vwc-option>
	<vwc-option icon="flag-latvia" value="latvia" text="Latvia"></vwc-option>
	<vwc-option
		icon="flag-liechtenstein"
		value="liechtenstein"
		text="Liechtenstein"
	></vwc-option>
	<vwc-option
		icon="flag-lithuania"
		value="lithuania"
		text="Lithuania"
	></vwc-option>
	<vwc-option
		icon="flag-luxembourg"
		value="luxembourg"
		text="Luxembourg"
	></vwc-option>
	<vwc-option icon="flag-macao" value="macao" text="Macao"></vwc-option>
	<vwc-option
		icon="flag-malaysia"
		value="malaysia"
		text="Malaysia"
	></vwc-option>
	<vwc-option icon="flag-malta" value="malta" text="Malta"></vwc-option>
	<vwc-option
		icon="flag-mauritius"
		value="mauritius"
		text="Mauritius"
	></vwc-option>
	<vwc-option icon="flag-mexico" value="mexico" text="Mexico"></vwc-option>
	<vwc-option icon="flag-moldova" value="moldova" text="Moldova"></vwc-option>
	<vwc-option
		icon="flag-netherlands"
		value="netherlands"
		text="Netherlands"
	></vwc-option>
	<vwc-option
		icon="flag-new-zealand"
		value="new-zealand"
		text="New Zealand"
	></vwc-option>
	<vwc-option icon="flag-nigeria" value="nigeria" text="Nigeria"></vwc-option>
	<vwc-option icon="flag-norway" value="norway" text="Norway"></vwc-option>
	<vwc-option
		icon="flag-pakistan"
		value="pakistan"
		text="Pakistan"
	></vwc-option>
	<vwc-option icon="flag-panama" value="panama" text="Panama"></vwc-option>
	<vwc-option icon="flag-peru" value="peru" text="Peru"></vwc-option>
	<vwc-option
		icon="flag-philippines"
		value="philippines"
		text="Philippines"
	></vwc-option>
	<vwc-option icon="flag-poland" value="poland" text="Poland"></vwc-option>
	<vwc-option
		icon="flag-portugal"
		value="portugal"
		text="Portugal"
	></vwc-option>
	<vwc-option
		icon="flag-puertorico"
		value="puertorico"
		text="Puerto Rico"
	></vwc-option>
	<vwc-option icon="flag-romania" value="romania" text="Romania"></vwc-option>
	<vwc-option icon="flag-russia" value="russia" text="Russia"></vwc-option>
	<vwc-option icon="flag-rwanda" value="rwanda" text="Rwanda"></vwc-option>
	<vwc-option
		icon="flag-saudi-arabia"
		value="saudi-arabia"
		text="Saudi Arabia"
	></vwc-option>
	<vwc-option icon="flag-serbia" value="serbia" text="Serbia"></vwc-option>
	<vwc-option
		icon="flag-singapore"
		value="singapore"
		text="Singapore"
	></vwc-option>
	<vwc-option
		icon="flag-slovakia"
		value="slovakia"
		text="Slovakia"
	></vwc-option>
	<vwc-option
		icon="flag-slovenia"
		value="slovenia"
		text="Slovenia"
	></vwc-option>
	<vwc-option
		icon="flag-south-africa"
		value="south-africa"
		text="South Africa"
	></vwc-option>
	<vwc-option
		icon="flag-south-korea"
		value="south-korea"
		text="South Korea"
	></vwc-option>
	<vwc-option icon="flag-spain" value="spain" text="Spain"></vwc-option>
	<vwc-option
		icon="flag-sri-lanka"
		value="sri-lanka"
		text="Sri Lanka"
	></vwc-option>
	<vwc-option icon="flag-sweden" value="sweden" text="Sweden"></vwc-option>
	<vwc-option
		icon="flag-switzerland"
		value="switzerland"
		text="Switzerland"
	></vwc-option>
	<vwc-option icon="flag-taiwan" value="taiwan" text="Taiwan"></vwc-option>
	<vwc-option
		icon="flag-tajikistan"
		value="tajikistan"
		text="Tajikistan"
	></vwc-option>
	<vwc-option
		icon="flag-tanzania"
		value="tanzania"
		text="Tanzania"
	></vwc-option>
	<vwc-option
		icon="flag-thailand"
		value="thailand"
		text="Thailand"
	></vwc-option>
	<vwc-option
		icon="flag-trinidad-and-tobago"
		value="trinidad-and-tobago"
		text="Trinidad and Tobago"
	></vwc-option>
	<vwc-option icon="flag-turkey" value="turkey" text="Turkey"></vwc-option>
	<vwc-option icon="flag-ukraine" value="ukraine" text="Ukraine"></vwc-option>
	<vwc-option
		icon="flag-united-arab-emirates"
		value="united-arab-emirates"
		text="United Arab Emirates"
	></vwc-option>
	<vwc-option
		icon="flag-united-kingdom"
		value="united-kingdom"
		text="United Kingdom"
	></vwc-option>
	<vwc-option
		icon="flag-united-states"
		value="united-states"
		text="United States"
	></vwc-option>
	<vwc-option icon="flag-uruguay" value="uruguay" text="Uruguay"></vwc-option>
	<vwc-option
		icon="flag-uzbekistan"
		value="uzbekistan"
		text="Uzbekistan"
	></vwc-option>
	<vwc-option
		icon="flag-venezuela"
		value="venezuela"
		text="Venezuela"
	></vwc-option>
	<vwc-option icon="flag-vietnam" value="vietnam" text="Vietnam"></vwc-option>
	<vwc-option icon="flag-zambia" value="zambia" text="Zambia"></vwc-option>
</vwc-searchable-select>
```

## Members

### Label

Adds a label.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview 230px
<vwc-searchable-select label="Select an option">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
```

### Placeholder

Adds a placeholder.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview 230px
<vwc-searchable-select placeholder="Select an option...">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select placeholder="Select an option..." multiple>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
```

### Appearance

Changes the appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

```html preview 200px
<vwc-searchable-select
	aria-label="Options Selector"
	appearance="ghost"
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2 "></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	aria-label="Options Selector"
	appearance="ghost"
	multiple
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2 "></vwc-option>
</vwc-searchable-select>
```

### Shape

Changes the shape.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview 250px
<vwc-searchable-select aria-label="Options Selector" shape="pill" clearable>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	aria-label="Options Selector"
	shape="pill"
	multiple
	clearable
	max-lines="2"
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2" selected></vwc-option>
	<vwc-option value="3" text="Option 3" selected></vwc-option>
	<vwc-option value="4" text="Option 4" selected></vwc-option>
</vwc-searchable-select>
```

### Helper text

Adds helper text below the input field. If you need to add HTML to the helper text, use the `helper-text` slot.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview 230px
<vwc-searchable-select
	label="choose one option"
	helper-text="Helper text"
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	label="choose one option"
	helper-text="Helper text"
	multiple
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
```

### Success text

Adds success text below the input field.
If provided, `success-text` will take precedence over errors.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview 230px
<vwc-searchable-select
	label="Choose an option"
	success-text="Success text"
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	label="Choose an option"
	success-text="Success text"
	multiple
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
```

### Error text

Sets a custom error message and forces error state.
Note that any current error state will be overridden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview 230px
<vwc-searchable-select
	label="Choose an option"
	error-text="Please pick one"
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	label="Choose an option"
	error-text="Please pick one"
	multiple
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
```

### Disabled

Disables the component.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-searchable-select aria-label="Options Selector" disabled clearable>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select
	aria-label="Options Selector"
	disabled
	multiple
	clearable
>
	<vwc-option value="1" text="Option 1" selected></vwc-option>
</vwc-searchable-select>
```

### Icon

Adds an icon at the start of the input.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview 230px
<vwc-searchable-select label="Country" icon="globe-line">
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Multiple

Allows users to select multiple options.

- Type: `boolean`
- Default: `false`

```html preview 230px
<vwc-searchable-select multiple label="Countries">
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### Values

Sets or gets selected values.

- Type: `Array<string>`
- Default: `[]`

<vwc-note connotation="information" icon="info-line">

web components (as with all HTML elements) can only accept strings as their attributes. <code>Values</code> requires an array, so it has to be set programmatically.

</vwc-note>

```html preview 230px
<vwc-searchable-select multiple label="Countries">
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
<script>
	customElements.whenDefined('vwc-searchable-select').then(() => {
		document.querySelector('vwc-searchable-select').values = ['AF', 'DZ'];
	});
</script>
```

### Max Lines

When used with a `multiple`, this controls the maximum number of lines of tags to display. If the number of selected options exceeds this value, the remaining tags will be hidden and a counter will be displayed instead.

- Type: `number | null`
- Default: `null`

```html preview 230px
<vwc-searchable-select multiple label="Countries" max-lines="2">
	<vwc-option
		icon="flag-afghanistan"
		value="afghanistan"
		text="Afghanistan"
		selected
	></vwc-option>
	<vwc-option
		icon="flag-albania"
		value="albania"
		text="Albania"
		selected
	></vwc-option>
	<vwc-option
		icon="flag-algeria"
		value="algeria"
		text="Algeria"
		selected
	></vwc-option>
	<vwc-option
		icon="flag-argentina"
		value="argentina"
		text="Argentina"
		selected
	></vwc-option>
	<vwc-option
		icon="flag-armenia"
		value="armenia"
		text="Armenia"
		selected
	></vwc-option>
	<vwc-option
		icon="flag-aruba"
		value="aruba"
		text="Aruba"
		selected
	></vwc-option>
	<vwc-option
		icon="flag-australia"
		value="australia"
		text="Australia"
		selected
	></vwc-option>
</vwc-searchable-select>
```

### Clearable

Adds a clear button to the input field, which clears the selected value(s) when clicked.

- Type: `boolean`
- Default: `false`

```html preview 230px
<vwc-searchable-select multiple label="Countries" clearable>
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

### External Tags

Only applicable in combination with `multiple`.
When set, the selected tags will not be displayed inside the component.

- Type: `boolean`
- Default: `false`

```html preview 230px
<vwc-searchable-select external-tags multiple label="Countries" clearable>
	<vwc-option
		icon="flag-afghanistan"
		value="AF"
		text="Afghanistan"
	></vwc-option>
	<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
	<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
<vwc-searchable-select external-tags multiple label="Company Type" clearable>
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
</vwc-searchable-select>
<vwc-tag-group></vwc-tag-group>
<script>
	function updateTags() {
		document.querySelector('vwc-tag-group').innerHTML = '';
		for (const option of document.querySelectorAll('vwc-option')) {
			if (option.selected) {
				const tag = document.createElement('vwc-tag');
				tag.label = option.text;
				tag.removable = true;
				tag.dataset.value = option.value;
				document.querySelector('vwc-tag-group').append(tag);
			}
		}
	}
	for (const select of document.querySelectorAll('vwc-searchable-select')) {
		select.addEventListener('change', updateTags);
	}
	updateTags();
	document
		.querySelector('vwc-tag-group')
		.addEventListener('removed', (event) => {
			const option = document.querySelector(
				`vwc-option[value="${event.target.dataset.value}"]`
			);
			option.selected = false;
			updateTags();
		});
</script>
```

### Fixed Dropdown

Changes the dropdown to use a fixed position strategy.
This is useful for cases in which the dropdown is obstructed by other elements.

- Type: `boolean`
- Default: `false`

### Open

Controls whether the dropdown is open.

- Type: `boolean`
- Default: `false`

```html preview 230px
<vwc-searchable-select aria-label="Options Selector" open>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
</vwc-searchable-select>
```

## Slots

### Default

Holds the available options as [Option](/components/option/) elements.

```html preview 230px
<vwc-searchable-select label="Select an option">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-searchable-select>
```

You can use the [Option's `tag-icon` slot](/components/option/#tag-icon) to display an icon next to the selected option's tag.

```html preview 320px
<vwc-searchable-select label="Country" clearable multiple>
	<vwc-option
		icon="flag-afghanistan"
		value="afghanistan"
		text="Afghanistan"
		selected
	>
		<vwc-icon slot="tag-icon" name="flag-afghanistan"></vwc-icon>
	</vwc-option>
	<vwc-option icon="flag-albania" value="albania" text="Albania">
		<vwc-icon slot="tag-icon" name="flag-albania"></vwc-icon>
	</vwc-option>
	<vwc-option icon="flag-algeria" value="algeria" text="Algeria">
		<vwc-icon slot="tag-icon" name="flag-algeria"></vwc-icon>
	</vwc-option>
</vwc-searchable-select>
```

### Icon

Set the `icon` slot to show an icon at the start of the input.
If set, the `icon` attribute is ignored.

```html preview 230px
<vwc-searchable-select aria-label="Options Selector">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-searchable-select>
```

### Meta

Use the `meta` slot to show meta information at the end of the input field.

```html preview 230px
<style>
	vwc-searchable-select {
		width: 250px;
	}
</style>
<vwc-searchable-select aria-label="Options Selector" multiple>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
</vwc-searchable-select>
```

### Helper Text

The `helper-text` slot allows you to use rich content as the helper text.

```html preview 230px
<vwc-searchable-select label="Business Type">
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
	<span slot="helper-text">
		Please select the <a href="#">type of your business</a>.
	</span>
</vwc-searchable-select>
```

### No Options

The `no-options` slot allows you to customize the message when there are no options to choose from.

```html preview 400px
<style>
	vwc-empty-state {
		margin: 24px;
	}
</style>
<vwc-searchable-select label="Connect number">
	<span slot="no-options">You do not have any numbers.</span>
</vwc-searchable-select>
<vwc-searchable-select label="Connect number">
	<vwc-empty-state
		slot="no-options"
		icon="phone-number-line"
		headline="No numbers"
	>
		You do not have any numbers yet.
	</vwc-empty-state>
</vwc-searchable-select>
```

### No Matches

The `no-matches` slot allows you to customize the message that appears when no options match the search query.

```html preview 230px
<vwc-searchable-select label="Connect number">
	<vwc-option value="1" text="+1 1243 546789"></vwc-option>
	<span slot="no-matches"> No numbers found. </span>
</vwc-searchable-select>
```

## Dimensions

### Width

You can specify width on the `vwc-searchable-select` to control the width of the component. The dropdown has min-width of its content.

- Default: `300px`

```html preview 230px
<style>
	vwc-searchable-select {
		width: 140px;
	}
</style>
<vwc-searchable-select label="Choose an option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-searchable-select>
```

## CSS Variables

### Height

Use `--searchable-select-height` to set the max-height of the dropdown.

- Default: `408px`

```html preview 300px
<style>
	vwc-searchable-select {
		--searchable-select-height: 100px;
	}
</style>
<vwc-searchable-select aria-label="Options Selector">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-searchable-select>
```

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                     |
| -------- | ------------------------ | ------- | -------- | ----------------------------------------------- |
| `input`  | `CustomEvent<undefined>` | No      | Yes      | Fired when an option is selected or unselected. |
| `change` | `CustomEvent<undefined>` | No      | Yes      | Fired when an option is selected or unselected. |

</div>

## Properties

<div class="table-wrapper">

| Name              | Type              | Description                                                                      |
| ----------------- | ----------------- | -------------------------------------------------------------------------------- |
| `values`          | `string[]`        | List of selected option's values in the order that they have been selected in.   |
| `value`           | `string`          | Value of the first selected option or the empty string if no option is selected. |
| `selectedIndex`   | `number`          | Index of the first selected option or `-1` if no option is selected.             |
| `options`         | `ListboxOption[]` | Read-only collections of all options.                                            |
| `selectedOptions` | `ListboxOption[]` | Read-only collections of selected options.                                       |
| `initialValues`   | `string[]`        | List of initially selected option's values. Used in case of form reset.          |
| `initialValue`    | `string`          | Initially selected option's value. Used in case of form reset.                   |

</div>

## Accessibility

If `label` is not set, you must provide an accessible name with the `aria-label` attribute.

## Use Cases

### Disabled Options

If an option is disabled, it cannot be selected or unselected.

```html preview 230px
<vwc-searchable-select label="Select an option" clearable multiple>
	<vwc-option value="1" text="Option 1" disabled></vwc-option>
	<vwc-option value="2" text="Option 2" disabled selected></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-searchable-select>
```

### In a Form

```html preview 250px
<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-searchable-select name="country" multiple required>
				<vwc-option
					icon="flag-afghanistan"
					value="AF"
					text="Afghanistan"
				></vwc-option>
				<vwc-option icon="flag-albania" value="AL" text="Albania"></vwc-option>
				<vwc-option icon="flag-algeria" value="DZ" text="Algeria"></vwc-option>
			</vwc-searchable-select>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```
