import 'element-internals-polyfill';

import { elementUpdated, fixture } from '@repo/shared';
import { customElement } from '@microsoft/fast-element';
import { VividElement } from '../../foundation/vivid-element/vivid-element';
import { WithSuccessText } from './with-success-text';

describe('WithSuccessText mixin', function () {
	@customElement('success-text-class')
	class SuccessTextClass extends WithSuccessText(VividElement) {}

	let instance: SuccessTextClass;

	beforeEach(async function () {
		instance = fixture(
			'<success-text-class></success-text-class>'
		) as SuccessTextClass;
	});

	it('should have a successText property that can be set via attribute', async () => {
		const message = 'Success Message';

		instance.setAttribute('success-text', message);

		expect(instance.successText).toEqual(message);
	});

	it('should have a successText property that can be set programmatically', async () => {
		const message = 'Success Message';

		instance.successText = message;
		await elementUpdated(instance);

		expect(instance.successText).toEqual(message);
		expect(instance.getAttribute('success-text')).toEqual(message);
	});
});
