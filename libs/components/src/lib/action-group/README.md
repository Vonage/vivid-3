# Action-group

An action group is a grouping of action buttons or form elements that are related to each other.

```js
<script type="module">import '@vonage/vivid/action-group';</script>
```

```html preview
<vwc-action-group>
  <vwc-button icon="reply-line" appearance="filled"></vwc-button>
  <vwc-button label="copy"></vwc-button>
  <vwc-button label="paste"></vwc-button>
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
  <vwc-button label="edit"></vwc-button>
  <vwc-button label="copy"></vwc-button>
  <vwc-button label="paste"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
<vwc-action-group appearance="ghost">
  <vwc-button label="edit" appearance="filled"></vwc-button>
  <vwc-button label="copy" appearance="filled"></vwc-button>
  <vwc-button label="paste" appearance="filled"></vwc-button>
  <vwc-button label="submit" appearance="filled"></vwc-button>
</vwc-action-group>
```


### Shape
Use the `shape` attribute to set the action-Group's edges.  
When using shape - pay in mind setting the slotted elements with the same shape property.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`


```html preview
<vwc-action-group shape="pill">
  <vwc-button label="edit" shape="pill"></vwc-button>
  <vwc-button label="copy" shape="pill"></vwc-button>
  <vwc-button label="paste" shape="pill"></vwc-button>
  <vwc-button label="submit" shape="pill"></vwc-button>
</vwc-action-group>
```

### Separator
Use the `<hr>` tag for adding separator between the action elements 

```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button icon="transfer-line"></vwc-button>
  <hr>
  <vwc-button icon="compose-line"></vwc-button>
  <vwc-button icon="crop-line"></vwc-button>
  <hr>
  <vwc-button icon="copy-2-line"></vwc-button>
  <vwc-button icon="save-line"></vwc-button>
</vwc-action-group>
```


## Use cases
#### semi-split button
```html preview
<vwc-action-group shape="pill">
<vwc-button label='My Action' appearance='ghost' shape="pill"></vwc-button>
   <hr>
   <vwc-button shape="pill" icon="chevron-down-solid"></vwc-button>
</vwc-action-group>
```

#### complex search
```html preview
<vwc-action-group shape="pill">
    <vwc-button label='Action' appearance='ghost' icon="chevron-down-solid" icon-trailing shape="pill"></vwc-button>
   <hr>
   <vwc-text-field icon="search-line" placeholder="Search..." appearance='ghost' shape="pill"  style="min-width: 160px;"></vwc-text-field>
</vwc-action-group>
```

