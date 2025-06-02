# ARIA Attributes on Components

Consumers may specify ARIA attributes on our components to alter their semantics. We need to ensure that these are correctly and consistently handled across all components.

There are two types of ARIA attributes:

- **Value Attributes:** like `role` or `aria-label`.
- **IDREF Attributes:** like `aria-labelledby` and `aria-describedby` that reference other elements by their IDs.

Our components generally fall into one of two categories:

- **Delegated semantics:** semantics are delegated to a child element.
- **Host semantics:** semantics are defined on the host element directly.

Although not always followed in the past, we now strive to align our components with the following principles:

- Components should, as much as possible, control their own semantics and not require consumers to specify ARIA attributes.
  - This allows us to make changes to the semantics without breaking consumers.
- ARIA attributes should not affect the component's behaviour or appearance.
  - This is how native HTML elements behave as well.

To keep our code maintainable, we centrally manage ARIA behavior using the following mixins:

### AriaMixin

This mixin is applied to all components. It declares all value attributes as FAST attributes on the component, which makes them observable.

### DelegatesAria

DelegatesAria is applied to components that delegate their aria attributes to a child element. It needs to be used with the `delegateAria()` directive in the template:

```ts
html`<button ${delegateAria()}></button>`;
```

This will forward all ARIA value attributes set on the component to the button element, expect `role` which requires special handling.

It is possible to provide bindings for specific properties:

```ts
html`<button
	${delegateAria({
		ariaLabel: 'Button',
		ariaDisabled: (x) => x.disabled,
	})}
></button>`;
```

Which is equivalent to:

```ts
html`<button
	aria-label="Button"
	aria-disabled="${(x) => x.disabled}"
></button>`;
```

Therefore, to set a default value you must explicitly do so:

```ts
html`<button
	${delegateAria({
		ariaLabel: (x) => x.ariaLabel ?? 'Button',
	})}
></button>`;
```

### HostSemantics Mixin

HostSemantics is applied to components with host semantics. It needs to be used with the `applyHostSemantics()` directive, which must be used on the host element (`<template>`):

```ts
html`<template ${applyHostSemantics()}></template>`;
```

Like the `delegateAria()` directive, you can provide bindings for specific properties.

As there is no point in forwarding attributes from the host to itself, the `applyHostSemantics()` is only useful to set default values for now. It will allow us to modify the ARIA attribute handling in the future.

### Usage Notes

- All value attributes on the host or delegation target should be set using the respective directive.
- IDREF attributes cannot be delegated (yet). If consumers specify them, they will not work as expected.
