# Action-group

<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/toolbar_role">
The toolbar role defines the containing element as a collection of commonly used function buttons or controls represented in a compact visual form.
</blockquote>

```js
<script type="module">import '@vonage/vivid/action-group';</script>
```

```html preview
<vwc-action-group>
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```

### Shape

```html preview
<vwc-action-group shape="pill">
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```

### Appearance

#### ghost
```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="ghost">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>

<vwc-action-group appearance="ghost" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
</div>
```

#### outlined

```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="outlined">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
<vwc-action-group appearance="outlined" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
</div>
```


#### fieldset

```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="fieldset">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
<vwc-action-group appearance="fieldset" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
</div>
```

#### filled

```html preview
<div style="background-color: lightgray; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="filled">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
<vwc-action-group appearance="filled" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
</div>
```
