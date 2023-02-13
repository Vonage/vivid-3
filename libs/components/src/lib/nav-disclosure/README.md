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

{% include "icon-note.md" %}

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item" icon="profile">
    <vwc-nav-item href="#" text="2nd level item"></vwc-nav-item>
  </vwc-nav-disclosure>
<vwc-nav>
```

## Accessibility

The nav-disclosure has a `role` button.
Nav-disclosure has `aria-expanded` set to true when the content is visible. Otherwise, it is set to false.
Nav-disclosure has a value specified for `aria-controls` that refers to the content.
