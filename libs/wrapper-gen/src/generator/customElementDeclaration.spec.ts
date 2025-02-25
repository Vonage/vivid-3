import { getVividComponentDeclaration } from './customElementDeclarations';
import { CustomElement } from 'custom-elements-manifest';
import type * as FileSystem from 'fs';

vi.mock('fs', async () => {
	const fs = (await vi.importActual('fs')) as typeof FileSystem;
	return {
		...fs,
		readFileSync: vi.fn((filePath: string, ...rest: any[]) =>
			fs.readFileSync(
				filePath.replace(
					'../../dist/libs/components/',
					__dirname + '/__fixtures__/accordion/'
				),
				...rest
			)
		),
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
				declaration.attributes.some(
					(a: any) => a.name === 'accordion-attribute'
				)
			).toBe(true);
		});

		it('should include events of the component', () => {
			expect(
				declaration.events.some((e: any) => e.name === 'accordion-event')
			).toBe(true);
		});

		it('should include local type definitions of the component', () => {
			expect(declaration._localTypeDefs['AccordionShape']).toBeInstanceOf(
				Array
			);
		});
	});

	describe('parent declarations', () => {
		it('should include attributes inherited from a superclass', () => {
			expect(
				declaration.attributes.some((a: any) => a.name === 'parent-attribute')
			).toBe(true);
		});

		it('should include events inherited from a superclass', () => {
			expect(
				declaration.events.some((e: any) => e.name === 'accordion-event')
			).toBe(true);
		});

		it('should include local type definitions inherited from a superclass', () => {
			expect(declaration._localTypeDefs['ParentShape']).toBeInstanceOf(Array);
		});
	});

	describe('mixin declarations', () => {
		it('should include attributes inherited from a mixin', () => {
			expect(
				declaration.attributes.some((a: any) => a.name === 'mixin-attribute')
			).toBe(true);
		});

		it('should include events inherited from a mixin', () => {
			expect(
				declaration.events.some((e: any) => e.name === 'mixin-event')
			).toBe(true);
		});

		it('should include local type definitions inherited from a mixin', () => {
			expect(declaration._localTypeDefs['MixinShape']).toBeInstanceOf(Array);
		});
	});
});
