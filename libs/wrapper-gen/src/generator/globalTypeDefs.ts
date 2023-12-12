// Importing from '@microsoft/fast-foundation' requires a DOM
import './polyfill/dom';

import {
  AccordionExpandMode,
  ComboboxAutocomplete,
  DividerRole,
  MenuItemRole,
  SelectPosition,
  SliderMode,
  TabsOrientation,
  TextFieldType,
} from '@microsoft/fast-foundation';
import { Direction, Orientation } from '@microsoft/fast-web-utilities';
import { TypeUnion } from './types';

const typeFromEnumObj = (enumObj: Record<string, string>): TypeUnion =>
  Object.values(enumObj).map(value => ({ text: `'${value}'`, vuePropType: 'String' }));

export const globalTypeDefs: Record<string, TypeUnion> = {
  // Types defined by FAST:
  AccordionExpandMode: typeFromEnumObj(AccordionExpandMode),
  ComboboxAutocomplete: typeFromEnumObj(ComboboxAutocomplete),
  SelectPosition: typeFromEnumObj(SelectPosition),
  DividerRole: typeFromEnumObj(DividerRole),
  MenuItemRole: typeFromEnumObj(MenuItemRole),
  SliderMode: typeFromEnumObj(SliderMode),
  TabsOrientation: typeFromEnumObj(TabsOrientation),
  TextFieldType: typeFromEnumObj(TextFieldType),
  Orientation: typeFromEnumObj(Orientation),
  Direction: typeFromEnumObj(Direction),

  // Types defined by Floating UI:
  Placement: [
    { text: "'top'", vuePropType: 'String' },
    { text: "'right'", vuePropType: 'String' },
    { text: "'bottom'", vuePropType: 'String' },
    { text: "'left'", vuePropType: 'String' },
    { text: "'top-start'", vuePropType: 'String' },
    { text: "'top-end'", vuePropType: 'String' },
    { text: "'right-start'", vuePropType: 'String' },
    { text: "'right-end'", vuePropType: 'String' },
    { text: "'bottom-start'", vuePropType: 'String' },
    { text: "'bottom-end'", vuePropType: 'String' },
    { text: "'left-start'", vuePropType: 'String' },
    { text: "'left-end'", vuePropType: 'String' },
  ],
  Strategy: [
    { text: "'absolute'", vuePropType: 'String' },
    { text: "'fixed'", vuePropType: 'String' },
  ],

  // Types defined by Vivid Components:

  // Combobox
  PopupPlacement: [
    { text: "'top'", vuePropType: 'String' },
    { text: "'bottom'", vuePropType: 'String' },
  ],

  // Dialog
  IconPlacement: [
    { text: "'top'", vuePropType: 'String' },
    { text: "'side'", vuePropType: 'String' },
  ],

  // Layout:
  Gutters: [
    { text: "'small'", vuePropType: 'String' },
    { text: "'medium'", vuePropType: 'String' },
    { text: "'large'", vuePropType: 'String' },
  ],
  ColumnSpacing: [
    { text: "'small'", vuePropType: 'String' },
    { text: "'medium'", vuePropType: 'String' },
    { text: "'large'", vuePropType: 'String' },
  ],
  RowSpacing: [
    { text: "'small'", vuePropType: 'String' },
    { text: "'medium'", vuePropType: 'String' },
    { text: "'large'", vuePropType: 'String' },
  ],
  ColumnBasis: [
    { text: "'small'", vuePropType: 'String' },
    { text: "'medium'", vuePropType: 'String' },
    { text: "'large'", vuePropType: 'String' },
    { text: "'block'", vuePropType: 'String' },
  ],
  AUTO_SIZING: [
    { text: "'fit'", vuePropType: 'String' },
    { text: "'fill'", vuePropType: 'String' },
  ],

  // TextArea
  TextAreaWrap: [
    { text: "'hard'", vuePropType: 'String' },
    { text: "'soft'", vuePropType: 'String' },
    { text: "'off'", vuePropType: 'String' },
  ],

  // DataGrid:
  DataGridSelectionMode: [
    { text: "'none'", vuePropType: 'String' },
    { text: "'single-row'", vuePropType: 'String' },
    { text: "'multi-row'", vuePropType: 'String' },
    { text: "'single-cell'", vuePropType: 'String' },
    { text: "'multi-cell'", vuePropType: 'String' },
  ],
  DataGridRowTypes: [
    { text: "'default'", vuePropType: 'String' },
    { text: "'header'", vuePropType: 'String' },
    { text: "'sticky-header'", vuePropType: 'String' },
  ],
  DataGridCellTypes: [
    { text: "'default'", vuePropType: 'String' },
    { text: "'columnheader'", vuePropType: 'String' },
    { text: "'rowheader'", vuePropType: 'String' },
  ],
  // Tooltip:
  anchorType: [
    { text: 'string', vuePropType: 'String' },
    { text: 'HTMLElement', vuePropType: 'Object' },
  ],

  // Toggletip:
  AnchorType: [
    { text: 'string', vuePropType: 'String' },
    { text: 'HTMLElement', vuePropType: 'Object' },
  ],

  // Pagination:
  Button: [{ text: 'HTMLButtonElement', vuePropType: 'Object' }],
  'Button[]': [{ text: 'HTMLButtonElement[]', vuePropType: 'Array' }],

  // Alert:
  AlertPlacement: [
    { text: "'top'", vuePropType: 'String' },
    { text: "'top-start'", vuePropType: 'String' },
    { text: "'top-end'", vuePropType: 'String' },
    { text: "'bottom'", vuePropType: 'String' },
    { text: "'bottom-start'", vuePropType: 'String' },
    { text: "'bottom-end'", vuePropType: 'String' },
  ],

  // Data grid:
  GenerateHeaderOptions: [
    { text: "'none'", vuePropType: 'String' },
    { text: "'default'", vuePropType: 'String' },
    { text: "'sticky'", vuePropType: 'String' },
  ],

  // Date picker:
  DateStr: [{ text: 'string', vuePropType: 'String' }],

  // Menu item:
  CheckAppearance: [
    { text: "'normal'", vuePropType: 'String' },
    { text: "'tick-only'", vuePropType: 'String' },
  ],

  // Selectable box:
  SelectableBoxControlType: [
    { text: "'checkbox'", vuePropType: 'String' },
    { text: "'radio'", vuePropType: 'String' },
  ],
};
