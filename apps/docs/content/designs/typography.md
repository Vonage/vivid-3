---
title: Typography
order: 3
---

# Typography

Vivid typography is built on **design tokens**, **semantic text roles**, and **CSS utility classes**.
This structure allows typography to be themed, overridden, and extended while keeping usage consistent across products.

## Overview

Typography in Vivid is organised into three layers:

<ol class="vvd-list">
	<li><b>Design tokens</b> – raw typographic values</li>
	<li><b>Semantic typography roles</b> – meaningful text styles (body, headings, etc.)</li>
	<li><b>CSS styles & utilities</b> – how typography is applied in the UI</li>
</ol>

```
Design tokens
  ↓
Semantic typography roles
  ↓
Global styles & utility classes
```

## Typefaces

### Body Text

| Typeface       | Usage                         |
| -------------- | ----------------------------- |
| Body text - lg | Long-form reading or emphasis |
| Body text - md | Default body copy             |
| Body text - sm | Secondary or supporting text  |

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-body-text-lg">The Engineering team at Vonage is a fast growing group of talented engineers. As a <strong>Software Engineer</strong> in our Voice RTC (Real-time communications) team, you will develop <em>new features and tools</em> for applications that underpin our voice capability all over the world, your code will be critical in allowing thousands of people to connect via voice every second. The code you write will directly affect the success of businesses around the world.</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Body text lg</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 20px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 28px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Thin</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-body-text-lg</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-body-text-lg</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-body-text-md vvd-body-text-md-line-length">The Engineering team at Vonage is a fast growing group of talented engineers. As a <strong>Software Engineer</strong> in our Voice RTC (Real-time communications) team, you will develop <em>new features and tools</em> for applications that underpin our voice capability all over the world, your code will be critical in allowing thousands of people to connect via voice every second. The code you write will directly affect the success of businesses around the world.</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Body text md</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 14px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 20px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-body-text-md</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-body-text-md</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-body-text-sm vvd-body-text-sm-line-length">The Engineering team at Vonage is a fast growing group of talented engineers. As a <strong>Software Engineer</strong> in our Voice RTC (Real-time communications) team, you will develop <em>new features and tools</em> for applications that underpin our voice capability all over the world, your code will be critical in allowing thousands of people to connect via voice every second. The code you write will directly affect the success of businesses around the world.</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow vvd-doc-type-swatch__spec-heading">Body text sm</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 12px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 16px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-body-text-sm</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-body-text-sm</code>
	</div>
</div>

### Headings

| Typeface          | Intended usage             |
| ----------------- | -------------------------- |
| Heading - 3xl     | Page titles                |
| Heading - 2xl     | Major section headings     |
| Heading - xl      | Section headings           |
| Heading - lg      | Subsections                |
| Heading - md      | Dense UI headings          |
| Heading - sm      | Small headings             |
| Heading - xs      | Compact headings           |
| Heading - eyebrow | Overline / category labels |

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-3xl">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading 3xl</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 40px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 48px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-3xl</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-3xl</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-2xl">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading 2xl</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 32px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 40px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-2xl</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-2xl</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-xl">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading xl</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 28px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 36px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-xl</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-xl</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-lg">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading lg</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 24px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 28px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-lg</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-lg</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-md">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading md</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 20px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 24px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Regular</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-md</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-md</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-sm">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading sm</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 16px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 24px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Semi-bold</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-sm</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-sm</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-xs">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading xs</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 14px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 20px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Semi-bold</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-xs</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-xs</code>
	</div>
</div>

<div class="vvd-doc-type-swatch">
	<div class="vvd-doc-type-swatch__example">
		<div class="vvd-doc-type-swatch__sample-text-wrap">
			<span class="vvd-heading-eyebrow">Join Vonage and help us innovate cloud communications for businesses worldwide!</span>
		</div>
		<div class="vvd-doc-type-swatch__spec">
			<h3 class="vvd-heading-eyebrow">Heading eyebrow</h3>
			<ul class="vvd-doc-type-swatch__spec-list">
				<li><span class="vvd-doc-type-swatch__spec-label">Font Size:</span> 12px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Line Height:</span> 16px</li>
				<li><span class="vvd-doc-type-swatch__spec-label">Font Weight:</span> Semi-bold</li>
		</div>
	</div>
	<div class="vvd-doc-type-swatch__code-sample">
		<span class="vvd-doc-type-swatch__spec-label">Utility class:</span> 
		<code>vvd-heading-eyebrow</code><br />
		<span class="vvd-doc-type-swatch__spec-label">Design token:</span> 
		<code>--vvd-theme-typography-heading-eyebrow</code>
	</div>
