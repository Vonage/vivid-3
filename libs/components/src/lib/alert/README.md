# Alert

Alerts are meant to be used on top of pages, outside the main content.

```js
<script type="module">
  import '@vonage/vivid/alert';
</script>
```

## Members


### Open

- Type: `string`
- Default: `''`

Use the `open` attribute to open alert.

```html preview
<vwc-alert subtitle="What an important info!!!"></vwc-alert>

<vwc-button label="Show alert" onclick="openAlert()"></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.show();
  }
</script>
```

### Subtitle

- Type: `string`
- Default: `''`

Use the `subtitle` attribute to set the alert's subtitle.

```html preview
<vwc-alert subtitle="What an important info!!!" open></vwc-alert>
```

### Headline

- Type: `string`
- Default: `''`

Use the `headline` attribute to set the alert's headline.

```html preview
<vwc-alert headline="Alert title" subtitle="What an important info!!!" open></vwc-alert>
```


### Icon

- Type: `string`
- Default: `'information'`

The `icon` attribute will override the icon set by connotation.

```html preview
<vwc-alert subtitle="What an important info!!!" open icon="megaphone-line"></vwc-alert>
```

### Connotation

The `connotation` attribute sets the colors according to the wanted connotation.

- Type: `'accent'` | `'information'` | `'success'` | `'warning'` | `'alert'`
- Default: `'accent'`

Note that icon, if not specifically set, defaults to a connotation-associated icon.

```html preview
  <vwc-alert id="accent" subtitle="What an important info!!!" connotation="accent"></vwc-alert>
  <vwc-alert id="success" subtitle="What an important info!!!" connotation="success"></vwc-alert>
  <vwc-alert id="warning" subtitle="What an important info!!!" connotation="warning"></vwc-alert>
  <vwc-alert id="alert" subtitle="What an important info!!!" connotation="alert"></vwc-alert>
  <vwc-alert id="information" subtitle="What an important info!!!" connotation="information"></vwc-alert>

  <vwc-button label="Show accent connotation" onclick="openAlert('accent')"></vwc-button>
  <vwc-button label="Show success connotation" onclick="openAlert('success')"></vwc-button> 
  <vwc-button label="Show warning connotation" onclick="openAlert('warning')"></vwc-button> 
  <vwc-button label="Show alert connotation" onclick="openAlert('alert')"></vwc-button>
  <vwc-button label="Show information connotation" onclick="openAlert('information')"></vwc-button>

<script>
  function openAlert(connotation) {
    alert = document.getElementById(connotation);
    alert.show();
  }
</script>
```

### Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button. On click it will remove the alert from the DOM.

```html preview
<vwc-alert subtitle="What an important info!!!" open removable></vwc-alert>

<vwc-button label="Show alert" onclick="openAlert()"></vwc-button>

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
<vwc-alert subtitle="What an important info!!!" open>
  <vwc-button slot="action-items" appearance="outlined" shape='pill' label="Action"></vwc-button>
</vwc-alert>
```

## Methods

### show()

- Type: `function`
- Returns: `void`

### remove()

- Type: `function`
- Returns: `void`