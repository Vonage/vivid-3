---
title: What Design Tokens Are
order: 10
---

{% include '../_includes/design-tokens-announcement.njk' %}

# What Design Tokens Are

Design tokens are the shared language of visual decisions in our design system. They capture choices such as colors, typography, spacing, elevation, and radii in a format that is consistent, portable, and easy to apply across tools and platforms. Instead of storing raw values like `#0077ff` or `16px`, tokens store the _meaning_ behind those values - so teams can work with intent rather than memorizing numbers.

## Design Decisions, Not Values

A token represents a **design decision**. That decision can be broad, like defining the neutral color scale for a theme, or specific, like choosing the body text style for inputs. While the value behind a token may change across themes or evolve over time, its meaning stays consistent. This separation helps maintain flexibility and keeps interfaces aligned, even when underlying values shift.

## A Single-Level Semantic Model

Vivid uses a **single-level naming model**, where semantic names point directly to their assigned values. Rather than juggling primitives, aliases, and component-level overrides, each token name reflects its purpose clearly:

- semantic family (e.g., _neutral_, _accent_, _positive_)
- optional modifiers (e.g., _alt_, _information_)
- scale (100–1300) to express hierarchy and contrast

This keeps the model simple to understand, predictable to use, and easy to maintain across a large ecosystem of components.

## How Naming Works

Tokens follow a structured, readable pattern:

```
vivid - category – semantic family – scale
```

Example: `vivid-color-positive-700`

Each part contributes to clarity:

- **vivid** is a prefix that is visible always, regardless the platform.
- **category** describes the type of design decision (color, typography, spacing, radius, elevation, size)
- **semantic family** expresses intent (neutral, accent, caution, positive…)
- **scale** communicates visual weight, hierarchy, and contrast (700 as the default starting point)

This structure helps users quickly recognize what a token does, how it fits within a family, and how to adjust it when needed.

## Core Vocabulary

A few terms help anchor how tokens work:

- **Token** - the conceptual design decision, described by name and meaning.
- **Variable** - the technical form of a token in platforms such as CSS, Flutter or Figma.
- **Theme** - a collection of token values that define a specific visual context (e.g., light mode, condensed spacing).
- **Consumer** - any UI element or component that uses tokens.
- **User** - the person selecting tokens in design or code.

Together, these ideas form a system that ensures consistency, enables theming, and creates a shared language between design and development.
