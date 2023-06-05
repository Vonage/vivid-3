const VERSION = "4.1.2";
const ICONS_TO_SHOW = 14;
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
    emptyState.id = "emptyState";
    emptyState.headline = emptyState.icon = id;
    iconsLayout.appendChild(emptyState);
}

function onClickFilter() {
  iconsShown = ICONS_TO_SHOW;
  filterIcons();
}

function filterIcons() {
  let iconsArray = jsonData.filter(item => item.keyword.some(icon => icon.includes(iconsTextField.value)));

  iconsArray = filterIconsByRadio(iconsArray);
  iconsShown > ICONS_TO_SHOW ? showMoreIcons(iconsArray) : showIcons(iconsArray);
}

 function filterIconsByRadio(iconsArray) {
  if(solidRadio.checked){
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_solid"));
  }
  if(linearRadio.checked){
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_regular"));
  }
  if(singleRadio.checked){
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_color_single"));
  }
  if(multiRadio.checked){
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_color_multi"));
  }

  return iconsArray;
 }