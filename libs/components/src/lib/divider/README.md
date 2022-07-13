# Divider

```js
<script type="module">
   import '@vonage/vivid/divider';
</script>
```
```html preview
<vwc-divider></vwc-divider>
```
## Members
### Orientation

- Type: `'horizontal'` | `'vertical'` 
- Default: `horizontal`

```html preview
<vwc-layout column-basis="block" column-spacing="small" gutters="small">
  <vwc-divider orientation="horizontal"></vwc-divider>
  <div style="block-size: 40px;">
    <vwc-divider orientation="vertical"></vwc-divider>
  </div>
</vwc-layout>
```

## Accessibility
A `<vwc-divider>` element is by default rendered with a role of `'separator'`.  
When using `<vwc-divider>` as a decorative element the role should be set as `'presentation'`.

[For further reading about divider foundational role & accessibility](https://github.com/microsoft/fast/blob/master/packages/web-components/fast-foundation/src/divider/divider.spec.md#accessibility)


## Usage Examples
### Vertical Divider
```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button icon="reply-line"></vwc-button>
  <vwc-button icon="transfer-line"></vwc-button>
  <vwc-divider orientation="vertical"></vwc-divider>
  <vwc-button icon="compose-line"></vwc-button>
  <vwc-button icon="crop-line"></vwc-button>
  <vwc-divider orientation="vertical"></vwc-divider>
  <vwc-button icon="copy-2-line"></vwc-button>
  <vwc-button icon="save-line"></vwc-button>
</vwc-action-group>
```
### Horizontal Divider
```html preview
<style>
vwc-card {
  width: 400px;
}
.demo-footer {
  display: flex;
  column-gap: 8px;
  justify-content: flex-end;
}
</style>
<vwc-card>
  <vwc-layout column-basis="block" gutters="small" slot="main">
    <vwc-text>
      Choose the button you like best in this card :)
    </vwc-text>
   <vwc-divider></vwc-divider>
   <div class="demo-footer">
     <vwc-button label='cancel' appearance='outlined'></vwc-button>
     <vwc-button label='Submit' appearance='filled'></vwc-button>
   </div>
  </vwc-layout>
</vwc-card>

 
 
  
```
