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

<script async>

  const VERSION = "4.1.2";
  const ICONS_TO_SHOW = 16;
  let jsonData;
  let index = 0;
  let iconsShown = ICONS_TO_SHOW;

  fetchJSONData();

  async function fetchJSONData() {
    const response = await fetch(`https://icon.resources.vonage.com/v${VERSION}/manifest.json`);
    jsonData = await response.json();

    showIcons(jsonData);
  } 

  function showIcons(data) {
    index = 0;
    while (last = iconsLayout.lastChild) iconsLayout.removeChild(last);
    while(index < data.length){
      addIcon(data[index].id);
      if(++ index >= ICONS_TO_SHOW) break;
    }
    disableShowMoreButton(data);
  }

  function showMoreIcons(data){
    while(index < data.length){
      addIcon(data[index].id);
      if(++ index >= iconsShown) break;
    }
    disableShowMoreButton(data);
  }

  function disableShowMoreButton(data){
    showMoreButton.disabled = (iconsShown >= data.length);
  }

  function showMore(){
    iconsShown += ICONS_TO_SHOW;
    filterIcons();
  }

  function addIcon(id){
      const emptyState = document.createElement('vwc-empty-state');
      emptyState.headline = emptyState.icon = id;
      iconsLayout.appendChild(emptyState);
  }

  function onClickFilter() {
    iconsShown = ICONS_TO_SHOW;
    filterIcons();
  }

  function filterIcons() {
    let iconsArray = jsonData.filter(item => item.keyword.some(icon => icon.includes(iconsTextField.value)));

    iconsArray = filterIconsByTags(iconsArray);
    iconsShown > ICONS_TO_SHOW ? showMoreIcons(iconsArray) : showIcons(iconsArray);
  }

   function filterIconsByTags(iconsArray) {
    if(solidTag.selected){
      iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_solid"));
    }
    if(linearTag.selected){
      iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_regular"));
    }
    if(singleTag.selected){
      iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_color_single"));
    }
    if(multiTag.selected){
      iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_color_multi"));
    }

    return iconsArray;
   }

</script>