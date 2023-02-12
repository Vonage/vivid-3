# Action Group

Action group is a visible boundary containing action buttons or other form elements, related to each other.
Note: this element is purely a visual presentation and have no semantic meaning.

```js
<script type="module">
  import '@vonage/vivid/action-group';
</script>
```

```html preview
<vwc-action-group>
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button label="copy"></vwc-button>
  <vwc-button label="paste"></vwc-button>
  <vwc-button label="submit"></vwc-button>
</vwc-action-group>
```

## Members

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

### Tight

By default, action group is styled in a spacious manner which visually extends the baseline row size and inline gapping.
enabling the `tight` member will result in a dense style that fits the "normal" baseline.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  vwc-layout {
    --layout-grid-template-columns: 250px;
  }

  vwc-action-group > vwc-text-field {
    flex-grow: 1;
  }
</style>

<vwc-layout column-basis="block" column-spacing="small">
  <vwc-text-field name="username" aria-label="Username" placeholder="Username"></vwc-text-field>
  <vwc-action-group appearance="fieldset" tight>
    <vwc-button icon="flag-uruguay"></vwc-button>
    <vwc-text-field appearance="ghost" aria-label="Phone number" placeholder="Phone number" name="phone" autocomplete=""></vwc-text-field>
  </vwc-action-group>
</vwc-layout>
```

## Use Cases

### Separator

Use `<vwc-divider>` for adding separator between the action elements

```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-divider orientation="vertical"></vwc-divider>
  <vwc-button icon="compose-line"></vwc-button>
</vwc-action-group>
```

### semi-split button

```html preview
<vwc-action-group shape="pill">
  <vwc-button label='My Action' appearance='ghost' shape="pill"></vwc-button>
    <vwc-divider orientation="vertical"></vwc-divider>
  <vwc-button shape="pill" icon="chevron-down-solid"></vwc-button>
</vwc-action-group>

<vwc-action-group shape="pill" tight>
  <vwc-button label='My Action' appearance='ghost' shape="pill"></vwc-button>
  <vwc-button shape="pill" icon="chevron-down-solid"></vwc-button>
</vwc-action-group>
```

### Composed Search

```html preview
<vwc-action-group shape="pill">
  <vwc-button label='Action' appearance='ghost' icon="chevron-down-solid" icon-trailing shape="pill"></vwc-button>
  <vwc-divider orientation="vertical"></vwc-divider>
  <vwc-text-field icon="search-line" placeholder="Search..." appearance='ghost' shape="pill"  style="min-width: 160px;"></vwc-text-field>
</vwc-action-group>
```

### Radio Group

Note: This is a simplified example illustrating a styled radio group and is not intended to be a complete implementation of the [Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

```html preview
<style>
 [role="radiogroup"] {
  display: contents;
 }
</style>

<vwc-action-group>
  <div role="radiogroup" aria-label="Text Alignment">
   <vwc-button type="button" role="radio" icon="align-left-line" aria-checked="false" tabindex="0" aria-label="Text Align Left"></vwc-button>
   <vwc-button type="button" role="radio" icon="align-center-line" aria-checked="true" tabindex="-1" aria-label="Text Align Center" appearance="filled"></vwc-button>
   <vwc-button type="button" role="radio" icon="align-right-line" aria-checked="false" tabindex="-1" aria-label="Text Align Right"></vwc-button>
  </div>
</vwc-action-group>
```

### More Actions

```html preview center
<vwc-button id="anchor" icon="more-horizontal-solid" aria-label="open actions menu"></vwc-button>

<vwc-popup id="popup" anchor="anchor" arrow open placement="top">
  <vwc-action-group appearance="ghost">
    <vwc-button icon="reply-line"></vwc-button>
    <vwc-button icon="transfer-line"></vwc-button>
    <vwc-divider orientation="vertical"></vwc-divider>
    <vwc-button icon="compose-line"></vwc-button>
    <vwc-button icon="crop-line"></vwc-button>
    <vwc-divider orientation="vertical"></vwc-divider>
    <vwc-button icon="copy-2-line"></vwc-button>
    <vwc-button icon="save-line"></vwc-button>
  </vwc-action-group>
</vwc-popup>

<script>
  anchor.addEventListener('click', () => popup.open = !popup.open);
</script>
```
