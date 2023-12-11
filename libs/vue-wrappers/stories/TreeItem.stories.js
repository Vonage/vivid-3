import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
import { argTypes } from './generated/VTreeItem';

export default {
  title: 'Wrappers/VTreeItem',
  component: VTreeItem,
  argTypes,
};

const TextTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item"/>
</VTreeView>`,
});

export const Text = TextTemplate.bind({});

const IconTemplate = () => ({
  components: { VTreeItem, VTreeView },
  template: `<VTreeView>
    <VTreeItem text="Tree Item" icon="chat-line"/>
</VTreeView>`,
});

export const Icon = IconTemplate.bind({});

const SelectedTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item" selected/>
</VTreeView>`,
});

export const Selected = SelectedTemplate.bind({});

const DisabledTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item" disabled/>
</VTreeView>`,
});

export const Disabled = DisabledTemplate.bind({});

const ExpandedTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item" expanded>
       <template #item>
        <VTreeItem  text="Tree Item 1 - 1"/>
        </template>
    </VTreeItem>
</VTreeView>`,
});

export const Expanded = ExpandedTemplate.bind({});

const ItemSlotTemplate = () => ({
  components: { VTreeView, VTreeItem },
  template: `<VTreeView>
    <VTreeItem text="Tree Item 1">
       <template #item>
        <VTreeItem text="Tree Item 1 - 1"/>
        </template>
    </VTreeItem>
    <VTreeItem text="Tree Item 2"></VTreeItem>
</VTreeView>`,
});

export const ItemSlot = ItemSlotTemplate.bind({});
