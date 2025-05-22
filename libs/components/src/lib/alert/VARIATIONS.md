### Text

Use the `text` attribute to set the Alert's main text.

```html preview 100px
<vwc-alert text="Some important information for you" open></vwc-alert>
```

### Headline

Use the `headline` attribute to add a headline to the Alert.

```html preview 100px
<vwc-alert
	headline="This requires your attention"
	text="Some important information for you"
	open
></vwc-alert>
```

### Connotation

Use the `connotation` attribute to change the Alert's icon and icon color.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>

Each connotation comes with a default icon (that you can override with the `icon` attribute).

</vwc-note>

```html preview 350px
<vwc-alert
	text="Some important information for you"
	connotation="accent"
	open
></vwc-alert>

<vwc-select label="Connotation">
	<vwc-option value="accent" text="accent"></vwc-option>
	<vwc-option value="success" text="success"></vwc-option>
	<vwc-option value="warning" text="warning"></vwc-option>
	<vwc-option value="alert" text="alert"></vwc-option>
	<vwc-option value="information" text="information"></vwc-option>
	<vwc-option value="announcement" text="announcement"></vwc-option>
</vwc-select>

<script>
	document.querySelector('vwc-select').addEventListener('change', (e) => {
		document.querySelector('vwc-alert').connotation = e.currentTarget.value;
	});
</script>
```

### Icon

Use the [icon slot](/components/alert/code/#icon) to add custom icons.
Use the `icon`_(deprecated)_ attribute to add an icon from the [icon library](/icons/icons-gallery/) to the Alert.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>

Setting this attribute takes precedence over the connotation's icon, if any.

</vwc-note>

```html preview 100px
<vwc-alert text="Some important information for you" open>
	<vwc-icon slot="icon" name="megaphone-solid"></vwc-icon>
</vwc-alert>
```

### Placement

Use the `placement` attribute to set the location of the Alert.

```html preview center 250px
<vwc-alert
	class="small-alert"
	placement="top-start"
	text="top-start"
	open
></vwc-alert>
<vwc-alert class="small-alert" placement="top" text="top" open></vwc-alert>
<vwc-alert
	class="small-alert"
	placement="top-end"
	text="top-end"
	open
></vwc-alert>
<vwc-alert
	class="small-alert"
	placement="bottom-start"
	text="bottom-start"
	open
></vwc-alert>
<vwc-alert
	class="small-alert"
	placement="bottom"
	text="bottom"
	open
></vwc-alert>
<vwc-alert
	class="small-alert"
	placement="bottom-end"
	text="bottom-end"
	open
></vwc-alert>

<style>
	.small-alert {
		--alert-min-inline-size: 200px;
	}
</style>
```

### Removable

Use the `removable` attribute to add a close button to the Alert.

```html preview 100px
<vwc-alert removable text="Some important information for you" open></vwc-alert>

<vwc-button
	appearance="outlined"
	label="Show alert"
	onclick="openAlert()"
></vwc-button>

<script>
	function openAlert() {
		document.querySelector('vwc-alert').open = true;
	}
</script>
```
