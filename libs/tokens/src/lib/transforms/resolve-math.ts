const { Parser } = require("expr-eval");

/**
 * Helper: Transforms math like Figma Tokens
 */
const parser = new Parser();

function checkAndEvaluateMath(expr) {
	try {
		parser.evaluate(expr);
		return +parser.evaluate(expr).toFixed();
		// return expr == result && !expr.endsWith('px') ? result : result + 'px';
	} catch (ex) {
    return expr;
  }
}

/**
 * Transform to resolve math across all tokens
 */
module.exports = {
  name: "resolveMath",
  type: "value",
  transitive: true,
  matcher: (token) => token,
  // Putting this in strings seems to be required
  transformer: (token) => `${checkAndEvaluateMath(token.value)}`
};
