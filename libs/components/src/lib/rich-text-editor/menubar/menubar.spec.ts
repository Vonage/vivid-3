import { fixture } from '@vivid-nx/shared';
import { MenuBar } from './menubar';
import '.';

const COMPONENT_TAG = 'vwc-menubar';

describe('menuBar', () => {
    let element: MenuBar;

    beforeEach(async () => {
        element = (await fixture(
            `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
        )) as unknown as MenuBar;
    });

    describe('basic', () => {
        it('should be initialized as a vwc-menubar', async () => {
            expect(element).toBeInstanceOf(MenuBar);
        });

        it('should allow being created via createElement', () => {
            expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
        });
    });
});