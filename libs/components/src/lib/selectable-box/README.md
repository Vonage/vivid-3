# Selectable Box

Represents a content box to used in a group where one or more can be selected.

```js
<script type="module">import '@vonage/vivid/selectable-box';</script>
```

```html preview
<vwc-selectable-box control-aria-label="Box 1">
    Box content
</vwc-selectable-box>
```

## Members

### Connotation

Set the `connotation` attribute to change the box's connotation.
It accepts a subset of predefined values.

- Type: `'accent'`, `'cta'`
- Default: `'accent'`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box connotation="accent" style="max-inline-size: 450px">
        <div>Accent box</div>
    </vwc-selectable-box>
    <vwc-selectable-box connotation="cta" style="max-inline-size: 450px">
        <div>CTA box</div>
    </vwc-selectable-box>
</vwc-layout>
```

### Control type

Set the `control-type` attribute to change the box's selectable control
It accepts a subset of predefined values.
When `control-type` is set to `radio`, it is the consuming app's responsibility to ensure only one selectable box in a group is checked at a time.

- Type: `'checkbox'`, `'radio'`
- Default: `'checkbox'`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box control-type="checkbox" style="max-inline-size: 450px">
        <div>Checkbox control</div>
    </vwc-selectable-box>
    <vwc-selectable-box control-type="radio" style="max-inline-size: 450px">
        <div>Radio control</div>
    </vwc-selectable-box>
</vwc-layout>
```

### Checked

Set the `checked` attribute to indicate the checked state of the box.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box control-type="checkbox" checked style="max-inline-size: 450px">
        <div>Checked checkbox box</div>
    </vwc-selectable-box>
    <vwc-selectable-box control-type="radio" checked style="max-inline-size: 450px">
        <div>Checked radio box</div>
    </vwc-selectable-box>
</vwc-layout>
```

### Clickable

By default, the card's control element (checkbox or radio) is the clickable element. This allows you to use other clickable elements within the box.
Setting the `clickable` attribute makes the whole card clickable, just make sure the card does not contain other clickable elements.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box clickable style="max-inline-size: 450px">
        <div>Clickable accent box</div>
    </vwc-selectable-box>
    <vwc-selectable-box clickable connotation="cta" style="max-inline-size: 450px">
        <div>Clickable CTA box</div>
    </vwc-selectable-box>
</vwc-layout>
```

### Size

Set the `size` attribute to change the box's spacing.
It accepts a subset of predefined values.

- Type: `'normal'`, `'condensed'`
- Default: `'normal'`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box size="normal" style="max-inline-size: 450px">
        <div>Normal sized box</div>
    </vwc-selectable-box>
    <vwc-selectable-box size="condensed" style="max-inline-size: 450px">
        <div>Condensed box</div>
    </vwc-selectable-box>
</vwc-layout>
```

### Tight

By default, the selectable box is styled in a spacious manner. Enabling the `tight` member willremove the padding around the box's content. The control element will still be positioned according to the `size` setting.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box tight size="normal" style="max-inline-size: 450px">
        <div>Tight box with normal size</div>
    </vwc-selectable-box>
    <vwc-selectable-box tight size="condensed" style="max-inline-size: 450px">
        <div>Tight box with condensed size</div>
    </vwc-selectable-box>
</vwc-layout>
```

## Events

<div class="table-wrapper">

| Name | Description |
| ---- | ----------- |
| `change` | Fires a custom `change` event when the `checked` state changes. |

</div>

## Accessibility

To ensure the selectable box has an accessible label, it is neccessary to provide an `control-aria-label` attribute or associate a piece of content as a label using the `control-aria-labelledby` attribute, as in the examples below.

Also, the boxes need a parent element to have a `role` attribute set to `group`.

```html preview
<vwc-layout role="group" gutters="small" row-spacing="small" column-basis="block">
    <vwc-selectable-box control-aria-label="Box 1" style="max-inline-size: 450px">
        <div>Use the control-aria-label attribute to make the box accessible.</div>
    </vwc-selectable-box>

    <vwc-selectable-box control-aria-labelledby="box2-heading" style="max-inline-size: 450px">
        <h3 id="box2-heading">Accessible selectable box</h3>
        <p>Use the control-aria-labelledby attribute to make the box accessible.</p>
    </vwc-selectable-box>
</vwc-layout>
```

## Use case

### Text based boxes

```html preview
<vwc-layout role="group">
    <vwc-selectable-box clickable control-aria-labelledby="box1-heading" style="max-inline-size: 450px">
        <h4 id="box1-heading">Add-on 1</h4>
        <ul>
            <li>ADD DATA - to see the data add-ons available to you</li>
            <li>ADD MINS - to see the minutes add-ons available to you</li>
            <li>ADD INT - to see the international add-ons, so you can call abroad from the UK</li>
        </ul>
    </vwc-selectable-box>
     <vwc-selectable-box clickable control-aria-labelledby="box2-heading" style="max-inline-size: 450px">
        <h4 id="box2-heading">Add-on 2</h4>
         <ul>
            <li>ADD DATA - to see the data add-ons available to you</li>
            <li>ADD MINS - to see the minutes add-ons available to you</li>
            <li>ADD INT - to see the international add-ons, so you can call abroad from the UK</li>
        </ul>
    </vwc-selectable-box>
    <vwc-selectable-box clickable control-aria-labelledby="box3-heading" style="max-inline-size: 450px">
        <h4 id="box3-heading">Add-on 3</h4>
         <ul>
            <li>ADD DATA - to see the data add-ons available to you</li>
            <li>ADD MINS - to see the minutes add-ons available to you</li>
            <li>ADD INT - to see the international add-ons, so you can call abroad from the UK</li>
        </ul>
    </vwc-selectable-box>
</vwc-layout>
```

### Image based boxes

```html preview
<vwc-layout role="group">
    <vwc-selectable-box aria-label="Bright ideas" tight size="normal" style="inline-size: fit-content" clickable>
        <img style="display: block" src="https://doodleipsum.com/350x200?bg=C863D9&i=0b3f4112a9c5e358c439c4be74380e54" alt="Lots of ideas"/>
    </vwc-selectable-box>
    <vwc-selectable-box aria-label="Take a load off" tight size="normal" style="inline-size: fit-content" clickable>
        <img style="display: block" src="https://doodleipsum.com/350x200/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor"/>
    </vwc-selectable-box>
    <vwc-selectable-box aria-label="Get located" tight size="normal" style="inline-size: fit-content" clickable>
        <img style="display: block" src="https://doodleipsum.com/350x200?bg=7463D9&i=6af2fcb146f3b99cfa1371242b2eee55" alt="Get located"/>
    </vwc-selectable-box>
</vwc-layout>
```
