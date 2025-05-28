## Role

The role attribute of the menu item component serves not only to announce the component's role but also to configure its appearance and behavior. The available options are:

- `menuitem` - _(default)_ - standard role for a menu item
- `menuitemradio`, `radio` - role indicating a single selectable option
- `menuitemcheckbox`, `checkbox` - role indicating multiple selectable options

<vwc-note connotation="warning" icon="warning-line">

    Even though `menuitemradio` and `menuitemcheckbox` roles are valid roles documented in WAI-ARIA 1.2, they are not read properly by the screen readers.
    Therefore it is recommended to use `checkbox` role instead of `menuitemcheckbox` and `radio` role instead of `menuitemradio` role.

</vwc-note>

```html preview 300px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="New folder"></vwc-menu-item>
	<vwc-menu-item role="radio" text="Local access"></vwc-menu-item>
	<vwc-menu-item role="radio" text="Remote access"></vwc-menu-item>
	<vwc-menu-item role="checkbox" text="Editable"></vwc-menu-item>
	<vwc-menu-item role="checkbox" text="Downloadable"></vwc-menu-item>
	<vwc-menu-item role="checkbox" text="Shareable"></vwc-menu-item>
</vwc-menu>
```
