import { VTreeView, VTreeItem } from '@vonage/vivid-vue';
import { argTypes } from './generated/VTreeView';

export default {
  title: 'Wrappers/VTreeView',
  component: VTreeView,
  argTypes,
};

const DefaultSlotTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item 1"/>
    <VTreeItem text="Tree Item 2"/>
</VTreeView>`,
});

export const DefaultSlot = DefaultSlotTemplate.bind({});

const NestedTreeTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item 1">
    <template #item>
        <VTreeItem text="Tree Item 1 - 1"/>
    </template>
    </VTreeItem>
    <VTreeItem text="Tree Item 2"/>
</VTreeView>`,
});

export const NestedTree = NestedTreeTemplate.bind({});
