const VERSION = "4.1.2";
const ICONS_TO_SHOW = 21;
let jsonData;
let index = 0;
let iconsShown = ICONS_TO_SHOW;

fetchJSONData();

async function fetchJSONData() {
  try {
    const response = await fetch(`https://icon.resources.vonage.com/v${VERSION}/manifest.json`);
    jsonData = await response.json();
    showIcons(jsonData);
  } catch (err) {
    console.error(err);
  }
}

function showIcons(data) {
  index = 0;
  while (last = iconsLayout.lastChild) iconsLayout.removeChild(last);
  while (index < data.length) {
    addIcon(data[index].id);
    if (++index >= ICONS_TO_SHOW) break;
  }
  disableShowMoreButton(data);
}

function showMoreIcons(data) {
  while (index < data.length) {
    addIcon(data[index].id);
    if (++index >= iconsShown) break;
  }
  disableShowMoreButton(data);
}

function disableShowMoreButton(data) {
  showMoreButton.disabled = (iconsShown >= data.length);
}

function showMore() {
  iconsShown += ICONS_TO_SHOW;
  filterIcons();
}

function addIcon(id) {
  const iconDiv = document.createElement('div');
  iconDiv.id = "iconDiv";

  const iconSpan = document.createElement('span');
  iconSpan.id = "iconSpan";

  const icon = document.createElement('vwc-icon');
  icon.name = id;
  icon.size = "1";
  iconSpan.appendChild(icon);

  const nameSpan = document.createElement('span');
  nameSpan.id = "nameSpan";
  nameSpan.innerText = id;

  iconDiv.appendChild(iconSpan);
  iconDiv.appendChild(nameSpan);

  iconDiv.onclick = () => onClickiconDiv(id);
  iconsLayout.appendChild(iconDiv);
}

function onClickiconDiv(id) {
  navigator.clipboard.writeText(id);
  copyAlert.open = true;
}

function onClickFilter() {
  iconsShown = ICONS_TO_SHOW;
  filterIcons();
}

function filterIcons() {
  let iconsArray = jsonData.filter(item => item.keyword.some(icon => icon.includes(iconsTextField.value)));

  iconsArray = filterIconsByTag(iconsArray);
  iconsShown > ICONS_TO_SHOW ? showMoreIcons(iconsArray) : showIcons(iconsArray);
}

function filterIconsByTag(iconsArray) {
  if (solidTag.selected) {
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_solid"));
  }
  if (linearTag.selected) {
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_regular"));
  }
  if (singleTag.selected) {
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_color_single"));
  }
  if (multiTag.selected) {
    iconsArray = iconsArray.filter(item => item.tag.some(icon => icon === "style_color_multi"));
  }

  return iconsArray;
}