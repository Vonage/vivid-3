import ComponentRegister from './src/generator/ComponentRegister';
import { ComponentDef } from './src/generator/ComponentDef';
import { icons } from './src/generator/icons';

// Update icon attributes
const vividIconType = [
  {
    text: `IconId`,
    vuePropType: 'String',
    importFromModule: '@/generated/icons',
    resolvedType: icons.map(icon => ({ text: `'${icon}'`, vuePropType: 'String' })),
  },
];
ComponentRegister.addGlobalDefinitionOverride((component: ComponentDef) => {
  for (const attribute of component.attributes) {
    if (attribute.name === 'icon' || (component.name === 'icon' && attribute.name === 'name')) {
      attribute.description += '\nSee the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/';
      attribute.type = vividIconType;
    }
  }
});

const addVueModel = (
  component: ComponentDef,
  config: Omit<ComponentDef['vueModels'][number], 'name'>,
  name = 'modelValue'
) => {
  component.vueModels.push({
    name,
    ...config,
  });
};

ComponentRegister.registerComponent('accordion');
ComponentRegister.registerComponent('accordion-item');
ComponentRegister.registerComponent('action-group');
ComponentRegister.registerComponent('alert');
ComponentRegister.registerComponent('avatar');
ComponentRegister.registerComponent('badge');
ComponentRegister.registerComponent('banner');
ComponentRegister.registerComponent('breadcrumb');
ComponentRegister.registerComponent('breadcrumb-item');
ComponentRegister.registerComponent('button');
ComponentRegister.registerComponent('calendar');
ComponentRegister.registerComponent('calendar-event');
ComponentRegister.registerComponent('card');
ComponentRegister.registerComponent('checkbox', component => {
  addVueModel(component, {
    attributeName: 'current-checked',
    eventName: 'change',
    valueMapping: '(event.target as HTMLInputElement).checked',
  });
});
ComponentRegister.registerComponent('combobox', component => {
  addVueModel(component, {
    attributeName: 'current-value',
    eventName: 'change',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('data-grid', component => {
  component.attributes.push({
    name: 'rowsData',
    description: 'Array of objects representing the rows of the grid.',
    type: [{ text: 'any[]', vuePropType: 'Array' }],
  });
});
ComponentRegister.registerComponent('data-grid-row', component => {
  component.slots.push({
    name: 'default',
    description: 'Default slot.',
  });
});
ComponentRegister.registerComponent('data-grid-cell', component => {
  component.slots.push({
    name: 'default',
    description: 'Default slot.',
  });
});
ComponentRegister.registerComponent('date-picker', component => {
  addVueModel(component, {
    attributeName: 'value',
    eventName: 'input',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('date-range-picker', component => {
  // Remove start and end attributes as we will replace them with v-model props
  component.attributes = component.attributes.filter(
    attribute => attribute.name !== 'start' && attribute.name !== 'end'
  );
  addVueModel(
    component,
    {
      attributeName: 'current-start',
      eventName: 'input:start',
      valueMapping: '(event.target as any).start',
    },
    'start'
  );
  addVueModel(
    component,
    {
      attributeName: 'current-end',
      eventName: 'input:end',
      valueMapping: '(event.target as any).end',
    },
    'end'
  );
});
ComponentRegister.registerComponent('dialog');
ComponentRegister.registerComponent('divider');
ComponentRegister.registerComponent('empty-state');
ComponentRegister.registerComponent('fab');
ComponentRegister.registerComponent('header');
ComponentRegister.registerComponent('icon');
ComponentRegister.registerComponent('layout');
ComponentRegister.registerComponent('menu', component => {
  for (const attribute of component.attributes) {
    // Fix type of anchor attribute
    if (attribute.name === 'anchor') {
      attribute.type = [
        { text: 'HTMLElement', vuePropType: 'Object' },
        { text: 'string', vuePropType: 'String' },
      ];
    }
  }
});
ComponentRegister.registerComponent('menu-item', component => {
  addVueModel(component, {
    attributeName: 'checked',
    eventName: 'change',
    valueMapping: '(event.target as HTMLInputElement).checked',
  });
});
ComponentRegister.registerComponent('nav');
ComponentRegister.registerComponent('nav-disclosure');
ComponentRegister.registerComponent('nav-item');
ComponentRegister.registerComponent('note');
ComponentRegister.registerComponent('number-field', component => {
  addVueModel(component, {
    attributeName: 'current-value',
    eventName: 'input',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('option');
ComponentRegister.registerComponent('pagination', component => {
  component.events.push({
    name: 'pagination-change',
    description: 'Fires when the page changes.',
    type: [{ text: 'Event', vuePropType: 'Event' }],
  });
});
ComponentRegister.registerComponent('progress');
ComponentRegister.registerComponent('progress-ring');
ComponentRegister.registerComponent('radio');
ComponentRegister.registerComponent('radio-group', component => {
  addVueModel(component, {
    attributeName: 'value',
    eventName: 'change',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('selectable-box');
ComponentRegister.registerComponent('select', component => {
  addVueModel(component, {
    attributeName: 'current-value',
    eventName: 'input',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('side-drawer');
ComponentRegister.registerComponent('slider', component => {
  addVueModel(component, {
    attributeName: 'current-value',
    eventName: 'change',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('switch', component => {
  component.attributes.push({
    name: 'current-checked',
    description: 'The current checked state of the switch.',
    type: [{ text: 'boolean', vuePropType: 'Boolean' }],
  });
  component.events.push({
    name: 'change',
    description: 'Emitted when the checked state of the switch changes.',
    type: [{ text: 'Event', vuePropType: 'Event' }],
  });
  addVueModel(component, {
    attributeName: 'current-checked',
    eventName: 'change',
    valueMapping: '(event.target as HTMLInputElement).checked',
  });
});
ComponentRegister.registerComponent('tab');
ComponentRegister.registerComponent('tabs');
ComponentRegister.registerComponent('tab-panel');
ComponentRegister.registerComponent('text-area', component => {
  component.attributes = [
    {
      name: 'current-value',
      description: 'The current value of the text-area.',
      type: [{ text: 'string', vuePropType: 'String' }],
    },
  ];
  addVueModel(component, {
    attributeName: 'current-value',
    eventName: 'input',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('text-field', component => {
  addVueModel(component, {
    attributeName: 'current-value',
    eventName: 'input',
    valueMapping: '(event.target as HTMLInputElement).value',
  });
});
ComponentRegister.registerComponent('toggletip');
ComponentRegister.registerComponent('tooltip');
ComponentRegister.registerComponent('tree-item');
ComponentRegister.registerComponent('tree-view');
ComponentRegister.registerComponent('tag');
ComponentRegister.registerComponent('tag-group');
