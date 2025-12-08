import { setup } from '../__tests__/test-utils';
import { mockFile } from '../../../file-picker/__mocks__/data-transfer';
import { RteBase } from './base';
import { RteToolbarFeature } from './toolbar';
import {
	RteDropHandlerFeature,
	type RteDropHandlerFeatureConfig,
} from './drop-handler';

const featuresWithConfig = (config: RteDropHandlerFeatureConfig) => [
	new RteBase(),
	new RteToolbarFeature(),
	new RteDropHandlerFeature(config),
];

describe('RteDropHandlerFeature', () => {
	it('should call onViewportDragOver on dragover of viewport', async () => {
		const calls: any[] = [];
		const rte = await setup(
			featuresWithConfig({
				onViewportDragOver: () => {
					calls.push('over');
					return false;
				},
			})
		);
		rte.dispatchDragEvent('dragover');
		expect(calls).toEqual(['over']);
	});

	it('should call onViewportDragOver only once on dragover of view', async () => {
		const calls: any[] = [];
		const rte = await setup(
			featuresWithConfig({
				onViewportDragOver: () => {
					calls.push('over');
					return false;
				},
			})
		);
		rte.view.posAtCoords = () => null;
		rte.dispatchDragEvent('dragover', {}, rte.view.dom);
		expect(calls).toEqual(['over']);
	});

	it('should not prevent editor handling when onViewportDragOver not defined', async () => {
		const rte = await setup(featuresWithConfig({}));
		const dragover = vitest.fn();
		rte.view.dom.addEventListener('dragover', dragover);
		rte.view.posAtCoords = () => null;

		rte.dispatchDragEvent('dragover', {}, rte.view.dom);
		expect(dragover).toHaveBeenCalled();
	});

	it('should not prevent editor handling when onViewportDragOver returns false', async () => {
		const rte = await setup(
			featuresWithConfig({
				onViewportDragOver: () => false,
			})
		);
		const dragover = vitest.fn();
		rte.view.dom.addEventListener('dragover', dragover);
		rte.view.posAtCoords = () => null;

		rte.dispatchDragEvent('dragover', {}, rte.view.dom);
		expect(dragover).toHaveBeenCalled();
	});

	it('should prevent editor handling when onViewportDragOver returns true', async () => {
		const rte = await setup(
			featuresWithConfig({
				onViewportDragOver: () => true,
			})
		);
		const dragover = vitest.fn();
		rte.view.dom.addEventListener('dragover', dragover);

		const oldState = rte.view.state;

		const ev = rte.dispatchDragEvent('dragover', {}, rte.view.dom);
		expect(ev.defaultPrevented).toBe(true);
		expect(dragover).not.toHaveBeenCalled();

		rte.dropFiles(1, [mockFile('file.txt')]);

		expect(rte.view.state).toBe(oldState);
	});

	it('should call onViewportDrop and onViewportDragFinish on drop', async () => {
		const calls: string[] = [];
		const rte = await setup(
			featuresWithConfig({
				onViewportDrop: () => calls.push('drop'),
				onViewportDragFinish: () => calls.push('finish'),
			})
		);
		rte.dispatchDragEvent('dragover');
		rte.dispatchDragEvent('drop');
		expect(calls).toEqual(['drop', 'finish']);
	});

	it('should not call onViewportDragFinish on dragleave immediately following dragenter', async () => {
		const calls: string[] = [];
		const rte = await setup(
			featuresWithConfig({
				onViewportDragFinish: () => calls.push('finish'),
			})
		);
		rte.dispatchDragEvent('dragenter');
		rte.dispatchDragEvent('dragleave');
		expect(calls).toEqual([]);
	});

	it('should call onViewportDragFinish on dragleave not immediately following dragenter', async () => {
		const calls: string[] = [];
		const rte = await setup(
			featuresWithConfig({
				onViewportDragFinish: () => calls.push('finish'),
			})
		);
		rte.dispatchDragEvent('dragenter');
		await new Promise((r) => setTimeout(r, 5));
		rte.dispatchDragEvent('dragleave');
		expect(calls).toEqual(['finish']);
	});

	it('should call onViewportDragFinish on dragend', async () => {
		const calls: string[] = [];
		const rte = await setup(
			featuresWithConfig({
				onViewportDragFinish: () => calls.push('finish'),
			})
		);
		rte.dispatchDragEvent('dragend');
		expect(calls).toEqual(['finish']);
	});
});
