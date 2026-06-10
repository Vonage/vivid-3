import {
	type DesignToken,
	type JSONTokenTree,
	matchIsGroup,
	matchIsToken,
} from 'design-tokens-format-module';

type Frame = { prefix: string; node: JSONTokenTree };

export function* iterateTokens(
	root: JSONTokenTree
): Generator<[string, DesignToken], void> {
	if (root === null || typeof root !== 'object') {
		throw new Error(
			'Tokens must be in the Design Token Community Group format.'
		);
	}
	const stack: Frame[] = [{ prefix: '', node: root }];

	while (stack.length) {
		const popped = stack.pop();
		if (!popped) continue;
		const { prefix, node } = popped;

		// Collect child names once to keep ordering consistent and avoid extra lookups
		const childNames: string[] = Object.keys(node).filter(
			(name) => !name.startsWith('$')
		);

		// Emit tokens first
		for (const name of childNames) {
			// @ts-expect-error - dynamic property
			const child = node[name];
			if (matchIsToken(child)) {
				yield [prefix + name, child as DesignToken];
			}
		}

		// Then push groups in reverse so they’re popped in original order
		for (let i = childNames.length - 1; i >= 0; i--) {
			const name = childNames[i];
			// @ts-expect-error - dynamic property
			const child = node[name];
			if (matchIsGroup(child)) {
				stack.push({ prefix: `${prefix}${name}/`, node: child });
			}
		}
	}
}
