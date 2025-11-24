---
title: How to Choose the Right Token
order: 20
---

# How to Choose the Right Token

Choosing the right token is about selecting the option that best reflects the **meaning**, **role**, and **hierarchy** of the element you’re designing. Tokens give you a structured way to express intention across color, typography, spacing, size, and shape - so your decisions stay consistent, predictable, and easy to maintain.

## When It’s Fine to Adjust or Break the Guidance

The guidelines in this system are here to support your decision-making—not restrict it. Tokens are meant to be flexible, and real projects sometimes require solutions that sit slightly outside the suggested patterns.

Think of the guidance as a reliable suggested starting point rather than strict rules. In most cases, following the recommended families and scales will give you predictable, consistent results. But every now and then, a specific layout, accessibility need, or design nuance may call for a small adjustment.

These thoughtful exceptions are part of good design. When they’re intentional and rooted in purpose, they strengthen clarity without harming overall consistency.

You might wonder: **“If we bend the rules, how do we stay consistent?”**

The answer is simple: by staying mindful. Designers and developers naturally compare their work to existing components, previous patterns, and shared references. We trust that you care about consistency as much as the system does—because cohesive, predictable interfaces benefit everyone. With that awareness, you’ll be able to make informed choices even when stepping slightly outside the recommended path.

## Start With Meaning, Not Appearance

Every semantic group communicates something specific. This applies not only to colors, but also to typography, spacing, and shapes.

**Color meaning examples:**

- **neutral** / **neutral-alt** - everyday UI, calm surfaces, structural borders
- **accent** / **accent-alt** - call to actions, accents, highlights, branded elements
- **positive**, **caution**, **critical**, **information** - status, feedback, guidance

**Typography meaning examples:**

- **heading** - titles, section headers, strong emphasis
- **body** - general reading, content-heavy areas, blocks of text
- **caption** - supportive labels, small annotations
- **input** - fields, controls, interactive elements

**Radius meaning examples:**

- **rectangle** - standard UI containers
- **pill** - chips, buttons, tags
- **circle** - icons, avatars, decorative shapes

**Size meaning examples:**

- **medium** - standard icon sizes, spacing units
- **large** - larger icons, more prominent spacing or layout elements

Selecting by meaning helps maintain clarity even when themes or values change.

## Choose by Function, Not Visual Preference

It’s common for a token to “look right” while belonging to the wrong semantic group.  
This causes inconsistencies over time. Instead, ask:

- _What role does this element serve?_
- _Which semantic family expresses that role best?_
- _What scale fits the intended prominence?_

Examples:

- For subtle label text, choose `caption-400` instead of shrinking a heading token.
- For a quiet structural divider, choose a neutral scale like `neutral-400` instead of mixing families.
- For avatar shapes, choose a circle radius token rather than approximating a circular value manually.
- For icon sizing, use a size token (`medium-700`) rather than hardcoding `1rem`.

This keeps decisions purposeful instead of aesthetic-only.

## Misuse Patterns to Watch For

Avoiding common pitfalls helps preserve long-term consistency:

- **Picking tokens by eye** - breaks semantic meaning and complicates theme changes.
- **Mixing families without purpose** - e.g., accent text on a neutral background with no semantic reason.
- **Using a scale like a color picker** - scales describe hierarchy, not hue.
- **Force-fitting typography** - using body styles for headings instead of heading tokens.
- **Hardcoding radii or sizes** - reduces consistency and theming flexibility.

Being mindful of these patterns keeps the system predictable and maintainable.

## A Simple Routine for Choosing Tokens

Here is a reliable starting point that works across color, typography, radius, size, and spacing:

1. Determine the **semantic meaning** (neutral, positive, heading, rectangle, medium, etc.).
2. Start at **700** (for color, typography, size, density).
3. Adjust scale slightly while keeping the same semantic family.
4. Check **hierarchy, legibility, shape consistency, and spacing balance**.
5. Make exceptions only for clear reasons like accessibility or functional clarity.

This approach helps you choose tokens with confidence and consistency across the entire system.
