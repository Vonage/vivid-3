import {
	Declaration,
	getVividComponentDeclaration,
} from './customElementDeclarations';
import type * as FileSystem from 'fs';

function makeMember(name: string) {
	return {
		kind: 'field',
		name,
		type: {
			text: 'string',
		},
	};
}
function makeEvent(name: string) {
	return {
		type: {
			text: 'CustomEvent<string>',
		},
		name,
	};
}
function makeAttribute(name: string, fieldName: string) {
	return {
		name,
		type: {
			text: 'string',
		},
		fieldName,
	};
}

const localType = "'rounded' | 'pill'";

function makeManifest() {
	return {
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
						members: [makeMember('accordionMember')],
						events: [makeEvent('accordion-event')],
						attributes: [
							makeAttribute('accordion-attribute', 'accordionAttribute'),
						],
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
						members: [makeMember('parentMember')],
						events: [makeEvent('parent-event')],
						attributes: [makeAttribute('parent-attribute', 'parentAttribute')],
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
						members: [makeMember('mixinMember')],
						events: [makeEvent('mixin-event')],
						attributes: [makeAttribute('mixin-attribute', 'mixinAttribute')],
					},
				],
			},
		],
	};
}

vi.mock('fs', async () => {
	const fs = (await vi.importActual('fs')) as typeof FileSystem;
	return {
		...fs,
		readFileSync: vi.fn((filePath: string, ...rest: any[]) => {
			if (filePath.endsWith('custom-elements.json')) {
				return JSON.stringify(makeManifest());
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
	let declaration: Declaration;

	beforeEach(() => {
		declaration = getVividComponentDeclaration('', 'Accordion');
	});

	describe('component declarations', () => {
		it('should include attributes of the component', () => {
			expect(
				declaration.attributes!.find(
					(a: any) => a.name === 'accordion-attribute'
				)
			).toEqual(makeAttribute('accordion-attribute', 'accordionAttribute'));
		});

		it('should include events of the component', () => {
			expect(
				declaration.events!.find((e: any) => e.name === 'accordion-event')
			).toEqual(makeEvent('accordion-event'));
		});

		it('should include local type definitions of the component', () => {
			expect(declaration._localTypeDefs!['AccordionShape']).toEqual(localType);
		});
	});

	describe('parent declarations', () => {
		it('should include attributes inherited from a superclass', () => {
			expect(
				declaration.attributes!.find((a: any) => a.name === 'parent-attribute')
			).toEqual(makeAttribute('parent-attribute', 'parentAttribute'));
		});

		it('should include events inherited from a superclass', () => {
			expect(
				declaration.events!.find((e: any) => e.name === 'parent-event')
			).toEqual(makeEvent('parent-event'));
		});

		it('should include local type definitions inherited from a superclass', () => {
			expect(declaration._localTypeDefs!['ParentShape']).toEqual(localType);
		});
	});

	describe('mixin declarations', () => {
		it('should include attributes inherited from a mixin', () => {
			expect(
				declaration.attributes!.find((a: any) => a.name === 'mixin-attribute')
			).toEqual(makeAttribute('mixin-attribute', 'mixinAttribute'));
		});

		it('should include events inherited from a mixin', () => {
			expect(
				declaration.events!.find((e: any) => e.name === 'mixin-event')
			).toEqual(makeEvent('mixin-event'));
		});

		it('should include local type definitions inherited from a mixin', () => {
			expect(declaration._localTypeDefs!['MixinShape']).toEqual(localType);
		});
	});
});
