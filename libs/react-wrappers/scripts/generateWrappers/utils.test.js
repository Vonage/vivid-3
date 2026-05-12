import { describe, expect, it, vi } from 'vitest';
import {
	getVividPackageNames,
	event2PropName,
	prepareCompoundComponents,
	getUniqueEvents,
} from './utils.js';

describe('utils', () => {
	it('getVividPackageNames', () => {
		const packageJson = {
			dependencies: {
				'@vonage/vwc-button': '0.1',
				'@vonage/vwc-icon': '0.2',
				'@nvm/vwc-badge': '0.2',
			},
			devDependencies: {
				'@vonage/vwc-dropdown': '0.1',
				'@vonage/component': '0.2',
			},
			otherDependencies: {
				'@vonage/vwc-nav': '0.3',
			},
		};
		const expectedList = [
			'@vonage/vwc-button',
			'@vonage/vwc-icon',
			'@vonage/vwc-dropdown',
		];

		expect(getVividPackageNames(packageJson)).toStrictEqual(expectedList);
	});

	it.each([
		['digit-added', 'onDigitAdded'],
		['userScrubRequest', 'onUserScrubRequest'],
		['vvd_scheme_select', 'onVvdSchemeSelect'],
	])('event2PropName should convert "%s" to "%s"', (input, expected) => {
		expect(event2PropName(input)).toStrictEqual(expected);
	});

	it('compound components', () => {
		const template = vi.fn();
		const config = {
			CTA: {
				connotation: 'cta',
				layout: 'filled',
			},
			Alert: {
				connotation: 'alert',
				layout: 'filled',
			},
		};

		prepareCompoundComponents('VwcButton', template, config)();

		expect(template.mock.calls[0]).toEqual(['VwcButton', 'CTA', config.CTA]);
		expect(template.mock.calls[1]).toEqual([
			'VwcButton',
			'Alert',
			config.Alert,
		]);
	});

	it('getUniqueEvents', () => {
		const firstEvent = { name: 'non-unique', propName: 'replaced' };
		const secondEvent = { name: 'non-unique', propName: 'targetPropName' };
		const uniqueEvent = { name: 'unique', propName: 'onUnique' };
		const events = [firstEvent, secondEvent, uniqueEvent];

		expect(getUniqueEvents(events)).toEqual([uniqueEvent, secondEvent]);
	});
});
