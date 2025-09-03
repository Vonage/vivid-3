import type { DriverT } from '../drivers/driver';
import type { VividWrapper } from '../components.generated';

export interface TestCase {
	name: string;
	path: string;
	expectErrorMessage?: string;
	test: <T extends DriverT>(
		vvd: VividWrapper<T>,
		expectState: (expectedState: Record<string, any>) => void | Promise<void>
	) => void | Promise<void>;
}