</div>

### Mono text

```css
--vvd-theme-typography-mono-text
```

Used for inline code, `pre`, `code`, and keyboard (`kbd`) input.

## Global Typography Styles

Typography defaults are applied within `.vvd-root`.

All text inherits a shared base style (**body text - md**). This ensures a consistent baseline across all Vivid applications.

### Element defaults

| Element              | Typography     |
| -------------------- | -------------- |
| `body`, `p`          | Body text - md |
| `h1`                 | Heading 3xl    |
| `h2`                 | Heading 2xl    |
| `h3`                 | Heading xl     |
| `h4`                 | Heading lg     |
| `h5`                 | Heading md     |
| `h6`                 | Heading sm     |
| `small`              | Body text - sm |
| `figcaption`         | Body text - sm |
| `code`, `pre`, `kbd` | Code text      |

Margins are applied to headings and paragraphs to maintain vertical rhythm.

### Customising headings (`h1`–`h6`)

You can customise the **font style** and **vertical spacing** of the default HTML heading levels (`h1`–`h6`) using the heading-level theme variables.

Each heading exposes two variables:

<ul class="vvd-list">
	<li><code>--vvd-theme-h*-font</code> — controls the full font shorthand (size, weight, line-height, family)</li>
	<li><code>--vvd-theme-h*-margin-block</code> — controls the vertical spacing before and after the heading</li>
</ul>

This allows you to adapt the heading hierarchy to your product’s needs **without changing semantic HTML**.

```css
--vvd-theme-h1-font: var(--vvd-theme-typography-heading-xl);
--vvd-theme-h1-margin-block: 1.5rem;
```

In the example below, the `h1` is set to **heading-xl** instead of the default **heading-3xl**, and the margins are adjusted to better suit a denser layout.

```html preview
<style>
	:root {
		--vvd-theme-h1-font: var(--vvd-theme-typography-heading-xl);
		--vvd-theme-h1-margin-block: 1.5rem;

		--vvd-theme-h2-font: var(--vvd-theme-typography-heading-lg);
		--vvd-theme-h2-margin-block: 1.25rem;

		--vvd-theme-h3-font: var(--vvd-theme-typography-heading-md);
		--vvd-theme-h3-margin-block: 1em;

		--vvd-theme-h4-font: var(--vvd-theme-typography-heading-sm);
		--vvd-theme-h4-margin-block: 0.75rem;

		--vvd-theme-h5-font: var(--vvd-theme-typography-heading-xs);
		--vvd-theme-h5-margin-block: 0.5rem;

		--vvd-theme-h6-font: var(--vvd-theme-typography-heading-eyebrow);
		--vvd-theme-h6-margin-block: 0.25rem;
	}
</style>

<div class="wrapper">
	<h1>H1: heading-xl</h1>
	<h2>H2: heading-lg</h2>
	<h3>H3: heading-md</h3>
	<h4>H4: heading-sm</h4>
	<h5>H5: heading-xs</h5>
	<h6>H6: heading-eyebrow</h6>
</div>

<style>
	.wrapper {
		background: var(--vvd-color-canvas);
		padding: 1rem 2rem;
		margin: -1rem;
	}
</style>
```

## Other Utility Classes

### Lists

```html
<ul class="vvd-list">
	<li>Item</li>
</ul>
```

Applies consistent list indentation using a theme token (`--vvd-theme-typography-list-indent`).

### Tight spacing

```html
<p class="vvd-tight">No vertical margin</p>
```

Removes vertical margins for dense UI layouts.

## Best Practices

### ✅ Do

- Use **semantic HTML** (`h1`, `p`) where possible
- Use **utility classes** in components
- Override typography using **CSS variables**
- Apply casing and letter-spacing at the **component or utility level**

### ❌ Avoid

- Hardcoding font sizes or weights in components
- Uppercasing content strings in JavaScript
- Using typography tokens to control layout spacing
- Encoding presentation (e.g. `text-transform`) in semantic tokens

---

