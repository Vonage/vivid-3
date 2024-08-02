---
title: Custom Prefix
order: 2
---

# Custom Element Prefix

## The Problem

Custom elements are registered globally by the browser. When two custom elements with the same tag name are registered on the same document, it creates a conflict that results in an error. Loading multiple versions of Vivid is likely to cause this error as Vivid elements are named the same.

Enforcing only a single version of the library to be used simultaneously makes it difficult to progressively migrate to newer versions of the library, as each update will require a full application update.
Also, in a micro-frontend architecture, this can be a major bottleneck as each micro-frontend may use a different version of the library.

## Using a Custom Prefix

To work around this limitation, Vivid provides a way to register custom elements with a custom prefix. E.g. `vwc-badge` can be registered as `dashboard-badge` instead.

This allows multiple versions of the library to be used simultaneously:

- If you use both Vivid 2 and Vivid 3 in a page, Vivid 2 can live under its `vwc` prefix and Vivid 3 under a `vwc-3` prefix.
- If you use Vivid 3 in a micro-frontend architecture, each micro-frontend can use its own prefix.

See the Getting Started guides to learn how to set a custom prefix for your project.
