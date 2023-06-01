# Alert

Alerts are meant to display short-lived important information to the user, usually at the top or bottom of the screen.

```js
<script type="module">
  import '@vonage/vivid/alert';
</script>
```

## Members

### Text

Use the `text` attribute to set the alert's main text.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-alert text="An important information for you" open></vwc-alert>
```

### Headline

Use the `headline` attribute to add a headline to your alert.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-alert headline="This requires your attention" text="An important information for you" open></vwc-alert>
```

### Open

Use the `open` attribute to toggle the alert open state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-alert text="An important information for you"></vwc-alert>

<vwc-button appearance='outlined' label="Show/Hide alert" onclick="toggleAlert()"></vwc-button>

<script>
  alert = document.querySelector('vwc-alert');
  function toggleAlert() {
    alert.open = !alert.open;
  }
</script>
```

### Connotation

Use the `connotation` attribute to change the alert's icon and icon color.

- Type: `'accent'` | `'information'` | `'success'` | `'warning'` | `'alert'`
- Default: `undefined`

Note that each connotation comes with a default icon (that you can override with the `icon` attribute).

```html preview
<style>
  html { /* for demo purposes */
    block-size: 350px;
  }
  vwc-select {
    width: 160px;
  }
</style>
<vwc-alert text="An important information for you" connotation="accent" open></vwc-alert>

<vwc-select label="Select a connotation">
  <vwc-option value="accent" text="accent"></vwc-option>
  <vwc-option value="success" text="success"></vwc-option>
  <vwc-option value="warning" text="warning"></vwc-option>
  <vwc-option value="alert" text="alert"></vwc-option>
  <vwc-option value="information" text="information"></vwc-option>
</vwc-select>

<script>
  select = document.querySelector('vwc-select');
  alert = document.querySelector('vwc-alert');
  select.addEventListener('change', (e) => {
	  alert.connotation = select.value;
  });
</script>
```

### Icon

Use the `icon` attribute to add an icon to your alert. Note that setting this attribute takes precedence
over the connotation's icon, if any.

- Type: `string`
- Default: `''`

```html preview
<vwc-alert text="An important information for you" open icon="megaphone-solid"></vwc-alert>
```

### Placement

Use the `placement` attribute to set the location of the alert.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`
- Default: `'bottom'`

```html preview center
<style>
  html { /* for demo purposes */
    block-size: 250px;
  }
  .small-alert {
    --alert-min-inline-size: 200px;
  }
</style>
<vwc-alert class="small-alert" placement="top-start" text="top-start" open></vwc-alert>
<vwc-alert class="small-alert" placement="top" text="top" open></vwc-alert>
<vwc-alert class="small-alert" placement="top-end" text="top-end" open></vwc-alert>
<vwc-alert class="small-alert" placement="bottom-start" text="bottom-start" open></vwc-alert>
<vwc-alert class="small-alert" placement="bottom" text="bottom" open></vwc-alert>
<vwc-alert class="small-alert" placement="bottom-end" text="bottom-end" open></vwc-alert>
```

### Removable

Use the `removable` attribute to add a close button to the alert.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-alert text="An important information for you" removable open></vwc-alert>

<vwc-button appearance='outlined' label="Show alert" onclick="openAlert()"></vwc-button>

<script>
  alert = document.querySelector('vwc-alert');
  function openAlert() {
    alert.open = true;
  }
</script>
```

### Timeoutms

Use the `timeoutms` attribute to set the time after which the alert will automatically close.

- Type: `number` (in milliseconds)
- Default: `0` (stays open indefinitely)

```html preview
<vwc-alert text="An important information for you" timeoutms="2000"></vwc-alert>

<vwc-button appearance='outlined' label="Show an alert for 2 seconds" onclick="openAlert()"></vwc-button>

<script>
  alert = document.querySelector('vwc-alert');
  function openAlert() {
    alert.open = true;
  }
</script>
```

## Slots

### Main

If you want to add rich content to your alert, you can use the main slot.

You can style the alert content as needed using `vwc-alert::part(vvd-theme-alternate)`.

```html preview
<vwc-alert open>
  <vwc-switch slot="main" label="Do not show more alerts"></vwc-switch>
</vwc-alert>
```

### Action Items

You can add action items elements using the `action-items` slot. They will be displayed at the inline-end of the alert.

```html preview
<vwc-alert text="An important information for you" open>
  <vwc-button slot="action-items" appearance="outlined" shape='pill' label="Action"></vwc-button>
</vwc-alert>
```

## CSS Variables

### Minimum inline Size

Use the `--alert-min-inline-size` variable to set the alert's minimum inline size.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `420px`

```html preview
<vwc-alert style="--alert-min-inline-size: auto;" text="Very fitting!" open>
```

### Maximum inline Size

Use the `--alert-max-inline-size` variable to set the alert's maximum inline size.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `fit-content`

```html preview
<vwc-alert style="--alert-max-inline-size: 300px;" text="This is helptful to prevent the alert from becoming too wide when displaying a long message" open>
```

## Events

### Open

The `open` event fires when the alert is opened.

### Close

The `close` event fires when the alert is closed.
