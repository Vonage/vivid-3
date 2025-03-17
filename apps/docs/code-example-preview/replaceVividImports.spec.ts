import { replaceVividImports } from './replaceVividImports';

describe('replaceVividImports', () => {
	it('should replace imports of @vonage/vivid with the bundled version', () => {
		const code = `
			import x from "@vonage/vivid";
			import x from '@vonage/vivid';
			import x from
				'@vonage/vivid';
		`;
		expect(replaceVividImports(code)).toMatchInlineSnapshot(`
			"
						import x from 'vivid-bundle';
						import x from 'vivid-bundle';
						import x from
							'vivid-bundle';
					"
		`);
	});
});
