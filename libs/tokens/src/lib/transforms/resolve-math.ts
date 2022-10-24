import type { Named, Transform } from "style-dictionary";
import { Parser } from 'expr-eval';

/**
 * Helper: Transforms math like Figma Tokens
 */
const parser = new Parser();

function checkAndEvaluateMath(value) {
	try {
		parser.evaluate(value);
		return +parser.evaluate(value).toFixed(3);
	} catch (ex) {
		return value;
	}
}

/**
 * Transform to resolve math across all tokens
 */
export const resolveMath: Named<Transform> = {
  name: "resolveMath",
  type: "value",
  transitive: true,
  matcher: (token) => ['sizing'].includes(token.type),
  transformer: (token) => `${checkAndEvaluateMath(token.value)}`
};
