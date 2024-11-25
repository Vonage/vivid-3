// import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {DOMParser, Schema} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

/**
 * @public
 * @component text-editor
 */
export class TextEditor extends FoundationElement {
	// Mix the nodes from prosemirror-schema-list into the basic schema to
	// create a schema with list support.
	mySchema = new Schema({
		nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
		marks: schema.spec.marks
	});

	windowView: any;
	private elEditor!: HTMLDivElement;
	private elContent!: HTMLDivElement;

	override connectedCallback(): void {
		super.connectedCallback();
		this.initialiseEditor();
	}

	initialiseEditor() {
		this.elEditor = this.shadowRoot!.getElementById("editor") as HTMLDivElement;
		this.elContent =this.shadowRoot!.getElementById('content') as HTMLDivElement;
		if (!this.elContent) return;

		this.moveInitialContent()
		
		this.windowView = new EditorView(this.elEditor, {
			state: EditorState.create({
				doc: DOMParser.fromSchema(this.mySchema).parse(this.elContent),
				plugins: exampleSetup({schema: this.mySchema})
			})
		});
	}

	moveInitialContent() {
		const initialContent: NodeListOf<Element> = this.querySelectorAll('[slot="content"]');
		for(const contentNode of initialContent) {
			this.elContent.appendChild(contentNode);
		}
	}
}
