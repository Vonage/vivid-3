This rule forbids the usage of the `value` and `checked` attributes of Vivid input elements. The attributes should not be used because of inconsistent behaviour between different versions of Vue:

- Vue 2: Sets the initial value.
- Vue 3: Sets the current value.

Instead, use `modelValue` to set the current value or `initialValue` or `defaultChecked` to set the initial value.

#### Example

```html
<!-- ❌ BAD -->
<VTextField :value="value"></VTextField>

<!-- ✅ GOOD -->
<VTextField :model-value="value"></VTextField>
<!-- or -->
<VTextField :initial-value="value"></VTextField>
```
