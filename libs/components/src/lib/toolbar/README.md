# toolbar

<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/toolbar_role">
The toolbar role defines the containing element as a collection of commonly used function buttons or controls represented in a compact visual form.
</blockquote>

```js
<script type="module">import '@vonage/vivid/toolbar';</script>
```

```html preview
<vwc-toolbar>
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
```

### Shape

```html preview
<vwc-toolbar shape="pill">
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
```

### Appearance

#### ghost
```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-toolbar appearance="ghost">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>

<vwc-toolbar appearance="ghost" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
</div>
```

#### outlined

```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-toolbar appearance="outlined">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
<vwc-toolbar appearance="outlined" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
</div>
```


#### fieldset

```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-toolbar appearance="fieldset">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
<vwc-toolbar appearance="fieldset" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
</div>
```

#### filled

```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-toolbar appearance="filled">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
<vwc-toolbar appearance="filled" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-toolbar>
</div>
```




```html preview
<vwc-toolbar>
  <select label="submit"></select>
 <input type="text" />
</vwc-toolbar>
```
