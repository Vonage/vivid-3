/**
 * Runs the test steps in order. If they return a promise, it will be awaited before continuing.
 */
export const testSequence = (steps: Array<() => Promise<void> | void>): any => {
	if (!steps.length) {
		return;
	}

	const currentStep = steps[0];
	const remainingSteps = steps.slice(1);

	const result = currentStep();

	if (result instanceof Promise) {
		return result.then(() => testSequence(remainingSteps));
	} else {
		return testSequence(remainingSteps);
	}
};
