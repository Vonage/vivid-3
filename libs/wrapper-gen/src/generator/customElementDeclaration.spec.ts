import { getVividComponentDeclaration } from './customElementDeclarations';
import { CustomElement } from 'custom-elements-manifest';
import type * as FileSystem from 'fs';

const makeMember = (name: string) => ({
	kind: 'field',
	name,
	type: {
		text: 'string',
	},
});
const makeEvent = (name: string) => ({
	type: {
		text: 'CustomEvent<string>',
	},
	name,
});
const makeAttribute = (name: string, fieldName: string) => ({
	name,
	type: {
		text: 'string',
	},
	fieldName,
});

const accordionMember = makeMember('accordionMember');
const accordionEvent = makeEvent('accordion-event');
const accordionAttribute = makeAttribute(
	'accordion-attribute',
	'accordionAttribute'
);
const parentMember = makeMember('parentMember');
const parentEvent = makeEvent('parent-event');
const parentAttribute = makeAttribute('parent-attribute', 'parentAttribute');
const mixinMember = makeMember('mixinMember');
const mixinEvent = makeEvent('mixin-event');
const mixinAttribute = makeAttribute('mixin-attribute', 'mixinAttribute');
const localType = [
	{
		text: "'rounded'",
		vuePropType: 'String',
	},
	{
		text: "'pill'",
		vuePropType: 'String',
	},
];

const accordionManifest = {
	schemaVersion: '1.0.0',
	readme: '',
	modules: [
		{
			kind: 'javascript-module',
			path: 'libs/components/src/lib/accordion.ts',
			declarations: [
				{
					kind: 'class',
					description: '',
					name: 'Accordion',
					slots: [],
					members: [accordionMember],
					events: [accordionEvent],
					attributes: [accordionAttribute],
					mixins: [
						{
							name: 'Mixin',
							module: '/libs/components/src/lib/accordion/mixin.ts',
						},
					],
					superclass: {
						name: 'Parent',
						module: '/libs/components/src/lib/accordion/parent.ts',
					},
					vividComponent: {
						public: true,
						name: 'accordion',
					},
				},
			],
		},
		{
			kind: 'javascript-module',
			path: 'libs/components/src/lib/parent.ts',
			declarations: [
				{
					kind: 'class',
					description: '',
					name: 'Parent',
					slots: [],
					members: [parentMember],
					events: [parentEvent],
					attributes: [parentAttribute],
					superclass: {
						name: 'VividElement',
						module:
							'/libs/components/src/shared/foundation/vivid-element/vivid-element',
					},
				},
			],
		},
		{
			kind: 'javascript-module',
			path: 'libs/components/src/lib/mixin.ts',
			declarations: [
				{
					kind: 'mixin',
					name: 'Mixin',
					members: [mixinMember],
					events: [mixinEvent],
					attributes: [mixinAttribute],
				},
			],
		},
	],
};

vi.mock('fs', async () => {
	const fs = (await vi.importActual('fs')) as typeof FileSystem;
	return {
		...fs,
		readFileSync: vi.fn((filePath: string, ...rest: any[]) => {
			if (filePath.endsWith('custom-element.json')) {
				return JSON.stringify(accordionManifest);
			}
			return fs.readFileSync(
				filePath.replace(
					'../../dist/libs/components/',
					__dirname + '/__fixtures__/accordion/'
				),
				...rest
			);
		}),
	};
});

describe('getVividComponentDeclaration', () => {
	let declaration: CustomElement;

	beforeEach(() => {
		declaration = getVividComponentDeclaration('', 'Accordion');
	});

	describe('component declarations', () => {
		it('should include attributes of the component', () => {
			expect(
				declaration.attributes.find(
					(a: any) => a.name === 'accordion-attribute'
				)
			).toEqual(accordionAttribute);
		});

		it('should include events of the component', () => {
			expect(
				declaration.events.find((e: any) => e.name === 'accordion-event')
			).toEqual(accordionEvent);
		});

		it('should include local type definitions of the component', () => {
			expect(declaration._localTypeDefs['AccordionShape']).toEqual(localType);
		});
	});

	describe('parent declarations', () => {
		it('should include attributes inherited from a superclass', () => {
			expect(
				declaration.attributes.find((a: any) => a.name === 'parent-attribute')
			).toEqual(parentAttribute);
		});

		it('should include events inherited from a superclass', () => {
			expect(
				declaration.events.find((e: any) => e.name === 'parent-event')
			).toEqual(parentEvent);
		});

		it('should include local type definitions inherited from a superclass', () => {
			expect(declaration._localTypeDefs['ParentShape']).toEqual(localType);
		});
	});

	describe('mixin declarations', () => {
		it('should include attributes inherited from a mixin', () => {
			expect(
				declaration.attributes.find((a: any) => a.name === 'mixin-attribute')
			).toEqual(mixinAttribute);
		});

		it('should include events inherited from a mixin', () => {
			expect(
				declaration.events.find((e: any) => e.name === 'mixin-event')
			).toEqual(mixinEvent);
		});

		it('should include local type definitions inherited from a mixin', () => {
			expect(declaration._localTypeDefs['MixinShape']).toEqual(localType);
		});
	});
});
