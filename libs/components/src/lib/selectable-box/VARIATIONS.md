## Control Type

Set the `control-type` attribute to change the box's selectable control
It accepts a subset of predefined values.
When `control-type` is set to `radio`, it is the consuming app's responsibility to ensure only one Selectable Box in a group is checked at a time.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box control-type="checkbox" class="box">
		Checkbox control
	</vwc-selectable-box>
	<vwc-selectable-box control-type="radio" class="box">
		Radio control
	</vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

## Connotation

Set the `connotation` attribute to change the box's connotation.
It accepts a subset of predefined values.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box connotation="accent" class="box">
		Accent box
	</vwc-selectable-box>
	<vwc-selectable-box connotation="cta" class="box">
		CTA box
	</vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

## Clickable Box

By default, the card's control element (checkbox or radio) is the clickable element. This allows you to use other clickable elements within the box.
Setting the `clickable-box` attribute makes the whole box clickable, just make sure the box does not contain other clickable elements.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box clickable-box class="box">
		Clickable accent box
	</vwc-selectable-box>
	<vwc-selectable-box clickable-box connotation="cta" class="box">
		Clickable CTA box
	</vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

## Checked

Set the `checked` attribute to indicate the checked state of the box.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box
		control-type="checkbox"
		checked
		style="max-inline-size: 450px"
	>
		Checked checkbox box
	</vwc-selectable-box>
	<vwc-selectable-box control-type="radio" checked class="box">
		Checked radio box
	</vwc-selectable-box>
</vwc-layout>
<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

## Tight

By default, the Selectable Box is styled in a spacious manner. Enabling the `tight` member willremove the padding around the box's content.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box tight style="max-inline-size: 450px">
		Tight box
	</vwc-selectable-box>
</vwc-layout>
```
