---
title: Documentation Guidelines
order: 4
---

# Documentation Guidelines

## Writing Style

<vwc-accordion size="condensed" expand-mode="multi">
<vwc-accordion-item heading="Refer to the design system as Vivid">

    If you need to refer to a specific version, use "Vivid x.x.x" (eg. Vivid 4.9.3)

    **Do:** Vivid, Vivid x.x.x<br />**Don't:** VIVID, vivid, VIVID@3, vivid-3, Vivid 3

  </vwc-accordion-item>
  <vwc-accordion-item heading="Refer to Vivid components in title case">
    
    **Do:** Searchable Select, Combobox, Date Time Picker<br />**Don't:** Searchable select, combobox, date-time-picker

  </vwc-accordion-item>
  <vwc-accordion-item heading="Use title case for page headings">

    Use an [online tool](https://capitalizemytitle.com/style/APA/) to convert text to APA title case.

    **Do:** Getting Started With Vivid<br />**Don't:** Getting started with Vivid

  </vwc-accordion-item>
  <vwc-accordion-item heading="Keep it as simple as possible">

    Don't write poetry. Don't use jargon and fancy words.

    Write how you've done it in simple language, explain where to use it, and add guidance for using it again.

    Be as straightforward as possible. Don't write essays; no one will read them.

    People using the design system will only use the components when they fully understand the specifics.

  </vwc-accordion-item>
  <vwc-accordion-item heading="Use American English">
    
    **Do:** color<br />**Don't:** colour

  </vwc-accordion-item>
  <vwc-accordion-item heading="Refer to other projects and tools by their official name">
    
    **Do:** CSS, GitHub, npm<br />**Don't:** css, github, NPM

  </vwc-accordion-item>
  <vwc-accordion-item heading="Write using active voice">

    [Active vs Passive voice](https://www.grammarly.com/blog/sentences/active-vs-passive-voice/)

    **Do:** Use the label attribute to provide a visible label for the Checkbox.<br />
    **Don't:** The label attribute is used to provide a visible label for the Checkbox.

  </vwc-accordion-item>
</vwc-accordion>

## Live Examples

```html preview
<vwc-button
	label="Live Example"
	appearance="filled"
	connotation="cta"
></vwc-button>
```

A live code example can be added to a page using the following markdown:

````
```html preview
<my-component></my-component>
```
````

You can set the preview window's height by providing the height in px's:

<code>```html preview 285px</code>

You can also choose from these layout options: `full` | `blocks` | `columns` | `inline` (default) | `center`

<code>```html preview blocks</code>

## Code Example Style

- **Make examples as close to real life as possible**<br />
  Eg. When demonstrating the `label` attribute;<br />
  Don't: use "Label text" as the example content<br />
  Do: use a value like "Surname" as this closer to actual content
- **Maintain the order of code in the example**<br />
  and for clarity, keep a clear line between each.
  1. HTML
  2. CSS
  3. Javascript
- **Put the most relevant parts at the top of the code**<br />
  Eg. When demonstrating the `appearance` attribute on Button, make `appearance` the first attribute on the component.
- **Use classnames to add extra styles**<br />
  Do: `.split-button { .... }`, `.container { ... }`<br />
  Don't `vwc-split-button { .... }`, `div { ... } `

## Component Pages

Each component page is split into sub pages (represented in the _tab-like_ navigation at the top of the page). When a new component is added using the generator, the following documentation sub-page files are produced:

- **Variations**: `VARIATIONS.md`
  - Examples of the component in all possible visual states
- **Guidelines**: `GUIDELINES.md`
  - Displays general do's and dont's on component usage
- **Code**: `README.md`
  - How to install the component
  - Examples for the properties that don't effect the visual states
  - Examples for slots, events etc.
  - API Reference
- **Use Cases**: `USE-CASES.md` - shows examples different ways the component can be used
- **Accessibility**: `ACCESSIBILITY.md` - show advice ono how to use the component in an accessible way

Each of these generated sub page files contain example content (markdown) to help our component docs stay consistent. Delete parts you don't need, but maintain the order / format of the ramaining parts.

See the [component generator files](https://github.com/Vonage/vivid-3/tree/main/turbo/generators/component/templates) for examples of the recommended content & structure of each sub page.

### Configuration

Some component pages will not need every one of the sub-pages, this can be configured in the [`components.json`](https://github.com/Vonage/vivid-3/tree/main/apps/docs/content_data/components.json) file in the docs app.

When a new component is added using the generator, this object is added to the `components.json`.

```JS
{
  // Component Title
  "title": "My Component",

  // First paragraph of the page
  "description": "Brief description of the component",

  // Variation page (required)
  "variations": "./libs/components/src/lib/my-component/VARIATIONS.md",

  // Guidelines page
  "guidelines": "./libs/components/src/lib/my-compponent/GUIDELINES.md",

  // Remove guidelines page from the navigation (url is still viewable)
  "hideGuidelines": "true",

  // Code page (required)
  "code": "./libs/components/src/lib/my-component/README.md",

  // Accessibility page
  "accessibility": "./libs/components/src/lib/my-component/ACCESSIBILITY.md",

  // Use-Cases page
  "useCases": "./libs/components/src/lib/my-component/USE-CASES.md",

  // Remove use-cases page from the navigation (url is still viewable)
  "hideUseCases": "true",

  // Development status (underlying | alpha)
  "status": "underlying"
},
```
