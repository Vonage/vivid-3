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


### Appearance

- I added to each appearance both regular and alternate, so we can see all option.  
- Don't think we want to creat mutation that one has no alternate.  
- I am using the "canvas" connotation here as the only option.  
- Currently, the fieldset is used also in the textfield - so it has no background. This need to be considered in textfield branch if we need or allow outline with background.



#### ghost
```html preview
<div style="background-color: #ffd1e3; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="ghost">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>

<vwc-action-group appearance="ghost" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
</div>
```

#### outlined
maybe this option is not needed and only fieldset is needed

```html preview
<div style="background-color: #ffd1e3; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="outlined">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
<vwc-action-group appearance="outlined" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
</div>
```


#### fieldset

```html preview
<div style="background-color: #ffd1e3; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="fieldset">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
<vwc-action-group appearance="fieldset" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
</div>
```

#### filled

```html preview
<div style="background-color: #ffd1e3; padding: 1rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="filled">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
<vwc-action-group appearance="filled" alternate>
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
</div>
```

##### filled with no "special" background
looks like ghost but has a background

```html preview
<div style="padding: 2rem; display: flex; column-gap: 0.5rem;">
<vwc-action-group appearance="filled">
  <vwc-button label="submit" ></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 100px;"></vwc-text-field>
</vwc-action-group>
</div>
```

### Shape
Are we forcing the inner elements to get the action-group shape?  
Here are rounded items inside shape-pill.


```html preview
<vwc-action-group shape="pill">
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```
