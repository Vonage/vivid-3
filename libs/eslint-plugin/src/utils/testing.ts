export const convertAnnotatedSourceToFailureCase = ({
	annotatedSource,
	fixedSource,
	message,
	options,
}: {
	annotatedSource: string;
	fixedSource?: string;
	message: string;
	options?: unknown[];
}) => {
	const annotatedSourceLines = annotatedSource.replace(/\t/g, '  ').split('\n');
	const line = annotatedSourceLines.findIndex((line) => line.includes('~'));
	const column = annotatedSourceLines[line].indexOf('~') + 1;
	const endLine = line;
	const endColumn = annotatedSourceLines[endLine].lastIndexOf('~') + 2;

	annotatedSourceLines.splice(line, 1);

	return {
		...(options && { options }),
		code: annotatedSourceLines.join('\n'),
		...(fixedSource && { output: fixedSource.replace(/\t/g, '  ') }),
		errors: [
			{
				message,
				line,
				column,
				endLine,
				endColumn,
			},
		],
	};
};
