import { Parser } from "expr-eval";
import type { Named, Transform } from "style-dictionary";

/**
 * Helper: Transforms math like Figma Tokens
 */
const parser = new Parser();

function checkAndEvaluateMath(expr) {
	try {
		parser.evaluate(expr);
		return +parser.evaluate(expr).toFixed();
	} catch (ex) {
    return expr;
  }
}

/**
 * Transform to resolve math across all tokens
 */
export const resolveMath: Named<Transform> = {
  name: "resolveMath",
  type: "value",
  transitive: true,
  matcher: (token) => Boolean(token),
  transformer: (token) => `${checkAndEvaluateMath(token.value)}`
};
