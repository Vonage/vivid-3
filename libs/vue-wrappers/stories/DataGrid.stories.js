import { VDataGrid, VDataGridRow, VDataGridCell } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VDataGrid';

export default {
	title: 'Wrappers/DataGrid',
	component: VDataGrid,
	excludeStories: /.*Data$/,
	argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
	rowsData: [
		{ name: 'John', surname: 'Doe', age: 30 },
		{ name: 'Jane', surname: 'Doe', age: 25 },
	],
};

const ShowGridTemplate = () => ({
	components: { VDataGrid, VDataGridRow, VDataGridCell },
	setup() {
		const open = ref(false);
		return { open };
	},
	template: `<div>
    <VDataGrid>
      <VDataGridRow role="row" class="header" row-type="header">
        <VDataGridCell cell-type="columnheader" role="columnheader">Name</VDataGridCell>
        <VDataGridCell cell-type="columnheader" role="columnheader">Surname</VDataGridCell>
        <VDataGridCell cell-type="columnheader" role="columnheader">Age</VDataGridCell>
      </VDataGridRow>
      <VDataGridRow>
        <VDataGridCell>John</VDataGridCell>
        <VDataGridCell>Doe</VDataGridCell>
        <VDataGridCell>30</VDataGridCell>
      </VDataGridRow>
      <VDataGridRow>
        <VDataGridCell>Jane</VDataGridCell>
        <VDataGridCell>Doe</VDataGridCell>
        <VDataGridCell>25</VDataGridCell>
      </VDataGridRow>
</VDataGrid>
  </div>`,
});
export const ShowGrid = ShowGridTemplate.bind({});
