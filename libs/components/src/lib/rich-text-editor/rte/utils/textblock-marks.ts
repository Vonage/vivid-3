/**
 * Represents that a mark is allowed inside a certain textblock node.
 */
export interface TextblockMarkSpec {
	markName: string;
	onNodeName?: string; // If not specified, allowed on all textblocks
}

export class TextblockMarks {
	constructor(private specs: TextblockMarkSpec[]) {}

	getAllowedMarksForNode(nodeName: string): string[] {
		return this.specs
			.filter((spec) => !spec.onNodeName || spec.onNodeName === nodeName)
			.map((spec) => spec.markName);
	}

	getReferencedNodeNames(): Set<string> {
		return new Set(
			this.specs.map((spec) => spec.onNodeName).filter(Boolean) as string[]
		);
	}
}
