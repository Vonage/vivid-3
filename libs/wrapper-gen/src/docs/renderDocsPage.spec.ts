import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderDocPage } from './renderDocsPage';

describe('renderDocsPage', () => {
	it('should render a docs page', () => {
		expect(renderDocPage(exampleComponent)).toMatchSnapshot();
	});
});
