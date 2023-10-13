# Selectable Box

Represents a selectable-box custom element.

```js
<script type="module">import '@vonage/vivid/selectable-box';</script>
```

```html preview
<vwc-selectable-box>
    <div>Box content</div>
</vwc-selectable-box>
```

## Members

### Connotation

Set the `connotation` attribute to change the box's connotation.
It accepts a subset of predefined values.

- Type: `'accent'`, `'cta'`
- Default: `'accent'`

```html preview
<div style="width: 450px;">
    <vwc-layout gutters="small" row-spacing="small" column-basis="block">
        <vwc-selectable-box connotation="accent">
            <div>Accent box</div>
        </vwc-selectable-box>
        <vwc-selectable-box connotation="cta">
            <div>CTA box</div>
        </vwc-selectable-box>
    </vwc-layout>
</div>
```

### Control

Set the `control` attribute to change the box's selectable control
It accepts a subset of predefined values.

- Type: `'checkbox'`, `'radio'`
- Default: `'checkbox'`

```html preview
<div style="width: 450px;">
    <vwc-layout gutters="small" row-spacing="small" column-basis="block">
        <vwc-selectable-box control="checkbox">
            <div>Checkbox control</div>
        </vwc-selectable-box>
        <vwc-selectable-box control="radio">
            <div>Radio control</div>
        </vwc-selectable-box>
    </vwc-layout>
</div>
```

### Spacing

Set the `spacing` attribute to change the box's spacing.
It accepts a subset of predefined values.

- Type: `'normal'`, `'condensed'`
- Default: `'normal'`

```html preview
<div style="width: 450px;">
    <vwc-layout gutters="small" row-spacing="small" column-basis="block">
        <vwc-selectable-box spacing="normal">
            <div>Normal spaced box</div>
        </vwc-selectable-box>
        <vwc-selectable-box spacing="condensed">
            <div>Condensed box</div>
        </vwc-selectable-box>
    </vwc-layout>
</div>
```

### No padding

Set the `no-padding` attribute to remove the padding around the box's content.

- Type: `boolean`
- Default: `false`

```html preview
<div style="width: 450px;">
    <vwc-layout gutters="small" row-spacing="small" column-basis="block">
        <vwc-selectable-box no-padding spacing="normal">
            <div>Normal spaced box with no padding</div>
        </vwc-selectable-box>
        <vwc-selectable-box no-padding spacing="condensed">
            <div>Condensed box with no padding</div>
        </vwc-selectable-box>
    </vwc-layout>
</div>
```

## Slots

## CSS Variables

## Events

<div class="table-wrapper">

| Name | Description |
| ---- | ----------- |
|      |             |

</div>

## Methods

<div class="table-wrapper">

| Name | Returns | Description |
| ---- | ------- | ----------- |
|      |         |             |

</div>

## Properties

## Accessibility

## Use Cases
