import { getAttributes } from './attributes';

const attribute = {
	type: 'VAttribute',
	directive: false,
	key: {
		type: 'VIdentifier',
		name: 'prop-name',
		rawName: 'prop-name',
	},
};

const camelCaseAttribute = {
	type: 'VAttribute',
	directive: false,
	key: {
		type: 'VIdentifier',
		name: 'propname',
		rawName: 'propName',
	},
};

const directiveAttribute = {
	type: 'VAttribute',
	directive: true,
	key: {
		type: 'VDirectiveKey',
		name: {
			name: 'bind',
		},
		argument: {
			type: 'VIdentifier',
			name: 'prop-name',
			rawName: 'prop-name',
		},
	},
};

describe('getAttributes', () => {
	it('should return list of attributes', () => {
		expect(
			getAttributes({
				attributes: [attribute, camelCaseAttribute, directiveAttribute],
			})
		).toEqual([
			{ name: 'propName', node: attribute.key },
			{ name: 'propName', node: camelCaseAttribute.key },
			{ name: 'propName', node: directiveAttribute.key.argument },
		]);
	});
});
