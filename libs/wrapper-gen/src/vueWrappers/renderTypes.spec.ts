import {
	exampleComponent,
	minimalComponent,
} from '../__fixtures__/componentDefs';
import renderTypes from './renderTypes';

describe('renderTypes', () => {
	it('should render a files exporting all component types', () => {
		expect(renderTypes([minimalComponent, exampleComponent])).toMatchSnapshot();
	});
});
