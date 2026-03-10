import scssConstants from './scss-constants';

const { format: formatter } = scssConstants;

describe('basic', () => {
	const token = {
		dictionary: {
			allProperties: [
				{
					value: '#000000',
					type: 'color',
					filePath: 'blueprint.tokens/color-semantic.tokens.json',
					isSource: true,
					original: {
						value: '{color.theme.canvas}',
						type: 'color',
					},
					name: 'vvd-color-canvas',
					attributes: {},
					path: ['color', 'canvas'],
				},
			],
		},
		file: { destination: '_constants.scss', options: {} },
		options: {},
	};

	it('should generate scss constants from token', async () => {
		await expect(formatter(token)).resolves.toContain(
			`$vvd-color-canvas: --vvd-color-canvas;`
		);
	});
});
