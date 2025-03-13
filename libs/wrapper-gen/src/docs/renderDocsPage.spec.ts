import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderDocPage } from './renderDocsPage';
import { importedTypesResolverStub } from '../__fixtures__/importedTypes';

describe('renderDocsPage', () => {
	it('should render a docs page', () => {
		expect(
			renderDocPage(exampleComponent, importedTypesResolverStub)
		).toMatchSnapshot();
	});
});
