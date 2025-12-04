---
title: Troubleshooting & Debugging Token Usage
order: 100
---

# Troubleshooting & Debugging Token Usage

Even with a clear token system in place, it’s natural to encounter situations where the chosen token doesn’t feel right, conflicts appear in the UI, or elements look inconsistent across states. This section helps you recognize those issues early and resolve them with confidence.

## Check Whether the Semantic Family Matches the Intent

The most common source of problems is using a token from the wrong semantic group.

When something feels “off,” the first question to ask is:

### Does this family truly represent the meaning of the element?

Typical mismatches include:

- a neutral surface using accent borders
- a positive status icon styled with caution colors
- an action button using neutral text
- subtle text accidentally styled with heading typography
- a chip shape using rectangle radii instead of pill radii

If the semantic meaning doesn’t match the purpose, the visual result usually feels inconsistent, even if the values technically “work.”

**Fix:**  
Switch to the correct semantic category before adjusting scales or details.

### Look for Scale Misalignment Within a Single Element

Even when the right family is chosen, misuse of scale can create unintended hierarchy.  
Common symptoms include:

- background and text not contrasting enough
- borders that appear too strong or too faint
- icons looking oversized compared to typography
- overly large radius for a compact element
- spacing that doesn’t align with surrounding density

For example:

- `neutral-700` text on `neutral-600` background will not meet readability needs
- using `heading-900` in a dense layout might overwhelm other elements
- spacing at `medium-1100` can feel disproportionate inside a compact control

**Fix:**  
Stay within the same family, adjust scale thoughtfully, and check contrast or balance using nearby values.

### Ensure Background, Border, and Text Come From the Same Family

When elements feel visually disconnected, mixing families is often the cause.  
Signs of this issue include:

- borders that stand out more than intended
- text that feels unrelated to its background
- interactive states that appear inconsistent (hover, pressed, selected)
- subtle UI layers that suddenly carry emotional meaning (e.g., caution border on neutral surface)

Consistency within a single semantic family reinforces clarity and reduces noise.

**Fix:**  
Realign all internal parts of the component to one family unless there is a clear semantic reason to mix them.

### Spot “Visual-Only” Token Choices

Choosing tokens by eye rather than by meaning is tempting, but it quickly creates maintenance issues \- especially when themes evolve.

Red flags include:

- “I picked this color because it looked close enough”
- scaling typography tokens up or down instead of using the correct semantic style
- manually adjusting spacing instead of choosing a density or size token
- approximate radii that visually mimic a pill or circle

These decisions often work short-term but break theming, accessibility, or consistency later.

**Fix:**  
Revisit the intent:  
“What is the role of this element?”  
Then choose the token whose meaning reflects that role.

### Debug Contrast and Readability Issues

When text or icons look washed out or hard to read, the issue usually comes from:

- scale differences being too small
- not enough contrast between semantic pairs
- incorrect typographic pairing
- icon size not matching the text or container scale

Examples:

- `neutral-700` text on `neutral-600` background may fail contrast
- caption text at `caption-200` may be too light in busy layouts
- icon size `medium-300` may be too small inside a large button
- radius too subtle can visually flatten interactive states

**Fix:**  
Increase the relationship between scales (for color, spacing, radius, typography) while staying in the same family. The colour families are designed to have predictable contrast jumps when you adjust the scale.

### **Simplify Choices When Unsure**

When something feels overly complicated or difficult to debug, simplifying usually helps.

A reliable fallback checklist:

1. **Choose the correct semantic family** based on meaning.
2. **Start back at scale 700**, the system’s default.
3. Adjust one step at a time \- scale 600 or 800, nothing drastic.
4. Keep the element’s tokens in the same family.
5. Check contrast, balance, and component consistency.

In many cases, returning to these basics resolves the issue without extra rules or exceptions.

### When the Problem Isn’t Tokens

Sometimes, misalignment comes from layout, placement, or component behavior rather than token choice.  
If adjusting tokens doesn’t help:

- check spacing and density
- verify alignment and structure
- inspect component states
- ensure no legacy styles override tokens
- confirm the design wasn’t built using outdated values

If everything still seems off, it may be time to escalate to the design system team.
