import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderWebTypes } from './renderWebTypes';
import { importedTypesResolverStub } from '../__fixtures__/importedTypes';

describe('renderWebTypes', () => {
	it('should render web types', () => {
		expect(
			renderWebTypes([exampleComponent], importedTypesResolverStub, '1.2.3')
		).toMatchSnapshot();
	});
});
