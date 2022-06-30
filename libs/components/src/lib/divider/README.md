# divider

```js
<script type="module">import '@vonage/vivid/divider';</script>
```

```html preview
<vwc-divider orientation="horizontal"></vwc-divider>
```
## Members
### orientation

- Type: `'horizontal'` | `'vertical'` 
- Default: `horizontal`

```html preview
<vwc-divider orientation="vertical"></vwc-divider>
```

### roll
The divider should default to having a role of separator, just as a typical horizontal rule would.  
A role of `presentation` implies that the divider is a visual treatment only so the contrast requirement does not apply in that case.

- Type: `'presentation'` | `'separator'`
- Default: `separator`


## Usage examples
```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button icon="transfer-line"></vwc-button>
  <vwc-divider orientation="vertical" roll="presentation"></vwc-divider>
  <vwc-button icon="compose-line"></vwc-button>
  <vwc-button icon="crop-line"></vwc-button>
  <vwc-divider orientation="vertical" roll="presentation"></vwc-divider>
  <vwc-button icon="copy-2-line"></vwc-button>
  <vwc-button icon="save-line"></vwc-button>
</vwc-action-group>
```
