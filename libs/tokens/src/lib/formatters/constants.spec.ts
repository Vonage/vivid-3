const { formatter } = require('./constants');


const token = {
	"dictionary": {
		"allProperties": [
			{
				"value": "#000000",
				"type": "color",
				"filePath": "blueprint.tokens/color-semantic.tokens.json",
				"isSource": true,
				"original": {
					"value": "{color.theme.canvas}",
					"type": "color"
				},
				"name": "vvd-color-canvas",
				"attributes": {},
				"path": ["color", "canvas"]
			}
		]
	},
	"file": { "destination": "_constants.scss", "options": {} }
}

describe('basic', () => {
	it('should generate scss constants from token', () => {
		expect(formatter(token)).toContain(`$vvd-color-canvas: --vvd-color-canvas;`);
	});
});
