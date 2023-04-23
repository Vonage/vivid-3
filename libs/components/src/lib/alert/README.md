# Alert

Alerts are meant to be used on top of pages, outside the main content.

```js
<script type="module">
  import '@vonage/vivid/alert';
</script>
```

## Members


### Subtitle

- Type: `string`
- Default: `''`

Use the `subtitle` attribute to set the alert's subtitle.

```html preview
<vwc-alert subtitle="What an important info!!!"></vwc-alert>

<vwc-button slot="action-items" appearance="filled" shape='pill' label="Show alert" onclick="openAlert()"
></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.show();
  }
</script>
```

### Headline

- Type: `string`
- Default: `''`

Use the `headline` attribute to set the alert's headline.

```html preview
<vwc-alert headline="Alert title" subtitle="What an important info!!!"></vwc-alert>

<vwc-button slot="action-items" appearance="filled" shape='pill' label="Show alert" onclick="openAlert()"
></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.show();
  }
</script>
```


### Icon

- Type: `string`
- Default: `'information'`

The `icon` attribute will override the icon set by connotation.

```html preview
<vwc-alert subtitle="What an important info!!!" icon="megaphone-line"></vwc-alert>

<vwc-button slot="action-items" appearance="filled" shape='pill' label="Show alert" onclick="openAlert()"
></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.show();
  }
</script>
```

### Connotation

The `connotation` attribute sets the colors according to the wanted connotation.

- Type: `'accent'` | `'information'` | `'success'` | `'warning'` | `'alert'`
- Default: `'accent'`

Note that icon, if not specifically set, defaults to a connotation-associated icon.

```html preview
<vwc-layout gutters="small" column-basis="block">
  <vwc-alert subtitle="What an important info!!!" connotation="accent"></vwc-alert>
  <vwc-alert subtitle="What an important info!!!" connotation="information"></vwc-alert>
  <vwc-alert subtitle="What an important info!!!" connotation="success"></vwc-alert>
  <vwc-alert subtitle="What an important info!!!" connotation="warning"></vwc-alert>
  <vwc-alert subtitle="What an important info!!!" connotation="alert"></vwc-alert>
</vwc-layout>
```

### Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button. On click it will remove the alert from the DOM.

```html preview
<vwc-alert subtitle="What an important info!!!" removable></vwc-alert>

<vwc-button slot="action-items" appearance="filled" shape='pill' label="Show alert" onclick="openAlert()"
></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.show();
  }
</script>
```

## Slots

### Action Items

You can add action items using slotted content in a named slot `action-items`:

```html preview
<vwc-alert subtitle="What an important info!!!">
  <vwc-button slot="action-items" appearance="outlined" shape='pill' label="Action"></vwc-button>
</vwc-alert>

<vwc-button slot="action-items" appearance="filled" shape='pill' label="Show alert" onclick="openAlert()"
></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.show();
  }
</script>
```

## Methods

### show()

- Type: `function`
- Returns: `void`

### remove()

- Type: `function`
- Returns: `void`