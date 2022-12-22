# Toggletip

Represents a toggletip custom element.

```js
<script type="module">
	import '@vonage/vivid/toggletip';
</script>
```

[temporary example, to be removed]

```html preview full
<section style="margin: 100px 20px">
	This may require more details
	<vwc-toggletip>
		<div style="width: 300px;">
			Here are some more explanations about what this is about and what you want to do.
			<p>Do you want to learn more or do stuff?</p>
			<div style="text-align: right">
				<vwc-button label="Learn more" appearance="ghost"></vwc-button>
				<vwc-button label="Do stuff!" appearance="outlined"></vwc-button>
			</div>
		</div>
	</vwc-toggletip>
</section>
```

## Members

### Appearance

Set the `appearance` attribute to change the appearance of the toggletip.

- Type: `'ghost'` | `'filled'` | `'outlined'`
- Default: `'ghost'`

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip appearance='ghost'>more information</vwc-toggletip>
	<vwc-toggletip appearance='filled'>more information</vwc-toggletip>
	<vwc-toggletip appearance='outlined'>more information</vwc-toggletip>
</vwc-layout>
```

### Icon

Use `icon` to set the toggletip's icon.

View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label` or `title` must be provided to ensure that the user can understand the toggletip's purpose.

- Type: `string`
- Default: `info-line`

```html preview center
<vwc-toggletip icon='info-solid'>more information</vwc-toggletip>
```

### Shape

Use the `shape` attribute to set the toggletip's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'pill'`

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip shape='rounded'>more information</vwc-toggletip>
	<vwc-toggletip shape='pill'>more information</vwc-toggletip>
</vwc-layout>
```

### Size

Use the `size` attribute to set the toggletip's icon to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'` | `'expanded'`
- Default: `'condensed'`

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip size='condensed'>more information</vwc-toggletip>
	<vwc-toggletip size='normal'>more information</vwc-toggletip>
	<vwc-toggletip size='expanded'>more information</vwc-toggletip>
</vwc-layout>
```

### Alternate

Add the `alternate` attribute to change the toggletip's color-scheme to the opposite of the currently selected one.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-toggletip alternate>more information</vwc-toggletip>
```

### Connotation

Set the `connotation` attribute to change the toggletip's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'`
- Default: `'accent'`

#### Ghost toggletip with connotation

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip connotation='accent'>more information</vwc-toggletip>
	<vwc-toggletip connotation='cta'>more information</vwc-toggletip>
	<vwc-toggletip connotation='success'>more information</vwc-toggletip>
	<vwc-toggletip connotation='alert'>more information</vwc-toggletip>
</vwc-layout>
```

#### Filled toggletip with connotation

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip appearance="filled" connotation='accent'>more information</vwc-toggletip>
	<vwc-toggletip appearance="filled" connotation='cta'>more information</vwc-toggletip>
	<vwc-toggletip appearance="filled" connotation='success'>more information</vwc-toggletip>
	<vwc-toggletip appearance="filled" connotation='alert'>more information</vwc-toggletip>
</vwc-layout>
```

#### Outlined toggletip with connotation

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip appearance="outlined" connotation='accent'>more information</vwc-toggletip>
	<vwc-toggletip appearance="outlined" connotation='cta'>more information</vwc-toggletip>
	<vwc-toggletip appearance="outlined" connotation='success'>more information</vwc-toggletip>
	<vwc-toggletip appearance="outlined" connotation='alert'>more information</vwc-toggletip>
</vwc-layout>
```

### Disabled

Add the `disabled` attribute to disable the toggletip.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout column-basis="small" column-spacing="small" gutters="large">
	<vwc-toggletip disabled>more information</vwc-toggletip>
	<vwc-toggletip appearance='filled' disabled>more information</vwc-toggletip>
	<vwc-toggletip appearance='outlined' disabled>more information</vwc-toggletip>
</vwc-layout>
```
