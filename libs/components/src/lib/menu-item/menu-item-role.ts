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
export type MenuItemRole = typeof MenuItemRole[keyof typeof MenuItemRole];

/**
 * @internal
 */
export const roleForMenuItem: {
	[value in keyof typeof MenuItemRole]: typeof MenuItemRole[value];
} = {
	[MenuItemRole.menuitem]: 'menuitem',
	[MenuItemRole.menuitemcheckbox]: 'menuitemcheckbox',
	[MenuItemRole.menuitemradio]: 'menuitemradio',
	[MenuItemRole.presentation]: 'presentation',
};
