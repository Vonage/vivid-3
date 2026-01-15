# Component Development Checklist

Developers should use this checklist to vet new components or significant changes for common issues and oversights.

### Component Class

- [ ] Class is annotated with @component
  - This lets tools associate the class with the custom element.
- [ ] Slots are annotated with @slot
  - This lets tools know about the slots.
- [ ] Events are annotated with @event {type}
  - This lets tools know about the events.
- [ ] Private members are marked correctly
  - It should be clear which members are public and which internal.
  - Ideally, use [private property (#) syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties) to make internal members impossible to access for consumers
  - Otherwise:
    - Mark them as private: this will remove them from the type definitions
    - Mark them with '@internal': this will remove them from the CEM
    - Prefix them with '_': even with the above measures, consumer can still access the members. The '_' convention makes it clear that they are accessing a private member and using the API incorrectly.

### Events

- [ ] Handled events are stopped from propagating
  - If the component handles an event, e.g. ESC keypress to close itself, it should usually prevent that event from propagating.
  - This is to prevent a parent component from handling the event as well.

### Style

- [ ] Host has appropriate display value
  - The default (inline) is not fitting for most components and prevents consumers from adding vertical margins.
  - Choose appropriate values instead. For example, a note fills the line width, so it is a block element. A button does not, so it is a inline-block element.
- [ ] Component handles extrinsic size
  - The component should react gracefully if it is stretched or squished from its natural size.
  - This happens when width / height is applied or the component is placed inside a layout.

### Vivid Vue

- [ ] Component has appropriate v-models
  - Vue consumers expect to be able to use [v-model](https://vuejs.org/guide/components/v-model.html) for two-way bindings.
  - State that is likely to be controlled this way should therefore have a v-model. E.g. a text-field's value, checkbox's checked state or modal's open state.
- [ ] At least one story and example exists
  - This is to verify the component works in Vue and give an example to consumers.
- [ ] API reference table is accurate
  - Verifies that the component is documented and wrapped correctly.

### If component is form-associated

- [ ] Component handles focus in Safari
  - Unlike other browsers, Safari makes the host focusable if it does not delegate focus.
  - Either delegate focus or ensure focus works as intended in Safari.

### Other

- [ ] Component handles DOM reconnect
  - A component reconnects when it is detached and reattached to the DOM. For instance this happens when a component is moved.
  - Ensure that work done in disconnectedCallback, e.g. removing event listeners, is done again in connectedCallback (events listeners are added back).
- [ ] Template does not include autofocus attribute
  - Even though [MDN recommends using autofocus to control delegatesFocus behaviour](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus), this still causes the element to be autofocused when added in Chrome.
  - Not sure if Chrome or other browsers are correct, but components need to work in all browsers.
