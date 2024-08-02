---
title: Release Policy
order: 3
---

# Release Policy

Vivid uses SemVer (semantic versioning). The three types of versions are:

- **Major** versions contain breaking changes.
- **Minor** versions add new features or deprecate existing features without breaking changes.
- **Patch** versions fix defects or optimize existing features without breaking changes.

Version numbers are presented `Major.Minor.Patch`, for example, `3.2.1`.

**Note**: The version number is separate from the repo name **vivid-3**. Ie. the **vivid-3** library can be at version `5.2.23`.

## What is Included?

Each release can include updates to:

- [@vonage/vivid](https://www.npmjs.com/package/@vonage/vivid) component library
- [@vonage/vivid-vue](https://www.npmjs.com/package/@vonage/vivid-vue) Vue wrapper library
- [Icons](https://vivid.deno.dev/icons/icons-gallery)
- [Vivid documentation site](https://vivid.deno.dev/)

## Cadence

### Minor / Patch Releases

The Vivid team releases a minor/patch version at least once per sprint (2 week period). P1 bugs will be expedited and released upon completion.

### Major Releases

The team plans for a major releases every quarter (only if a major release is required) after PI planning, to avoid introducing breaking changes in periods where there may be a need in some critical fixes.

We feel releasing major versions at this cadence eases the upgrade burden for teams as there will be much smaller set of changes to implement.

### Announcing a Release

Each new release is announced on [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) channel along the release notes associated with it.

Major releases are accompanied by a Major release upgrade document detailing the changes and the steps needed to resolve them in a consuming app.

## Deprecations

Deprecation warns that a feature use will be discontinued. Often there will be a preferred alternative. For example, in the case of renaming a prop, the old prop will be marked as deprecated and the new prop name will be added.

Support for the deprecated feature will continue for **12 months** and after that period the feature will be removed as part of the next major release after the support period has ended.

When a feature is deprecated the team will:

- Communicate intent via the #ask-vivid slack channel
- Add a notice to the docs
- Communicate via #ask-vivid when the support period ends
- Include details of removal in the release notes of the next major release

## What Constitutes a Breaking Change?

A breaking change is a change that may require you to make changes to your application in order to avoid disruption to your integration.

### API

- Removal of any prop, public method, custom event or slot
- Renaming any prop, public method, custom event or slot
- Changing the number of existing arguments or order o existing arguments for a public method
- Renaming data passed as part of a custom event trigger
- Adding new validation requirements to props
- Changing the name of the custom element itself
- Changing the documented behaviour of a component (eg. timeout delay, sequence of events when a method is invoked)

### Style

Any changes to style that trigger a layout change in the Vivid user's product, such as:

- Changes to box-model properties, including padding, margin, width, height, display, box-sizing, position, top/right/bottom/left (or their logical properties equivalents)
- Changes to font attributes that cause text to wrap where it previously didn't wrap, including increased font-size, font-weight, or letter-spacing
- Renaming public facing css variables

### Icons

- Renaming or removing an icon
- Altering an icon's pictogram significantly while retaining the icon name

## Accidental Release of Breaking Change

If a backward-incompatible change is released unintentionally, the Vivid team will follow the process outlined on semver.org:

As soon as the team realises that we've released a breaking change as part of a minor release, we will release a new minor release that corrects the problem and restores backward compatibility.

Even under this circumstance, we will not modify versioned releases. For example, if we release a breaking change in `3.2.0`, we will not simply overwrite version `3.2.0` we will release a new version `3.3.0` that fixes the breaking change.

We will document the offending version and inform Vivid users of the problem in the [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) slack channel.
