import React, { useEffect, useRef } from 'react';
import type { ForwardRefExoticComponent, RefObject } from 'react';
import {
	flow,
	identity,
	isString,
	isUndefined,
	noop,
	pickBy,
	upperFirst,
} from 'lodash';

export type EventDefinition = {
	name: string;
	propName?: string;
	transform?: (value: unknown) => unknown;
};

export type AttributeDefinition =
	| {
			name: string;
			setter?: (el: HTMLElement, attributeName: string, value: string) => void;
	  }
	| string;

export type ElementConfiguration = {
	events?: EventDefinition[];
	attributes?: AttributeDefinition[];
	properties?: string[];
};

export const attributeSetterValue = (
	el: HTMLElement,
	name: string,
	value: string
) => el.setAttribute(name, value);

export const attributeSetterToggle = (
	el: HTMLElement,
	name: string,
	value: string
) => el[value === 'true' ? 'setAttribute' : 'removeAttribute'](name, value);

export const setDOMListeners =
	(
		props: Record<string, unknown>,
		propName: string,
		elementRef: RefObject<HTMLElement>,
		eventName: string,
		transform: (value: unknown) => unknown
	) =>
	() => {
		const el = elementRef.current;
		const handler = flow(transform, (props[propName] || noop) as any);
		const remove = () => el?.removeEventListener(eventName, handler);

		if (propExists(props, propName)) {
			el?.addEventListener(eventName, handler);
		}

		return remove;
	};

export const setDOMAttributes =
	(
		props: Record<string, unknown>,
		attributeName: string,
		elementRef: RefObject<HTMLElement>,
		setter: (el: HTMLElement, attributeName: string, value: string) => void
	) =>
	() => {
		const el = elementRef.current;

		if (el && propExists(props, attributeName)) {
			setter(el, attributeName, props[attributeName] as string);
		}
	};

export const propExists = (props: Record<string, unknown>, name: string) =>
	!isUndefined(props[name]);

export const propNameFromEvent = (event: string | EventDefinition) =>
	typeof event === 'string'
		? ['on', upperFirst(event)].join('')
		: event.propName || ['on', upperFirst(event.name)].join('');

const wrapper = (
	elementTagName: string,
	config: ElementConfiguration = {
		events: [],
		attributes: [],
		properties: [],
	}
): ForwardRefExoticComponent<any> => {
	return React.forwardRef(({ children = [], ...props }, setRef) => {
		const truthyProps = pickBy(props, (value) => value !== false);
		const elementRef = useRef<HTMLElement>(null);

		config.events?.forEach((event) => {
			const eventName = isString(event) ? event : event.name;
			const transform = isString(event)
				? identity
				: event.transform || identity;
			const propName = propNameFromEvent(event);

			useEffect(
				setDOMListeners(
					truthyProps,
					propName,
					elementRef,
					eventName,
					transform
				),
				[truthyProps[propName]]
			);
		});

		config.attributes?.forEach((attribute) => {
			const attributeName = isString(attribute) ? attribute : attribute.name;
			const setter = isString(attribute)
				? attributeSetterToggle
				: attribute.setter || attributeSetterToggle;

			useEffect(
				setDOMAttributes(truthyProps, attributeName, elementRef, setter),
				[truthyProps[attributeName]]
			);
		});

		const isPropertySet = useRef<Record<string, boolean>>({});

		config.properties?.forEach((property) => {
			useEffect(() => {
				if (!elementRef.current) {
					return;
				}

				if (props[property] !== undefined && props[property] !== null) {
					isPropertySet.current[property] = true;
					(elementRef.current as any)[property] = props[property];
				} else if (isPropertySet.current[property]) {
					isPropertySet.current[property] = false;
					(elementRef.current as any)[property] =
						property in props ? props[property] : null;
				}
			}, [props[property]]);
		});

		return React.createElement(
			elementTagName,
			{
				ref: (el: HTMLElement) => {
					(elementRef as any).current = el;

					if (typeof setRef === 'function') {
						setRef(el);
					} else if (setRef && typeof setRef === 'object') {
						setRef.current = el;
					}
				},
				...generateProps(truthyProps, config),
			},
			[],
			...[].concat(children as never[])
		);
	});
};

const propNameFromAttribute = (
	attributeDefinition: AttributeDefinition
): string =>
	typeof attributeDefinition === 'string'
		? attributeDefinition
		: attributeDefinition.name;

const generateProps = (
	actualPropsPassed: Record<string, unknown>,
	config: ElementConfiguration
) => {
	const propNames = [...Object.keys(actualPropsPassed)];
	const attributesAndEvents = [
		...(config.events?.map(propNameFromEvent) || []),
		...(config.attributes?.map(propNameFromAttribute) || []),
		...(config.properties || []),
	];

	return propNames
		.filter((propName) => !attributesAndEvents.includes(propName))
		.reduce(toObjectOf(actualPropsPassed), {});
};

const toObjectOf =
	(props: Record<string, unknown>) =>
	(ac: Record<string, unknown>, name: string) => ({
		...ac,
		[name]: props[name],
	});

export default wrapper;
