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

```html preview blocks
  <vwc-divider orientation="horizontal"></vwc-divider>
  <div style="block-size: 40px;">
    <vwc-divider orientation="vertical"></vwc-divider>
  </div>
```

## Accessibility
A `<vwc-divider>` element is by default rendered with a role of `'separator'`.  
When using `<vwc-divider>` as a decorative element the role should be set as `'presentation'`.

[For further reading about divider foundational role & accessibility](https://w3c.github.io/aria/#separator)


## Usage Examples
### Vertical Divider
```html preview
<vwc-action-group appearance="fieldset">
  <vwc-button icon="transfer-line"></vwc-button>
  <vwc-divider orientation="vertical"></vwc-divider>
  <vwc-button icon="compose-line"></vwc-button>
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

### Divider as decorative element

```html preview
<style>
.demo-wrapper {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
}
.demo-h2 {
  padding: 0 32px;
}
</style>
<div class="demo-wrapper">
  <vwc-divider role="presentation"></vwc-divider>
  <vwc-text class="demo-h2">More Info</vwc-text>
  <vwc-divider role="presentation"></vwc-divider>
</div>
   
```
