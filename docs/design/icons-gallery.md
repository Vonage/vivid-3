# Icons Gallery

Select the icon you wish to use and copy its name. 
As an example, you can use it as follows:

```html
<vwc-icon name="icon-name-here"></vwc-icon>
```

<vwc-text-field id="iconsTextField" icon="search-line" label="Search Icons" oninput="onClickFilter()"></vwc-text-field>

<vwc-tag-group onclick="onClickFilter()">
  You can also filter by:
  <vwc-tag id="solidTag" label="Solid" selectable></vwc-tag>
  <vwc-tag id="linearTag" label="Linear" selectable></vwc-tag>
  <vwc-tag id="singleTag" label="Single Color" selectable></vwc-tag>
  <vwc-tag id="multiTag" label="Multi Color" selectable></vwc-tag>
</vwc-tag-group>

<vwc-layout id="iconsLayout" gutters="small" column-basis="small"></vwc-layout>

<vwc-button id="showMoreButton" label="Show More" appearance='filled' onclick="showMore()"></vwc-button>

<script src="../../assets/scripts/icons-gallery.js" async></script>
<link rel="stylesheet" href="../../assets/styles/icons-gallery.css"">