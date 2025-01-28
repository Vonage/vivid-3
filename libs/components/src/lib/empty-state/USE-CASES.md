## Empty State inside Searchable Select

```html preview 300px
<vwc-searchable-select label="Connect number">
	<vwc-empty-state
		slot="no-options"
		icon-decoration="outlined"
		icon="phone-number-line"
		headline="No numbers"
	>
		You do not have any numbers yet.
	</vwc-empty-state>
</vwc-searchable-select>
```

## Empty State inside Dialog

```html preview 450px
<vwc-dialog open>
	<vwc-empty-state
		slot="body"
		class="empty-state"
		icon-decoration="outlined"
		icon="check-solid"
		connotation="success"
		headline="You made it!"
	>
		Your request was submitted. Waht do you wish to do now?
		<vwc-button
			slot="action-items"
			appearance="outlined"
			label="continue"
		></vwc-button>
		<vwc-button
			slot="action-items"
			appearance="filled"
			connotation="cta"
			label="Read More"
		></vwc-button>
	</vwc-empty-state>
</vwc-dialog>
```

## Empty State & Data Grid

```html preview 450px
<vwc-data-grid>
	<vwc-data-grid-row role="row" class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader" role="columnheader">
			data1
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader"> data2 </vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
<vwc-empty-state
	class="empty-state"
	icon-decoration="outlined"
	icon="phone-number-line"
	headline="No numbers"
>
	You do not have any numbers yet.
</vwc-empty-state>

<style>
	.empty-state {
		margin-block-start: 32px;
	}
</style>
```
