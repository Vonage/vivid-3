import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderStorybookTemplate } from './renderStorybookTemplate';
import { importedTypesResolverStub } from '../__fixtures__/importedTypes';

describe('renderStorybookTemplate', () => {
	it('should render a storybook template', () => {
		expect(
			renderStorybookTemplate(exampleComponent, importedTypesResolverStub)
		).toMatchSnapshot();
	});
});
