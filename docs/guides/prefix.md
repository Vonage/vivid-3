# Using a Custom Prefix

Custom elements are registered globally by the browser. When two custom elements with the same tag name are registered on the same document, it creates a conflict that results in an error. Loading multiple versions of Vivid is likely to cause this error as Vivid elements are named the same.

Enforcing only a single version of the library to be used simultaneously makes it difficult to progressively migrate to newer versions of the library, as each update will require a full application update.
Also, in a micro-frontend architecture, this can be a major bottleneck as each micro-frontend may use a different version of the library.

To work around this limitation, Vivid provides a way to register custom element with a custom prefix.

<vwc-tabs>
<vwc-tab label="Web Components"></vwc-tab>
<vwc-tab-panel>

The following example will register *badge* custom element as `dashboard-badge`:

```js
import { registerBadge } from '@vonage/vivid';

registerBadge('dashboard');
```

Then use it as:

```html
<dashboard-badge text="dashboard scoped badge"></dashboard-badge>
```

Remember to not include the default side effect import (`import '@vonage/vivid/button';`) when using scoped elements as it will register the default namespace.

</vwc-tab-panel>
<vwc-tab label="Vivid Vue"></vwc-tab>
<vwc-tab-panel>

Refer to the [Getting Started With Vue](/getting-started/vue/) guide on how to set the prefix.

</vwc-tab-panel>
</vwc-tabs>
