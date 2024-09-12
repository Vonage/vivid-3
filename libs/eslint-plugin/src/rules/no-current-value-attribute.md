This rule forbids the usage of `currentValue`, `currentChecked`, `currentStart` and `currentEnd` attributes of Vivid input elements. You should use `modelValue` instead for consistency and compatibility between different versions of Vivid.

The rule provides a fix to update code to use `modelValue` instead.

#### Example

```html
<!-- ❌ BAD -->
<VTextField :current-value="value"></VTextField>

<!-- ✅ GOOD -->
<VTextField :model-value="value"></VTextField>
```
