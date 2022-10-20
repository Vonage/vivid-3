import type { Named, Transform } from "style-dictionary";
import { Parser } from 'expr-eval';

/**
 * Helper: Transforms math like Figma Tokens
 */
const parser = new Parser();

function checkAndEvaluateMath(expr) {
  try {
    parser.evaluate(expr);
    return +parser.evaluate(expr).toFixed(3);
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
  matcher: (token) => ['sizing', 'fontSizes'].includes(token.type),
  transformer: (token) => `${checkAndEvaluateMath(token.value)}`
};
