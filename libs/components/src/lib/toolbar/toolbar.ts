import { rovingIndex } from 'roving-ux';      // npm es6/common modules
import { FoundationElement } from '@microsoft/fast-foundation';

/**
 * Base class for toolbar
 *
 * @public
 */
export class Toolbar extends FoundationElement {
	handleContentChange() {
		rovingIndex({
			element: node,     // required: the container to get roving index ux
			target: '#foo',    // optional: a query selector for which children should be focusable
		});
	}
}
