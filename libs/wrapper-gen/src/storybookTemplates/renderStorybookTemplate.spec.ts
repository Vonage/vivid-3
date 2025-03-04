import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderStorybookTemplate } from './renderStorybookTemplate';

describe('renderStorybookTemplate', () => {
	it('should render a storybook template', () => {
		expect(renderStorybookTemplate(exampleComponent)).toMatchSnapshot();
	});
});
