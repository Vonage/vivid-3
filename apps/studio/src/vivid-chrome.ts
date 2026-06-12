/**
 * Initializes Vivid for the studio shell itself — the studio's own UI is
 * built from Vivid components (dark theme for that IDE feel).
 */
import '@repo/styles/tokens/theme-dark.css';
import '@repo/styles/core/all.css';
import '@repo/styles/fonts/spezia-variable.css';

import {
	registerAvatar,
	registerBadge,
	registerButton,
	registerCard,
	registerDialog,
	registerDivider,
	registerEmptyState,
	registerIcon,
	registerLayout,
	registerMenu,
	registerMenuItem,
	registerNote,
	registerSearchableSelect,
	registerOption,
	registerSwitch,
	registerTextField,
	registerTooltip,
} from '@vonage/vivid';

export function initChrome(): void {
	registerAvatar();
	registerBadge();
	registerButton();
	registerCard();
	registerDialog();
	registerDivider();
	registerEmptyState();
	registerIcon();
	registerLayout();
	registerMenu();
	registerMenuItem();
	registerNote();
	registerSearchableSelect();
	registerOption();
	registerSwitch();
	registerTextField();
	registerTooltip();
}
