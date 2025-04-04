import { exampleComponent } from '../__fixtures__/componentDefs';
import { renderComponentTypes } from './renderComponentTypes';

describe('renderComponentTypes', () => {
	it('should render a type definitions file', () => {
		expect(renderComponentTypes(exampleComponent)).toMatchSnapshot();
	});
});
