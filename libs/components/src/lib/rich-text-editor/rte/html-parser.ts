import {
	DOMParser,
	type ParseRule,
	type Schema,
	type StyleParseRule,
	type TagParseRule,
} from 'prosemirror-model';
import DOMPurify from 'dompurify';
import { type RteConfig, RteConfigImpl } from './config';
import type { RteDocument, RteFragment } from './document';
import { impl } from './utils/impl';
import { domPurifyConfig } from './utils/sanitization';

const copy = <T extends object>(obj: T): T => ({ ...obj });

type ParseRules = {
	nodes: {
		[name: string]: TagParseRule[];
	};
	marks: {
		[name: string]: ParseRule[];
	};
};

const parseRulesFromSchema = (schema: Schema): ParseRules => ({
	nodes: Object.fromEntries(
		Object.keys(schema.nodes).map((name) => [
			name,
			(schema.nodes[name].spec.parseDOM ?? []).map(copy),
		])
	),
	marks: Object.fromEntries(
		Object.keys(schema.marks).map((name) => [
			name,
			(schema.marks[name].spec.parseDOM ?? []).map(copy), // Not covered
		])
	),
});

export type RteHtmlParserOptions = {
	/**
	 * Function to modify the parse rules before creating the parser.
	 */
	modifyParseRules?: (rules: ParseRules) => void;
};

type ParseOptions = {
	/**
	 * Function to modify the DOM before parsing.
	 */
	modifyDom?: (dom: DocumentFragment) => void;
};

export class RteHtmlParser {
	/// @internal
	[impl]: RteHtmlParserImpl;

	constructor(config: RteConfig, options?: RteHtmlParserOptions) {
		this[impl] = new RteHtmlParserImpl(config[impl], options);
	}

	/**
	 * Converts an HTML string to an RteDocument.
	 */
	parseDocument(html: string, options?: ParseOptions): RteDocument {
		return this[impl].parser
			.parse(this.parseHtml(html, options), {
				preserveWhitespace: true,
			})
			.toJSON();
	}

	/**
	 * Converts an HTML string to an RteFragment.
	 */
	parseFragment(html: string, options?: ParseOptions): RteFragment {
		return (
			this[impl].parser
				.parseSlice(this.parseHtml(html, options), {
					preserveWhitespace: true,
				})
				.content.toJSON() ?? []
		);
	}

	private parseHtml(html: string, options?: ParseOptions): DocumentFragment {
		const dom = DOMPurify.sanitize(html, {
			RETURN_DOM: true,
			...domPurifyConfig,
		});

		const container = document.createDocumentFragment();
		container.appendChild(dom);
		options?.modifyDom?.(container);

		return container;
	}
}

class RteHtmlParserImpl {
	parser: DOMParser;

	constructor(config: RteConfigImpl, options?: RteHtmlParserOptions) {
		const rules = parseRulesFromSchema(config.schema);
		options?.modifyParseRules?.(rules);
		this.parser = buildDomParser(config.schema, rules);
	}

	/// Used by the editor when foreign HTML is pasted or dropped
	transform(html: string): string {
		return DOMPurify.sanitize(html);
	}
}

const buildDomParser = (
	schema: Schema,
	{ marks, nodes }: ParseRules
): DOMParser => {
	const parserRules: ParseRule[] = [];

	// Rule logic taken from DOMParser.fromSchema:
	const priority = (rule: ParseRule) => rule.priority ?? 50;
	function insert(rule: ParseRule) {
		let i = 0;
		for (; i < parserRules.length; i++) {
			const next = parserRules[i];
			if (priority(next) < priority(rule)) break;
		}
		parserRules.splice(i, 0, rule);
	}
	for (const name in marks) {
		marks[name]?.forEach((rule) => {
			insert((rule = copy(rule) as ParseRule));
			if (!(rule.mark || rule.ignore || (rule as StyleParseRule).clearMark))
				rule.mark = name;
		});
	}
	for (const name in nodes) {
		nodes[name]?.forEach((rule) => {
			insert((rule = copy(rule) as TagParseRule));
			if (!((rule as TagParseRule).node || rule.ignore || rule.mark))
				rule.node = name;
		});
	}

	return new DOMParser(schema, parserRules);
};
