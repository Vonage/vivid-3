## Appearance

Set the `appearance` attribute to change the action-group's appearance.

- Type: `'fieldset'` | `'ghost'`
- Default: `'fieldset'`

```html preview
<p>appearance fieldset</p>
<vwc-action-group appearance="fieldset">
	<vwc-button label="edit"></vwc-button>
	<vwc-button label="copy"></vwc-button>
	<vwc-button label="paste"></vwc-button>
	<vwc-button label="submit"></vwc-button>
</vwc-action-group>
<p>appearance ghost</p>
<vwc-action-group appearance="ghost">
	<vwc-button label="edit" appearance="filled"></vwc-button>
	<vwc-button label="copy" appearance="filled"></vwc-button>
	<vwc-button label="paste" appearance="filled"></vwc-button>
	<vwc-button label="submit" appearance="filled"></vwc-button>
</vwc-action-group>
```

## Shape

Use the `shape` attribute to set the action-group's border-radius.  
When using shape, remember to also set it on any slotted elements.

```html preview
<vwc-action-group shape="pill">
	<vwc-button shape="pill" label="edit"></vwc-button>
	<vwc-button shape="pill" label="copy"></vwc-button>
	<vwc-button shape="pill" label="paste"></vwc-button>
	<vwc-button shape="pill" label="submit"></vwc-button>
</vwc-action-group>
```

## Tight

By default, action group is styled in a spacious manner which visually extends the baseline row size and includes an inline gap.
Enabling the `tight` member will result in a dense style that fits the "normal" baseline.

```html preview
<style>
	vwc-layout {
		--layout-grid-template-columns: 250px;
	}

	vwc-action-group > vwc-text-field {
		flex-grow: 1;
	}
</style>

<vwc-layout column-basis="block" column-spacing="small">
	<vwc-text-field
		name="username"
		aria-label="Username"
		placeholder="Username"
	></vwc-text-field>
	<vwc-action-group appearance="fieldset" tight>
		<vwc-button icon="flag-uruguay"></vwc-button>
		<vwc-text-field
			appearance="ghost"
			aria-label="Phone number"
			placeholder="Phone number"
			name="phone"
			autocomplete=""
		></vwc-text-field>
	</vwc-action-group>
</vwc-layout>
```
