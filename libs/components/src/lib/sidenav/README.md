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
    <vwc-sidenav-item href="#" text="1st level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="1st level item"></vwc-sidenav-item>
    <vwc-sidenav-item href="#" text="1st level item"></vwc-sidenav-item>
<vwc-sidenav>
```

### Side Navigation Disclosure

Read more about [vwc-sidenav-disclosure](../../components/sidenav-disclosure).

```html preview
<vwc-sidenav>
    <vwc-sidenav-disclosure label="1st level item" open>
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
        <vwc-sidenav-item href="#" text="2nd level item"></vwc-sidenav-item>
        <vwc-sidenav-disclosure label="2nd level item" open>
            <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
            <vwc-sidenav-item href="#" text="3rd level item"></vwc-sidenav-item>
        </vwc-sidenav-disclosure>
    </vwc-sidenav-disclosure>
<vwc-sidenav>
```

## Keyboard Interaction

When the sidenav has focus:

`Enter`: activates the sidenav-disclosure and toggles the visibility of the content.  
`Space`: activates the sidenav-disclosure and toggles the visibility of the content.  
`Tab`: moves focus to the next element in the tab order.  
`Shift` + `Tab`: moves focus to the previous element in the tab order.  