/**
 * @testSelector `nested `inner backticks` test`
 * @testAction `backticks with spaces    and    tabs	`
 * @testQuery special!@#$%^&*()_+-={}[]|\\:";'<>,.?/
 * @testRef unicode café `тест` emoji🚀
 * @testSelector `css selector div.class#id[attr="value"]`
 * @testAction `json {"key": "value", "array": [1, 2, 3]}`
 */
export class SpecialCharactersComponent extends HTMLElement {}
