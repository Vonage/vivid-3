# What is Vivid Vue

Vivid Vue is a library that provides wrappers for Vivid 3 for both Vue 2 and Vue 3.

## Rationale

While web-components work with Vue without the need for native wrappers, the amount of boilerplate required to use
them inside Vue projects means that wrappers are often created inside the project and then used throughout to simplify
development.

The Vivid team have decided to create this library to move the ownership of the wrappers outside individual projects
and to avoid duplication of labour across projects.

### Why Vivid 3 and not Vivid 2?

Vivid 3 uses [custom-elements-manifest](https://github.com/webcomponents/custom-elements-manifest) to export the structure
of the components as part of the library exported bundle. We use these specs to generate the wrappers programmatically
for both Vue 2 & Vue 3.

## Functionality

The following functionality is provided by the wrapper library for Vue projects.

### Support For Both Vue 2 & Vue 3

The wrapper library is compatible with both Vue 2 & Vue 3 so that it can be used with your project regardless 
of which version you use.

There is no additional setup required, just install the library, and you are ready to go!

### Native Bindings For Vue

The wrapper library provides native bindings for components:
- `v-model` support where applicable
- Vue `slots` map to web components `slots` seamlessly.
- Autocomplete hints for IDEs (e.g. Webstorm, VSCode etc.)

#### Using `v-model`

The `v-model` syntax allows us to implement a two-way binding in between a variable and the matching component.

This is an example of a two-way binding implementation for a web component:

```vue
<vwc-text-field 
  label="Search"
  :value="searchText"
  @input="searchText = $event.target.value"
/>
```

This works fine, but in Vue we can use the `v-model` syntax to shorten this to:

```vue
<v-text-field 
  label="Search"
  v-model="searchText"
/>
```

#### Default Slots

The `default` slot maps to the same syntax in both Vue & web components.

**Web component**

```html
<vwc-icon size="3"> 
 <img src="/custom-logo.svg" />
</vwc-icon>
```

**Vue**

```html
<v-icon size="3"> 
 <img src="/custom-logo.svg">
</v-icon>
```

#### Named Slots

While default slots work the same, web components named slots are mapped to Vue named slots.

**Web component**

```html
<vwc-banner text="A banner with an action button">
  <vwc-button slot="action-items" appearance="filled" connotation="accent" label="Filled" />
  <vwc-button slot="action-items" appearance="outlined" connotation="accent" label="Outlined" />
</vwc-banner>
```

**Vue**

```html
<v-banner text="A banner with an action button">
  <template #action-items>
    <v-button appearance="filled" connotation="accent" label="Filled" />
    <v-button appearance="outlined" connotation="accent" label="Outlined" />
  </template>
</v-banner>
```

## Code Completion

The wrapper library provides code completion hints for both Vue 2 & Vue 3 in popular IDEs.

### IntelliJ IDEs
IntelliJ IDEs (e.g. Webstorm, etc.) will support code completion out-of-the-box for components, props, slots, events and more.

You can see code completion hints in the screenshots below.

**Components**

![Component Autocomplete](/screenshots/autocomplete/components.png)

**Attributes**

![Component Autocomplete](/screenshots/autocomplete/attributes.png)

**Enum Values**

![Component Autocomplete](/screenshots/autocomplete/enum-values.png)

**Named Slots**

![Component Autocomplete](/screenshots/autocomplete/named-slots.png)

### VSCode
In VSCode you can use the [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to get code completion hints.

## Micro-frontends Support

To avoid namespace collision, we can use `setCustomComponentPrefix` to set the namespace for the current application
on initialisation. To find out more about this, go to this [section](/introduction/getting-started.html#scoped-elements-micro-frontends-mfes).



