import '../elevation';
import '../button';
import '@oddbird/popover-polyfill';

import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import { loadComponentsModules } from '../../shared/utils';
import { Popup } from './popup';
import styles from './popup.scss';
import { popupTemplate as template } from './popup.template';


registerPopup();
