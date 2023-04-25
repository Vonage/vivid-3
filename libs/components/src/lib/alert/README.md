# Alert

Alerts are meant to be used on top of pages, outside the main content.

```js
<script type="module">
  import '@vonage/vivid/alert';
</script>
```

## Members

### Open

- Type: `boolean`
- Default: `false`

Use the `open` attribute to open alert.

```html preview
<vwc-alert subtitle="What an important info!!!"></vwc-alert>

<vwc-button appearance='outlined' label="Show alert" onclick="openAlert()"></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.open = true;
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
- Default: `''`

The `icon` attribute will override the icon set by connotation.

```html preview
<vwc-alert subtitle="What an important info!!!" open icon="megaphone-solid"></vwc-alert>
```

### Connotation

The `connotation` attribute sets the colors and icon according to the wanted connotation.

- Type: `'accent'` | `'information'` | `'success'` | `'warning'` | `'alert'`
- Default: `'accent'`

Note that icon, if not specifically set, defaults to a connotation-associated icon.

```html preview
  <vwc-alert id="accent" subtitle="What an important info!!!" connotation="accent"></vwc-alert>
  <vwc-alert id="success" subtitle="What an important info!!!" connotation="success"></vwc-alert>
  <vwc-alert id="warning" subtitle="What an important info!!!" connotation="warning"></vwc-alert>
  <vwc-alert id="alert" subtitle="What an important info!!!" connotation="alert"></vwc-alert>
  <vwc-alert id="information" subtitle="What an important info!!!" connotation="information"></vwc-alert>

  <vwc-button appearance='outlined' label="Show accent connotation" onclick="openAlert('accent')"></vwc-button>
  <vwc-button appearance='outlined' label="Show success connotation" onclick="openAlert('success')"></vwc-button> 
  <vwc-button appearance='outlined' label="Show warning connotation" onclick="openAlert('warning')"></vwc-button> 
  <vwc-button appearance='outlined' label="Show alert connotation" onclick="openAlert('alert')"></vwc-button>
  <vwc-button appearance='outlined' label="Show information connotation" onclick="openAlert('information')"></vwc-button>

<script>
  function openAlert(connotation) {
    alert = document.getElementById(connotation);
    alert.open = true;
  }
</script>
```

### Removable

- Type: `boolean`
- Default: `false`

The `removable` attribute sets a remove button.

```html preview
<vwc-alert subtitle="What an important info!!!" removable open></vwc-alert>

<vwc-button appearance='outlined' label="Show alert" onclick="openAlert()"></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.open = true;
  }
</script>
```

### Timeoutms

- Type: `number`
- Default: `0`

Use the `timeoutms` attribute to set timeout to close the alert.

```html preview
<vwc-alert subtitle="What an important info!!!" timeoutms=2000></vwc-alert>

<vwc-button appearance='outlined' label="Show alert" onclick="openAlert()"></vwc-button>

<script>
  function openAlert() {
    alert = document.querySelector('vwc-alert');
    alert.open = true;
  }
</script>
```

### Placement

Use the `placement` attribute to set the placement of the alert.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`
- Default: `'bottom'`

```html preview center
<vwc-alert subtitle="What an important info!!!" open></vwc-alert>

<vwc-button appearance='outlined' label="Show top alert" onclick="openAlert('top')"></vwc-button>
<vwc-button appearance='outlined' label="Show top-start alert" onclick="openAlert('top-start')"></vwc-button>
<vwc-button appearance='outlined' label="Show top-end alert" onclick="openAlert('top-end')"></vwc-button>
<vwc-button appearance='outlined' label="Show bottom alert" onclick="openAlert('bottom')"></vwc-button>
<vwc-button appearance='outlined' label="Show bottom-start alert" onclick="openAlert('bottom-start')"></vwc-button>
<vwc-button appearance='outlined' label="Show bottom-end alert" onclick="openAlert('bottom-end')"></vwc-button>

<script>
  function openAlert(placement) {
    alert = document.querySelector('vwc-alert');
    alert.placement = placement;
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

## CSS Variables

### Min Inline Size

Use the `--alert-min-inline-size` variable to set the alert's inline size.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `auto`

```html preview
<style>
  vwc-alert {
    --alert-min-inline-size: 100px;
  }
</style>

<vwc-alert subtitle="What an important info!!!" open></vwc-alert>
```

## Events

### Removed

Fires `removed` when the removing animation is done.

## Methods

### remove()

- Type: `function`
- Returns: `void`

Removes the alert from the DOM.  When the animation finishes, it emits the `removed` event and removes the alert from the DOM completely.  If you have a variable that refers to the alert element make sure to clear it otherwise it might cause a memory leak.
