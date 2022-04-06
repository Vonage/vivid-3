import { fixture } from '@vivid-nx/shared';
import { Banner } from './banner';
import '.';

const COMPONENT_TAG = 'vwc-banner';

describe('vwc-banner', () => {
	let element: Banner;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Banner;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-banner', async () => {
			expect(element).toBeInstanceOf(Banner);
		});

		describe('init state', function () {
			it('should set dismissible as false', function () {
				expect(element.dismissible).toEqual(false);
			});

			it('should set open to false', function () {
				expect(element.open).toEqual(false);
			});

			it('should set role and aria live to status and polite', function () {
				expect(element.role).toEqual('status');
				expect(element.ariaLive).toEqual('polite');
			});
		});

    describe(`reflected properties`, function () {
      it(`should reflect properties`, function () {
        const reflectedProperties = [];
      });
    });
	});
});
