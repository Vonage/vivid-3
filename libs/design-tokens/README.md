# Design Tokens

## What are design tokens?

At the core of this system is a shared understanding of design tokens as the conceptual representation of design decisions—such as color, spacing, typography, and elevation—rather than mere variables or values. Tokens capture meaning and intent, not implementation. They make it possible to store, exchange, and apply design choices consistently across tools and platforms like Figma, web, and Flutter, creating a common language that connects design and development.

## Storage

Design tokens and their values are defined and maintained directly in Figma, using Variables and Styles as the single source of truth. This approach keeps design and implementation perfectly aligned—tokens originate in design, not in code.

A custom plugin extracts these tokens from Figma, converts them into a platform-neutral JSON format following the Design Tokens Community Group (DTCG) standard, and automatically synchronizes them with the codebase through pull requests.

By keeping token generation inside Figma and using DTCG for cross-platform exchange, the system remains focused, consistent, and free from unnecessary third-party complexity.

## Output formats

Once exported from Figma in the DTCG-compliant JSON format, the token data is transformed into platform-specific outputs that can be directly used in design and development environments. These outputs include formats such as CSS or Flutter variables, and other platform-specific representations.

This conversion ensures that every platform receives exactly the same tokens in a structure optimized for its ecosystem—while still maintaining a single, unified source of truth in Figma. As a result, design decisions flow seamlessly into implementation, preserving consistency across web, mobile, and design tools without manual duplication or drift.

## Usage

It's important to note, that design-tokens package provides only design tokens. It does not provide additional base styles.

Regardless the platform, the tokens can be applied globally or for a given scope.

With this assumption, you are able for example to apply the light theme for the whole view, and at the same time, apply the dark theme only for the sidebar.

### Web

1. Install the package:

```bash
npm i @vonage/vivid-design-tokens
```

2. import styles

```css
@import '@vonage/vivid-design-tokens';
```

3. Add `vvd-root` class

```html
<html class="vvd-root"></html>
```

### Flutter

To be done.
