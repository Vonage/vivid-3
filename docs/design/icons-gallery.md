# Icons Gallery

Select the icon you wish to use and copy its name. 
As an example, you can use it as follows:

```html
<vwc-icon name="icon-name-here"></vwc-icon>
```

<vwc-text-field id="iconsTextField" icon="search-line" label="Search Icons" oninput="onClickFilter()"></vwc-text-field>

<vwc-radio-group id="radioGroup" label="Filter by:" onclick="onClickFilter()">
  <vwc-radio id="solidRadio" label="Solid" value="Solid"></vwc-radio>
  <vwc-radio id="linearRadio" label="Linear" value="Linear"></vwc-radio>
  <vwc-radio id="singleRadio" label="Single Color" value="Single"></vwc-radio>
  <vwc-radio id="multiRadio" label="Multi Color" value="Multi"></vwc-radio>
  <vwc-radio id="allStylesRadio" label="All" value="All" checked></vwc-radio>
</vwc-radio-group>

<vwc-layout id="iconsLayout" gutters="small" column-basis="small"></vwc-layout>

<vwc-button id="showMoreButton" label="Show More" appearance='filled' onclick="showMore()"></vwc-button>

<script src="../../assets/scripts/icons-gallery.js" async></script>
<link rel="stylesheet" href="../../assets/styles/icons-gallery.css"">