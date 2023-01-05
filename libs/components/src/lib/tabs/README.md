# Tabs

Represents a tabs custom element.
The vwc-tabs accepts [vwc-tab](../../components/tab) and [vwc-tab-panel](../../components/tab-panel) elements as children.

```js
<script type="module">
    import '@vonage/vivid/tabs';
</script>
```

```html preview full
<vwc-tabs activeid="apps">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts"></vwc-tab>
    <vwc-tab-panel id="appsPanel">
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel">
        <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel">
        <ol>
            <li>Tiramisu</li>
            <li>Spumoni</li>
            <li>Limoncello and Ice Cream with Biscotti</li>
        </ol>
    </vwc-tab-panel>
</vwc-tabs>
```

## Members

### Orientation

Add a `orientation` attribute to control the orientation.

- Type: `'horizontal'`, `'vertical'`
- Default: `'horizontal'`

```html preview full
<vwc-tabs activeid="entrees" orientation="vertical">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts"></vwc-tab>
    <vwc-tab-panel id="appsPanel">
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel">
        <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel">
        <ol>
            <li>Tiramisu</li>
            <li>Spumoni</li>
            <li>Limoncello and Ice Cream with Biscotti</li>
        </ol>
    </vwc-tab-panel>
</vwc-tabs>
```

### Activeid

Add an `activeid` attribute of the active tab.

- Type: `string`
- Default: `''`

```html preview full
<vwc-tabs activeid="entrees">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts"></vwc-tab>
    <vwc-tab-panel id="appsPanel">
        <ol>
            <li>Stuffed artichokes</li>
            <li>Bruschetta</li>
            <li>Oven-baked polenta</li>
            <li>Salami and Fig Crostini with Ricotta</li>
            <li>Rosemary-Potato Focaccia with Goat Cheese</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel">
        <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel">
        <ol>
            <li>Tiramisu</li>
            <li>Spumoni</li>
            <li>Limoncello and Ice Cream with Biscotti</li>
        </ol>
    </vwc-tab-panel>
</vwc-tabs>
```

## Events

### Change

Fires a custom `change` event when a tab is clicked or during keyboard navigation.
