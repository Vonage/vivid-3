# Wrapper Generator

CLI tool that consumes the Custom Elements Manifest to generate wrappers for the Vivid components.

## TSDoc Tags

The following special TSDoc tags are used by generator:

- `@component <component name>`: Declares the class as a component and provides the name.
- `@public`: Declares the component as public. Only public components will be wrapped.
- `` @vueModel <model name> <attribute name> <event name> \`<expression mapping event to value>\ ``: Declares a v-model that will be added to the generated Vue wrappers.
