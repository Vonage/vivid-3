# Tab Panel

Represents a tab-panel custom element.

```js
<script type="module">
    import '@vonage/vivid/tab-panel';
</script>
```

Each `tab panel` has an associated [vwc-tab](../../components/tab) element, that when activated, displays the `tab panel`. 

```html preview full
<vwc-tabs activeid="apps">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab-panel id="appsPanel">
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </vwc-tab-panel>
</vwc-tabs>
```
