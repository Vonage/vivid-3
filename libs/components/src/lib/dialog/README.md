# dialog

```js
<script type="module">import '@vonage/vivid/dialog';</script>
```

```html preview
<vwc-dialog close-button="true" heading="This is a modal window with a close button" open>
  <div>This is the modal's content. The content can be long but still will not be cut off by the close button</div>
  <vwc-button
   slot="primaryAction"
   dialogAction="discard">
   Discard
  </vwc-button>
  <vwc-button
   slot="secondaryAction"
   dialogAction="cancel">
   Cancel
  </vwc-button>
</vwc-dialog>
```
