# Tabs

Represents a tabs custom element.
The vwc-tabs accepts [vwc-tab](../../components/tab) and `vwc-tab-panel` elements as children. Read more about `tabs` [here](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/).

```js
<script type="module">
    import '@vonage/vivid/tabs';
</script>
```

```html preview full
<vwc-tabs>
    <vwc-tab label="Tab one" id="one"></vwc-tab>
    <vwc-tab label="Tab two" id="two"></vwc-tab>
    <vwc-tab label="Tab three" id="tree"></vwc-tab>
    <vwc-tab-panel id="onePanel">
        Tab one content
    </vwc-tab-panel>
    <vwc-tab-panel id="twoPanel">
        Tab two content
    </vwc-tab-panel>
    <vwc-tab-panel id="threePanel">
        Tab three content
    </vwc-tab-panel>
</vwc-tabs>
```

## Members

### Gutters

Use the `gutters` attribute to add a margin to the component.

- Type: `'small'`

- Default: `none`

```html preview full
<vwc-tabs gutters="small">
    <vwc-tab label="Tab one" id="one"></vwc-tab>
    <vwc-tab label="Tab two" id="two"></vwc-tab>
    <vwc-tab label="Tab three" id="tree"></vwc-tab>
    <vwc-tab-panel id="onePanel">
        Tab one content
    </vwc-tab-panel>
    <vwc-tab-panel id="twoPanel">
        Tab two content
    </vwc-tab-panel>
    <vwc-tab-panel id="threePanel">
        Tab three content
    </vwc-tab-panel>
</vwc-tabs>
```

### Orientation

Add a `orientation` attribute to control the orientation.

- Type: `'horizontal'`, `'vertical'`
- Default: `'horizontal'`

```html preview full
<vwc-tabs gutters="small" orientation="vertical">
    <vwc-tab label="Tab one" id="one"></vwc-tab>
    <vwc-tab label="Tab two" id="two"></vwc-tab>
    <vwc-tab label="Tab three" id="tree"></vwc-tab>
    <vwc-tab-panel id="onePanel">
        Tab one content
    </vwc-tab-panel>
    <vwc-tab-panel id="twoPanel">
        Tab two content
    </vwc-tab-panel>
    <vwc-tab-panel id="threePanel">
        Tab three content
    </vwc-tab-panel>
</vwc-tabs>
```

### Connotation
- Type: `'accent' | 'cta'`
- Default: `accent`  

Setting a connotation will only affect the active tab

```html preview full
<vwc-tabs gutters="small" connotation="cta">
    <vwc-tab label="Tab one" id="one"></vwc-tab>
    <vwc-tab label="Tab two" id="two"></vwc-tab>
    <vwc-tab label="Tab three" id="tree"></vwc-tab>
    <vwc-tab-panel id="onePanel">
        Tab one content
    </vwc-tab-panel>
    <vwc-tab-panel id="twoPanel">
        Tab two content
    </vwc-tab-panel>
    <vwc-tab-panel id="threePanel">
        Tab three content
    </vwc-tab-panel>
</vwc-tabs>
```

### Activeid

Add an `activeid` attribute of the active tab.

- Type: `string`
- Default: `''`

```html preview full
<vwc-tabs gutters="small" activeid="two">
    <vwc-tab label="Tab one" id="one"></vwc-tab>
    <vwc-tab label="Tab two" id="two"></vwc-tab>
    <vwc-tab label="Tab three" id="tree"></vwc-tab>
    <vwc-tab-panel id="onePanel">
        Tab one content
    </vwc-tab-panel>
    <vwc-tab-panel id="twoPanel">
        Tab two content
    </vwc-tab-panel>
    <vwc-tab-panel id="threePanel">
        Tab three content
    </vwc-tab-panel>
</vwc-tabs>
```

### Slots

Each `tab panel` has an associated [vwc-tab](../../components/tab) element, that when activated, displays the `tab panel`. 


## Events

<div class="table-wrapper">

| Name     | Description                                                                        |
| -------- | ---------------------------------------------------------------------------------- |
| `change` | Fires a custom `change` event when a tab is clicked or during keyboard navigation. |

</div>