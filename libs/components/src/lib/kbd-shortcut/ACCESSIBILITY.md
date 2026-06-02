## Implementation

### When Used In kbd-shortcut Slot

When placing Kbd Shortcut in the `kbd-shortcut` slot of a component, `aria-keyshortcuts` is set automatically on the appropriate control.

### When Used Outside Slot

If there is a button or other control that is activated by the shortcut, set `aria-keyshortcuts` on the control to the corresponding value.

You can get the corresponding value from a Kbd Shortcut element with the `getKeyshortcutsValue()` method.

```html
<button id="save-btn">Save</button>
<vwc-kbd-shortcut id="shortcut">
	<vwc-kbd-key name="Mod"></vwc-kbd-key>
	<vwc-kbd-key name="S"></vwc-kbd-key>
</vwc-kbd-shortcut>

<script>
	customElements.whenDefined('vwc-kbd-shortcut').then(() => {
		const shortcut = document.getElementById('shortcut');
		const btn = document.getElementById('save-btn');
		btn.setAttribute('aria-keyshortcuts', shortcut.getKeyshortcutsValue());
	});
</script>
```

### Custom Content

When rendering custom key content, you must ensure that the key has an appropriate accessible name.

The slot's text content is used automatically in `aria-keyshortcuts`. When the slot's text would not be a valid `aria-keyshortcuts` value, e.g. when the slot contains an icon, set `keyshortcuts-key` to provide the correct key token explicitly.

```html
<vwc-kbd-shortcut><vwc-kbd-key name="Custom">F1</vwc-kbd-key></vwc-kbd-shortcut>
<vwc-kbd-shortcut
	><vwc-kbd-key name="Custom" keyshortcuts-key="Power"><vwc-icon name="quit-line" label="Power"></vwc-icon></vwc-kbd-key
></vwc-kbd-shortcut>
```

## Resources

- [WAI-ARIA: aria-keyshortcuts](https://www.w3.org/TR/wai-aria-1.1/#aria-keyshortcuts)
