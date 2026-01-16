import { elementUpdated } from '@repo/shared';
import { docFactories } from '../__tests__/doc-factories';
import { setup as standardSetup } from '../__tests__/test-utils';
import { asyncGeneratorMock } from '../__tests__/async-generator';
import { RteConfig } from '../config';
import { RteBase } from './base';
import {
	type ResolvedAtomValue,
	type RteAtomConfig,
	RteAtomFeature,
} from './atom';
import '../../../rich-text-view';

const { paragraph: p, text, atom } = docFactories;

const mention = atom('mention');
const emoji = atom('emoji');

const featuresWithAtoms = (
	...atoms: Array<[string, RteAtomConfig?]>
): ConstructorParameters<typeof RteConfig>[0] => [
	new RteBase(),
	...atoms.map(([name, config]) => new RteAtomFeature(name, config)),
];

const setup = async (...args: Parameters<typeof standardSetup>) => {
	const rte = await standardSetup(...args);

	return {
		...rte,
		firstAtomWrapper: () => rte.view.dom.querySelector('.atom-wrapper')!,
		renderView: async () => {
			const rteView = document.createElement('vwc-rich-text-view');
			rteView.view = rte.config.instantiateView(rte.instance.getDocument());
			rte.element.after(rteView);
			await elementUpdated(rteView);
			return rteView;
		},
	};
};

describe('RteAtomFeature', () => {
	describe('schema', () => {
		it('should add an atom node to the schema with the given name', async () => {
			const rte = await setup(featuresWithAtoms(['mention']), [
				p(mention.attrs({ value: 'username' })()),
			]);

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph(mention[value="username"]())"`
			);
		});

		it('should support multiple atom types in the same config', async () => {
			const rte = await setup(featuresWithAtoms(['mention'], ['emoji']), [
				p(
					mention.attrs({ value: 'user' })(),
					text(' says '),
					emoji.attrs({ value: 'smile' })()
				),
			]);

			expect(rte.docStr()).toMatchInlineSnapshot(`
				"
				paragraph(mention[value="user"](), ' says ', emoji[value="smile"]())
				"
			`);
		});

		it('should throw when adding duplicate atom names', () => {
			expect(
				() =>
					new RteConfig([
						new RteBase(),
						new RteAtomFeature('mention'),
						new RteAtomFeature('mention'),
					])
			).toThrow('Duplicate feature: RteAtomFeature[mention]');
		});
	});

	describe('rendering', () => {
		it('should render the value as text by default', async () => {
			const rte = await setup(featuresWithAtoms(['mention']), [
				p(mention.attrs({ value: 'username' })()),
			]);

			expect(rte.firstAtomWrapper().textContent).toBe('username');
		});

		it('should set part attribute for styling', async () => {
			const rte = await setup(featuresWithAtoms(['mention']), [
				p(mention.attrs({ value: 'username' })()),
			]);

			expect(rte.firstAtomWrapper().getAttribute('part')).toBe('node--mention');
		});

		it('should use resolveValue function when provided', async () => {
			const rte = await setup(
				featuresWithAtoms([
					'mention',
					{ resolveValue: (value) => `@${value}` },
				]),
				[p(mention.attrs({ value: 'username' })())]
			);

			expect(rte.firstAtomWrapper().textContent).toBe('@username');
		});

		it('should render nothing when resolveValue returns null', async () => {
			const rte = await setup(
				featuresWithAtoms(['mention', { resolveValue: () => null }]),
				[p(mention.attrs({ value: 'username' })())]
			);

			expect(rte.firstAtomWrapper().textContent).toBe('');
		});

		it('should support async generator for resolveValue', async () => {
			const gen = asyncGeneratorMock<ResolvedAtomValue, ResolvedAtomValue>();
			const rte = await setup(
				featuresWithAtoms(['mention', { resolveValue: () => gen.generator }]),
				[p(mention.attrs({ value: 'username' })())]
			);

			expect(rte.firstAtomWrapper().textContent).toBe('');

			await gen.yield('Loading...');
			expect(rte.firstAtomWrapper().textContent).toBe('Loading...');

			await gen.return('@username');
			expect(rte.firstAtomWrapper().textContent).toBe('@username');
		});

		it('should render nothing when resolveValue yields null', async () => {
			const gen = asyncGeneratorMock<ResolvedAtomValue, ResolvedAtomValue>();
			const rte = await setup(
				featuresWithAtoms(['mention', { resolveValue: () => gen.generator }]),
				[p(mention.attrs({ value: 'username' })())]
			);

			await gen.yield(null);
			expect(rte.firstAtomWrapper().textContent).toBe('');

			await gen.return('@username');
			expect(rte.firstAtomWrapper().textContent).toBe('@username');
		});
	});

	describe('HTML serialization', () => {
		it('should serialize to span with data attributes', async () => {
			const rte = await setup(featuresWithAtoms(['mention']), [
				p(mention.attrs({ value: 'username' })()),
			]);

			expect(rte.getHtml()).toMatchInlineSnapshot(
				`"<p><span data-atom-type="mention" data-value="username">username</span></p>"`
			);
		});

		it('should serialize to span with part when rendering in view', async () => {
			const rte = await setup(featuresWithAtoms(['mention']), [
				p(mention.attrs({ value: 'username' })()),
			]);
			const rteView = await rte.renderView();

			expect(
				rteView.shadowRoot!.querySelector('.content')!.innerHTML
			).toMatchInlineSnapshot(
				`"<p part="node--paragraph"><span part="node--mention">username</span></p>"`
			);
		});
	});

	describe('HTML parsing', () => {
		it('should parse from span with data attributes', async () => {
			const rte = await setup(featuresWithAtoms(['mention']));
			rte.setHtml(
				'<p><span data-atom-type="mention" data-value="username">@username</span></p>'
			);

			expect(rte.docStr()).toMatchInlineSnapshot(
				`"paragraph(mention[value="username"]())"`
			);
		});
	});
});
