---
title: Unifying Vivid with Design Tokens 
month: 2025-08
---

19th August 2025 - Jakub Hajduk

# Unifying Vivid with Design Tokens

We’re introducing design tokens into the Vivid Design System — a step that will make our work more consistent, scalable, and easier to maintain. Watch the video for the the summary:

<iframe src="https://drive.google.com/file/d/10Kw8K6JrgSKPCYYH5uZRamZ2Z5BDrw2C/preview" allow="autoplay" style="width: 100%; height: auto; aspect-ratio: 1.777; border: none;"></iframe>

Until now, styles like typography, spacing, and elevation have been fragmented and difficult to manage. By moving to a token-based approach, we’re creating a shared language that connects design and development, ensuring that decisions made in Figma carry through directly into code.

Our source of truth will be Figma Variables and Styles, exported via a custom plugin into the industry-standard JSON format and automatically synced with the codebase. A simple and predictable naming convention — such as `vvd-color-success-500` or `vvd-typography-body-sm` — will keep the system clear, flexible, and easy to adopt. Supporting tools like plugins, codemods, and theme generators will help us migrate smoothly and keep everything in sync across platforms.

The rollout will begin with testing in Figma, followed by tool development, iteration on tokens, and gradual migration of components before the final release. Adoption will be tracked both quantitatively, through analytics in Figma and code usage, and qualitatively, through team feedback.

Design tokens are more than just variables — they are the foundation of a unified design language that will make Vivid stronger, more coherent, and ready to scale.

For more details read the [Design Tokens Approach and Architecture Proposal](https://confluence.vonage.com/display/VIVID/Design+Token+Approach+and+Architecture+Proposal) on Vivid's Confluence.
