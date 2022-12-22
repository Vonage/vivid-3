# Navigation

A navigation component makes it easy for users to navigate through your application.
The vwc-nav accepts [vwc-nav-item](../../components/nav-item) and [vwc-nav-disclosure](../../components/nav-disclosure) elements as children.

```js
<script type="module">
  import '@vonage/vivid/nav';
</script>
```

## Slots

### Navigation Item

Read more about [vwc-nav-item](../../components/nav-item).

```html preview
<vwc-nav>
  <vwc-nav-item href="#" text="1st level item" onclick="onClick(event)" aria-current="page"></vwc-nav-item>
  <vwc-nav-item href="#" text="1st level item" onclick="onClick(event)"></vwc-nav-item>
  <vwc-nav-item href="#" text="1st level item" onclick="onClick(event)"></vwc-nav-item>
<vwc-nav>

<script>
  function onClick(event) {
    const currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```

### Navigation Disclosure

Read more about [vwc-nav-disclosure](../../components/nav-disclosure).

```html preview
<vwc-nav>
  <vwc-nav-disclosure label="1st level item" open>
    <vwc-nav-item href="#" text="2nd level item" onclick="onClick(event)"></vwc-nav-item>
    <vwc-nav-disclosure label="2nd level item" open>
      <vwc-nav-item href="#" text="3rd level item" onclick="onClick(event)" aria-current="page"></vwc-nav-item>
      <vwc-nav-item href="#" text="3rd level item" onclick="onClick(event)"></vwc-nav-item>
    </vwc-nav-disclosure>
  </vwc-nav-disclosure>
<vwc-nav>

<script>
  function onClick(event) {
    const currentNavItem = document.querySelector('vwc-nav-item[aria-current="page"]');
    currentNavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```

## Keyboard Interaction

When the nav has focus:

`Enter`: activates the nav-disclosure and toggles the visibility of the content.
`Space`: activates the nav-disclosure and toggles the visibility of the content.
`Tab`: moves focus to the next element in the tab order.
`Shift` + `Tab`: moves focus to the previous element in the tab order.
