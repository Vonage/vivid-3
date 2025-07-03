---
title: Rethinking Design Token Architecture
month: 2025-07
---

7th July 2025 - Jakub Hajduk

# Rethinking Design Token Architecture: A Practical Exploration

_This is a shorter version of my article [Multi-level design tokens - pros, cons and optimization](https://confluence.vonage.com/pages/viewpage.action?pageId=454985049)._

Design tokens are a powerful way to bridge design and development—providing consistency, scalability, and flexibility across platforms. But as token systems evolve, so do their challenges. This post explores how we structure design tokens, the tradeoffs of abstraction, and practical strategies to simplify and optimize our token architecture.

## Key Concepts:<br />What Are Design Tokens, Really?

At their core, **design tokens** are named key-value pairs that represent design decisions—things like colors, spacing, typography, or border radii. They're platform-agnostic, meaning a single decision (e.g., success-color = #28a745) can be reused across code, design tools, and themes.

To understand how tokens work, it helps to clarify a few terms:

- **Consumers:** Components or systems that use tokens (e.g., a button using button-bg).
- **Users:** Designers or developers who apply tokens to products or interfaces.
- **Themes:** Collections of token values used for specific modes or branding (e.g., light/dark, partner-specific themes).
- **Variables:** Platform-specific implementations (e.g., CSS custom properties, Figma variables).
- **Variable Sheets:** Organized sets of variables—typically grouped by platform, component, or theme.

## A Layered System:<br />Understanding Multi-Level Tokens

Design tokens can be structured across multiple abstraction levels, each adding clarity—but also complexity.

1. **Raw Values**
   Basic, unnamed values (e.g., `#ff0000`, `24px)`. Useful, but unstructured.

2. **Primitives**:
   Named tokens directly tied to raw values (e.g., `red-500`, `spacing-24`). These form the foundational palette.

3. **Semantic Tokens**:
   Tokens that express intent, not value (e.g. `color-success`, `spacing-condensed`, `radii-subtle`). They map meaning to primitives and can change depending on the theme.

4. **Component-Level Tokens**:
   Highly specific tokens for UI parts and states (e.g. `primary-button-border-hover`, `input-icon-color`). These bring precision but can multiply quickly if not managed carefully.

## The Double-Edged Sword of Abstraction

Abstraction is helpful—it hides complexity and enables reuse—but it's also risky. Over-abstraction can lead to:

- **Misuse**: Tokens get reused in unrelated contexts (e.g., one token used for multiple, very different icons).
- **Unexpected Side Effects**: Updating a token can accidentally affect several components.
- **Cognitive Load**: Users must understand multiple abstraction layers, leading to confusion.

A Real Example:
We create `input-icon-color` for a left-side icon in a text field. It gets reused for: Right-side icons, Dropdown carets, Clear buttons, Checkmarks in list items.

Later, changing the color for just one case inadvertently changes them all—breaking the intended design in multiple places. Without careful documentation and review, this scenario is inevitable.

## Optimization Strategies:<br />Keeping It Practical

To keep our token system scalable and usable, we need to consider these best practices:

### 🔁 Merge Primitives with Semantic Tokens

If our semantic tokens are just 1:1 mappings to primitives (`green-500` → `success-500`), skip the middle layer and assign values directly to semantic tokens. Less overhead, same flexibility.

### 🎨 Theme via Semantic Sets

Use [variable modes (e.g. in Figma)](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables) to switch themes like light/dark. This avoids duplicating tokens unnecessarily and reinforces semantic structure.

### ✂️ Keep Tokens Dumb

Design tokens should be simple key-value pairs. No logic, math, or conditionals—leave calculations to components or tools. This keeps the token system clear and maintainable.

### 🚀 Use Semantic Tokens Directly

Mostly, we don’t need component-level tokens. Applying semantic tokens (like brand-primary) straight to components can:

- Reduce token sprawl
- Make the system easier to understand
- Still allow for themes and overrides when needed

This approach is especially useful when the team values flexibility over strict control.

## Current State of Our Tokens (And Where We’re Headed)

We evaluated the current state of token usage in Vivid:

| Token Type       | Status / Action Needed                                       |
| ---------------- | ------------------------------------------------------------ |
| **Colors**       | ✅ Well-optimized. Semantic-only structure with theme modes. |
| **Typography**   | ⚠️ Inconsistent naming and structure. Needs cleanup.         |
| **Sizing**       | ❌ Handled in CSS logic, not tokens. Should be formalized.   |
| **Elevation**    | ⚠️ Used in Figma styles, but not defined as tokens yet.      |
|  **Other Types** | 👀 Add only if they provide clear, consistent value.         |

## Final Thoughts and Recommendations

Design tokens are foundational—but they shouldn’t be overwhelming. The more levels we introduce, the more we need to maintain, document, and teach. When in doubt, opt for simplicity.

### ✅ Recommended Approach:

- Use semantic-only tokens where possible
- Align all token types to this model
- Standardize across platforms
- Review how tokens are used in both design and development
- Prioritize clarity over cleverness

Design systems thrive when the infrastructure behind them is both robust and comprehensible. With a focused, flexible approach to token architecture, we can deliver consistency without complexity.
