import { Plugin } from 'prosemirror-state';
import type { RteInstanceImpl } from '../instance';

export class FeatureState<T> {
	plugin: Plugin<T>;

	constructor(initialValue: T) {
		this.plugin = new Plugin<T>({
			state: {
				init: () => initialValue,
				apply: (tr, value) => {
					const meta = tr.getMeta(this.plugin);
					return meta !== undefined ? meta : value;
				},
			},
		});
	}

	getValue(rte: RteInstanceImpl): T {
		return this.plugin.getState(rte.state)!;
	}

	setValue(rte: RteInstanceImpl, newValue: T) {
		rte.dispatchTransaction(rte.tr.setMeta(this.plugin, newValue));
	}
}
