# Tree View

Represents a hierarchical list. Any [vwc-tree-item](../../components/tree-item) in the hierarchy may have child vwc-tree-items, and vwc-tree-items that have children may be expanded or collapsed to show or hide the children.
Click [here](https://www.w3.org/WAI/ARIA/apg/patterns/treeview) to learn more about TreeView's Keyboard Interaction and Accessibility.

```js
<script type="module">
    import '@vonage/vivid/tree-view';
</script>
```

## Slots

### Default

Read more about [vwc-tree-item](../../components/tree-item).

```html preview
<vwc-tree-view>
    <vwc-tree-item text="Tree Item 1"></vwc-tree-item>
    <vwc-tree-item text="Tree Item 2"></vwc-tree-item>
</vwc-tree-view>
```

## Use Cases

### Nested Tree

Read more about [vwc-tree-item](../../components/tree-item).

```html preview
<vwc-tree-view>
    <vwc-tree-item text="Tree Item 1">
        <vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
    </vwc-tree-item>
    <vwc-tree-item text="Tree Item 2"></vwc-tree-item>
</vwc-tree-view>
```