<h1>Typography: A page to test the design system's typographic styles</h1>

Vonage, a part of Ericsson, creates technology that empowers enterprises and equips developers to lead in the next era of digital transformation.

<h2>Vonage Elevates Customer Engagement with Launch of Omnichannel Conversations for Agentforce Marketing</h2>
<p>Vonage software solutions enable <a href="#wqdew">Agentforce Marketing users</a> to manage two-way customer conversations from a single, familiar interface, with personalized and intelligent communications that leverage the rich customer data already within Salesforce.</p>

<p>Streamlining workflows, the integration means that enterprises can now send timely, relevant messages and automate interactions with a blend of live agents and agentic AI.</p>

<h3>Vonage Recognized as Digital Identity Innovator at The Fast Mode Awards</h3>
<p>Vonage earned the award for its Identity Insights API, a groundbreaking solution that empowers enterprises with real-time network intelligence to verify users, prevent fraud, and deliver seamless customer experiences. 
<p>By leveraging critical trust signals like SIM Swap detection and Subscriber Match, the solution enables enterprises to enhance digital trust, improve security, and streamline customer journeys.</p>
<ul class="vvd-list">
	<li>Driving Innovation in Digital Identity</li>
	<li>A Leader in Telecom Innovation
		<ul class="vvd-list">
			<li>Vonage is featured in The Fast Mode 100</li>
			<li>Shaping the future of the global telecoms industry</li>
			<li>Leadership in advancing secure and seamless digital identity solutions</li>
			<li>Driving innovation through network-powered intelligence</li>
		</ul>
	</li>
	<li>Recognized for Excellence in Innovation</li>
	<li>Groundbreaking potential enhances long-term value and resilience </li>
</ul>
<h4>Vonage Deepens Native Contact Center with Salesforce's Agentforce Voice Integrations</h4>
<p><strong>Vonage Contact Center + Salesforce Voice and Agentforce Voice = AI-Powered Personalization at Scale</strong></p>
<p>Voice is a <code>critical channel</code> for creating meaningful customer connections, especially for high-value or emotionally-charged interactions. AI-powered voice capabilities give contact centers the flexibility to scale agents to every conversation.</p>
<ol class="vvd-list">
	<li>Infringing IP Address</li>
	<li>Intellectual property rights of any party
		<ol class="vvd-list">
			<li>Infringing IP Address</li>
			<li>Intellectual property rights of any party</li>
			<li>Proper notification by the copyright holder</li>
			<li>Confirmation through court order</li>
		</ol>
	</li>
	<li>Proper notification by the copyright holder</li>
	<li>Confirmation through court order</li>
</ol>
<h5>Collette Health Transforms Virtual Care Delivery with Vonage</h5>
<p>Nicholas Luthy, Chief Product Officer at Collette Health said, 
<blockquote>
	<q>The pace of change in healthcare means innovative technology is essential to delivering care. Vonage's Video <code>API</code> not only meets but exceeds the standards we need to help healthcare professionals work smarter and focus on patient well-being. Our virtual care platform, supported by Vonage's technology, allows us to extend care teams with <a href="#">virtual support</a> while maintaining exceptional standards of care.</q>
</blockquote>
</p>
<h6>Vonage Named Best CPaaS Provider</h6>
<p><q>This award is a reflection of the work we do every day to help developers and enterprises deliver more meaningful experiences through smart, flexible communications solutions,</q> said Christophe Van de Weyer, President and Head of Business Unit API for Vonage. <q>By combining the power of AI with a flexible, developer-friendly platform, we’re giving businesses the tools they need to meet and exceed customers’ needs and expectations.</q></p>

<vwc-divider></vwc-divider>

<h6 class="vvd-heading-eyebrow">Terms and conditions</h6>
<p class="vvd-body-text-sm">As described below, Vonage will terminate the privileges of any user who uses his or her internet access to unlawfully download or transmit copyrighted material without a license, or in any way infringe the intellectual property rights of any party, without a valid defense or fair use privilege to do so. After proper notification by the copyright holder or intellectual property owner or its agent to Vonage, and later confirmation through court order or an admission by the user regarding unlawful infringement, Vonage will terminate the infringing IP Address. Vonage may also in its sole discretion decide to suspend and/or terminate an <code>IP Address</code> prior to that time if it has good faith belief that infringement has in fact occurred.</p>
