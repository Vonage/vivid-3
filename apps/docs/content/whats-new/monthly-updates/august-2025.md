---
title: August 2025
month: 2025-08
---

# August 2025 - Monthly Update

Here’s what’s new and improved in the Vivid Design System for August 2025.

## Office Hours Meetings

**19/08/2025**: [Watch the recording](https://drive.google.com/file/d/17jg51cPi5dbMx8EIrHwxONW7s1XV2AO4/view?usp=drive_web)

- [Option]: Discussions highlighted several enhancements for the option component, including support for right-side icons/avatars, multi-line descriptions, additional slots, and clearer selection indicators (checkmarks). The team agreed a more composable, variant-based approach (simple, complex, etc.) would better cover these needs while maintaining backward compatibility.
- [Vivid Live Figma Component Issues]: Design inconsistencies observed in Figma will be tracked in a Google Sheet/Doc instead of JIRA, as the files may change significantly with upcoming token and API updates. One specific gap noted is missing focus states in some components — developers are advised to use the focus states available in the dev library.

## v5 Release

Vivid **Version 5** is now live 🎉. For more information on what changed and guidance on updating, please refer to the [V5 Migration Guide](/migration-guides/v5-release-migration/).

## Accessibility Testing Results Documented

With only a few components still awaiting accessibility sign-off from Applause, we’ve started publishing test results in the Accessibility section of each component’s documentation.
Components that have been signed off but include known exceptions now have those exceptions clearly listed in the docs as well.

## Accordion: Adds 'ghost', ghost-light' and 'filled' Appearance Variants

You can now alter the [appearance of Accordion Items](/components/accordion/#appearance). This makes it more flexible was using it on difference background colors.

## Selectable Box: Adds Control Placement

You now have more [control over the placement](/components/selectable-box/#control-placement) of the Checkbox/Radio control.

## Split Button: Adds 'outlined' Appearance

We have added the ['outlined' appearance to Split Button](/components/split-button/#appearance) bringing it inline with the Button component.

## Tag: Adds 'subtle-light' Appearance

We have added the ['subtle-light' appearance to Tag](/components/tags/#appearance) which adds some transparency to the background color.

## Toggletip: Adds Localized Label to the Anchor Element

We have improved the accessibility and flexibility of the `aria-label` added to Toggletip's anchor element. The label is now more descripted and also localized so it supports multiple languages.

## Date Time Picker Moves Out of Alpha Status

After being integrated by product teams and tested for accessibility by Applause, we have moved [Date Time Picker](/components/date-time-picker/) to full release.
