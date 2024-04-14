import {
	ICONS_BASE_URL as BASE_URL,
	ICONS_VERSION as ICON_SET_VERSION,
} from '../consts/src/index';

figma.showUI(__html__);

// Define types
interface Icon {
	id: string;
	tag: string[];
	keyword: string[];
	alias?: string[];
}

const ROW_SIZE = 20;

figma.ui.onmessage = async (msg) => {
	if (msg.type === 'add-icons') {
		// Remove all existing nodes
		figma.currentPage.children.forEach((node) => {
			if (
				node.type === 'FRAME' ||
				node.type === 'COMPONENT' ||
				node.type === 'INSTANCE'
			) {
				node.remove();
			}
		});

		const svgsJson = await loadManifest();
		const categorizedIcons = categorizeIconsByCategory(svgsJson as Icon[]);
		const categories = Object.keys(categorizedIcons).sort();

		let lastFramePosition = 0;

		// Add icons to frames
		for (let i = 0; i < categories.length; i++) {
			const category = categories[i];
			const categoryNode = createCategoryFrame(category, lastFramePosition);
			const icons = categorizedIcons[category].sort((a: Icon, b: Icon) =>
				a.id.localeCompare(b.id)
			);
			let count = 0;

			for (let j = 0; j < icons.length; j++) {
				const icon = icons[j];
				const svgJson: string = await loadSvgs(icon.id);
				try {
					const svg = figma.createNodeFromSvg(svgJson);
					svg.name = replaceSuffix(icon.id);
					svg.x = 50 * count + 10;
					svg.y = 50 * Math.floor(j / ROW_SIZE) + 10;
					if (count >= ROW_SIZE - 1) {
						count = 0;
						categoryNode.resize(categoryNode.width, categoryNode.height + 50);
					} else {
						count++;
					}
					lastFramePosition = categoryNode.y + categoryNode.height;
					const component = figma.createComponentFromNode(svg);
					component.description = 'keyword: ' + icon.keyword.join(', ');
					categoryNode!.appendChild(component);
				} catch (e) {
					console.error(icon.id + ' failed to load');
				}
			}
			console.log(
				category +
					' category loaded -> ' +
					(i + 1) +
					' of ' +
					categories.length +
					' categories'
			);
		}
		console.log('All categories loaded!!!!');
		figma.closePlugin();
	}
};

function createCategoryFrame(category: string, lastFramePosition: number) {
	// Create frames for each category
	const categoryNode = figma.createFrame();
	categoryNode.name = category;
	categoryNode.resize(1000, 50);
	categoryNode.cornerRadius = 8;
	categoryNode.y = lastFramePosition + 50;
	figma.currentPage.appendChild(categoryNode);
	return categoryNode;
}

function replaceSuffix(str: string) {
	const pattern = /-(solid|line|mono|color)$/;

	if (pattern.test(str)) {
		// Replace the last "-" before the suffix with "/"
		return str.replace(/-(solid|line|mono|color)$/, '/$1');
	} else {
		return str;
	}
}

// Categorize icons
function categorizeIconsByCategory(icons: Icon[]) {
	const categorizedIcons: any = {};
	categorizedIcons['uncategorized'] = [];

	icons.forEach((icon) => {
		const category = icon.tag
			.find((tag: string) => tag.startsWith('category_'))
			?.substring(9);
		if (category) {
			if (!categorizedIcons[category]) {
				categorizedIcons[category] = [];
			}
			categorizedIcons[category].push(icon);
		} else {
			categorizedIcons['uncategorized'].push(icon);
		}
	});

	return categorizedIcons;
}

// Load svgs from json
async function loadSvgs(name: string) {
	try {
		const response = await fetch(
			`${BASE_URL}/v${ICON_SET_VERSION}/${name}.svg`
		);
		return await response.text();
	} catch (e) {
		console.error('failed to load svg' + e);
		return '';
	}
}

async function loadManifest() {
	try {
		const response = await fetch(
			`${BASE_URL}/v${ICON_SET_VERSION}/manifest.json`
		);
		return response.json();
	} catch (e) {
		console.error('error loading the manifest', e);
		figma.closePlugin();
		return;
	}
}
