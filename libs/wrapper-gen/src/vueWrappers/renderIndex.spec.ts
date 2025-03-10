import renderIndex from './renderIndex';
import {
	exampleComponent,
	minimalComponent,
} from '../__fixtures__/componentDefs';

describe('renderIndex', () => {
	it('should render a barrel file that exports all components', () => {
		expect(renderIndex([minimalComponent, exampleComponent])).toMatchSnapshot();
	});
});
