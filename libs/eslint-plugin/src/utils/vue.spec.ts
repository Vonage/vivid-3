import type { Rule } from 'eslint';
import { describe, expect, it, vi } from 'vitest';
import { defineTemplateBodyVisitor } from './vue';

describe('defineTemplateBodyVisitor', () => {
	it('delegates to parserServices.defineTemplateBodyVisitor when available', () => {
		const returnedListener = {} as Rule.RuleListener;
		const defineTemplateBodyVisitorMock = vi
			.fn<
				(
					templateBodyVisitor: Rule.RuleListener,
					scriptVisitor?: Rule.RuleListener,
					options?: { templateBodyTriggerSelector?: 'Program' | 'Program:exit' }
				) => Rule.RuleListener
			>()
			.mockReturnValue(returnedListener);

		const context = {
			sourceCode: {
				parserServices: {
					defineTemplateBodyVisitor: defineTemplateBodyVisitorMock,
				},
			},
		} as unknown as Rule.RuleContext;

		const templateVisitor: Rule.RuleListener = {};
		const scriptVisitor: Rule.RuleListener = {};
		const options = { templateBodyTriggerSelector: 'Program' as const };

		const result = defineTemplateBodyVisitor(
			context,
			templateVisitor,
			scriptVisitor,
			options
		);

		expect(defineTemplateBodyVisitorMock).toHaveBeenCalledTimes(1);
		expect(defineTemplateBodyVisitorMock).toHaveBeenCalledWith(
			templateVisitor,
			scriptVisitor,
			options
		);
		expect(result).toBe(returnedListener);
	});

	it('reports a warning once for .vue files when parserServices are missing', () => {
		const report = vi.fn();
		const context = {
			filename: 'Component.vue',
			report,
			sourceCode: {},
		} as unknown as Rule.RuleContext;

		const result = defineTemplateBodyVisitor(context, {});

		expect(report).toHaveBeenCalledTimes(1);
		expect(report).toHaveBeenCalledWith(
			expect.objectContaining({
				loc: { line: 1, column: 0 },
				message: expect.stringContaining('Use the latest vue-eslint-parser'),
			})
		);
		expect(result).toEqual({});
	});

	it('does not report for non-.vue files when parserServices are missing', () => {
		const report = vi.fn();
		const context = {
			filename: 'Component.ts',
			report,
			sourceCode: {},
		} as unknown as Rule.RuleContext;

		const result = defineTemplateBodyVisitor(context, {});

		expect(report).not.toHaveBeenCalled();
		expect(result).toEqual({});
	});
});
