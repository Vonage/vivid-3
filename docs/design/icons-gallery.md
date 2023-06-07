# Icons Gallery

Choose the icon you wish to use and click to copy its name. 
As an example, you can use it as follows:

```html
<vwc-icon name="icon-name-here"></vwc-icon>
```

<link rel="stylesheet" href="../../assets/styles/icons-gallery.css">

<div class="div-wrapper">
    <vwc-text-field id="iconsTextField" icon="search-line" label="Search Icons" oninput="onClickFilter()"></vwc-text-field>
    <div class="tag-wrapper">
      <vwc-tag-group class="tag-group" onclick="onClickFilter()">
        Filter By Style:
        <vwc-tag id="solidTag" label="Solid" selectable></vwc-tag>
        <vwc-tag id="linearTag" label="Linear" selectable></vwc-tag>
      </vwc-tag-group>
      <vwc-tag-group class="tag-group" onclick="onClickFilter()">
        Filter By Color:
        <vwc-tag id="singleTag" label="Single Color" selectable></vwc-tag>
        <vwc-tag id="multiTag" label="Multi Color" selectable></vwc-tag>
      </vwc-tag-group> 
    </div>
    <vwc-layout id="iconsLayout" gutters="small">
    </vwc-layout>
    <div class="button-wrapper">
      <vwc-button id="showMoreButton" label="Show More" appearance='filled' onclick="showMore()"></vwc-button>
    </div>
    <vwc-alert id="copyAlert" text="Icon name copied to clipboard" connotation="success" timeoutms="2000"></vwc-alert>
</div>

<script src="../../assets/scripts/icons-gallery.js" async></script>