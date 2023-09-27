# Navigation Disclosure

By using the nav-disclosure, you can either collapse (hide) or expand (show) the content.
It has two elements: a disclosure button and a section of content whose visibility is controlled by the button.
The arrow points down when the controlled content is hidden, indicating that pressing the button will reveal additional content.
The arrow points up when the content is visible.

```js
<script type="module">
  import '@vonage/vivid/nav-disclosure';
</script>
```

## Members

### Label

- Type: `string`
- Default: `''`

Add a `label` attribute to add label to the nav disclosure.

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item">
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

### Open

- Type: `boolean`
- Default: `false`

You can toggle the nav-disclosure by using the `open` attribute.

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item" open>
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

### Icon

- Type: `string`
- Default: `''`

Nav disclosure label can be prefixed by a decorative icon.
Use the `icon` attribute to add an icon.

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item" icon="profile">
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

### Icon Only

If label is not applied.

```html preview
<vwc-nav>
  <vwc-nav-disclosure icon="profile">
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

### Aria Current

- Type: `string` | `undefined`
- Default: `undefined`

Within a set of pagination links, set a nav disclosure `aria-current` value to `"true"` to indicate the currently active disclosure.   
Only when the navigation disclosure is closed the `aria-current` will be set.

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item" icon="profile" aria-current="true">
    <vwc-nav-item href="#" text="2nd level item" aria-current="page"></vwc-nav-item>
  </vwc-nav-disclosure>
</vwc-nav>
```

## Events

<div class="table-wrapper">

| Name     | Description                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `toggle` | The `toggle` event is dispatched when the open/closed state of the nav-disclosure is toggled. This event does not bubble. |


</div>

## Slots

### Icon

Set the `icon` slot to show an icon before the nav-disclosure's label.
If set, the `icon` attribute is ignored.

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item">
  	<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```


### Meta

Use the `meta` slot to add additional content to the nav-disclosure.

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item" icon="profile">
    <vwc-badge slot="meta" text="beta" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

## Accessibility

The nav-disclosure has a `role` button.
Nav-disclosure has `aria-expanded` set to true when the content is visible. Otherwise, it is set to false.
Nav-disclosure has a value specified for `aria-controls` that refers to the content.
