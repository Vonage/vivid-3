import { Parser } from 'expr-eval';
import { isFontSize, isSizing } from '../filters';

/**
 * Helper: Transforms math like Figma Tokens
 */
const parser = new Parser();

function checkAndEvaluateMath(value) {
	try {
		parser.evaluate(value);
		return +parser.evaluate(value).toFixed(3);
	} catch {
		return value;
	}
}

/**
 * Transform to resolve math across all tokens
 */
export default {
	name: 'resolveMath',
	type: 'value' as const,
	transitive: true,
	filter: (token) => isSizing(token) || isFontSize(token),
	transform: (token) => `${checkAndEvaluateMath(token.value ?? token.$value)}`,
};
