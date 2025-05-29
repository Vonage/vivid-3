## Labelling

### Label

<docs-do-dont>
<docs-do slot="description" headline="Use the label attribute whenever possible" caption="It provides a description of the purpose of the Text Field to all users and it is accessibly linked to the input element.">

```html preview example
<vwc-text-field label="First name"></vwc-text-field>
```

</docs-do>
<docs-do dont headline="Don't use the placeholder attribute as a label">

```html preview example
<vwc-text-field placeholder="First name"></vwc-text-field>
```

It's bad for UX and accessibility.<br />[The problem with placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)

</docs-do>
</docs-do-dont>

### Helper Text

<docs-do-dont>
<docs-do slot="description" headline="Use helper text to provide extra information about the field" caption="It is visible to the user at all times and it is read out by screen readers when the user focuses on the input element.">

```html preview example
<vwc-text-field
	helper-text="Must be at least six chars and contain both letters and numbers"
	label="Password"
	type="password"
></vwc-text-field>
```

</docs-do>
<docs-do dont headline="Don't use Tooltips or Toggletips for information that is vital to task completion">

```html preview example 190px
<div class="container">
	<vwc-text-field label="Password" type="password"></vwc-text-field>
	<vwc-toggletip placement="bottom">
		<vwc-button slot="anchor" shape="pill" size="condensed" class="tooltip-btn">
			<vwc-icon slot="icon" name="info-line"></vwc-icon>
		</vwc-button>
		Must be at least six chars and contain both letters and numbers
	</vwc-toggletip>
</div>

<style>
	.container {
		position: relative;
		display: inline-block;
	}
	.tooltip-btn {
		position: absolute;
		inset-block-start: -8px;
		inset-inline-end: -8px;
	}
</style>
```

Tooltips / Toggletips disappear, so instructions or other directly actionable information, like field requirements, shouldn’t be in a them.<br />[Tooltip guidelines](https://www.nngroup.com/articles/tooltip-guidelines/#toc-tooltip-usage-guidelines-3)

</docs-do>
</docs-do-dont>

## Scale

<docs-do-dont headline="Use condensed Text Fields when space is limited" reverse>

<div slot="description">

The `condensed` Text Field is useful when used inside other components (inside [data-grid-cell](/components/data-grid/#cell) or [action-group](/components/action-group/) for a [toolbar](/components/button/use-cases/#toolbars)) as they take up less space.

</div>
<docs-do>

```html preview example
<div class="container">
	<vwc-data-grid>
		<vwc-data-grid-row row-type="header">
			<vwc-data-grid-cell cell-type="columnheader">User</vwc-data-grid-cell>
			<vwc-data-grid-cell
				class="controls"
				cell-type="columnheader"
			></vwc-data-grid-cell>
		</vwc-data-grid-row>
		<vwc-data-grid-row>
			<vwc-data-grid-cell>
				<vwc-text-field aria-label="User" value="Joe" scale="condensed">
			</vwc-data-grid-cell>
			<vwc-data-grid-cell class="controls">
				<vwc-button
					appearance="outlined"
					size="condensed"
					aria-label="Edit"
				>
					<vwc-icon slot="icon" name="edit-line"></vwc-icon>
				</vwc-button>
				<vwc-button
					appearance="outlined"
					size="condensed"
					aria-label="Delete"
					connotation="alert"
				>
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
- [Number Field](/components/number-field)
- [Combobox](/components/combobox/)
- [Searchable Select](/components/searchable-select/)
