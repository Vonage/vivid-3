## Labelling

### Label

<docs-do-dont>
<docs-do slot="description" headline="Use the label attribute whenever possible" caption="It provides a description of the purpose of the Searchable Select to all users and it is accessibly linked to the input element.">

```html preview example
<vwc-searchable-select label="Country" placeholder="Select a country">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

</docs-do>
<docs-do dont headline="Don't use the placeholder attribute as a label">

```html preview example
<vwc-searchable-select placeholder="Country">
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

It's bad for UX and accessibility.<br />[The problem with placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)

</docs-do>
</docs-do-dont>

### Helper Text

<docs-do-dont>
<docs-do slot="description" headline="Use helper text to provide extra information about the field" caption="It is visible to the user at all times and it is read out by screen readers when the user focuses on the input element.">

```html preview example 320px
<vwc-searchable-select
	helper-text="Select the countries that your company operates in"
	label="Country"
	multiple
>
	<vwc-option value="AF" text="Afghanistan"></vwc-option>
	<vwc-option value="AL" text="Albania"></vwc-option>
	<vwc-option value="DZ" text="Algeria"></vwc-option>
</vwc-searchable-select>
```

</docs-do>
<docs-do dont headline="Don't use Tooltips or Toggletips for information that is vital to task completion">

```html preview example 320px
<div class="container">
	<vwc-searchable-select label="Country" class="searchable-select" multiple>
		<vwc-option value="AF" text="Afghanistan"></vwc-option>
		<vwc-option value="AL" text="Albania"></vwc-option>
		<vwc-option value="DZ" text="Algeria"></vwc-option>
	</vwc-searchable-select>
	<vwc-toggletip placement="bottom">
		<vwc-button slot="anchor" shape="pill" size="condensed" class="tooltip-btn">
			<vwc-icon slot="icon" name="info-line"></vwc-icon>
		</vwc-button>
		Select the countries that your company operates in
	</vwc-toggletip>
</div>

<style>
	.container {
		position: relative;
		display: inline-block;
		max-width: 200px;
	}
	.searchable-select {
		max-width: 200px;
	}
	.tooltip-btn {
		position: absolute;
		inset-block-start: -8px;
		inset-inline-end: -8px;
	}
</style>
```

Tooltips / Toggletips disappear, so instructions or other directly actionable information, like field requirements, shouldn’t be in them.<br />[Tooltip guidelines](https://www.nngroup.com/articles/tooltip-guidelines/#toc-tooltip-usage-guidelines-3)

</docs-do>
</docs-do-dont>

## Related Components

- [Select](/components/select/)
- [Text Field](/components/text-field/)
- [Combobox](/components/combobox/)
