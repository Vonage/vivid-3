import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { cssConfig, fontFaceDeclaration } from './css.config';

function buildToken(name: string, token: any): TransformedToken {
	return {
		name,
		filePath: 'virtual-file',
		isSource: false,
		path: [name],
		original: {},
		$value: token.$value,
		$type: token.$type,
	};
}

describe('CSS Features', () => {
	describe('vvd/value/css/color', () => {
		it('Should build hex color from components', () => {
			const token = buildToken('vvd/color/neutral/700', {
				$type: 'color',
				$value: {
					colorSpace: 'srgb',
					components: [0, 0, 0],
					alpha: 0,
					hex: '#e6e6e6',
				},
			});

			const out = cssConfig.transforms['vvd/value/css/color'].transform(
				token,
				{},
				{},
			);

			expect(out).toEqual('#00000000');
		});

		it('Should apply alpha on the color', () => {
			const token = buildToken('vvd/color/neutral/700', {
				$type: 'color',
				$value: {
					colorSpace: 'srgb',
					components: [1, 1, 1],
					alpha: 0.5,
					hex: '#e6e6e6',
				},
			});

			const out = cssConfig.transforms['vvd/value/css/color'].transform(
				token,
				{},
				{},
			);

			expect(out).toEqual('#ffffff80');
		});
	});
	describe('vvd/css/value/dimension', () => {
		it('Should add px to the value', () => {
			const token = buildToken('vvd/size/medium/500', {
				$type: 'dimension',
				$value: {
					value: 4,
					unit: 'px',
				},
			});

			const out = cssConfig.transforms['vvd/value/css/dimension'].transform(
				token,
				{},
				{},
			);

			expect(out).toEqual('4px');
		});
	});

	describe('vvd/value/css/typography', () => {
		it('Should build font shorthand', () => {
			const token = buildToken('vvd/typography/heading/200', {
				$type: 'typography',
				$value: {
					fontFamily: 'Spezia - Regular',
					fontSize: {
						value: 6,
						unit: 'px',
					},
					lineHeight: 8,
					letterSpacing: {
						value: 0,
						unit: 'px',
					},
					fontWeight: 500,
				},
			});

			const out = cssConfig.transforms['vvd/value/css/typography'].transform(
				token,
				{
					basePxFontSize: 14,
				},
				{},
			);

			expect(out).toEqual(
				'500 0.42857142857142855rem/0.5714285714285714rem SpeziaCompleteVariableUpright',
			);
		});

		it('Should set up regular font face for non-mono typography', () => {
			const token = buildToken('vvd/typography/heading/200', {
				$type: 'typography',
				$value: {
					fontFamily: 'Spezia - Regular',
					fontSize: {},
					lineHeight: 8,
					letterSpacing: {},
					fontWeight: 0,
				},
			});

			const out = cssConfig.transforms['vvd/value/css/typography'].transform(
				token,
				{
					basePxFontSize: 14,
				},
				{},
			);

			expect(out).include('SpeziaCompleteVariableUpright');
		});

		it('Should set up mono font face for mono styles', () => {
			const token = buildToken('vvd/typography/heading/200', {
				$type: 'typography',
				$value: {
					fontFamily: 'Spezia - SemiMono Regular',
					fontSize: {},
					lineHeight: 8,
					letterSpacing: {},
					fontWeight: 0,
				},
			});

			const out = cssConfig.transforms['vvd/value/css/typography'].transform(
				token,
				{
					basePxFontSize: 14,
				},
				{},
			);

			expect(out).include('SpeziaMonoCompleteVariable');
		});
	});

	describe('vvd/value/css/shadow', () => {
		it('Should build box-shadow stops', () => {
			const token = buildToken('vvd/elevation/regular/200', {
				$type: 'shadow',
				$value: [
					{
						blur: 4,
						color: {
							colorSpace: 'srgb',
							components: [
								0.7803921699523926, 0.7764706015586853, 0.7764706015586853,
							],
							alpha: 0.41999998688697815,
							hex: '#c7c6c6',
						},
						spread: 0,
						offsetX: 0,
						offsetY: 1,
					},
					{
						blur: 2,
						color: {
							colorSpace: 'srgb',
							components: [
								0.7803921699523926, 0.7764706015586853, 0.7764706015586853,
							],
							alpha: 0.17000000178813934,
							hex: '#c7c6c6',
						},
						spread: 0,
						offsetX: 0,
						offsetY: 1,
					},
					{
						blur: 1,
						color: {
							colorSpace: 'srgb',
							components: [
								0.7803921699523926, 0.7764706015586853, 0.7764706015586853,
							],
							alpha: 0.17000000178813934,
							hex: '#c7c6c6',
						},
						spread: 0,
						offsetX: 0,
						offsetY: 2,
					},
				],
			});
			const out = cssConfig.transforms['vvd/value/css/shadow'].transform(
				token,
				{},
				{},
			);

			expect(out).toEqual(
				'0px 1px 4px 0px #c7c6c66b, 0px 1px 2px 0px #c7c6c62b, 0px 2px 1px 0px #c7c6c62b',
			);
		});
	});

	describe('vvd/value/css/roundRems', () => {
		it('Should round rems value', () => {
			const token = buildToken('vvd/size/medium/800', {
				$type: 'dimension',
				$value: '1.1234567890rem',
			});

			const out = cssConfig.transforms['vvd/value/css/roundRems'].transform(
				token,
				{},
				{},
			);
			expect(out).toEqual('1.12rem');
		});

		it('Should not round if the value is not rem', () => {
			const token = buildToken('vvd/size/medium/700', {
				$type: 'dimension',
				$value: '12px',
			});
			const out = cssConfig.transforms['vvd/value/css/roundRems'].transform(
				token,
				{},
				{},
			);
			expect(out).toEqual('12px');
		});
	});

	describe('vvd/name/css', () => {
		it('Should replace slashes with dashes in tokens name');
		const token = buildToken('vvd/color/critical/500', {});

		const out = cssConfig.transforms['vvd/name/css'].transform(token, {}, {});
		expect(out).toEqual('vvd-color-critical-500');
	});

	describe('vvd/css/addFontsLinks', () => {
		const fileContents = `:root {\n\t--vvd-color-canvas: #ffffff;\n}\n`;
		const mockedVolume = {
			writeFileSync: vi.fn(),
			readFileSync: vi.fn().mockReturnValue(fileContents),
		};

		const platformConfig = {
			options: {
				selector: ':root',
			},
			files: [
				{
					destination: 'typography.css',
				},
				{
					destination: 'colors.css',
				},
			],
			buildPath: '.',
		};

		it('Should affect only typography styles', () => {
			// do(_dictionary, platform, _options, volume): void {
			cssConfig.actions['vvd/css/addFontsLinks'].do(
				{} as Dictionary,
				platformConfig,
				{},
				mockedVolume as any,
			);

			expect(mockedVolume.writeFileSync).toHaveBeenCalledOnce();
		});

		it('Should affect only typography styles', () => {
			// do(_dictionary, platform, _options, volume): void {
			cssConfig.actions['vvd/css/addFontsLinks'].do(
				{} as Dictionary,
				platformConfig,
				{},
				mockedVolume as any,
			);

			expect(mockedVolume.writeFileSync).toHaveBeenCalledWith(
				'./typography.css',
				`${fontFaceDeclaration}\n\n${fileContents}`,
			);
		});

		it('Should be able to undo changes it does', () => {
			// do(_dictionary, platform, _options, volume): void {
			cssConfig.actions['vvd/css/addFontsLinks'].undo(
				{} as Dictionary,
				platformConfig,
				{},
				mockedVolume as any,
			);

			expect(mockedVolume.writeFileSync).toHaveBeenCalledWith(
				'./typography.css',
				fileContents,
			);
		});
	});
});
