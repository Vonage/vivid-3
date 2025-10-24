export const MenuItemRole = {
	menuitem: 'menuitem',
	menuitemcheckbox: 'menuitemcheckbox',
	menuitemradio: 'menuitemradio',
	presentation: 'presentation',
} as const;

/**
 * The types for menu item roles
 * @public
 */
export type MenuItemRole = (typeof MenuItemRole)[keyof typeof MenuItemRole];
