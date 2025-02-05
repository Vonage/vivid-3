## Selectable Tag Group

```html preview
<vwc-tag-group>
	<vwc-tag label="First tag" selectable selected></vwc-tag>
	<vwc-tag label="Second tag" selectable></vwc-tag>
	<vwc-tag label="Third tag" selectable selected></vwc-tag>
</vwc-tag-group>
```

## Removable Tag Group

```html preview
<vwc-tag-group>
	<vwc-tag label="First tag" removable></vwc-tag>
	<vwc-tag label="Second tag" removable></vwc-tag>
	<vwc-tag label="Third tag" removable></vwc-tag>
</vwc-tag-group>
```

## Searchable Select with External Tags

When set, the selected Tags are displayed outside of Searchable Select components.

```html preview
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

<style>
	vwc-tag-group {
		display: block;
		margin-top: 12px;
	}
</style>
```
