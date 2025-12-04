import { setup } from '../__tests__/test-utils';
import { RteBase } from './base';

describe('RteBase', () => {
	it('should add only paragraph node by default', async () => {
		const { view } = await setup([new RteBase()]);

		expect(view.state.schema.nodes.paragraph).toBeDefined();
		expect(view.state.schema.nodes.heading1).not.toBeDefined();
		expect(view.state.schema.nodes.heading2).not.toBeDefined();
		expect(view.state.schema.nodes.heading3).not.toBeDefined();
	});

	it('should not add paragraph node when disabled', async () => {
		const { view } = await setup([
			new RteBase({ paragraph: false, heading1: true }),
		]);

		expect(view.state.schema.nodes.paragraph).toBeUndefined();
	});

	it('should add heading1 node when enabled', async () => {
		const { view } = await setup([new RteBase({ heading1: true })]);

		expect(view.state.schema.nodes.heading1).toBeDefined();
	});

	it('should add heading2 node when enabled', async () => {
		const { view } = await setup([new RteBase({ heading2: true })]);

		expect(view.state.schema.nodes.heading2).toBeDefined();
	});

	it('should add heading3 node when enabled', async () => {
		const { view } = await setup([new RteBase({ heading3: true })]);

		expect(view.state.schema.nodes.heading3).toBeDefined();
	});
});
