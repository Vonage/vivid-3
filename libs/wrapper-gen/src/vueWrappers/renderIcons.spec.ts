import { renderIcons } from './renderIcons';
import { iconsManifestStub } from '../__fixtures__/icons';

describe('renderIcons', () => {
	it('should render an enum of icon names from the manifest', () => {
		expect(renderIcons(iconsManifestStub)).toMatchSnapshot();
	});
});
