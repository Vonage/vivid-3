---
title: Rethinking Design Tokens... Again
month: 2026-04
---

April 2026 - James Taylor

# Rethinking design tokens… again

Vivid’s move toward a [**simpler, semantic-first token architecture**](/whats-new/rethinking-design-token-architecture/) is the right direction.

Reducing layers makes tokens easier to understand, adopt, and scale - especially as design systems become increasingly consumed by AI, not just humans.

But there’s a risk in going too far.

> If everything is just a semantic scale, we lose the *intent* behind how tokens are used.

## The gap: scales don’t express usage

Tokens like:

```
color-neutral-200
 color-cta-700
```

are great for consistency — but they don’t tell you:

> *When should I use this?*

That decision gets pushed back onto every developer and designer - and that’s where inconsistency creeps in.

## Add functional tokens for clarity

Functional tokens encode **purpose, not just value**:

```
color.text.muted
 color.background.default
 color.border.subtle
```

They:

* remove guesswork
* improve consistency across teams
* embed accessibility decisions
* are far easier for AI to interpret

This is where tokens become **usable**, not just defined.

## Add pattern tokens where it matters

Some decisions repeat across components—like appearances / connotations or input states.

Instead of redefining them everywhere, we introduce **targeted pattern tokens**:

```
color.filled.cta.background.default
 color.filled.cta.background.hover
```

These aren’t component tokens.

They’re **shared UI behaviours** that multiple components rely on.

## The balance

This isn’t about bringing back complex token hierarchies.

It’s about keeping the right layers:

* **Base tokens** → consistency & theming
* **Functional tokens** → clarity & accessibility
* **Pattern tokens** → UI consistency & reuse

👉 And avoiding:

* component-specific tokens
* deep alias chains
* over-engineering

## Why this matters now

As tools like Figma move toward **agent-driven design**, token clarity becomes critical.

AI doesn’t understand:

```
color-neutral-300
```

But it *does* understand:

```
color.text.muted
 color.filled.cta.background.default
```

Tokens need to encode **intent**, not just values.

## Final take

Simplifying token architecture is the right move.

But true simplicity isn’t about removing layers entirely -

> it’s about keeping / adding the ones that make systems easier to use, not harder.
