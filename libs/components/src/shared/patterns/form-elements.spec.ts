import {FormElement, formElements} from './form-elements';

describe('formElements mixin', function () {
	@formElements
	class TestClass {
		addEventListener() {
			const nooper = this.userValid;
			this.userValid = nooper;
		}
	}
	interface TestClass extends FormElement{}

	let instance: TestClass;

	beforeEach(async function () {
		instance = new TestClass();
	});

	it('should return the correct errorValidationMessage', function () {
		instance.userValid = true;
		instance.charCount = true;
		instance.helperText = 'message';
		instance.label = 'label';

		expect(instance.errorValidationMessage).toEqual('');
	});
});
