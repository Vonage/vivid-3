---
title: April 2025
month: 2025-04
---

# April 2025 - Monthly Update

## Searchable Select Graduates from Alpha 🎉

The [Searchable Select](/components/searchable-select/) component is now fully released and ready for production use.

A big thank you to the teams who tested the component and shared feedback — your input played a key role in shaping the final version!

### Custom Tag Connotation in Searchable Select

During integration testing, one helpful suggestion was to allow customization of the tag connotation within the Searchable Select component.

We’ve now [implemented this](/components/searchable-select/#tag-connotation): you can set the appearance of tags by applying the `tag-connotation` attribute directly to each Option component.

## Vue Wrappers: Improved Typings

We’ve improved TypeScript support for our Vue wrappers! You’ll now get better type inference when accessing component instances and handling events—making integration smoother and safer.

Learn more:

- [Using Events](/getting-started/vue/#using-events)
- [Accessing the Component Instance](/getting-started/vue/#accessing-the-component-instance)

## File Picker: Files & Rejected Files Property

Use `files` or `rejectedFiles` properties to access the list of files that have been added to the File Picker and passed or failed validation checks.

## Tabs: New CSS Variable for Block Size

When using [Tabs inside flex structure](/components/tabs/code/#tabs-block-size), setting `--tabs-block-size: 100%` with `flex:1` or with any specific `block-size` on Tabs will stretch the tabs to full height.

## Checkbox, Radio, Selectable Box: Updated CTA Styles

We have updated the styles for the unselected state of the CTA connotation. The CTA color now is only displayed when the component is in a selected state.
