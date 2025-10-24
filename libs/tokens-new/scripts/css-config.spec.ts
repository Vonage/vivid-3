import type { TransformedToken } from 'style-dictionary/types';
import { cssConfig } from './css.config';

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
					fontFamily: 'Spezia',
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
				'500 0.42857142857142855rem/0.5714285714285714rem "Spezia"',
			);
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
				'0px 1px 4 0 #c7c6c66b, 0px 1px 2 0 #c7c6c62b, 0px 2px 1 0 #c7c6c62b',
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
});
