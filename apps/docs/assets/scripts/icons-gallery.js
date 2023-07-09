const BASE_URL = 'https://icon.resources.vonage.com'; // namespaced as 3f7739a0-a898-4f69-a82b-ad9d743170b6 on icons.resources.vonage.com
const ICON_SET_VERSION = '4.2.1';

const NUM_TO_SHOW = 21;

let jsonData;
let index = 0;
let numShown = NUM_TO_SHOW;

fetchJSONData();

async function fetchJSONData() {
  try {
    const response = await fetch(`${BASE_URL}/v${ICON_SET_VERSION}/manifest.json`);
    jsonData = await response.json();
    addCategoryOptions(jsonData);
    showIcons(jsonData);
  } catch (err) {
    console.error(err);
  }
}

function addCategoryOptions(data) {
  const categoryNamesArray = [];
  for (let i = 0; i < data.length; i++) {
    const categoryName = data[i].tag.filter(s => s.includes('category_'))[0]?.substring(9);
    categoryNamesArray.push(categoryName);
  }
  uniqueCategories(categoryNamesArray);
}

function uniqueCategories(categoryNamesArray) {
  const uniqueCategorySet = [...new Set(categoryNamesArray)].sort();
  for (let i = 0; i < uniqueCategorySet.length; i++) {
    addOption(uniqueCategorySet[i]);
  }
}

function addOption(categoryName) {
  if (!categoryName) return;
  const option = document.createElement('vwc-option');
  option.text = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);;
  selectCategory.appendChild(option);
}

function showIcons(data) {
  index = 0;
  while (last = iconsLayout.lastChild) iconsLayout.removeChild(last);
  while (index < data.length) {
    addIcon(data[index].id);
    if (++index >= NUM_TO_SHOW) break;
  }
  disableShowMoreButton(data);
}

function showMoreIcons(data) {
  while (index < data.length) {
    addIcon(data[index].id);
    if (++index >= numShown) break;
  }
  disableShowMoreButton(data);
}

function disableShowMoreButton(data) {
  showMoreButton.disabled = (numShown >= data.length);
}

function showMore() {
  numShown += NUM_TO_SHOW;
  filterIcons();
}

function addIcon(id) {
  const iconDiv = document.createElement('div');
  iconDiv.id = "iconDiv";

  const iconSpan = document.createElement('span');
  iconSpan.id = "iconSpan";

  const icon = document.createElement('vwc-icon');
  icon.name = id;
  icon.size = "-2";
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
  numShown = NUM_TO_SHOW;
  filterIcons();
}

function filterIcons() {
  let iconsArray = jsonData.filter(item => item.keyword.some(icon => icon.includes(searchIcons.value.toLowerCase())));
  iconsArray = iconsArray.concat(jsonData.filter(item => item.id.includes(searchIcons.value.toLowerCase())));

  iconsArray = filterIconsByCategory(iconsArray);
  iconsArray = filterIconsByTag(iconsArray);
  numShown > NUM_TO_SHOW ? showMoreIcons(iconsArray) : showIcons(iconsArray);
}

function filterIconsByCategory(iconsArray) {
  let iconsArrayAfterFilter = [];
  const selectedCategory = selectCategory.selectedOptions[0].text.toLowerCase();
  if (selectedCategory !== 'category') {
    iconsArrayAfterFilter = iconsArray.filter(item => item.tag.some(icon => icon === `category_${selectedCategory}`));
  }
  return iconsArrayAfterFilter;
}

function filterIconsByTag(iconsArray) {
  if (!solidTag.selected && !linearTag.selected && !singleTag.selected && !multiTag.selected) {
    return iconsArray;
  }
  
  let iconsArrayAfterFilter = [];
  if (solidTag.selected) {
    iconsArrayAfterFilter = iconsArrayAfterFilter.concat(iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_solid")));
  }
  if (linearTag.selected) {
    iconsArrayAfterFilter = iconsArrayAfterFilter.concat(iconsArray.filter(item => item.tag.some(icon => icon === "style_weight_regular")));
  }
  if (singleTag.selected) {
    iconsArrayAfterFilter = iconsArrayAfterFilter.concat(iconsArray.filter(item => item.tag.some(icon => icon === "style_color_single")));
  }
  if (multiTag.selected) {
    iconsArrayAfterFilter = iconsArrayAfterFilter.concat(iconsArray.filter(item => item.tag.some(icon => icon === "style_color_multi")));
  }
  return iconsArrayAfterFilter;
}
