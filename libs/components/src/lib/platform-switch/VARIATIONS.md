## OS Detection

The component detects the user's operating system and shows only the matching child.

```html preview inline
<vwc-platform-switch>
	<span data-os="apple">🍎 Apple</span>
	<span data-os="windows">🪟 Windows</span>
	<span data-os="linux">🐧 Linux</span>
	<span>Unknown OS</span>
</vwc-platform-switch>
```

## Fallback

A child with no `data-*` attributes acts as a fallback if no other child matches.

```html preview inline
<vwc-platform-switch>
	<span data-os="chromeos">ChromeOS</span>
	<span>Not ChromeOS</span>
</vwc-platform-switch>
```
