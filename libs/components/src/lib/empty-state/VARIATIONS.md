## Headline

Use the `headline` attribute add a headline to the empty state.

```html preview
<vwc-empty-state headline="No results found"></vwc-empty-state>
```

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed as a decoration to the Empty State.  
Custom icons can be provided using the [Graphic Slot](/components/empty-state/code/#graphic-slot).

<!-- Uncomment when Icon slot is added
<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>
-->

```html preview
<vwc-empty-state icon="search-line"></vwc-empty-state>
```

## Connotation

Set the `connotation` attribute to change the Empty State's connotation.

<vwc-note connotation="warning" headline="Deprecated Prop: icon-decoration">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon-decoration` prop is deprecated (as of 05/25) with the previous `outline` style now becoming the default and only icon styling. `icon-decoration` will be removed from the API in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

```html preview 300px
<div class="wrapper">
	<vwc-empty-state icon="search-line" headline="Accent connotation"> No results </vwc-empty-state>
	<vwc-empty-state icon="check-solid" headline="Success connotation" connotation="success"> No results </vwc-empty-state>
	<vwc-empty-state icon="error-solid" headline="Alert connotation" connotation="alert"> No results </vwc-empty-state>
	<vwc-empty-state icon="sparkles-solid" headline="Cta connotation" connotation="cta"> No results </vwc-empty-state>
	<vwc-empty-state icon="envelope-solid" headline="Information connotation" connotation="information"> No results </vwc-empty-state>
	<vwc-empty-state icon="warning-solid" headline="Warning connotation" connotation="warning"> No results </vwc-empty-state>
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
