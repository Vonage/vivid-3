This rule warns about the usage of deprecated APIs. If possible, it will also provide a fix to migrate the code to a new API.

#### Example

The `clickable` prop of `VSelectableBox` has been deprecated in favor of `clickable-box`.

```html
<!-- ❌ BAD -->
<VSelectableBox clickable></VSelectableBox>

<!-- ✅ GOOD -->
<VSelectableBox clickable-box></VSelectableBox>
```
