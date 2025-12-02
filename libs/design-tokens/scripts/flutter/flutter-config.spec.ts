import type { Dictionary } from 'style-dictionary/types';
import { flutterConfig, flutterPlatform } from './flutter.config';
import { buildToken } from '../utils/build-token';

describe('Flutter Features', () => {
	describe('Transforms', () => {
		describe('vvd/value/flutter/borderRadius', () => {
			it('Should be applied only to the radius tokens', () => {
				const rightToken = buildToken('vvd/radius/rectangle/700', {
					$type: 'dimension',
				});
				const wrongToken = buildToken('vvd/size/regular/700', {
					$type: 'dimension',
				});

				const rightOut = flutterConfig.transforms[
					'vvd/value/flutter/borderRadius'
				].filter(rightToken, {});
				const wrongOut = flutterConfig.transforms[
					'vvd/value/flutter/borderRadius'
				].filter(wrongToken, {});

				expect(rightOut).toEqual(true);
				expect(wrongOut).toEqual(false);
			});

			it('Should build Radius.circular from dimension', () => {
				const token = buildToken('vvd/radius/rectangle/700', {
					$type: 'dimension',
					$value: 4,
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/borderRadius'
				].transform(token, {}, {});

				expect(out).toEqual('Radius.circular(4.00)');
			});
		});

		describe('vvd/value/flutter/color', () => {
			it('Should build Flutter Color from components', () => {
				const token = buildToken('vvd/color/neutral/700', {
					$type: 'color',
					$value: {
						colorSpace: 'srgb',
						components: [
							0.9019607901573181, 0.9019607901573181, 0.9019607901573181,
						],
						alpha: 1,
						hex: '#e6e6e6',
					},
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/color'
				].transform(token, {}, {});

				expect(out).toEqual('Color(0x6FFE6E6E)');
			});

			it('Should apply alpha on the color', () => {
				const token = buildToken('vvd/color/neutral/700', {
					$type: 'color',
					$value: {
						colorSpace: 'srgb',
						components: [
							0.9019607901573181, 0.9019607901573181, 0.9019607901573181,
						],
						alpha: 0.5,
						hex: '#e6e6e6',
					},
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/color'
				].transform(token, {}, {});

				expect(out).toEqual('Color(0x680E6E6E)');
			});
		});

		describe('vvd/value/flutter/dimension', () => {
			it('Should return double value for dimension', () => {
				const token = buildToken('vvd/size/medium/500', {
					$type: 'dimension',
					$value: {
						value: 4,
						unit: 'px',
					},
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/dimension'
				].transform(token, {}, {});

				expect(out).toEqual('4.00');
			});
		});

		describe('vvd/value/flutter/typography', () => {
			it('Should build TextStyle for typography', () => {
				const token = buildToken('vvd/typography/heading/200', {
					$type: 'typography',
					$value: {
						fontFamily: 'Spezia - Regular',
						fontSize: {
							value: 16,
							unit: 'px',
						},
						lineHeight: 24,
						letterSpacing: {
							value: 0,
							unit: 'px',
						},
						fontWeight: 500,
					},
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/typography'
				].transform(token, {}, {});

				expect(out).toEqual(
					`TextStyle(
			fontFamily: Spezia,
			fontSize: 16.00,
    	height: 1.50,
    	letterSpacing: 0.0,
			fontVariations: [
				FontVariation('wght', 500.0),
				FontVariation('wdth', 50.0),
			],
		)`
				);
			});

			it('Should set up SpeziaMono font family for mono typography', () => {
				const token = buildToken('vvd/typography/heading/200', {
					$type: 'typography',
					$value: {
						fontFamily: 'Spezia - SemiMono Regular',
						fontSize: {
							value: 16,
							unit: 'px',
						},
						lineHeight: 24,
						letterSpacing: {
							value: 0,
							unit: 'px',
						},
						fontWeight: 500,
					},
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/typography'
				].transform(token, {}, {});

				expect(out).include('fontFamily: SpeziaMono');
			});

			it('Should set up font width for wide typography', () => {
				const token = buildToken('vvd/typography/heading/200', {
					$type: 'typography',
					$value: {
						fontFamily: 'Spezia - Wide Regular',
						fontSize: {
							value: 16,
							unit: 'px',
						},
						lineHeight: 24,
						letterSpacing: {
							value: 0,
							unit: 'px',
						},
						fontWeight: 500,
					},
				});

				const out = flutterConfig.transforms[
					'vvd/value/flutter/typography'
				].transform(token, {}, {});

				expect(out).include(`FontVariation('wdth', 75.0)`);
			});
		});

		describe('vvd/value/flutter/shadow', () => {
			it('Should build BoxShadow list', () => {
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
					],
				});
				const out = flutterConfig.transforms[
					'vvd/value/flutter/shadow'
				].transform(token, {}, {});

				expect(out).toEqual(
					`<BoxShadow>[
			BoxShadow(
					color: Color(0x66BC7C6C),
					offset: Offset(0.00, 1.00),
					blurRadius: 4.00,
					spreadRadius: 0.00,
			),
			BoxShadow(
					color: Color(0x62BC7C6C),
					offset: Offset(0.00, 1.00),
					blurRadius: 2.00,
					spreadRadius: 0.00,
			)
    ]`
				);
			});
		});

		describe('vvd/name/flutter', () => {
			it('Should replace slashes and dashes with underscores in tokens name', () => {
				const token = buildToken('vvd/color-critical/500', {});

				const out = flutterConfig.transforms['vvd/name/flutter'].transform(
					token,
					{},
					{}
				);
				expect(out).toEqual('vvdColorCritical500');
			});
		});
	});

	describe('Actions', () => {
		let mockedVolume: Record<string, any>;

		beforeEach(() => {
			mockedVolume = {
				cpSync: vi.fn(),
				unlinkSync: vi.fn(),
			};
		});

		describe('vvd/flutter/createPackage', () => {
			it('Should create a package', async () => {
				await flutterConfig.actions['vvd/flutter/createPackage'].do(
					{} as Dictionary,
					flutterPlatform,
					{},
					mockedVolume as any
				);

				expect(mockedVolume.cpSync).toHaveBeenCalledWith(
					'./files/',
					'./flutter-dist',
					{ recursive: true }
				);
			});

			it('Should be able to undo creating the package', () => {
				flutterConfig.actions['vvd/flutter/createPackage'].undo(
					{} as Dictionary,
					flutterPlatform,
					{},
					mockedVolume as any
				);

				expect(mockedVolume.unlinkSync).toHaveBeenCalledWith('./flutter-dist');
			});
		});
	});

	describe('Formats', () => {
		describe(`vvd/flutter/variables`, () => {
			it('should create a flutter file with variables', async () => {
				const dictionary = {
					tokenMap: new Map([
						[
							'vvd-color-canvas',
							buildToken('vvd/color/canvas', {
								name: 'vvdColorCanvas',
								$value: 'Color(0xFFFFFFFF)',
							}),
						],
					]),
				} as unknown as Dictionary;

				const output = await flutterConfig.formats['vvd/flutter/variables']({
					dictionary,
					file: {
						destination: 'vivid-design-tokens.dart',
					},
					options: {},
				} as any);

				expect(output).toEqual(
					`/**
 * Do not edit directly, this file was auto-generated.
 */

import 'package:flutter/painting.dart';

const vvd/color/canvas = Color(0xFFFFFFFF);`
				);
			});
		});
	});
});
