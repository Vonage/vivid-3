This rule bans specific event usages that are accessibility concerns.

#### Example

Badge is a non-interactive component meant to display information only. The `@click` event handler is therefore an accessibility concern because it cannot be activated by keyboard users and has incorrect semantics for screen readers.

Instead, use a different component that supports user interaction, such as button.

```html
<!-- ❌ BAD -->
<VBadge text="Badge" @click="onClick"></VBadge>
```
