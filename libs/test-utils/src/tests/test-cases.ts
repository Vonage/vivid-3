import { cardTests } from './cases/cards/tests';
import { loginTests } from './cases/login/tests';
import { popupTests } from './cases/popups/tests';

export const testCases = [...cardTests, ...loginTests, ...popupTests];
