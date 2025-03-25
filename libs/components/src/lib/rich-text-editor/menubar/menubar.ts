import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../../shared/foundation/vivid-element/vivid-element';

export class MenuBar extends VividElement {
    @attr({ attribute: 'menu-items' })
    menuItems?: string;
}
