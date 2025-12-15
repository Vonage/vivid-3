# Component Documentation

For each component, the documentation website contains several pages. Each page corresponds to a specific documentation file in the component's directory:

## Variations (VARIATIONS.md)

Shows all the visual variations of a component and how to achieve them. Its purpose is to be a quick reference to all consumers of the design system, not just developers.

Descriptive text for each example should be as succinct as possible. Users can look at the code of the example for extra context.

Use text like: The appearance attribute controls the visual style of the Button.

In the examples, display all the possible variants. E.g. every appearance available for Button. There is no need to list them in the descriptive text.

Add short notes where appropriate to guide users on how to use the component correctly. It doesn't matter if the info is repeated in more detail in the Accessibility or Design Guidelines section.

## Guidelines (GUIDELINES.md)

Helps designers use the component correctly and explains the reasons for the design decisions.

The reasons to use a particular appearance or connotations should be explained.

Try to use coded examples for visual reference so that the style is always up to date.

Include any information about the Figma file that would be relevant to a designer. E.g. if a variant of a component is actually a separate component in Figma. Include links to the Figma component.

Utilise dos and don'ts where appropriate to help convey the reasons why a component should be used in a certain way. A "Do" doesn't necessarily need a "Don't" to accompany it.

Content should be approved / produced / edited by design prior to publishing it. Use the hideGuidelines attribute in the component.json entry to hide the page if it is not approved or required.

Include a section at the bottom of this page to link to related components. E.g. Split Button on the Button page.

## Code (README.md)

Usage guide and reference for developers.

Include a Usage section at the top of the page with a tab each for Web Components and Vue.

Provide examples of props that don't change the visual appearance of the component. E.g. href on the Button changes the element to be a link but doesn't affect its visual style.

Provide examples where necessary on how to use slots or events.

Provide an API reference section which lists out each of the available properties, events and slots in a tabular format. This is currently manually produced, but we will look into automating it in the future.

Tables should go in this order: Properties, Slots, Events, Methods.

First column of the row should be bold.

## Use Cases (USE-CASES.md)

Shows how the component works alongside other elements or components in the design system or demonstrate common patterns.
For example, how the validation works when Text Field is used inside a form.

It can also be used to demonstrate common patterns that consumers might use the component in.

In these examples try to follow best practice so consumers can copy code into their app and get the best practices for free.

## Accessibility (ACCESSIBILITY.md)

Relevant information the needed to use the component in an accessible way.

Include an "Implementation" section for required practices. E.g. Adding an aria-label when no label is provided for the Text Field.

If there are any best practices to follow, include a section for them. E.g. Avoid disabled buttons.

Link to the Manual Accessibility test document for the component in the Resources section, along with any relevant external links that back up our advice or provide extra information.
