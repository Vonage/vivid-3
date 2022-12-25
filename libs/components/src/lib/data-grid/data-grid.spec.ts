import { fixture } from '@vivid-nx/shared';
import { DataGrid } from './data-grid';
import '.';


const COMPONENT_TAG = 'vwc-data-grid';

describe('vwc-data-grid', () => {
	let element: DataGrid;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGrid;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGrid);
			expect(element.noTabbing).toEqual(false);
			expect(element.generateHeader).toEqual("default");
			expect(element.gridTemplateColumns).toBeUndefined();
			expect(element.rowsData).toEqual([]);
			expect(element.columnDefinitions).toEqual(null);
			// expect(element.rowItemTemplate).toBeUndefined();
			expect(element.cellItemTemplate).toBeUndefined();
			expect(element.headerCellItemTemplate).toBeUndefined();
			expect(element.focusRowIndex).toEqual(0);
			expect(element.focusColumnIndex).toEqual(0);
			expect(element.rowElementTag).toBeUndefined();
		});
	});

	describe('noTabbing', () => {
		it("should have a tabIndex of -1 when no-tabbing is true", async () => {
			element.noTabbing = true;
	
			expect(element.getAttribute('tabindex')).toEqual("-1");
		});

		it('should have a tabIndex of -1 when noTabbing is true', async () => {
			element.toggleAttribute('no-tabbing', true);
	
			expect(element.getAttribute('tabindex')).toEqual("-1");
		});
	});

	// describe('generateHeader', () => {
	// 	it('should hide the header if set to "none"', async () => {
	// 		element.rowsData = [
    //             { id: "1", name: "Person 1" },
    //             { id: "2", name: "Person 2" },
    //         ];
	// 		await elementUpdated(element);
	// 		console.log(element.shadowRoot?.innerHTML);
	// 		const elements = element.shadowRoot?.querySelectorAll(`[row-type=${DataGridRowTypes.default}]`);
	// 		expect(elements?.length).toEqual(2);
			
	// 	});
	// });
});
