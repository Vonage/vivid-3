# Action-group

An action group is a grouping of action buttons or form elements that are related to each other.

```js
<script type="module">import '@vonage/vivid/action-group';</script>
```

```html preview
<vwc-action-group>
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```

## Properties

### Appearance
Set the `appearance` attribute to change the action-Group's appearance.

- Type: `'ghost'` | `'fieldset'`
- Default: `'fieldset'`

```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button label="submit" appearance="filled"></vwc-button>
  <vwc-button icon="headset-line" appearance="filled"></vwc-button>
  <vwc-button label="submit" appearance="filled"></vwc-button>
  <vwc-button label="submit" appearance="filled"></vwc-button>
  <vwc-text-field placeholder="My Placeholder" style="width: 130px;"></vwc-text-field>
</vwc-action-group>
```


### Shape
Use the `shape` attribute to set the action-Group's edges.  
When using shape - pay in mind setting the slotted elements with the same shape property.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`


```html preview
<vwc-action-group shape="pill">
  <vwc-button label="submit" shape="pill"></vwc-button>
  <vwc-button icon="headset-line" shape="pill"></vwc-button>
  <vwc-button label="submit" shape="pill"></vwc-button>
  <vwc-button label="submit" shape="pill"></vwc-button>
  <vwc-button label="submit" shape="pill"></vwc-button>
</vwc-action-group>
```

### Separator
Use the `<hr>` tag for adding separator between the action elements 

```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button label="submit"></vwc-button>
  <vwc-button icon="headset-line"></vwc-button>
  <hr>
  <vwc-button label="submit"></vwc-button>
  <vwc-button label="submit"></vwc-button>
  <hr>
  <vwc-text-field placeholder="My Placeholder" style="width: 130px;" appearance="ghost"></vwc-text-field>
</vwc-action-group>
```


## Use cases
#### fieldset with button
```html preview
<vwc-action-group shape="pill">
   <vwc-text-field shape="pill" placeholder="My Action" appearance="ghost" style="width: 100px;"></vwc-text-field>
   <hr>
   <vwc-button shape="pill" icon="chevron-down-solid"></vwc-button>
</vwc-action-group>
```
