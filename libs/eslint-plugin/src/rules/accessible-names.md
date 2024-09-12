This rule enforces the presence of an accessible name for components that require it.

An accessible name is a short text alternative that describes the purpose of a component. It provides users of assistive technologies with a label for the component.

You can provide an accessible name with the `aria-label` attribute.

If the component is purely decorative, you can alternatively use `aria-hidden="true"` to hide it from screen readers completely.

#### Example

Without the accessible name, screen readers will announce the component as "button" and the user will be unable to understand its purpose.

```html
<!-- ❌ BAD -->
<VButton icon="save-line"></VButton>

<!-- ✅ GOOD -->
<VButton icon="save-line" aria-label="Save"></VButton>
```
