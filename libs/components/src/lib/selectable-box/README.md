# Selectable Box

Represents a content box to used in a group where one or more can be selected.

```js
<script type="module">import '@vonage/vivid/selectable-box';</script>
```

```html preview
<vwc-selectable-box control-aria-label="Box 1">Box content</vwc-selectable-box>
```

## Members

### Control type

Set the `control-type` attribute to change the box's selectable control
It accepts a subset of predefined values.
When `control-type` is set to `radio`, it is the consuming app's responsibility to ensure only one selectable box in a group is checked at a time.

- Type: `'checkbox'`, `'radio'`
- Default: `'checkbox'`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
  <vwc-selectable-box control-type="checkbox" style="max-inline-size: 450px">Checkbox control</vwc-selectable-box>
  <vwc-selectable-box control-type="radio" style="max-inline-size: 450px">Radio control</vwc-selectable-box>
</vwc-layout>
```

### Connotation

Set the `connotation` attribute to change the box's connotation.
It accepts a subset of predefined values.

- Type: `'accent'`, `'cta'`
- Default: `'accent'`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
  <vwc-selectable-box connotation="accent" style="max-inline-size: 450px">Accent box</vwc-selectable-box>
  <vwc-selectable-box connotation="cta" style="max-inline-size: 450px">CTA box</vwc-selectable-box>
</vwc-layout>
```

### Entire box Clickable

By default, the card's control element (checkbox or radio) is the clickable element. This allows you to use other clickable elements within the box.
Setting the `clickable-box` attribute makes the whole card clickable, just make sure the card does not contain other clickable elements.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
  <vwc-selectable-box clickable-box style="max-inline-size: 450px">Clickable accent box</vwc-selectable-box>
  <vwc-selectable-box clickable-box connotation="cta" style="max-inline-size: 450px">Clickable CTA box</vwc-selectable-box>
</vwc-layout>
```

### Checked

Set the `checked` attribute to indicate the checked state of the box.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
  <vwc-selectable-box control-type="checkbox" checked style="max-inline-size: 450px">Checked checkbox box</vwc-selectable-box>
  <vwc-selectable-box control-type="radio" checked style="max-inline-size: 450px">Checked radio box</vwc-selectable-box>
</vwc-layout>
```

### Tight

By default, the selectable box is styled in a spacious manner. Enabling the `tight` member willremove the padding around the box's content.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
  <vwc-selectable-box tight style="max-inline-size: 450px">Tight box</vwc-selectable-box>
</vwc-layout>
```

## CSS Variables

### Spacing

Use the `--selectable-box-spacing` variable to set the amount of spacing applied to the selectable box.

- Default: `16px`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
  <vwc-selectable-box style="--selectable-box-spacing: 8px; max-inline-size: 450px">Custom spaced box</vwc-selectable-box>
</vwc-layout>
```

## Events

<div class="table-wrapper">

| Name     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| `change` | Fires a custom `change` event when the `checked` state changes. |

</div>

## Accessibility

To ensure the selectable box has an accessible label, it is neccessary to provide an `aria-label` attribute.

Also, the boxes need a parent element to have a `role` attribute set to `group`.

## Use cases

### Text based boxes

```html preview
<vwc-layout role="group">
  <vwc-selectable-box control-aria-labelledby="box1-heading" style="max-inline-size: 450px">
    <h4 id="box1-heading">Add-on 1</h4>
    <ul>
      <li><b>ADD DATA</b> - <a href="#">data add-ons</a> available to you</li>
      <li><b>ADD DATA</b> - <a href="#"> minutes add-ons</a> available to you</li>
      <li><b>ADD DATA</b> - <a href="#"> international add-ons</a>, so you can call abroad from the UK</li>
    </ul>
  </vwc-selectable-box>
  <vwc-selectable-box control-aria-labelledby="box2-heading" style="max-inline-size: 450px">
    <h4 id="box2-heading">Add-on 2</h4>
    <ul>
      <li><b>ADD DATA</b> - <a href="#">data add-ons</a> available to you</li>
      <li><b>ADD DATA</b> - <a href="#"> minutes add-ons</a> available to you</li>
      <li><b>ADD DATA</b> - <a href="#"> international add-ons</a>, so you can call abroad from the UK</li>
    </ul>
  </vwc-selectable-box>
  <vwc-selectable-box control-aria-labelledby="box3-heading" style="max-inline-size: 450px">
    <h4 id="box3-heading">Add-on 3</h4>
    <ul>
      <li><b>ADD DATA</b> - <a href="#">data add-ons</a> available to you</li>
      <li><b>ADD DATA</b> - <a href="#"> minutes add-ons</a> available to you</li>
      <li><b>ADD DATA</b> - <a href="#"> international add-ons</a>, so you can call abroad from the UK</li>
    </ul>
  </vwc-selectable-box>
</vwc-layout>
```

### Image based boxes

```html preview
<vwc-layout role="group">
  <vwc-selectable-box aria-label="Bright ideas" tight style="inline-size: fit-content" clickable-box>
    <img style="display: block" src="https://doodleipsum.com/350x200?bg=C863D9&i=0b3f4112a9c5e358c439c4be74380e54" alt="Lots of ideas" />
  </vwc-selectable-box>
  <vwc-selectable-box aria-label="Take a load off" tight style="inline-size: fit-content" clickable-box>
    <img
      style="display: block"
      src="https://doodleipsum.com/350x200/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
      alt="Sitting on Floor"
    />
  </vwc-selectable-box>
  <vwc-selectable-box aria-label="Get located" tight style="inline-size: fit-content" clickable-box>
    <img style="display: block" src="https://doodleipsum.com/350x200?bg=7463D9&i=6af2fcb146f3b99cfa1371242b2eee55" alt="Get located" />
  </vwc-selectable-box>
</vwc-layout>
```
