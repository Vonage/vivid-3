# Tab

Represents a tab custom element.

```js
<script type="module">
    import '@vonage/vivid/tab';
</script>
```

## Members

### Label

Add a `label` attribute to add label to the tab.

- Type: `string`
- Default: `''`

```html preview
<vwc-tabs>
 <vwc-tab label="Tab" id="tab"></vwc-tab>
 <vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Icon

Use `icon` to set an icon to the tab.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the tab's context.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-tabs>
 <vwc-tab icon="chat-line" aria-label="tab" id="tab"></vwc-tab>
 <vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Icon with Label

Tab label can be affixed by a decorative icon, either by its start or end.  
Use `icon-trailing` to place the icon after the label.

```html preview
<vwc-tabs>
 <vwc-tab icon="chat-line" label="Tab" id="tab"></vwc-tab>
 <vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
<vwc-tabs>
 <vwc-tab icon-trailing icon="chat-line" label="Tab" id="tab"></vwc-tab>
 <vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```

### Disabled

The disabled state of the element.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-tabs>
 <vwc-tab disabled label="Disabled Tab" id="tab"></vwc-tab>
 <vwc-tab-panel id="tab" slot="tabpanel"></vwc-tab-panel>
</vwc-tabs>
```
