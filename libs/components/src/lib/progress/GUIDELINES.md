## Labelling

### Label

<docs-do-dont>
<docs-do slot="description" headline="Use the label attribute whenever possible" caption="It provides a description of the purpose of the Number Field to all users and it is accessibly linked to the input element.">

```html preview example
<vwc-number-field label="Wanted quantity"></vwc-number-field>
```

</docs-do>
<docs-do dont headline="Don't use the placeholder attribute as a label">

```html preview example
<vwc-number-field placeholder="Wanted quantity"></vwc-number-field>
```

It's bad for UX and accessibility.<br />[The problem with placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)

</docs-do>
</docs-do-dont>

### Helper Text

<docs-do-dont>
<docs-do slot="description" headline="Use helper text to provide extra information about the field" caption="It is visible to the user at all times and it is read out by screen readers when the user focuses on the input element.">

```html preview example
<vwc-number-field label="Wanted quantity" helper-text="set a number higher than 1 less than 10"></vwc-number-field>
```

</docs-do>
</docs-do-dont>

## Scale

<docs-do-dont headline="Use condensed Number Fields when space is limited" reverse>

<div slot="description">

The `condensed` Text Field is useful when used inside other components (inside [data-grid-cell](/components/data-grid/#cell) or [action-group](/components/action-group/) for a [toolbar](/components/button/use-cases/#toolbars)) as they take up less space.

</div>
<docs-do>

```html preview example
<div class="container">
	<vwc-data-grid>
		<vwc-data-grid-row row-type="header">
			<vwc-data-grid-cell cell-type="columnheader">User</vwc-data-grid-cell>
			<vwc-data-grid-cell class="controls" cell-type="columnheader"></vwc-data-grid-cell>
		</vwc-data-grid-row>
		<vwc-data-grid-row>
			<vwc-data-grid-cell>
				<vwc-number-field label="Wanted quantity"></vwc-number-field>
			</vwc-data-grid-cell>
			<vwc-data-grid-cell class="controls">
				<vwc-button appearance="outlined" size="condensed" aria-label="Edit">
					<vwc-icon slot="icon" name="edit-line"></vwc-icon>
				</vwc-button>
				<vwc-button appearance="outlined" size="condensed" aria-label="Delete" connotation="alert">
					<vwc-icon slot="icon" name="delete-line"></vwc-icon>
				</vwc-button>
			</vwc-data-grid-cell>
		</vwc-data-grid-row>
	</vwc-data-grid>
</div>

<style>
	.conainer {
		display: block;
		padding: 8px 0;
	}

	.controls {
		width: 5.75rem;
	}
</style>
```

</docs-do>
</docs-do-dont>

## Related Components

- [Text Area](/components/text-area/)
- [Text Field](/components/text-field)
- [Combobox](/components/combobox/)
- [Searchable Select](/components/searchable-select/)
