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
