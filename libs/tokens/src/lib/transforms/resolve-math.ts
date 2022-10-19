import type { Named, Transform } from "style-dictionary";


function checkAndEvaluateMath(expr) {
	try {
		eval(expr);
		return +eval(expr).toFixed(3);
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
  matcher: (token) => token.type === 'sizing',
  transformer: (token) => `${checkAndEvaluateMath(token.value)}`
};
