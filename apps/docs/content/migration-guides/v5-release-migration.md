---
title: V5 Release Migration
order: 1
---

# Vivid v5.0.0 Migration Guide

Release date: xx 2025.  
This document provides descriptions of the breaking changes in this release and instructions on how to prepare for them.

## Aria Attributes

### The change

Aria- attributes set on components were previously passed down internally to child elements, which led to duplicated aria-attributes on multiple nodes and caused issues with accessibility semantics. In v5, a new mechanism has been introduced that renames `aria-*` attributes to `data-vvd-aria-*` during rendering. This improvement enhances accessibility while allowing you to set aria attributes in the same, simple way as before.

The change affects how aria attributes are handled internally within components to prevent duplication and ensure proper accessibility semantics. However, the developer experience **remains the same** - you continue to use standard `aria-*` attributes on components as you would normally.

### How to get ready?

If your test suites rely on checking for specific `aria-*` attributes in the DOM, you may need to update them. Instead of looking for `aria-*` attributes directly, your tests should now look for `data-vvd-aria-*` attributes or test the accessibility functionality directly rather than relying on specific attribute names.

For example, if your test was checking for `aria-selected`, you should update it to check for `data-vvd-aria-selected` or use accessibility testing tools that focus on the actual accessibility tree rather than raw attributes.

## Calendar

### The change

The default value for the `sticky-mode` attribute has been changed from `none` to `all`. This means that calendar days and time will now be sticky by default, improving the user experience when working with large calendar views.

|                             | V4     | V5    |
| --------------------------- | ------ | ----- |
| `sticky-mode` default value | `none` | `all` |

### How to get ready?

If you want to maintain the previous non-sticky behavior, explicitly set `sticky-mode="none"` on your calendar components:

```js
<vwc-calendar sticky-mode="none" datetime="2022-01-01"></vwc-calendar>
```

The available values for `sticky-mode` are:

- `none` - No sticky behavior
- `header` - Only days (header) are sticky
- `column` - Only time (column) is sticky
- `all` - Both days and time are sticky (new default)

## File Picker

### The change

### How to get ready?

## Menu

### The change

The default value for the trigger attribute has been changed from `legacy` to `auto`. This change **improves the default user experience** by providing better automatic menu behavior.

|                         | V4       | V5     |
| ----------------------- | -------- | ------ |
| `trigger` default value | `legacy` | `auto` |

The `auto` trigger mode provides the following behavior:

- Menu opens and closes automatically when the anchor is clicked,
- Menu automatically closes when the user selects a menu item with a role different from `menuitemcheckbox`,
- Provides a more intuitive and consistent user experience.

### How to get ready?

If you need to maintain the previous behavior for compatibility reasons, explicitly set `trigger="legacy"` on your menu components:

```js
<vwc-menu aria-label="Menu example" placement="bottom-end" trigger="legacy">
  <vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
    <vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
  </vwc-button>
  <!-- menu items -->
</vwc-menu>
```

Note that many examples in the documentation have been updated to remove the explicit `trigger="auto"` since it's now the default behavior.

## Selectable Box

### The change

The `clickable` property has been completely removed from the component after the deprecation period and is fully replaced with the `clickable-box` attribute. This property was deprecated in November 2023 and has now reached the end of its support period.

### How to get ready?

Replace all usage of the `clickable` property with the `clickable-box` attribute:

```js
<vwc-selectable-box clickable-box>
```

## Vue Wrappers

### The change

The deprecated `target` property has been removed from Vue wrapper events. The `target` property provided inaccurate typing since the event target may not refer to the component in some cases, such as when events bubble from light DOM elements.

Previously, Vue wrappers included both `target` and `currentTarget` properties in their event typing.

### How to get ready?

Replace all usage of `event.target` with `event.currentTarget` in your Vue component event handlers.

#### Before (V4):

```html
<template>
	<VTextField @input="handleInput" />
</template>

<script>
	export default {
		methods: {
			handleInput(event) {
				const value = event.target.value; // Replace this
			},
		},
	};
</script>
```

#### After (V5):

```html
<template>
	<VTextField @input="handleInput" />
</template>

<script>
	export default {
		methods: {
			handleInput(event) {
				const value = event.currentTarget.value; // Use currentTarget instead
			},
		},
	};
</script>
```

The `currentTarget` property will always be the host component, making it more reliable than target which could refer to child elements when events bubble from the light DOM (for example, an input event bubbling from a select element slotted into a text-field).

This change affects all Vue wrapper components that emit events, ensuring more consistent and predictable behavior when handling component events.
