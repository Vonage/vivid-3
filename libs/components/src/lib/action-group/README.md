# Action Group

Action group is a visible boundary containing action buttons or other form elements, related to each other.
Note: this element is purely a visual presentation and have no semantic meaning.

```js
<script type="module">import '@vonage/vivid/action-group';</script>
```

```html preview
<vwc-action-group>
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button label="copy"></vwc-button>
  <vwc-button label="paste"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```

## Properties

### Appearance

Set the `appearance` attribute to change the action-Group's appearance.

- Type: `'fieldset'` | `'ghost'`
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

Use a `<span>` tag with `role="separator"` for adding separator between the action elements

```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button icon="transfer-line"></vwc-button>
  <span role="separator"></span>
  <vwc-button icon="compose-line"></vwc-button>
  <vwc-button icon="crop-line"></vwc-button>
  <span role="separator"></span>
  <vwc-button icon="copy-2-line"></vwc-button>
  <vwc-button icon="save-line"></vwc-button>
</vwc-action-group>
```

### Tight

By default, action group is styled in a spacious manner which visually extends the baseline row size and inline gapping.
enabling the `tight` member will result in a dense style that fits the "normal" baseline.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  vwc-action-group {
    inline-size: initial;
  }

  vwc-text-field {
    flex-grow: 1;
  }
</style>

<vwc-layout column-basis="block" column-spacing="small" style="display: block; max-inline-size: 35ch">
  <vwc-text-field name="username" aria-label="Username" placeholder="Username"></vwc-text-field>
  <vwc-action-group appearance="fieldset" tight>
    <vwc-button icon="flag-uruguay"></vwc-button>
    <vwc-text-field appearance="ghost" aria-label="Phone number" placeholder="Phone number" name="phone" autocomplete=""></vwc-text-field>
  </vwc-action-group>
</vwc-layout>
```

## Use cases

### semi-split button

```html preview
<vwc-action-group shape="pill">
  <vwc-button label='My Action' appearance='ghost' shape="pill"></vwc-button>
    <span role="separator"></span>
  <vwc-button shape="pill" icon="chevron-down-solid"></vwc-button>
</vwc-action-group>

<vwc-action-group shape="pill" tight>
  <vwc-button label='My Action' appearance='ghost' shape="pill"></vwc-button>
  <vwc-button shape="pill" icon="chevron-down-solid"></vwc-button>
</vwc-action-group>
```

### complex search

```html preview
<vwc-action-group shape="pill">
  <vwc-button label='Action' appearance='ghost' icon="chevron-down-solid" icon-trailing shape="pill"></vwc-button>
  <span role="separator"></span>
  <vwc-text-field icon="search-line" placeholder="Search..." appearance='ghost' shape="pill"  style="min-width: 160px;"></vwc-text-field>
</vwc-action-group>
```
