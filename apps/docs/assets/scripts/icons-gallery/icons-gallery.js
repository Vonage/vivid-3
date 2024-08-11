import {
	ICONS_BASE_URL as BASE_URL,
	ICONS_VERSION as ICON_SET_VERSION,
} from '@vonage/vwc-consts';
import './icons-gallery.style.scss';

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
	document.getElementById('select-category').appendChild(option);
}

function showIcons(data) {
	index = 0;
	let last;
	const iconsLayout = document.getElementById('icons-layout');
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
	document.getElementById('show-more-button').disabled =
		numShown >= data.length;
}

function showMore() {
	numShown += NUM_TO_SHOW;
	filterIcons();
}

function addIcon(id) {
	const iconDiv = document.createElement('div');
	iconDiv.id = 'icon-div';

	const iconSpan = document.createElement('span');
	iconSpan.id = 'icon-span';

	const icon = document.createElement('vwc-icon');
	icon.name = id;
	icon.size = '-2';
	iconSpan.appendChild(icon);

	const nameSpan = document.createElement('span');
	nameSpan.id = 'name-span';
	nameSpan.innerText = id;

	iconDiv.appendChild(iconSpan);
	iconDiv.appendChild(nameSpan);

	iconDiv.onclick = () => onClickiconDiv(id);
	document.getElementById('icons-layout').appendChild(iconDiv);
}

function onClickiconDiv(id) {
	navigator.clipboard.writeText(id);
	document.getElementById('copy-alert').open = true;
}

function onClickFilter() {
	numShown = NUM_TO_SHOW;
	filterIcons();
}

function filterIcons() {
	let iconsArray = jsonData.filter((item) =>
		item.keyword.some((icon) =>
			icon.includes(document.getElementById('search-icons').value.toLowerCase())
		)
	);
	iconsArray = iconsArray.concat(
		jsonData.filter((item) =>
			item.id.includes(
				document.getElementById('search-icons').value.toLowerCase()
			)
		)
	);

	iconsArray = Array.from(
		new Map(iconsArray.map(item => [item.id, item])).values()
	);
	
	iconsArray = filterIconsByCategory(iconsArray);
	iconsArray = filterIconsByTag(iconsArray);
	numShown > NUM_TO_SHOW ? showMoreIcons(iconsArray) : showIcons(iconsArray);
}

function filterIconsByCategory(iconsArray) {
	const selectedCategory = document
		.getElementById('select-category')
		.selectedOptions[0].text.toLowerCase();
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
	const solidTag = document.getElementById('solid-tag');
	const linearTag = document.getElementById('linear-tag');
	const singleTag = document.getElementById('single-tag');
	const multiTag = document.getElementById('multi-tag');

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
					<vwc-text-field id="search-icons" icon="search-line" placeholder="Search" appearance='ghost' shape="pill" oninput="onClickFilter()" aria-label="Search Icons"></vwc-text-field>
					<vwc-divider orientation="vertical"></vwc-divider>
					<vwc-select id="select-category" appearance='ghost' shape="pill" aria-label="Category" onchange="onClickFilter()">
						<vwc-option text="Category"></vwc-option>
					</vwc-select>
				</vwc-action-group>
					<div class="tag-wrapper">
						<vwc-tag-group class="tag-group" onclick="onClickFilter()">
							Filter By Style:
							<vwc-tag id="solid-tag" label="Solid" selectable shape="pill"></vwc-tag>
							<vwc-tag id="linear-tag" label="Line" selectable shape="pill"></vwc-tag>
						</vwc-tag-group>
						<vwc-tag-group class="tag-group" onclick="onClickFilter()">
							Filter By Color:
							<vwc-tag id="single-tag" label="Single Color" selectable shape="pill"></vwc-tag>
							<vwc-tag id="multi-tag" label="Multi Color" selectable shape="pill"></vwc-tag>
						</vwc-tag-group>
					</div>
					<vwc-layout id="icons-layout" gutters="small">
					</vwc-layout>
					<div class="button-wrapper">
						<vwc-button id="show-more-button" label="Show More" appearance='filled' onclick="showMore()" shape="pill"></vwc-button>
					</div>
					<vwc-alert id="copy-alert" text="Icon name copied to clipboard" connotation="success" timeoutms="2000"></vwc-alert>
			</div>`;
		}

		connectedCallback() {
			initIconsGallery();
		}
	}
);
