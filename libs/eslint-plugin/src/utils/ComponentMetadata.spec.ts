import { ComponentMetadata } from './ComponentMetadata';

describe('ComponentMetadata', function () {
	it('should retrieve data added for a component by tag name', function () {
		const metadata = new ComponentMetadata<{ foo: string }>();
		metadata.add('VComponent', { foo: 'bar' });

		const callback = jest.fn();
		metadata.forTag('vcomponent', callback);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith('VComponent', { foo: 'bar' });
	});

	it('should not invoke callback if no data added for component', function () {
		const metadata = new ComponentMetadata<{ foo: string }>();

		const callback = jest.fn();
		metadata.forTag('vcomponent', callback);

		expect(callback).toHaveBeenCalledTimes(0);
	});
});
