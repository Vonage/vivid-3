import ComponentRegister from './src/generator/ComponentRegister';
import { ComponentDef } from './src/generator/ComponentDef';

// Update icon attributes
ComponentRegister.addGlobalDefinitionOverride((component: ComponentDef, {icons}) => {
  const vividIconType = [
    {
      text: `IconId`,
      vuePropType: 'String',
      importFromModule: '../icons',
      resolvedType: icons.map(icon => ({ text: `'${icon}'`, vuePropType: 'String' })),
    },
  ];

  for (const attribute of component.attributes) {
    if (attribute.name === 'icon' || (component.name === 'icon' && attribute.name === 'name')) {
      attribute.description += '\nSee the Vivid Icon Gallery for available icons: https://icons.vivid.vonage.com/';
      attribute.type = vividIconType;
    }
  }
});

ComponentRegister.addComponentOverride('data-grid', component => {
  component.attributes.push({
    name: 'rowsData',
    description: 'Array of objects representing the rows of the grid.',
    type: [{ text: 'any[]', vuePropType: 'Array' }],
  });
});
