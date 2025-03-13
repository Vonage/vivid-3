import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderWebTypes } from './renderWebTypes';

describe('renderWebTypes', () => {
	it('should render web types', () => {
		expect(renderWebTypes([exampleComponent], '1.2.3')).toMatchSnapshot();
	});
});
