---
title: Appearance
status: underlying
order: 4
---

# Appearance

Vivid appearance is setting the way the component looks (ghost, outline, filled, etc).  
Appearance is also connected to connotation and setting colors to each state in the appearance.

## How does it work?

Each component is using at least one appearance.  
The appearance controls the colors that are set for text, fill and outline.  
The 3 colors are changing according to states (idle, hover, disabled, etc).

![appearance-colors](/assets/images/appearance-colors.png)

### Code

Using appearance in components? follow the [ReadMe](https://github.com/Vonage/vivid-3/blob/a0d4f01958fb166abd750088aa49e22578285004/libs/shared/src/lib/sass/mixins/ReadMe.md)

### Design

Design in Figma for idle state can be found [here](https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=20330-124791&mode=design&t=Q0raKkM0qZVJmn7d-0).  
Design in Figma for all states for accent & cta [here](https://www.figma.com/file/JJNgZvt1qf3ydYmOwbE3Jg/Vivid-UI-Kit---3.0-WIP?type=design&node-id=11411-61542&mode=design&t=TLV67XkgT4uhsAbB-0)

---

This page is a visual presentation for all the states we have in all connotations in all appearances.  
Not all components have all appearances or connotation.

---

## Filled

### Used in

`avatar`, `badge`, `banner`, `button`, `calender-event`, `fab`, `slider`, `split-button`, `switch`

### Important to know

`warning`, `information` and `announcement` connotation are not in use.

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active></docs-appearance-ui>

	<span><b>selected</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>selected & hover</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>disabled</b></span>
	<docs-appearance-ui disabled class="one-example"></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<docs-appearance-ui disabled class="one-example"></docs-appearance-ui>

	<span><b>readonly</b></span>
	<docs-appearance-ui readonly class="one-example"></docs-appearance-ui>
</div>
```

## Ghost

### Used in

`accordion-item`, `action-group`, `button`, `combobox`, `list-box`, `nav`, `nav-item`, `nav-disclosure`, `progress-ring`, `select`, `split-button`, `tab`, `text-area`, `text-field`, `tree-item`

### Important to know

currently ghost appearance is not being used in `warning`, `information` and `announcement` connotation

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="ghost"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="ghost"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="ghost"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="ghost"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui selected appearance="ghost" hovered></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="ghost"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<docs-appearance-ui
		selected
		appearance="ghost"
		disabled
		class="one-example"
	></docs-appearance-ui>

	<span><b>readonly</b></span>
	<docs-appearance-ui
		readonly
		appearance="ghost"
		class="one-example"
	></docs-appearance-ui>
</div>
```

## Outlined

### Used in

`button`, `avatar`, `split-button`

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="outlined"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="outlined"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="outlined"></docs-appearance-ui>

	<span><b>selected</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>selected & hover</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="outlined"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<span class="one-example" class="one-example">not set</span>
	<span><b>readonly</b></span>
	<docs-appearance-ui
		readonly
		appearance="outlined"
		class="one-example"
	></docs-appearance-ui>
</div>
```

## Duotone

### Used in

`avatar`, `badge`, `selectable-box`, `tag`

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="duotone"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="duotone"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="duotone"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="duotone"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui
		selected
		hovered
		appearance="duotone"
	></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="duotone"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>readonly</b></span>
	<span class="one-example" class="one-example">not set</span>
</div>
```

## Subtle

### Used in

`avatar`, `badge`, `calendar-event`, `progress`, `tag`

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="subtle"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="subtle"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="subtle"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="subtle"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="subtle"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>readonly</b></span>
	<span class="one-example" class="one-example">not set</span>
</div>
```

## Fieldset

### Used in

`text-area`, `action-group`, `checkbox`, `combobox`, `listbox`, `note`, `radio`, `select`, `switch`, `text-field`

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="fieldset"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="fieldset"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="fieldset"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="fieldset"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui
		selected
		appearance="fieldset"
		hovered
	></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="fieldset"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<docs-appearance-ui
		selected
		appearance="fieldset"
		disabled
		class="one-example"
	></docs-appearance-ui>

	<span><b>readonly</b></span>
	<docs-appearance-ui
		readonly
		appearance="fieldset"
		class="one-example"
	></docs-appearance-ui>
</div>
```

## Listitem

same colors as ghost - only selected + selected and hover are different

### Used in

`option`, `data-grid` , `menu-item`, `date-picker`

### Important to know

only `accent` is being used

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="listitem"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="listitem"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="listitem"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="listitem"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui
		selected
		appearance="listitem"
		hovered
	></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="listitem"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<docs-appearance-ui
		selected
		appearance="listitem"
		disabled
		class="one-example"
	></docs-appearance-ui>

	<span><b>readonly</b></span>
	<docs-appearance-ui
		readonly
		appearance="listitem"
		class="one-example"
	></docs-appearance-ui>
</div>
```

## Ghost-light

### Used in

`nav-item`, `nav-disclosure`

### Important to know

currently ghost-light appearance is being used only with `accent` connotation

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="ghost-light"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="ghost-light"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="ghost-light"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="ghost-light"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui
		selected
		appearance="ghost-light"
		hovered
	></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="ghost-light"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<docs-appearance-ui
		selected
		appearance="ghost-light"
		disabled
		class="one-example"
	></docs-appearance-ui>

	<span><b>readonly</b></span>
	<docs-appearance-ui
		readonly
		appearance="ghost-light"
		class="one-example"
	></docs-appearance-ui>
</div>
```

## Outlined-light

### Used in

`button`

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="outlined-light"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="outlined-light"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="outlined-light"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="outlined-light"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui
		selected
		appearance="outlined-light"
		hovered
	></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="outlined-light"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<docs-appearance-ui
		selected
		appearance="outlined-light"
		disabled
		class="one-example"
	></docs-appearance-ui>

	<span><b>readonly</b></span>
	<docs-appearance-ui
		readonly
		appearance="outlined-light"
		class="one-example"
	></docs-appearance-ui>
</div>
```

## Subtle-Light

### Used in

`badge`,

```html preview
<style>
	.grid {
		display: grid;
		grid-template-columns: 80px auto;
		inline-size: 820px;
		row-gap: 12px;
		align-items: center;
	}
	span {
		max-width: 80px;
	}
	.not-set {
		grid-column: 1/-1;
	}
	.one-example {
		grid-column: 2/-1;
	}
</style>
<div class="grid">
	<span><b>idle</b></span>
	<docs-appearance-ui appearance="subtle-light"></docs-appearance-ui>

	<span><b>hover</b></span>
	<docs-appearance-ui hovered appearance="subtle-light"></docs-appearance-ui>

	<span><b>active</b></span>
	<docs-appearance-ui active appearance="subtle-light"></docs-appearance-ui>

	<span><b>selected</b></span>
	<docs-appearance-ui selected appearance="subtle-light"></docs-appearance-ui>

	<span><b>selected & hover</b></span>
	<docs-appearance-ui
		selected
		hovered
		appearance="subtle-light"
	></docs-appearance-ui>

	<span><b>disabled</b></span>
	<docs-appearance-ui
		disabled
		appearance="subtle-light"
		class="one-example"
	></docs-appearance-ui>

	<span><b>selected & disabled</b></span>
	<span class="one-example" class="one-example">not set</span>

	<span><b>readonly</b></span>
	<span class="one-example" class="one-example">not set</span>
</div>
```

## Last update: 10.2024
