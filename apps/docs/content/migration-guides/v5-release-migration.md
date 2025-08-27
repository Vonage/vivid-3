---
title: V5 Release Migration
order: 1
---

# Vivid v5.0.0 Migration Guide

Release date: 27th August 2025.  
This document provides descriptions of the breaking changes in this release and instructions on how to prepare for them.

## ARIA Attribute Renaming

### The Change

To improve accessibility, certain components will rename ARIA attributes set on them after rendering.

For example, when you set `aria-label` on an icon only Button:

```html
<vwc-button aria-label="Send"><!-- ... --></vwc-button>
```

The attribute will be renamed in the DOM after rendering:

```html
<vwc-button data-vvd-aria-label="Send"><!-- ... --></vwc-button>
```

Your `aria-label` is still in effect, so you do not change your usage of the component.

However, there may be CSS selectors like (`vwc-button[aria-label="Send"]`) or other code depending on these attributes in your code base.

You will need to update them to use the new attribute name instead:

```diff
-vwc-button[aria-label="Send"]
+vwc-button[data-vvd-aria-label="Send"]
```

<vwc-accordion expand-mode="multi" style="inline-size: 100%">
<vwc-accordion-item heading="Affected components" expanded="false">

- Action Group
- Avatar
- Banner
- Breadcrumb
- Button
- Calendar Event
- Card
- Checkbox
- Dialog
- Fab
- File Picker
- Header
- Menu
- Nav
- Nav Disclosure
- Number Field
- Progress
- Progress Ring
- Radio Group
- Searchable Select
- Slider
- Split Button
- Switch
- Tag
- Tag Group
- Text Area
- Text Field

</vwc-accordion-item>
<vwc-accordion-item heading="Why are we making this change?" expanded="false">

The affected components delegate their ARIA attributes to a child element inside the shadow DOM.

For example the `vwc-button` renders a `button` element inside the shadow DOM:

```html
<vwc-button aria-label="Send">
	<#shadow-root>
		<button aria-label="Send"></button>
	</#shadow-root>
</vwc-button>
```

This means that the ARIA attributes end up duplicated which causes accessibility issues due to incorrect or invalid semantics.

</vwc-accordion-item>
</vwc-accordion>

### How to Get Ready?

We recommend that you avoid relying on the presence of ARIA attributes on Vivid components and use alternate approaches.

Some components have alternative attributes already available:

```diff
-vwc-nav-item[aria-current="page"]
+vwc-nav-item[current]
```

Or you can set your own `data-*` attributes to be able to select specific components later.

## Calendar

### The Change

The default value for the `sticky-mode` attribute has been changed from `none` to `all`. This means that calendar days and time will now be sticky by default, improving the user experience when working with large calendar views.

|                             | V4     | V5    |
| --------------------------- | ------ | ----- |
| `sticky-mode` default value | `none` | `all` |

### How to Get Ready?

If you want to maintain the previous non-sticky behavior, explicitly set `sticky-mode="none"` on your calendar components:

```html
<vwc-calendar sticky-mode="none" datetime="2022-01-01"></vwc-calendar>
```

The available values for `sticky-mode` are:

- `none` - No sticky behavior
- `header` - Only days (header) are sticky
- `column` - Only time (column) is sticky
- `all` - Both days and time are sticky (new default)

## Menu

### The Change

The default value for the trigger attribute has been changed from `legacy` to `auto`. The `legacy` behavior is inconsistent and should not be used.

|                         | V4       | V5     |
| ----------------------- | -------- | ------ |
| `trigger` default value | `legacy` | `auto` |

The `auto` trigger mode provides the following behavior:

- Menu opens and closes automatically when the anchor is clicked.
- Menu closes automatically when the user selects a menu item with a role different from `menuitemcheckbox`.

Meanwhile, the `legacy` mode provides:

- Menu opens automatically when the anchor is clicked.

### How to Get Ready?

If you need to maintain the previous behavior for compatibility reasons, explicitly set `trigger="legacy"` on your menu components:

```html
<vwc-menu aria-label="Menu example" placement="bottom-end" trigger="legacy">
	<vwc-button slot="anchor" aria-label="Open menu" appearance="outlined">
		<vwc-icon slot="icon" name="more-vertical-line"></vwc-icon>
	</vwc-button>
	<!-- menu items -->
</vwc-menu>
```

Note that many examples in the documentation have been updated to remove the explicit `trigger="auto"` since it's now the default behavior.

## Selectable Box

### The Change

The `clickable` property has been completely removed from the component after the deprecation period and is fully replaced with the `clickable-box` attribute. This property was deprecated in November 2023 and has now reached the end of its support period.

### How to Get Ready?

Replace all usage of the `clickable` property with the `clickable-box` attribute:

```html
<vwc-selectable-box clickable-box></vwc-selectable-box>
```

## File Picker

### The Change

We improved the design of the File Picker. It now features an animated **upload icon** and has clearer visual states for hover, active, and drag-hover events.

No code changes are needed, but you should verify that the new design does not cause layout issues in your use cases.

## Vivid Vue Typings

### The Change

This is type-only change to the events emitted by Vivid Vue components.

Previously, `event.target` would be typed as an instance of the web component. However, this is not always correct in cases where events bubble up from the light DOM.

In V5, we're correcting this and removing the typing. Instead, you can use `event.currentTarget` to get a correctly typed reference to the web component.

### How to Get Ready?

Replace all usage of `event.target` with `event.currentTarget` in your Vue component event handlers.

```diff
<script setup lang="ts">
	import { VTextField } from '@vonage/vivid-vue';
</script>
<template>
-	<VTextField @input="console.log($event.target.value)" />
+	<VTextField @input="console.log($event.currentTarget.value)" />
</template>
```

The `currentTarget` property will always be the web component element, making it more reliable than `target`.

This change affects all Vivid Vue components that emit events.
