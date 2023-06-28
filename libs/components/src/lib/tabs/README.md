# Tabs

Represents a tabs custom element.
The vwc-tabs accepts [vwc-tab](../../components/tab) and `vwc-tab-panel` elements as children. Read more about `tabs` [here](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/).

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

### Connotation
- Type: `'accent' | 'cta'`
- Default: `accent`  

Setting a connotation will only affect the active tab

```html preview full
<vwc-tabs activeid="entrees" connotation="cta">
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

### Slots

Each `tab panel` has an associated [vwc-tab](../../components/tab) element, that when activated, displays the `tab panel`. 


## Events

### Change

Fires a custom `change` event when a tab is clicked or during keyboard navigation.

### Use case (scroll)


```html preview full
<style>
vwc-tabs {width: 300px; display: block;}
</style>
<vwc-tabs activeid="entrees">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts"></vwc-tab>
    <vwc-tab label="Appetizers" id="apps-1"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees-1"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts-1"></vwc-tab>
    <vwc-tab-panel id="appsPanel">1</vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel">
    <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel">3</vwc-tab-panel>
    <vwc-tab-panel id="appsPanel-1">4</vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel-1">5</vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel-1">6</vwc-tab-panel>
</vwc-tabs>
```

```html preview full
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
	vwc-tabs {block-size: 150px; display: block;}
</style>
<vwc-tabs activeid="entrees" orientation="vertical">
    <vwc-tab label="Appetizers" id="apps"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts"></vwc-tab>
    <vwc-tab label="Appetizers" id="apps-1"></vwc-tab>
    <vwc-tab label="Entrees" id="entrees-1"></vwc-tab>
    <vwc-tab label="Desserts" id="desserts-1"></vwc-tab>
    <vwc-tab-panel id="appsPanel">1</vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel">
    <ol>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
            <li>Mushroom-Sausage Ragù</li>
            <li>Tomato Bread Soup with Steamed Mussels</li>
            <li>Grilled Fish with Artichoke Caponata</li>
            <li>Celery Root and Mushroom Lasagna</li>
            <li>Osso Buco with Citrus Gremolata</li>
        </ol>
    </vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel">3</vwc-tab-panel>
    <vwc-tab-panel id="appsPanel-1">4</vwc-tab-panel>
    <vwc-tab-panel id="entreesPanel-1">5</vwc-tab-panel>
    <vwc-tab-panel id="dessertsPanel-1">6</vwc-tab-panel>
</vwc-tabs>
```

