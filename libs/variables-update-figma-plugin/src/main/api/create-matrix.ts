import { parseJson } from '@main/utils/parse-json.util';
import { hexaToFigmaRgba } from '@shared/hexa-to-figma-rgba.util';
import { round } from '@shared/round.util';
import type { DesignToken, JSONTokenTree } from 'design-tokens-format-module';
import { type Score, hex, score } from 'wcag-contrast';

interface Cell {
	fg: [string, DesignToken];
	bg: [string, DesignToken];
}

const contrastEmoji = (score: Score): string => {
	if (score === 'AA') return `⚠️`;
	if (score === 'AA Large') return `⚠️⬆️`;
	if (score === 'AAA') return `✅`;
	return `❌`;
};

const filterTokens = (tokens: JSONTokenTree, name: string) => {
	const tokenEntries = [];

	for (const [currentName, token] of Object.entries(tokens)) {
		if (currentName.startsWith(name)) {
			tokenEntries.push([currentName, token]);
		}
	}

	return Object.fromEntries(tokenEntries);
};

export async function createMatrix(json: string, collection = 'neutral') {
	let tokens = parseJson<JSONTokenTree>(json);

	if (!tokens) throw new Error(`Couldn't parse json!`);

	tokens = filterTokens(tokens, collection);

	const tokenEntries = Object.entries(tokens);

	const outMatrix: Cell[] = [];

	for (const [bgName, bgToken] of tokenEntries) {
		for (const [fgName, fgToken] of tokenEntries) {
			outMatrix.push({
				fg: [fgName.replace(`${collection}-`, ''), fgToken],
				bg: [bgName.replace(`${collection}-`, ''), bgToken],
			});
		}
	}

	const parentFrame = figma.createFrame();
	parentFrame.name = 'BBB';
	parentFrame.itemSpacing = 20;
	parentFrame.layoutMode = 'GRID';
	parentFrame.gridColumnCount = tokenEntries.length;
	parentFrame.gridColumnGap = 10;
	parentFrame.gridRowCount = tokenEntries.length;
	parentFrame.gridRowGap = 10;
	parentFrame.gridChildVerticalAlign = 'CENTER';
	parentFrame.gridChildHorizontalAlign = 'CENTER';
	parentFrame.horizontalPadding = 10;
	parentFrame.verticalPadding = 10;
	parentFrame.resize(
		tokenEntries.length * 120 + (tokenEntries.length + 3) * 10,
		tokenEntries.length * 72 + (tokenEntries.length + 3) * 10
	);

	await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

	for (const {
		fg: [fgName, fgToken],
		bg: [bgName, bgToken],
	} of outMatrix) {
		const frameNode = figma.createFrame();
		const nameTextNode = figma.createText();
		const scoreTextNode = figma.createText();
		const contrastTextNode = figma.createText();

		const contrast = hex(fgToken.$value, bgToken.$value);
		nameTextNode.characters = `${fgName} / ${bgName}`;
		scoreTextNode.characters = contrastEmoji(score(contrast));
		contrastTextNode.characters = round(contrast, 2).toString(10);

		const fgPaint = figma.util.solidPaint(hexaToFigmaRgba(fgToken.$value));

		nameTextNode.fills = [fgPaint];
		scoreTextNode.fills = [fgPaint];
		contrastTextNode.fills = [fgPaint];

		frameNode.appendChild(nameTextNode);
		frameNode.appendChild(scoreTextNode);
		frameNode.appendChild(contrastTextNode);

		frameNode.resize(120, 72);

		frameNode.paddingBottom = 10;
		frameNode.paddingLeft = 10;
		frameNode.paddingRight = 10;
		frameNode.paddingTop = 10;

		frameNode.layoutMode = 'VERTICAL';
		frameNode.itemSpacing = 5;

		const bgPaint = figma.util.solidPaint(hexaToFigmaRgba(bgToken.$value));

		frameNode.fills = [bgPaint];

		parentFrame.appendChild(frameNode);
	}

	figma.currentPage.appendChild(parentFrame);
}
