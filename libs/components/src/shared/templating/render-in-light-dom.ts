import {
	type AddViewBehaviorFactory,
	type CaptureType,
	HTMLDirective,
	Markup,
	type ViewBehavior,
	type ViewBehaviorFactory,
	type ViewController,
	type ViewTemplate,
} from '@microsoft/fast-element';
import type { VividElement } from '../foundation/vivid-element/vivid-element';

export class RenderInLightDomDirective<TSource extends VividElement>
	implements HTMLDirective, ViewBehaviorFactory, ViewBehavior
{
	constructor(private readonly template: ViewTemplate<TSource>) {}

	createHTML(add: AddViewBehaviorFactory) {
		return Markup.comment(add(this));
	}

	createBehavior() {
		return this;
	}

	bind(controller: ViewController) {
		const view = this.template.create();
		view.bind(controller.source, controller.context);
		view.appendTo(controller.source);
		controller.onUnbind({
			unbind: () => {
				const lightDomIntact =
					view.firstChild.parentNode && view.lastChild.parentNode;
				if (lightDomIntact) {
					view.dispose();
				} else {
					// If the light DOM content was meddled with, e.g. removed, we cannot dispose the nodes anymore
					view.unbind();
				}
			},
		});
	}
}

HTMLDirective.define(RenderInLightDomDirective);

/**
 * Directive to render a template into the light DOM of the host element.
 */
export function renderInLightDOM<TSource extends VividElement, TParent>(
	template: ViewTemplate<TSource>
): CaptureType<TSource, TParent> {
	return new RenderInLightDomDirective<TSource>(template);
}
