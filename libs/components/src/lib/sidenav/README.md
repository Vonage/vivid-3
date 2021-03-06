# Side Navigation

A side navigation component makes it easy for users to navigate through your application.
The vwc-sidenav accepts [vwc-sidenav-item](../../components/sidenav-item) and [vwc-sidenav-disclosure](../../components/sidenav-disclosure) elements as children.

```js
<script type="module">
  import '@vonage/vivid/sidenav';
</script>
```

## Slots

### Side Navigation Item

Read more about [vwc-sidenav-item](../../components/sidenav-item).

```html preview
<vwc-sidenav>
    <vwc-sidenav-item href="#" text="1st level item" onclick="onClick(event)" aria-current="page"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="1st level item" onclick="onClick(event)"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="1st level item" onclick="onClick(event)"></vwc-sidenav-item>
<vwc-sidenav>

<script>
  function onClick(event) {  
    const currentSidenavItem = document.querySelector('vwc-sidenav-item[aria-current="page"]');
    currentSidenavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```

### Side Navigation Disclosure

Read more about [vwc-sidenav-disclosure](../../components/sidenav-disclosure).

```html preview
<vwc-sidenav>
    <vwc-sidenav-disclosure label="1st level item" open>
        <vwc-sidenav-item href="#" text="2nd level item" onclick="onClick(event)"></vwc-sidenav-item>
        <vwc-sidenav-disclosure label="2nd level item" open>
            <vwc-sidenav-item href="#" text="3rd level item" onclick="onClick(event)" aria-current="page"></vwc-sidenav-item>
            <vwc-sidenav-item href="#" text="3rd level item" onclick="onClick(event)"></vwc-sidenav-item>
        </vwc-sidenav-disclosure>
    </vwc-sidenav-disclosure>
<vwc-sidenav>

<script>
  function onClick(event) {  
    const currentSidenavItem = document.querySelector('vwc-sidenav-item[aria-current="page"]');
    currentSidenavItem?.removeAttribute('aria-current');
    event.currentTarget.setAttribute('aria-current', 'page');
  }
</script>
```

## Keyboard Interaction

When the sidenav has focus:

`Enter`: activates the sidenav-disclosure and toggles the visibility of the content.  
`Space`: activates the sidenav-disclosure and toggles the visibility of the content.  
`Tab`: moves focus to the next element in the tab order.  
`Shift` + `Tab`: moves focus to the previous element in the tab order.  