import { docFactories } from '../__tests__/doc-factories';
import { setup } from '../__tests__/test-utils';
import { asyncGeneratorMock } from '../__tests__/async-generator';
import { RteBase } from './base';
import {
	type ResolvedUrl,
	type RteInlineImageConfig,
	RteInlineImageFeature,
} from './inline-image';
import { RteToolbarFeature } from './toolbar';

const { doc, paragraph: p, inlineImage: img, text } = docFactories;

const featuresWithConfig = (config?: RteInlineImageConfig) => [
	new RteBase(),
	new RteToolbarFeature(),
	new RteInlineImageFeature(config),
];

describe('RteInlineImageFeature', () => {
	it('should add an inlineImage node to the schema', async () => {
		const rte = await setup(featuresWithConfig(), [
			p(
				img.attrs({
					imageUrl: '/image.jpg',
					alt: 'Image',
					size: '100%',
					naturalWidth: 100,
					naturalHeight: 200,
				})()
			),
		]);
		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph(
				inlineImage[imageUrl="/image.jpg" alt="Image" size="100%" naturalWidth=100 naturalHeight=200]()
			)
			"
		`
		);
	});

	it('should deserialize images from HTML', async () => {
		const rte = await setup(featuresWithConfig());
		rte.setHtml(
			'<p><img src="image.jpg" alt="Image" width="100" height="200" style="max-width: 100%"></p>'
		);

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph(
				inlineImage[imageUrl="image.jpg" alt="Image" size="100%" naturalWidth=100 naturalHeight=200]()
			)
			"
		`
		);

		rte.setHtml('<p><img src="minimal.jpg"></p>');

		expect(rte.docStr()).toMatchInlineSnapshot(
			`
			"
			paragraph(
				inlineImage[imageUrl="minimal.jpg" alt="" size=null naturalWidth=null naturalHeight=null]()
			)
			"
		`
		);
	});

	it('should serialize images to HTML', async () => {
		const rte = await setup(featuresWithConfig(), [
			p(
				img.attrs({
					imageUrl: '/image.jpg',
					alt: 'Image',
					size: '100%',
					naturalWidth: 100,
					naturalHeight: 200,
				})()
			),
		]);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p><img src="/image.jpg" alt="Image" style="max-width: 100%; height: auto;" width="100" height="200"></p>"`
		);

		rte.instance.replaceDocument(
			doc(
				p(
					img.attrs({
						imageUrl: '/minimal.jpg',
						alt: '',
						size: null,
						naturalWidth: null,
						naturalHeight: null,
					})()
				)
			)
		);

		expect(rte.getHtml()).toMatchInlineSnapshot(
			`"<p><img src="/minimal.jpg" alt=""></p>"`
		);
	});

	it('should update natural dimensions on image load which should not be recorded in history', async () => {
		const rte = await setup(featuresWithConfig(), [
			p(
				img.attrs({
					imageUrl: '/image.jpg',
					alt: 'Image',
				})()
			),
		]);

		await rte.typeTextAtCursor('Hello');
		rte.simulateImageLoaded('Image', 100, 200);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			paragraph(
				'Hello|',
				inlineImage[imageUrl="/image.jpg" alt="Image" size=null naturalWidth=100 naturalHeight=200]()
			)
			"
		`);

		await rte.click(rte.toolbarButton('Undo'));

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			paragraph(
				inlineImage[imageUrl="/image.jpg" alt="Image" size=null naturalWidth=100 naturalHeight=200]()
			)
			"
		`);
	});

	it('should do nothing when the image has unmounted at load', async () => {
		const rte = await setup(featuresWithConfig(), [
			p(
				img.attrs({
					imageUrl: '/image.jpg',
					alt: 'Image',
				})()
			),
		]);

		const image = rte.getImage('Image')!;

		rte.selectAll();
		rte.keydown('Backspace');

		expect(() => {
			image.dispatchEvent(new Event('load'));
		}).not.toThrow();
	});

	it('should do nothing when natural dimension are already present and correct on image load', async () => {
		const rte = await setup(featuresWithConfig(), [
			p(
				img.attrs({
					imageUrl: '/image.jpg',
					alt: 'Image',
					naturalWidth: 100,
					naturalHeight: 200,
				})()
			),
		]);

		rte.simulateImageLoaded('Image', 100, 200);

		expect(rte.docStr()).toMatchInlineSnapshot(`
			"
			paragraph(
				inlineImage[imageUrl="/image.jpg" alt="Image" size=null naturalWidth=100 naturalHeight=200]()
			)
			"
		`);
	});

	describe('popover', () => {
		it('should show a popover when node is selected', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
					})()
				),
			]);

			expect(rte.openPopover()).toBe(undefined);

			rte.selectImage('Image');

			expect(rte.openPopover()!.anchorEl).toBe(rte.getImageWrapper());
		});

		it('should show the current size option as active', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
					})()
				),
			]);

			rte.selectImage('Image');

			expect(rte.isActive(rte.button(rte.openPopover()!, 'Small'))).toBe(false);
			expect(rte.isActive(rte.button(rte.openPopover()!, 'Fit'))).toBe(false);
			expect(
				rte.isActive(rte.button(rte.openPopover()!, 'Original size'))
			).toBe(true);

			await rte.click(rte.button(rte.openPopover()!, 'Fit'));

			expect(
				rte.isActive(rte.button(rte.openPopover()!, 'Original size'))
			).toBe(false);
			expect(rte.isActive(rte.button(rte.openPopover()!, 'Fit'))).toBe(true);
		});
	});

	describe('size options', () => {
		it('should set size to null for Original size option', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
						size: '123px',
					})()
				),
			]);

			rte.selectImage('Image');
			await rte.click(rte.button(rte.openPopover()!, 'Original size'));

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					[|inlineImage[imageUrl="/image.jpg" alt="Image" size=null naturalWidth=null naturalHeight=null]()|]
				)
				"
			`);
		});

		it('should set size of 100% for Fit option', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
					})()
				),
			]);

			rte.selectImage('Image');
			await rte.click(rte.button(rte.openPopover()!, 'Fit'));

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					[|inlineImage[imageUrl="/image.jpg" alt="Image" size="100%" naturalWidth=null naturalHeight=null]()|]
				)
				"
			`);
		});

		it('should set size of half of naturalWidth for Small option', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
						naturalWidth: 100,
					})()
				),
			]);

			rte.selectImage('Image');
			await rte.click(rte.button(rte.openPopover()!, 'Small'));

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					[|inlineImage[imageUrl="/image.jpg" alt="Image" size="50px" naturalWidth=100 naturalHeight=null]()|]
				)
				"
			`);
		});

		it('should use a max of 300px for Small option', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
						naturalWidth: 1000,
					})()
				),
			]);

			rte.selectImage('Image');
			await rte.click(rte.button(rte.openPopover()!, 'Small'));

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					[|inlineImage[imageUrl="/image.jpg" alt="Image" size="300px" naturalWidth=1000 naturalHeight=null]()|]
				)
				"
			`);
		});

		it('should do nothing when naturalWidth is unknown for Small option', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
					})()
				),
			]);

			rte.selectImage('Image');
			await rte.click(rte.button(rte.openPopover()!, 'Small'));

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					[|inlineImage[imageUrl="/image.jpg" alt="Image" size=null naturalWidth=null naturalHeight=null]()|]
				)
				"
			`);
		});

		it('should do nothing when a button press is registered without a selected image', async () => {
			const rte = await setup(featuresWithConfig(), [
				p(
					text('Hello'),
					img.attrs({
						imageUrl: '/image.jpg',
						alt: 'Image',
					})()
				),
			]);

			rte.selectImage('Image');
			const button = rte.button(rte.openPopover()!, 'Fit');
			rte.placeCursor('|Hello');
			await rte.click(button);

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					'|Hello',
					inlineImage[imageUrl="/image.jpg" alt="Image" size=null naturalWidth=null naturalHeight=null]()
				)
				"
			`);
		});
	});

	describe('parseUrlFromHtml', () => {
		it('should map img src to imageUrl when parsing html', async () => {
			const rte = await setup(
				featuresWithConfig({
					parseUrlFromHtml: (src: string) => `parsed:${src}`,
				})
			);
			rte.setHtml(
				'<img src="image.jpg" alt="Image" width="100" height="200" style="max-width: 100%">'
			);
			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(
					inlineImage[imageUrl="parsed:image.jpg" alt="Image" size="100%" naturalWidth=100 naturalHeight=200]()
				)
				"
			`);
		});

		it('should drop img when result is null', async () => {
			const rte = await setup(
				featuresWithConfig({
					parseUrlFromHtml: () => null,
				})
			);
			expect(
				rte.htmlParser.parseFragment(
					'<img src="image.jpg" alt="Image" width="100" height="200" style="max-width: 100%">'
				)
			).toEqual([]);
		});
	});

	describe('serializeUrlToHtml', () => {
		it('should map imageUrl to html img src url when serializing html', async () => {
			const rte = await setup(
				featuresWithConfig({
					serializeUrlToHtml: (src: string) => `serialized:${src}`,
				}),
				[
					p(
						img.attrs({
							imageUrl: '/image.jpg',
							alt: 'Image',
						})()
					),
				]
			);
			expect(rte.getHtml()).toMatchInlineSnapshot(
				`"<p><img src="serialized:/image.jpg" alt="Image"></p>"`
			);
		});

		it('should drop image when result is null', async () => {
			const rte = await setup(
				featuresWithConfig({
					serializeUrlToHtml: () => null,
				}),
				[
					p(
						img.attrs({
							imageUrl: '/image.jpg',
							alt: 'Image',
						})()
					),
				]
			);
			expect(rte.getHtml()).toMatchInlineSnapshot(`"<p></p>"`);
		});
	});

	describe('resolveUrl', () => {
		it('should render nothing when resolved to null', async () => {
			const rte = await setup(
				featuresWithConfig({
					resolveUrl: () => null,
				}),
				[
					p(
						img.attrs({
							imageUrl: '/image.jpg',
							alt: 'Image',
						})()
					),
				]
			);

			expect(rte.getImage('Image')).toBe(null);
		});

		it('should render the image with the string as src when resolved to string', async () => {
			const rte = await setup(
				featuresWithConfig({
					resolveUrl: (imageUrl) => `http://host${imageUrl}`,
				}),
				[
					p(
						img.attrs({
							imageUrl: '/image.jpg',
							alt: 'Image',
						})()
					),
				]
			);

			expect(rte.getImage('Image')!.src).toBe('http://host/image.jpg');
		});

		it('should render a placeholder slot when resolved to placeholder', async () => {
			let name;
			const onDestroy = vitest.fn();
			const rte = await setup(
				featuresWithConfig({
					resolveUrl: () => ({
						type: 'placeholder',
						create: (slotName) => {
							name = slotName;
							return onDestroy;
						},
					}),
				}),
				[
					p(
						img.attrs({
							imageUrl: '/image.jpg',
							alt: 'Image',
						})()
					),
				]
			);

			expect(rte.getImageWrapper()!.querySelector('slot')!.name).toBe(name);

			rte.element.remove();

			expect(onDestroy).toHaveBeenCalled();
		});

		it('should allow resolving multiple times when resolving to an async generator', async () => {
			const gen = asyncGeneratorMock<ResolvedUrl, ResolvedUrl>();
			const rte = await setup(
				featuresWithConfig({
					resolveUrl: () => gen.generator,
				}),
				[
					p(
						img.attrs({
							imageUrl: '/image.jpg',
							alt: 'Image',
						})()
					),
				]
			);

			expect(rte.getImage('Image')).toBe(null);

			await gen.yield('http://host/resolved');

			expect(rte.getImage('Image')!.src).toBe('http://host/resolved');

			await gen.return('http://host/changed');

			expect(rte.getImage('Image')!.src).toBe('http://host/changed');
		});
	});
});
