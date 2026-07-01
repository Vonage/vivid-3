import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import {
	renderIsolated,
	type SampleControls,
} from '@repo/browser-tests/render-isolated';
import { filePickerDefinition } from './definition';

const FilePicker = component(filePickerDefinition);

variationTest(
	'file-picker',
	table({
		caption: 'Layout',
		xAxis: {
			size: ['normal', 'expanded'],
		},
		yAxis: {
			content: {
				'label only': { label: 'Upload file' },
				'label + helper-text': {
					label: 'Upload file',
					'helper-text': 'Max 10MB per file',
				},
				'label + error-text': {
					label: 'Upload file',
					'error-text': 'Please provide a valid file',
				},
				'no label': {},
			},
		},
		render: (variant) => (
			<FilePicker style="inline-size: 300px;" {...flattenAttrs(variant)}>
				Drag &amp; Drop or click to upload
			</FilePicker>
		),
	}),
	table({
		caption: 'Visual',
		xAxis: {
			modifier: {
				default: {},
				disabled: { disabled: true },
			},
		},
		yAxis: {
			_: [null],
		},
		render: (variant) => (
			<FilePicker
				label="Upload file"
				error-message="Please provide a valid file"
				style="inline-size: 300px;"
				{...flattenAttrs(variant)}
			>
				Drag &amp; Drop or click to upload
			</FilePicker>
		),
	}),
	table({
		caption: 'Interaction States',
		xAxis: {
			size: ['normal', 'expanded'],
		},
		yAxis: {
			state: {
				idle: null,
				hover: (ctrl: SampleControls) => ctrl.hover(),
				active: (ctrl: SampleControls) => ctrl.mousedown(),
				focused: (ctrl: SampleControls) => ctrl.tabIn(),
			},
		},
		render: async ({ state, ...rest }) => {
			const el = (
				<FilePicker label="Upload file" style="inline-size: 300px;" {...rest}>
					Drag &amp; Drop or click to upload
				</FilePicker>
			);
			if (!state) return el;
			return renderIsolated(el, { setup: state });
		},
	})
);
