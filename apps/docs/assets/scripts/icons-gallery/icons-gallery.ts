import {
	customElement,
	FASTElement,
	html,
	Observable,
	observable,
	ref,
	repeat,
	volatile,
} from '@microsoft/fast-element';
import {
	type IconDefinition,
	ICONS_MANIFEST_URL,
	type IconsManifest,
	type IconTag,
} from '@repo/consts';
import type { Alert } from '../vivid';
import styles from './icons-gallery.style.scss?inline';

const fetchIcons = async (): Promise<IconsManifest> =>
	(await fetch(ICONS_MANIFEST_URL)).json();

const matchesText = (searchString: string) => (icon: IconDefinition) =>
	icon.id.includes(searchString) ||
	icon.keyword.some((keyword) => keyword.includes(searchString));

const matchesCategory = (selectedCategory: string) => (icon: IconDefinition) =>
	!selectedCategory || icon.tag.includes(`category_${selectedCategory}`);

const iconCategory = (icon: IconDefinition) =>
	icon.tag.find((tag) => tag.includes('category_'))!.substring(9);

const uniqueCategories = (icons: IconDefinition[]) =>
	Array.from(new Set(icons.map(iconCategory)));

const NUM_TO_SHOW = 21;

class TagGroup {
	constructor(public options: TagOption[]) {}

	matches(icon: IconDefinition) {
		if (!this.options.some((option) => option.isSelected)) return true;

		return this.options.some(
			(option) => option.isSelected && icon.tag.includes(option.id)
		);
	}
}

class TagOption {
	@observable isSelected = false;
	constructor(public id: IconTag, public label: string) {}
}

const tagOptionTemplate = html<TagOption>`
	<vwc-tag
		label="${(x) => x.label}"
		selectable
		:selected="${(x) => x.isSelected}"
		@selected-change="${(x, c) =>
			(x.isSelected = (c.event.target as any).selected)}"
		shape="pill"
	></vwc-tag>
`;

@customElement({
	name: 'docs-icons-gallery',
	styles,
	template: html<DocsIconsGallery>`
		<div class="div-wrapper">
			<vwc-action-group shape="pill">
				<vwc-text-field
					class="search-field"
					icon="search-line"
					placeholder="Search"
					appearance="ghost"
					shape="pill"
					:value="${(x) => x.searchString}"
					@input="${(x, c) =>
						(x.searchString = (c.event.target as HTMLInputElement).value)}"
					aria-label="Search Icons"
				>
				</vwc-text-field>
				<vwc-divider orientation="vertical"></vwc-divider>
				<vwc-select
					appearance="ghost"
					shape="pill"
					aria-label="Category"
					:value="${(x) => x.selectedCategory}"
					@change="${(x, c) =>
						(x.selectedCategory = (c.event.target as HTMLSelectElement).value)}"
					placeholder="Category"
				>
					${repeat(
						(x) => x.categories,
						html<string>`
							<vwc-option
								value="${(x) => x}"
								text="${(x) => x.charAt(0).toUpperCase() + x.slice(1)}"
							></vwc-option>
						`
					)}
				</vwc-select>
			</vwc-action-group>
			<div class="tag-wrapper">
				<vwc-tag-group class="tag-group">
					Filter By Style:
					${repeat((x) => x.styleOptions.options, tagOptionTemplate)}
				</vwc-tag-group>
				<vwc-tag-group class="tag-group">
					Filter By Color:
					${repeat((x) => x.colorOptions.options, tagOptionTemplate)}
				</vwc-tag-group>
			</div>
			<vwc-layout id="icons-layout" gutters="small">
				${repeat(
					(x) => x.visibleIcons,
					html<IconDefinition, DocsIconsGallery>`
						<div
							class="icon-div"
							data-icon="${(x) => x.id}"
							@click="${(x, c) => c.parent.onIconClick(x.id)}"
						>
							<span class="icon-span">
								<vwc-icon size="-2" name="${(x) => x.id}"></vwc-icon>
							</span>
							<span class="name-span">${(x) => x.id}</span>
						</div>
					`,
					{ recycle: false }
				)}
			</vwc-layout>
			<div class="button-wrapper">
				<vwc-button
					label="Show More"
					appearance="filled"
					?disabled="${(x) => x.isShowMoreDisabled}"
					@click="${(x) => x.onShowMoreClick()}"
					shape="pill"
				></vwc-button>
			</div>
			<vwc-alert
				${ref('copyAlert')}
				text="Icon name copied to clipboard"
				connotation="success"
				timeoutms="2000"
				exportparts="vvd-theme-alternate"
			></vwc-alert>
		</div>
	`,
})
export class DocsIconsGallery extends FASTElement {
	@observable icons: IconDefinition[] = [];
	@observable categories: string[] = [];

	@observable searchString = '';
	searchStringChanged() {
		this.resetShowMore();
	}
	@observable selectedCategory = '';
	selectedCategoryChanged() {
		this.resetShowMore();
	}
	styleOptions = new TagGroup([
		new TagOption('style_weight_solid', 'Solid'),
		new TagOption('style_weight_regular', 'Line'),
	]);
	colorOptions = new TagGroup([
		new TagOption('style_color_single', 'Single'),
		new TagOption('style_color_multi', 'Multi'),
	]);
	get allTagOptions() {
		return [...this.styleOptions.options, ...this.colorOptions.options];
	}
	#tagOptionChangeHandler = {
		handleChange: () => {
			this.resetShowMore();
		},
	};

	override connectedCallback() {
		super.connectedCallback();
		this.loadIcons();

		for (const option of this.allTagOptions) {
			Observable.getNotifier(option).subscribe(
				this.#tagOptionChangeHandler,
				'isSelected'
			);
		}
	}

	override disconnectedCallback() {
		for (const option of this.allTagOptions) {
			Observable.getNotifier(option).unsubscribe(
				this.#tagOptionChangeHandler,
				'isSelected'
			);
		}
	}

	async loadIcons() {
		this.icons = await fetchIcons();
		this.categories = uniqueCategories(this.icons);
	}

	@volatile
	get filteredIcons() {
		return this.icons
			.filter(matchesText(this.searchString.toLowerCase()))
			.filter(matchesCategory(this.selectedCategory))
			.filter((item) => this.styleOptions.matches(item))
			.filter((item) => this.colorOptions.matches(item));
	}

	get visibleIcons() {
		return this.filteredIcons.slice(0, this.numIconsShown);
	}

	@observable numIconsShown = NUM_TO_SHOW;

	onShowMoreClick() {
		this.numIconsShown += NUM_TO_SHOW;
	}

	resetShowMore() {
		this.numIconsShown = NUM_TO_SHOW;
	}

	get isShowMoreDisabled() {
		return this.numIconsShown >= this.filteredIcons.length;
	}

	@observable copyAlert!: Alert;

	onIconClick(id: string) {
		navigator.clipboard.writeText(id);
		this.copyAlert.open = true;
	}
}
