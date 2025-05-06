This rule helps with migrating from Vivid 3.x.x by forbidding the usage of the `value` and `checked` attributes of Vivid input elements.

In Vivid 3, they behaved inconsistently between Vue versions:

- Vue 2: Sets the initial value.
- Vue 3: Sets the current value.

Since Vivid 4.0.0, [the attributes always set the current value](/guides/v4-release-migration/#vue-wrappers).

To make sure that the intent of the code is clear across all Vivid and Vue versions, use `modelValue` to set the current value or `initialValue` or `defaultChecked` to set the initial value.

You can [configure the rule](/guides/eslint-plugin/#customizing-rules) to provide an automatic fix by setting the `replaceWith` option to either `"modelValue"` or `"initialValue"`.

```
"@vonage/vivid/no-value-attribute": ["error", { "replaceWith": "modelValue" }]
```

#### Example

```html
<!-- ❌ BAD -->
<VTextField :value="value"></VTextField>

<!-- ✅ GOOD -->
<VTextField :model-value="value"></VTextField>
<!-- or -->
<VTextField :initial-value="value"></VTextField>
```
