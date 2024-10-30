## Labelling

### Label

<docs-do-dont>
<docs-do slot="description" headline="Use the label attribute whenever possible" caption="It provides a description of the purpose of the Text Field to all users and it is accessibly linked to the input element.">

```html preview example
<vwc-select label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

</docs-do>
<docs-do dont headline="Don't use the placeholder attribute as a label">

```html preview example
<vwc-select placeholder="Title">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

It's bad for UX and accessibility.<br />[The problem with placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)

</docs-do>
</docs-do-dont>

### Helper Text

<docs-do-dont>
<docs-do slot="description" headline="Use helper text to provide extra information about the field" caption="It is visible to the user at all times and it is read out by screen readers when the user focuses on the input element.">

```html preview example 320px
<vwc-select
	helper-text="We use this information in to help inform our marketing strategy"
	label="Where did you hear about us?"
	placeholder="Select an option"
	class="marketing"
>
	<vwc-option value="friend" text="A friend"></vwc-option>
	<vwc-option value="net" text="Internet search"></vwc-option>
	<vwc-option value="online-ad" text="Online advert"></vwc-option>
	<vwc-option value="radio-ad" text="Radio advert"></vwc-option>
	<vwc-option value="other" text="Other"></vwc-option>
</vwc-select>

<style>
	.marketing {
		min-inline-size: 250px;
	}
</style>
```

</docs-do>
<docs-do dont headline="Don't use Tooltips or Toggletips for information that is vital to task completion">

```html preview example 320px
<div class="container">
	<vwc-select
		label="Where did you hear about us?"
		placeholder="Select an option"
		class="marketing"
	>
		<vwc-option value="friend" text="A friend"></vwc-option>
		<vwc-option value="net" text="Internet search"></vwc-option>
		<vwc-option value="online-ad" text="Online advert"></vwc-option>
		<vwc-option value="radio-ad" text="Radio advert"></vwc-option>
		<vwc-option value="other" text="Other"></vwc-option>
	</vwc-select>
	<vwc-toggletip placement="bottom">
		<vwc-button
			icon="info-line"
			slot="anchor"
			shape="pill"
			size="condensed"
			class="tooltip-btn"
		></vwc-button>
		We use this information in to help inform our marketing strategy
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

<docs-do-dont headline="Use condensed Selects when space is limited" reverse>

<div slot="description">

The `condensed` Text Field is useful when used inside other components (inside [data-grid-cell](/components/data-grid/#cell) or [action-group](/components/action-group/) for a [toolbar](/components/button/use-cases/#toolbars)) as they take up less space.

</div>
<docs-do>

```html preview example 270px
<div class="container">
	<vwc-data-grid>
		<vwc-data-grid-row row-type="header">
			<vwc-data-grid-cell cell-type="columnheader"
				>Marketing</vwc-data-grid-cell
			>
			<vwc-data-grid-cell
				class="controls"
				cell-type="columnheader"
			></vwc-data-grid-cell>
		</vwc-data-grid-row>
		<vwc-data-grid-row>
			<vwc-data-grid-cell>
				<vwc-select
					scale="condensed"
					fixed-dropdown
					aria-label="Where did you hear about us?"
				>
					<vwc-option value="friend" text="A friend"></vwc-option>
					<vwc-option value="net" text="Internet"></vwc-option>
					<vwc-option value="online-ad" text="Advert"></vwc-option>
					<vwc-option value="other" text="Other"></vwc-option>
				</vwc-select>
			</vwc-data-grid-cell>
			<vwc-data-grid-cell class="controls">
				<vwc-button
					appearance="outlined"
					size="condensed"
					icon="edit-line"
					aria-label="Edit"
				></vwc-button>
				<vwc-button
					appearance="outlined"
					size="condensed"
					icon="delete-line"
					aria-label="Delete"
					connotation="alert"
				></vwc-button>
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
		width: 92px;
	}
</style>
```

</docs-do>
</docs-do-dont>

## Related Components

- [Searchable Select](/components/searchable-select/)
- [Text Field](/components/text-field/)
- [Combobox](/components/combobox/)
