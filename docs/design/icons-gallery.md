# Icons Gallery

Select the icon you wish to use and copy its name. 
As an example, you can use it as follows:

```html
<vwc-icon name="icon-name-here"></vwc-icon>
```

<vwc-text-field id="iconsTextField" icon="search-line" label="Search Icons" oninput="onClickFilter()" style="display: flex;"></vwc-text-field>

<vwc-tag-group onclick="onClickFilter()">
  <vwc-tag id="solidTag" label="Solid" selectable></vwc-tag>
  <vwc-tag id="linearTag" label="Linear" selectable></vwc-tag>
  <vwc-tag id="singleTag" label="Single Color" selectable></vwc-tag>
  <vwc-tag id="multiTag" label="Multi Color" selectable></vwc-tag>
</vwc-tag-group>

<vwc-layout id="iconsLayout" gutters="small" column-basis="small" style="--layout-column-gap: 0; --layout-row-gap: 0;"></vwc-layout>

<vwc-button id="showMoreButton" label="Show More" appearance='filled' onclick="showMore()" style="display: flex;"></vwc-button>

<script src="../../assets/scripts/icons-gallery.js" async></script>