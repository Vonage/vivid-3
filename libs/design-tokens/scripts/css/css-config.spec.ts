import type { Dictionary, TransformedToken } from 'style-dictionary/types';
import { cssConfig, fontFaceDeclaration } from './css.config';
import { buildToken } from '../utils/build-token';

const stripHeader = (output: string) =>
	output.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');

function makeToken(
	overrides: { name: string } & Partial<TransformedToken>
): TransformedToken {
	return {
		filePath: 'virtual-file',
		isSource: true,
		path: [overrides.name],
		original: {},
		$value: '',
		value: '',
		...overrides,
	} as TransformedToken;
}

function makeDictionary(tokens: TransformedToken[]): Dictionary {
	return { allTokens: tokens } as unknown as Dictionary;
}

describe('CSS Features', () => {
	describe('Transforms', () => {
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
					{}
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
					{}
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
					{}
				);

				expect(out).toEqual('4px');
			});
		});

		describe('vvd/value/css/fontFamily', () => {
			it('Should pass through the font family value unchanged', () => {
				const token = buildToken('vvd/text/font-family/sans-serif', {
					$type: 'fontFamily',
					$value: 'SpeziaCompleteVariableUpright, Arial, sans-serif',
				});

				const out = cssConfig.transforms['vvd/value/css/fontFamily'].transform(
					token,
					{},
					{}
				);

				expect(out).toEqual('SpeziaCompleteVariableUpright, Arial, sans-serif');
			});
		});

		describe('vvd/value/css/typography', () => {
			it('Should build font shorthand from string values', () => {
				const token = buildToken('vvd/typography/heading/xl', {
					$type: 'typography',
					$value: {
						fontFamily: 'SpeziaCompleteVariableUpright',
						fontSize: '2.5rem',
						lineHeight: '3rem',
						fontWeight: 500,
					},
				});

				const out = cssConfig.transforms['vvd/value/css/typography'].transform(
					token,
					{},
					{}
				);

				expect(out).toEqual('500 2.5rem/3rem SpeziaCompleteVariableUpright');
			});

			it('Should resolve fontSize from an object with value property', () => {
				const token = buildToken('vvd/typography/heading/md', {
					$type: 'typography',
					$value: {
						fontFamily: 'SpeziaCompleteVariableUpright',
						fontSize: { value: 24 },
						lineHeight: { value: 32 },
						fontWeight: 500,
					},
				});

				const out = cssConfig.transforms['vvd/value/css/typography'].transform(
					token,
					{},
					{}
				);

				expect(out).toEqual('500 24/32 SpeziaCompleteVariableUpright');
			});

			it('Should resolve fontSize from an object with $value property', () => {
				const token = buildToken('vvd/typography/heading/sm', {
					$type: 'typography',
					$value: {
						fontFamily: 'SpeziaCompleteVariableUpright',
						fontSize: { $value: '1.5rem' },
						lineHeight: '2rem',
						fontWeight: 400,
					},
				});

				const out = cssConfig.transforms['vvd/value/css/typography'].transform(
					token,
					{},
					{}
				);

				expect(out).toEqual('400 1.5rem/2rem SpeziaCompleteVariableUpright');
			});

			it('Should handle null values as empty string', () => {
				const token = buildToken('vvd/typography/body/sm', {
					$type: 'typography',
					$value: {
						fontFamily: 'Spezia',
						fontSize: null,
						lineHeight: '1.5rem',
						fontWeight: 400,
					},
				});

				const out = cssConfig.transforms['vvd/value/css/typography'].transform(
					token,
					{},
					{}
				);

				expect(out).toEqual('400 /1.5rem Spezia');
			});

			it('Should fall back to token.value when $value is absent', () => {
				const token = {
					...buildToken('vvd/typography/body/md', {
						$type: 'typography',
						$value: undefined,
					}),
					value: {
						fontFamily: 'Spezia',
						fontSize: '1rem',
						lineHeight: '1.5rem',
						fontWeight: 400,
					},
				};

				const out = cssConfig.transforms['vvd/value/css/typography'].transform(
					token,
					{},
					{}
				);

				expect(out).toEqual('400 1rem/1.5rem Spezia');
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
					{}
				);

				expect(out).toEqual(
					'0px 1px 4px 0px #c7c6c66b, 0px 1px 2px 0px #c7c6c62b, 0px 2px 1px 0px #c7c6c62b'
				);
			});
		});

		describe('vvd/value/css/roundRems', () => {
			it('should work only for values that are strings', () => {
				const token = buildToken('vvd/size/medium/800', {
					$type: 'dimension',
					$value: 42,
				});

				const out = cssConfig.transforms['vvd/value/css/roundRems'].transform(
					token,
					{},
					{}
				);

				expect(out).toBeUndefined();
			});

			it('Should round rems value', () => {
				const token = buildToken('vvd/size/medium/800', {
					$type: 'dimension',
					$value: '1.1234567890rem',
				});

				const out = cssConfig.transforms['vvd/value/css/roundRems'].transform(
					token,
					{},
					{}
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
					{}
				);
				expect(out).toEqual('12px');
			});
		});

		describe('vvd/name/css', () => {
			it('Should prefix with viv- and join path segments with dashes', () => {
				const token = {
					...buildToken('', {}),
					path: ['color', 'neutral', '700'],
				};
				const out = cssConfig.transforms['vvd/name/css'].transform(
					token,
					{},
					{}
				);
				expect(out).toEqual('viv-color-neutral-700');
			});

			it('Should filter DEFAULT segments from the path', () => {
				const token = {
					...buildToken('', {}),
					path: ['color', 'bg', 'DEFAULT'],
				};
				const out = cssConfig.transforms['vvd/name/css'].transform(
					token,
					{},
					{}
				);
				expect(out).toEqual('viv-color-bg');
			});
		});
	});

	describe('Formats', () => {
		describe('vvd/css/semantic-shadow', () => {
			const format = cssConfig.formats['vvd/css/semantic-shadow'] as (
				args: any
			) => Promise<string>;

			const makeShadowToken = (name: string, stops: any[]) => ({
				...makeToken({ name, $type: 'shadow', $value: 'box-shadow-ignored' }),
				original: { $value: stops },
			});

			it('outputs size vars and composite drop-shadow for each stop', async () => {
				const token = makeShadowToken('viv-shadow-raise', [
					{ offsetX: 0, offsetY: 1, blur: 4, spread: 0, color: '{shadow.raise.1.color}' },
					{ offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: '{shadow.raise.2.color}' },
					{ offsetX: 0, offsetY: 2, blur: 1, spread: 0, color: '{shadow.raise.3.color}' },
				]);
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: { selector: '.vvd-root' },
						file: {},
					})
				);

				expect(result).toContain('--viv-shadow-raise-1-size: 0px 1px 4px;');
				expect(result).toContain('--viv-shadow-raise-2-size: 0px 1px 2px;');
				expect(result).toContain('--viv-shadow-raise-3-size: 0px 2px 1px;');
				expect(result).toContain(
					'--viv-shadow-raise: drop-shadow(var(--viv-shadow-raise-1-size) var(--viv-shadow-raise-1-color)) drop-shadow(var(--viv-shadow-raise-2-size) var(--viv-shadow-raise-2-color)) drop-shadow(var(--viv-shadow-raise-3-size) var(--viv-shadow-raise-3-color));'
				);
			});

			it('converts DTCG color references to CSS var() in the composite', async () => {
				const token = makeShadowToken('viv-shadow-flat', [
					{ offsetX: 1, offsetY: 0, blur: 0, spread: 0, color: '{shadow.flat.color}' },
					{ offsetX: 0, offsetY: 1, blur: 0, spread: 0, color: '{shadow.flat.color}' },
				]);
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: { selector: '.vvd-root' },
						file: {},
					})
				);

				expect(result).toContain(
					'--viv-shadow-flat: drop-shadow(var(--viv-shadow-flat-1-size) var(--viv-shadow-flat-color)) drop-shadow(var(--viv-shadow-flat-2-size) var(--viv-shadow-flat-color));'
				);
			});

			it('wraps output in the provided selector', async () => {
				const token = makeShadowToken('viv-shadow-raise', [
					{ offsetX: 0, offsetY: 1, blur: 4, spread: 0, color: '{shadow.raise.1.color}' },
				]);
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: { selector: '.vvd-root, ::part(vvd-root)' },
						file: {},
					})
				);

				expect(result).toContain('.vvd-root, ::part(vvd-root) {');
			});

			it('appends $description as a comment on the composite line', async () => {
				const token = {
					...makeShadowToken('viv-shadow-raise', [
						{ offsetX: 0, offsetY: 1, blur: 4, spread: 0, color: '{shadow.raise.1.color}' },
					]),
					$description: 'Minimal elevation',
				};
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: {},
						file: {},
					})
				);

				expect(result).toContain('/** Minimal elevation */');
			});
		});

		describe('vvd/css/variables-with-typography', () => {
			const format = cssConfig.formats['vvd/css/variables-with-typography'] as (
				args: any
			) => Promise<string>;

			it('wraps content in :root selector by default', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#fff',
					value: '#fff',
				});
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: {},
						file: {},
					})
				);
				expect(result).toContain(':root {');
			});

			it('wraps content in a custom string selector', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#fff',
					value: '#fff',
				});
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: { selector: '.vvd-root' },
						file: {},
					})
				);
				expect(result).toContain('.vvd-root {');
				expect(result).not.toContain(':root {');
			});

			it('nests multiple selectors when selector is an array', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#fff',
					value: '#fff',
				});
				const result = stripHeader(
					await format({
						dictionary: makeDictionary([token]),
						options: { selector: [':root', '.theme-dark'] },
						file: {},
					})
				);
				expect(result).toContain(':root {');
				expect(result).toContain('.theme-dark {');
			});

			it('outputs plain string values', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#ff0000',
					value: '#ff0000',
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain('--viv-color-bg: #ff0000;');
			});

			it('converts {reference} placeholders to var() in values', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '{color.neutral.500}',
					value: '',
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain(
					'--viv-color-bg: var(--viv-color-neutral-500);'
				);
			});

			it('outputs number values as strings', async () => {
				const token = makeToken({
					name: 'viv-text-font-weight-400',
					$value: 400,
					value: 400,
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain('--viv-text-font-weight-400: 400;');
			});

			it('filters out tokens with null values', async () => {
				const token = makeToken({
					name: 'viv-empty',
					$value: null,
					value: null,
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).not.toContain('--viv-empty');
			});

			it('resolves object values with $value property', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: { $value: '#abc' },
					value: null,
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain('--viv-color-bg: #abc;');
			});

			it('resolves object values with value property', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: { value: '#abc' },
					value: null,
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain('--viv-color-bg: #abc;');
			});

			it('appends $description as a comment', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#fff',
					value: '#fff',
					$description: 'Background color',
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain(
					'--viv-color-bg: #fff; /** Background color */'
				);
			});

			it('uses $value when usesDtcg is true', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#dtcg',
					value: '#legacy',
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: true },
					file: {},
				});
				expect(result).toContain('--viv-color-bg: #dtcg;');
			});

			it('uses token.value when usesDtcg is false', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#dtcg',
					value: '#legacy',
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { usesDtcg: false },
					file: {},
				});
				expect(result).toContain('--viv-color-bg: #legacy;');
			});

			it('uses custom indentation', async () => {
				const token = makeToken({
					name: 'viv-color-bg',
					$value: '#fff',
					value: '#fff',
				});
				const result = await format({
					dictionary: makeDictionary([token]),
					options: { formatting: { indentation: '\t' } },
					file: {},
				});
				expect(result).toContain('\t--viv-color-bg: #fff;');
			});

			describe('typography composite tokens', () => {
				it('uses per-scale font-weight var when per-scale sub-token exists in dictionary', async () => {
					const composite = makeToken({
						name: 'viv-text-heading-xl',
						path: ['text', 'heading', 'xl', 'DEFAULT'],
						original: {
							$value: {
								fontFamily: '{text.heading.font-family}',
								fontStretch: '{text.heading.font-stretch}',
								fontWeight: '{text.heading.font-weight.normal}',
							},
						},
						$value: {
							fontFamily: 'Spezia',
							fontStretch: 'condensed',
							fontWeight: 500,
							fontSize: { value: 40 },
							lineHeight: '3rem',
						},
						value: {
							fontFamily: 'Spezia',
							fontStretch: 'condensed',
							fontWeight: 500,
							fontSize: { value: 40 },
							lineHeight: '3rem',
						},
					});
					const perScaleWeight = makeToken({
						name: 'viv-text-heading-xl-font-weight',
						$value: 500,
						value: 500,
					});

					const result = await format({
						dictionary: makeDictionary([composite, perScaleWeight]),
						options: { usesDtcg: true },
						file: {},
					});

					expect(result).toContain(
						'--viv-text-heading-xl: var(--viv-text-heading-xl-font-weight)'
					);
				});

				it('uses shared font-weight var via reference when no per-scale sub-token exists', async () => {
					const composite = makeToken({
						name: 'viv-text-code-inline',
						path: ['text', 'code', 'inline', 'DEFAULT'],
						original: {
							$value: {
								fontFamily: '{text.code.font-family}',
								fontStretch: '{text.code.font-stretch}',
								fontWeight: '{text.code.font-weight}',
							},
						},
						$value: {
							fontFamily: 'SpeziaMonoCompleteVariable',
							fontStretch: 'ultra-condensed',
							fontWeight: 400,
							fontSize: { value: 14 },
							lineHeight: '1.25rem',
						},
						value: {
							fontFamily: 'SpeziaMonoCompleteVariable',
							fontStretch: 'ultra-condensed',
							fontWeight: 400,
							fontSize: { value: 14 },
							lineHeight: '1.25rem',
						},
					});

					const result = await format({
						dictionary: makeDictionary([composite]),
						options: { usesDtcg: true },
						file: {},
					});

					expect(result).toContain(
						'--viv-text-code-inline: var(--viv-text-code-font-weight)'
					);
				});

				it('composes full typography shorthand with var() references', async () => {
					const composite = makeToken({
						name: 'viv-text-heading-xl',
						path: ['text', 'heading', 'xl', 'DEFAULT'],
						original: {
							$value: {
								fontFamily: '{text.heading.font-family}',
								fontStretch: '{text.heading.font-stretch}',
								fontWeight: '{text.heading.font-weight.normal}',
							},
						},
						$value: {
							fontFamily: 'Spezia',
							fontStretch: 'condensed',
							fontWeight: 500,
							fontSize: { value: 40 },
							lineHeight: '3rem',
						},
						value: {
							fontFamily: 'Spezia',
							fontStretch: 'condensed',
							fontWeight: 500,
							fontSize: { value: 40 },
							lineHeight: '3rem',
						},
					});
					const perScaleWeight = makeToken({
						name: 'viv-text-heading-xl-font-weight',
						$value: 500,
						value: 500,
					});

					const result = await format({
						dictionary: makeDictionary([composite, perScaleWeight]),
						options: { usesDtcg: true },
						file: {},
					});

					expect(result).toContain(
						'--viv-text-heading-xl: var(--viv-text-heading-xl-font-weight) var(--viv-text-heading-font-stretch) var(--viv-text-heading-xl-font-size)/var(--viv-text-heading-xl-line-height) var(--viv-text-heading-font-family);'
					);
				});
			});
		});
	});

	describe('Actions', () => {
		const fileContents = `:root {\n\t--vvd-color-canvas: #ffffff;\n}\n`;
		let mockedVolume;

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

		beforeEach(() => {
			mockedVolume = {
				writeFileSync: vi.fn(),
				readFileSync: vi.fn().mockReturnValue(fileContents),
				unlinkSync: vi.fn(),
				existsSync: vi.fn().mockReturnValue(true),
			};
		});

		describe('vvd/css/addFontsLinks', () => {
			it('Should affect only typography styles', () => {
				cssConfig.actions['vvd/css/addFontsLinks'].do(
					{} as Dictionary,
					platformConfig,
					{},
					mockedVolume as any
				);

				expect(mockedVolume.writeFileSync).toHaveBeenCalledOnce();
			});

			it('Should affect only typography styles', () => {
				cssConfig.actions['vvd/css/addFontsLinks'].do(
					{} as Dictionary,
					platformConfig,
					{},
					mockedVolume as any
				);

				expect(mockedVolume.writeFileSync).toHaveBeenCalledWith(
					'./typography.css',
					`${fontFaceDeclaration}\n\n${fileContents}`
				);
			});

			it('Should be able to undo changes it does', () => {
				cssConfig.actions['vvd/css/addFontsLinks'].undo(
					{} as Dictionary,
					platformConfig,
					{},
					mockedVolume as any
				);

				expect(mockedVolume.writeFileSync).toHaveBeenCalledWith(
					'./typography.css',
					fileContents
				);
			});
		});

		describe('vvd/css/createIndex', () => {
			it('Should create an index file', async () => {
				await cssConfig.actions['vvd/css/createIndex'].do(
					{} as Dictionary,
					platformConfig,
					{},
					mockedVolume as any
				);

				const output = `/**
 * Do not edit directly, this file was auto-generated.
 */

@import 'typography.css';
@import 'colors.css';`;

				expect(mockedVolume.writeFileSync).toHaveBeenCalledWith(
					'./index.css',
					output
				);
			});

			it('Should be able to undo creating index file', () => {
				cssConfig.actions['vvd/css/createIndex'].undo(
					{} as Dictionary,
					platformConfig,
					{},
					mockedVolume as any
				);

				expect(mockedVolume.unlinkSync).toHaveBeenCalledWith('./index.css');
			});
		});
	});
});
