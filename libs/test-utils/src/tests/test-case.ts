import type { DriverT } from '../drivers/driver';
import type { VividWrapper } from '../components.generated';

export interface TestCase {
	name: string;
	path: string;
	test: <T extends DriverT>(vvd: VividWrapper<T>) => void | Promise<void>;
	expectedState: Record<string, unknown>;
}
