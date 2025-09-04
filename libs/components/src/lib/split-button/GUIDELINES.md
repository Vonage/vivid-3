## Overview

In complex applications, users can be overwhelmed by too many visible commands and controls. Split Buttons help reduce visual complexity by grouping related commands into a dropdown menu, while still providing one-click access to a default action.

A Split Button is a hybrid between a button (for the default action) and a menu (for related alternatives). It consists of two areas:

- Label area – triggers the default action.
- Arrow area – opens the dropdown menu of related commands.

Use Split Buttons when one action is most frequently used, but related alternatives should still be available.

## When to Use

✅ **Use a split button when:**

- One option is clearly the most common/default action.
- The other options are related variants of the default.
- Commands belong in a **toolbar** or command area (not navigation).

❌ **Avoid split buttons when:**

- No strong default action exists (use a [regular menu button](components/button/#dropdown-indicator) instead).
- For website navigation (use [Navigation](components/navigation/)).
- In touchscreen-heavy UIs where arrow targets would be too small.
- Either part of the Split Button needs to be disabled independently (Use separate buttons in this case).

## Best Practices

- **Use text labels**
  - Always include a text label for the default action.
  - Icons are optional, but text improves learnability, discoverability, and target size.
  - The label should describe the default action (verb), not a generic category.
- ** Keep menus manageable**
  - Limit options to fewer than 10–12 items.
  - Avoid submenus inside split button menus.
  - Order items:
    - By frequency/popularity if fewer than ~5 items.
    - Alphabetically if more than ~5 items.
  - Disable unavailable actions instead of removing them.
  - Show keyboard shortcuts alongside menu items when available.
