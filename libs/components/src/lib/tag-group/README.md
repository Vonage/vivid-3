# Tag Group

Represents a tag-group custom element.

A tag group displays tags from left to right, handling overflow by wrapping to the next line.
For a consistent user experience, tags within a tag group should generally be the same type.

```js
<script type="module">
    import '@vonage/vivid/tag-group';
</script>
```

## Slots

### Default

Read more about [vwc-tag](../../components/tag).

```html preview
<vwc-tag-group>
  <vwc-tag label="first tag"></vwc-tag>
  <vwc-tag label="second tag"></vwc-tag>
  <vwc-tag label="third tag"></vwc-tag>
</vwc-tag-group>
```

## Use Case

### Selectable

```html preview
<vwc-tag-group>
  <vwc-tag label="first tag" selectable selected></vwc-tag>
  <vwc-tag label="second tag" selectable></vwc-tag>
  <vwc-tag label="third tag" selectable selected></vwc-tag>
</vwc-tag-group>
```

### Removable

```html preview
<vwc-tag-group>
  <vwc-tag label="first tag" removable></vwc-tag>
  <vwc-tag label="second tag" removable></vwc-tag>
  <vwc-tag label="third tag" removable></vwc-tag>
</vwc-tag-group>
```