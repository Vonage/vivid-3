### Accessibility

The banner defaults its role to ‘status’ with a redundant aria-live attribute set to polite (to maximize compatibility when using this role). This indicates that the screen reader should wait until the user is idle before presenting updates to the user.
However, consumers can modify the above attributes (role and aria-live) to fit contextually. If the information is critical, by altering the banner's role to 'alert', assistive technologies will interrupt other processes and provide users with immediate notification.

- The `role` attribute is set to `status` by default. This can be changed.
- The `aria-live` attribute is set to `polite` by default. This can be changed.
- The banner can be dismissed by hitting the `escape` key when it is in focus.

```js
<vwc-banner
	role="status"
	aria-live="polite"
	text="Here's some information that you may find important!"
></vwc-banner>
```
