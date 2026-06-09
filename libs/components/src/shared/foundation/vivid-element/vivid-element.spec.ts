import { customElement, html } from '@microsoft/fast-element';
import { fixture } from '@repo/shared/test-utils/fixture';
import type { ReactiveController } from '../../framework/reactive-controller';
import { VividElement } from './vivid-element';

@customElement({
	name: 'test-vivid-element',
	template: html`<slot></slot>`,
})
class TestVividElement extends VividElement {}

describe('VividElement', () => {
	describe('VIVID_VERSION', () => {
		it('should expose the current version of the Vivid library', () => {
			const majorVersion = parseInt(
				VividElement.VIVID_VERSION.split('.')[0],
				10
			);

			expect(majorVersion).toBeGreaterThanOrEqual(3);
		});
	});

	describe('ReactiveControllerHost', () => {
		let element: TestVividElement;

		function createController(): ReactiveController {
			return {
				hostConnected: vi.fn(),
				hostDisconnected: vi.fn(),
			};
		}

		beforeEach(async () => {
			element = fixture(
				'<test-vivid-element></test-vivid-element>'
			) as TestVividElement;
		});

		afterEach(() => {
			element.remove();
		});

		it('should call hostConnected when adding a controller to an already connected host', () => {
			const controller = createController();

			element._addController(controller);

			expect(controller.hostConnected).toHaveBeenCalledTimes(1);
		});

		it('should not call hostConnected when adding a controller to a disconnected host', () => {
			element.remove();
			const controller = createController();

			element._addController(controller);

			expect(controller.hostConnected).not.toHaveBeenCalled();
		});

		it('should call hostConnected on all controllers when the host is connected', async () => {
			element.remove();
			const controller1 = createController();
			const controller2 = createController();
			element._addController(controller1);
			element._addController(controller2);

			document.body.appendChild(element);

			expect(controller1.hostConnected).toHaveBeenCalledTimes(1);
			expect(controller2.hostConnected).toHaveBeenCalledTimes(1);
		});

		it('should call hostDisconnected on all controllers when the host is disconnected', () => {
			const controller = createController();
			element._addController(controller);

			element.remove();

			expect(controller.hostDisconnected).toHaveBeenCalledTimes(1);
		});

		it('should not call lifecycle methods on a removed controller', () => {
			const controller = createController();
			element._addController(controller);
			(controller.hostConnected as ReturnType<typeof vi.fn>).mockClear();

			element._removeController(controller);
			element.remove();
			document.body.appendChild(element);

			expect(controller.hostConnected).not.toHaveBeenCalled();
			expect(controller.hostDisconnected).not.toHaveBeenCalled();
		});

		it('should handle controllers without optional lifecycle methods', () => {
			const controller: ReactiveController = {};

			element._addController(controller);
			element.remove();
			document.body.appendChild(element);
		});

		it('should not add the same controller twice', () => {
			const controller = createController();
			element._addController(controller);
			(controller.hostConnected as ReturnType<typeof vi.fn>).mockClear();

			element._addController(controller);

			element.remove();
			expect(controller.hostDisconnected).toHaveBeenCalledTimes(1);
		});
	});
});
