import {
	ICONS_BASE_URL as BASE_URL,
	ICONS_VERSION as ICON_SET_VERSION,
} from '../../../../dist/libs/consts';

const NUM_TO_SHOW = 21;

let jsonData;
let index = 0;
let numShown = NUM_TO_SHOW;

export async function initIconsGallery() {
	try {
		const response = await fetch(
			`${BASE_URL}/v${ICON_SET_VERSION}/manifest.json`
		);
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
		const categoryName = data[i].tag
			.filter((s) => s.includes('category_'))[0]
			?.substring(9);
		categoryNamesArray.push(categoryName);
	}
	addUniqueCategories(categoryNamesArray);
}

function addUniqueCategories(categoryNamesArray) {
	const uniqueCategorySet = [...new Set(categoryNamesArray)].sort();
	for (let i = 0; i < uniqueCategorySet.length; i++) {
		addOption(uniqueCategorySet[i]);
	}
}

function addOption(categoryName) {
	if (!categoryName) return;
	const option = document.createElement('vwc-option');
	option.text = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
	selectCategory.appendChild(option);
}

function showIcons(data) {
	index = 0;
	let last;
	while ((last = iconsLayout.lastChild)) iconsLayout.removeChild(last);
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
	showMoreButton.disabled = numShown >= data.length;
}

function showMore() {
	numShown += NUM_TO_SHOW;
	filterIcons();
}

function addIcon(id) {
	const iconDiv = document.createElement('div');
	iconDiv.id = 'iconDiv';

	const iconSpan = document.createElement('span');
	iconSpan.id = 'iconSpan';

	const icon = document.createElement('vwc-icon');
	icon.name = id;
	icon.size = '-2';
	iconSpan.appendChild(icon);

	const nameSpan = document.createElement('span');
	nameSpan.id = 'nameSpan';
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
	let iconsArray = jsonData.filter((item) =>
		item.keyword.some((icon) => icon.includes(searchIcons.value.toLowerCase()))
	);
	iconsArray = iconsArray.concat(
		jsonData.filter((item) => item.id.includes(searchIcons.value.toLowerCase()))
	);

	iconsArray = filterIconsByCategory(iconsArray);
	iconsArray = filterIconsByTag(iconsArray);
	numShown > NUM_TO_SHOW ? showMoreIcons(iconsArray) : showIcons(iconsArray);
}

function filterIconsByCategory(iconsArray) {
	const selectedCategory = selectCategory.selectedOptions[0].text.toLowerCase();
	if (selectedCategory === 'category') {
		return iconsArray;
	}
	let iconsArrayAfterFilter = [];
	iconsArrayAfterFilter = iconsArray.filter((item) =>
		item.tag.some((icon) => icon === `category_${selectedCategory}`)
	);
	return iconsArrayAfterFilter;
}

function filterIconsByTag(iconsArray) {
	if (
		!solidTag.selected &&
		!linearTag.selected &&
		!singleTag.selected &&
		!multiTag.selected
	) {
		return iconsArray;
	}

	let iconsArrayAfterFilter = [];
	if (solidTag.selected) {
		iconsArrayAfterFilter = iconsArrayAfterFilter.concat(
			iconsArray.filter((item) =>
				item.tag.some((icon) => icon === 'style_weight_solid')
			)
		);
	}
	if (linearTag.selected) {
		iconsArrayAfterFilter = iconsArrayAfterFilter.concat(
			iconsArray.filter((item) =>
				item.tag.some((icon) => icon === 'style_weight_regular')
			)
		);
	}
	if (singleTag.selected) {
		iconsArrayAfterFilter = iconsArrayAfterFilter.concat(
			iconsArray.filter((item) =>
				item.tag.some((icon) => icon === 'style_color_single')
			)
		);
	}
	if (multiTag.selected) {
		iconsArrayAfterFilter = iconsArrayAfterFilter.concat(
			iconsArray.filter((item) =>
				item.tag.some((icon) => icon === 'style_color_multi')
			)
		);
	}
	return iconsArrayAfterFilter;
}

window.showMore = showMore;
window.onClickFilter = onClickFilter;

customElements.define(
	'vivid-icons-gallery',
	class VividIconsGallery extends HTMLElement {
		constructor() {
			super();
			this.innerHTML = `
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
			</div>`;
		}

		connectedCallback() {
			initIconsGallery();
		}
	}
);
