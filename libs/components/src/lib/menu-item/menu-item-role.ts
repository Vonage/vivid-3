export const MenuItemRole = {
	menuitem: 'menuitem',
	/**
	 * @deprecated - Use role="checkbox" instead
	 */
	menuitemcheckbox: 'menuitemcheckbox',
	checkbox: 'checkbox',
	/**
	 * @deprecated - Use role="radio" instead.
	 */
	menuitemradio: 'menuitemradio',
	radio: 'radio',
	presentation: 'presentation',
} as const;

/**
 * The types for menu item roles
 * @public
 */
export type MenuItemRole = typeof MenuItemRole[keyof typeof MenuItemRole];
