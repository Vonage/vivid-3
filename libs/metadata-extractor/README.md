# metadata-extractor

Analyzes packages to extract machine-readable metadata. It uses the TypeScript compiler through ts-morph and examines both the structure of AST nodes and resolved types.

It can determine whether types are exported and under what name, e.g. `@vonage/vivid#ButtonConnotation`, and whether types are imported from external modules, e.g. `@floating-ui/dom#Placement`.

## Purpose

- Generate wrapper libraries (Vue, React, Angular) with accurate typings and documentation.
- Generate documentation sites with up-to-date API references.
- Other internal tooling (test utilities, design system analyzers, etc.).

## Supported JSDoc tags

- `@component <component name>`: Declares the class as a component and provides the name.
- `@public`: Declares the component as public. Only public components will be extracted.
- `@internal` | `@private`: Marks nodes to be ignored during extraction.
- `@event {<type>} <name> - <description>`: Declares an event that the component emits.
- `` @vueModel <model name> <attribute name> <event name(s)> `<expression mapping event to value>` ``: Declares a v-model that will be added to the generated Vue wrappers.
- `@slot (<name>) - <description>`: Declares a slot of the component. Name defaults to `default`.
- ``@dynamicSlot `<prop type>` <slot name> (- <description>)``: Declares a slot that is dynamically requested by the component following the slottable request community protocol (https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/slottable-request.md).

## Metadata Format

Metadata is currently output in a format that mainly supports generating the Vue wrappers and can be checked into the repo.

Type rendering logic:

- Types that can be imported are represented as `<module-specifier>#<name>`. e.g. `@vonage/vivid#VwcButtonElement`
- Builtin types are written as is, e.g. `HTMLElement`
- Types that resolve to "simple" unions (consisting only of primitives / literals) as rendered as literals even if they could be imported. E.g. `'small' | 'large'` instead of `@vonage/vivid#ButtonSize`
- Otherwise, they are represented as type literals, e.g. `{ a: string }`, `number | boolean`

For different use cases this would need to change. Types are already extracted into a serializable structure with could be used to render docs.
