import { fixture } from '@vivid-nx/shared';
import { avatarInitials } from './avatar-initials';
import '.';

const COMPONENT_TAG = 'vwc-avatar-initials';

describe('vwc-avatar-initials', () => {
	let element: avatarInitials;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as avatarInitials;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-avatar-initials', async () => {
			expect(element).toBeInstanceOf(avatarInitials);
		});
	});
});
