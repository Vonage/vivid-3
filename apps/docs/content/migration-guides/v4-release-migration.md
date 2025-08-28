---
title: V4 Release Migration
order: 2
---

# Vivid v4.0.0 Migration Guide

Release date: 1st July 2024.  
This document provides descriptions of the breaking changes in this release and instructions on how to prepare for them.

## Audio-player

### The change

The audio-player will now stretch to fill it's container's inline-size by default. Previously it was restricted to 350px.

|                                               | V-3      | V-4       |
| --------------------------------------------- | -------- | --------- |
| audio-player `max-inline-size`                | `350px`  | `100%`    |
| css-variable `--audio-player-min-inline-size` | `in-use` | `removed` |

### How to get ready?

set `max-inline-size` or `inline-size` directly on audio-player or on its parent.

## Data-grid

Data-grid-cells outside of the table header will no longer have a fixed block-size but will adjust to its content and its text will not be trimmed by default as before.

### The change

|                              | V-3      | V-4      |
| ---------------------------- | -------- | -------- |
| data-grid-cell `block-size`  | `48px`   | `100%`   |
| data-grid-cell `white-space` | `nowrap` | `normal` |

### How to get ready?

#### Keeping the tables the same as before:

set the css-variable for the Data-grid:

```js
--data-grid-cell-block-size: 48px;
--data-grid-cell-white-space: nowrap;
```

#### Already using the css-variable

If you set the css-variable - you can either remove them from your code or leave them as they are.

## Tabs

### The change

Tab panel will now have a 16px padding by default, previously it had no padding at all.

|                                                | V-3    | V-4                      |
| ---------------------------------------------- | ------ | ------------------------ |
| Tab panel [gutters](/components/tabs/#gutters) | `none` | `small (= 16px padding)` |

### How to get ready?

If you do not wish to have gutters, set `gutters="none"` on tabs:

```js
<vwc-tabs gutters="none">...</vwc-tabs>
```

## Tooltip

### The change

The tooltip will now have a default max-inline-size of 30 characters. Previously it didn't have max-inline-size.

|                           | V-3 default value | V-4 default value |
| ------------------------- | ----------------- | ----------------- |
| tooltip `max-inline-size` | `none`            | `30ch`            |

### How to get ready?

If you do not wish to have a set `max-inline-size` use the css-variable `--tooltip-max-inline-size`.

```js
vwc-tooltip {
	--tooltip-max-inline-size: none;
}
```

## Toggletip

### The change

The toggletip will now have a default max-inline-size of 30 characters. Previously it didn't have max-inline-size.

|                             | V-3 default value | V-4 default value |
| --------------------------- | ----------------- | ----------------- |
| toggletip `max-inline-size` | `none`            | `30ch`            |

### How to get ready?

If you do not wish to have a set `max-inline-size` use the css-variable `--toggletip-max-inline-size`.

```js
vwc-toggletip {
	--toggletip-max-inline-size: none;
}
```

## Vue Wrappers

Form elements like `VTextField` will now forward value props consistently as DOM properties.

This change will affect the props `value` and `currentValue` on:

- VTextField
- VTextArea
- VNumberField
- VSelect
- VCombobox
- VSlider
- VRangeSlider
- VDatePicker
- VDateRangePicker
- VTimePicker
- VFilePicker

`checked` and `currentChecked` props on:

- VCheckbox
- VSwitch
- VRadio

`currentStart` / `currentEnd` on:

- VDateRangePicker
- VRangeSlider

Usage of these props is discouraged. To set the current value, you should use the `v-model` instead:

```html
<VTextField v-model="value" />
<!-- Which is syntactic sugar for: -->
<VTextField
	:model-value="value"
	@update:modelValue="$event => (value = $event)"
/>
```

Code using `v-model` or `modelValue` is not affected.

### The change

|                                                                   | V-3                                | V-4                    |
| ----------------------------------------------------------------- | ---------------------------------- | ---------------------- |
| `currentValue` / `currentChecked` / `currentStart` / `currentEnd` | Controls current value             | Removed                |
| `value`/`checked`                                                 | Inconsistent between Vue 2 / Vue 3 | Controls current value |
| `initialValue` / `defaultChecked`                                 | Doesn't exist                      | Controls initial value |

### How to get ready?

- First, make sure you're on the latest version of Vivid 3.x.  
  Optionally, install the latest version of our new [ESLint plugin](/guides/eslint-plugin/), which can help with the migration.

- Replace all usage of `currentValue` / `currentChecked` with `modelValue` and all usages `currentStart` / `currentEnd` with `start` / `end`.  
  The `no-current-value-attribute` rule of our ESLint plugin can perform this migration automatically.

- Replace all usages of `value` / `checked`:

  - **Vue 3:**  
    `value`/`checked` sets the current value and can be replaced with `modelValue`.

  - **Vue 2:**  
    `value` / `checked` sets the initial value and can be replaced with `initalValue` / `defaultChecked`.  
    Keep in mind that the original code may be wrong and intended to set the current value instead.

  The `no-value-attribute` rule of our ESLint plugin will warn about any usages of `value` / `checked`.
