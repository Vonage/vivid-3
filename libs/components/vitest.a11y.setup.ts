import 'vitest-axe/extend-expect';
import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';
import './vitest.setup.ts';
expect.extend(matchers);