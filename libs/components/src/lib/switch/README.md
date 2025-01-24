

## Name and Value

Use the `name` and `value` attribute when including the Switch as part of a form.

```html preview
<form id="settings">
  <vwc-layout gutters="small" row-spacing="small" column-basis="block">
    <vwc-switch value="yes" name="marketing" label="Marketing email notifications"></vwc-switch>
  </vwc-layout>
  <vwc-button type="submit" label="Submit" appearance="filled" connotation="cta"></vwc-button>
</form>
<div class="results">

</div>
<script>
  document.getElementById('settings').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit', e);
  })
</script>
```

### Name

Use the `name` attribute in order to set the name of the switch. Mainly used inside a form that will receive the value on submit.

```html
<vwc-switch name="my-name" value="my=value"></vwc-switch>
```

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                                |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Emits a custom change event when the checked state changes |

</div>
