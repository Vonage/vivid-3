# Icons Gallery

Choose the icon you wish to use and click to copy its name. 
As an example, you can use it as follows:

```html
<vwc-icon name="icon-name-here"></vwc-icon>
```

<br>
<br>
<br>


<link rel="stylesheet" href="../../assets/styles/icons-gallery.css">

<div class="div-wrapper">
  <vwc-action-group shape="pill">
    <vwc-text-field id="searchIcons" icon="search-line" placeholder="Search" appearance='ghost' shape="pill" oninput="onClickFilter()" aria-label="Search Icons"></vwc-text-field>
    <vwc-divider orientation="vertical"></vwc-divider>
    <vwc-select id="selectCategory" appearance='ghost' shape="pill" aria-label="Category" onchange="onClickFilter()">
      <vwc-option text="Category"></vwc-option>
    </vwc-select>
  </vwc-action-group>
    <div class="tag-wrapper">
      <vwc-tag-group class="tag-group" onclick="onClickFilter()">
        Filter By Style:
        <vwc-tag id="solidTag" label="Solid" selectable shape="pill"></vwc-tag>
        <vwc-tag id="linearTag" label="Line" selectable shape="pill"></vwc-tag>
      </vwc-tag-group>
      <vwc-tag-group class="tag-group" onclick="onClickFilter()">
        Filter By Color:
        <vwc-tag id="singleTag" label="Single Color" selectable shape="pill"></vwc-tag>
        <vwc-tag id="multiTag" label="Multi Color" selectable shape="pill"></vwc-tag>
      </vwc-tag-group> 
    </div>
    <vwc-layout id="iconsLayout" gutters="small">
    </vwc-layout>
    <div class="button-wrapper">
      <vwc-button id="showMoreButton" label="Show More" appearance='filled' onclick="showMore()" shape="pill"></vwc-button>
    </div>
    <vwc-alert id="copyAlert" text="Icon name copied to clipboard" connotation="success" timeoutms="2000"></vwc-alert>
</div>

<script src="../../assets/scripts/icons-gallery.js" async></script>