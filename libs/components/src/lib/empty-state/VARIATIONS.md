## Headline

Use the `headline` attribute add a headline to the empty state.

```html preview
<vwc-empty-state headline="No results found"></vwc-empty-state>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed as a decoration to the Empty State.  
Custom icons can be provided using the [Graphic Slot](/components/empty-state/code/#graphic-slot).

```html preview
<vwc-empty-state icon="search-line"></vwc-empty-state>
```

## Connotation

Set the `connotation` attribute to change the Empty State's connotation.

```html preview 300px
<div class="wrapper">
	<vwc-empty-state icon="search-line" headline="Accent connotation">
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon="check-solid"
		headline="Success connotation"
		connotation="success"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon="error-solid"
		headline="Alert connotation"
		connotation="alert"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon="sparkles-solid"
		headline="Cta connotation"
		connotation="cta"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon="envelope-solid"
		headline="Information connotation"
		connotation="information"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon="warning-solid"
		headline="Warning connotation"
		connotation="warning"
	>
		No results
	</vwc-empty-state>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 8px;
		align-items: flex-start;
	}
</style>
```

### Icon-decoration

Use `icon-decoration` to change the design of the icon circle from `filled` (default) to `outlined`.

```html preview 300px
<div class="wrapper">
	<vwc-empty-state
		icon-decoration="outlined"
		icon="search-line"
		headline="Accent connotation"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon-decoration="outlined"
		icon="check-solid"
		headline="Success connotation"
		connotation="success"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon-decoration="outlined"
		icon="error-solid"
		headline="Alert connotation"
		connotation="alert"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon-decoration="outlined"
		icon="sparkles-solid"
		headline="Cta connotation"
		connotation="cta"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon-decoration="outlined"
		icon="envelope-solid"
		headline="Information connotation"
		connotation="information"
	>
		No results
	</vwc-empty-state>
	<vwc-empty-state
		icon-decoration="outlined"
		icon="warning-solid"
		headline="Warning connotation"
		connotation="warning"
	>
		No results
	</vwc-empty-state>
</div>
<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 8px;
		align-items: flex-start;
	}
</style>
```
