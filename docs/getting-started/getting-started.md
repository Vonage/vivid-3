# Extra Features

## Core (Optional)

In Addition, this library provides a set of styles (combined with the tokens and fonts) that can be used to embody the Vivid design system into an application.  
**These styles are not required by vivid components directly. however, native HTML tags do.**

- `theme.css` - Sets theme related styles

- `typography.css` - Sets typography related styles

- `all.css` - Sets all the above styles


These **core styles** rely on the [tokens and fonts to be loaded](link to home page)


### Importting files: 
#### Option 1: css

```css
@import 'node_modules/@vonage/vivid/styles/[path to file].css';
```

#### Option 2: scss

```css
@forward 'node_modules/@vonage/vivid/styles/[path to file].css';
```

##### Option 3: HTML (inside the &lt;head> tag)

```html
<link rel="stylesheet" href="node_modules/@vonage/vivid/styles/[path to file].css" media="all">
```

### vivid class
*require* a `vvd-root` class* selector to be present on a wrapping element (advisably the `:root`.  
When set on the `:root` (html element), typeface sizes are able to descend from the root font-size, thus comply with the [WCAG 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text)).

---

## Scoped Elements (🧪 Alpha)

Custom elements, by browsers limitations, are registered globally, and thus may conflict when multiple versions of the library are used in the same application as all custom elements register under the same namespace.

Enforcing only a single version of the library to be used simultaneously makes it difficult to progressively migrate to newer versions of the library, as each update will require a full application update.
Also, in a micro-frontend architecture, this can be a major bottleneck as each micro-frontend may use a different version of the library.

To work around this limitation, Vivid provides a way for authors' to scope each custom element namespace by passing an argument to the `prefix` parameter when registering each custom element.

The following example will register *badge* custom element as `dashboard-badge`:

```js
import { registerBadge } from '@vonage/vivid';

registerBadge('dashboard');
```

then use it as:

```html
<dashboard-badge text="dashboard scoped badge"></dashboard-badge>
```

Remember to not include the default side-effect import (`import '@vonage/vivid/button';`) when using scoped elements as it will register the default namespace.

Even though custom elements can be registered under different namespaces, as many as needed, this approach lets you enjoy the benefits of [npm dedupe](https://docs.npmjs.com/cli/v8/commands/npm-dedupe) to ensure only a single version of the library is used in the application.

