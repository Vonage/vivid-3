For Radio buttons to function correctly and be accessible they must be slotted inside Radio Group component.

## Labelling

### Radio Label Text

Use the `label` attribute to provide a visible label for the [**Radio**](/components/radio).

```html preview
<vwc-radio label="A default radio"></vwc-radio>
```

### Radio Group Label Text

Use the `label` to set the **Radio Group** label.

```html preview
<vwc-radio-group label="Pick a number" name="number">
	<vwc-radio label="number one" value="1"></vwc-radio>
	<vwc-radio label="number two" value="2"></vwc-radio>
	<vwc-radio label="number three" value="3"></vwc-radio>
</vwc-radio-group>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Radio Group or the Radio.</p>
</vwc-note>

## Orientation

Set the `orientation` member to set the orientation (`horizontal` or `vertical`) of the radio-group.

- Type: `horizontal` | `vertical`
- Default: `horizontal`

```html preview
<vwc-radio-group label="Pick a number" name="number" orientation="vertical">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

## Connotation

Use the `connotation` attribute to set the **Radio** color.

```html preview
<div class="wrapper">
	<vwc-radio-group label="radio accent connotation">
		<vwc-radio connotation="accent" label="accent radio"></vwc-radio>
		<vwc-radio connotation="accent" label="accent radio" checked></vwc-radio>
	</vwc-radio-group>
	<vwc-radio-group label="radio accent connotation">
		<vwc-radio connotation="cta" label="cta radio"></vwc-radio>
		<vwc-radio connotation="cta" label="cta radio" checked></vwc-radio>
	</vwc-radio-group>
</div>

<style>
	.wrapper {
		display: flex;
		gap: 48px;
	}
</style>
```

## States

### Checked

Use the `checked` on the **Radio** to mark the radio as selected.

<vwc-note connotation="warning" icon="warning-line">
  If more than one item are checked only the last item will be checked, since radio is for a single selection
</vwc-note>

```html preview
<vwc-radio-group label="who is checked?">
	<vwc-radio checked label="I am checked on load" value="checked"></vwc-radio>
	<vwc-radio label="I am not checked on load" value="not-checked-1"></vwc-radio>
	<vwc-radio label="I am not checked on load" value="not-checke-2"></vwc-radio>
</vwc-radio-group>
```

### Disabled

Set the `disabled` attribute on a single **Radio** button.

```html preview
<vwc-radio-group label="Pick a number" name="number">
	<vwc-radio disabled label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

Set the `disabled` attribute to disable **all** radio buttons in the **Radio Group**.

```html preview
<vwc-radio-group disabled label="Pick a number" name="number">
	<vwc-radio label="1" value="1" checked></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

### Readonly

Set the `readonly` attribute to specify that the **Radio Group** is read-only.  
A read-only radio-group cannot be modified but can be focused and tabbed into.  
**Radio** can not have a read-only state.

```html preview
<vwc-radio-group label="Pick a number" name="number" readonly>
	<vwc-radio label="1" value="1" checked></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```
