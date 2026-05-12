import React from 'react';
import VwcBadge from '../../dist/v3/VwcBadge';
import VwcButton from '../../dist/v3/VwcButton';
import VwcSelect from '../../dist/v3/VwcSelect';
import VwcOption from '../../dist/v3/VwcOption';
import VwcRadio from '../../dist/v3/VwcRadio';
import VwcTooltip from '../../dist/v3/VwcTooltip';
import VwcRadioGroup from '../../dist/v3/VwcRadioGroup';
import VwcDataGrid from '../../dist/v3/VwcDataGrid';
import VwcDataGridRow from '../../dist/v3/VwcDataGridRow';
import VwcDataGridCell from '../../dist/v3/VwcDataGridCell';
import { initVivid } from '../../src/initialization/initVivid';

export const VwcBadge_ = () => (
	<>
		<VwcBadge connotation={'alert'} text={'Badge'} />
		<VwcButton
			connotation={'info'}
			label="Button"
			onClick={(e) => console.log(e)}
		></VwcButton>
	</>
);

export const VwcSelect_ = () => (
	<>
		<VwcSelect onChange={(x) => console.log(x)}>
			<VwcOption text={'text1'} label="aaa" />
			<VwcOption text={'text2'} label="bbb" />
		</VwcSelect>
	</>
);

export const VwcRadio_ = () => (
	<>
		<VwcRadioGroup onChange={(x) => console.log(x)}>
			<VwcRadio label="aaa" onChange={(x) => console.log('aaa', x)} />
			<VwcRadio label="bbb" onChange={(x) => console.log('bbb', x)} />
		</VwcRadioGroup>
	</>
);

export const VwcTooltip_ = () => (
	<>
		<VwcTooltip
			id="tooltip"
			style={{
				'--tooltip-inline-size': '200px',
			}}
			text="Tooltip long text Tooltip long text Tooltip long text Tooltip long textTooltip long textTooltip long textTooltip long textTooltip long textTooltip long textTooltip long text"
			anchor={'btn'}
			placement={'right-end'}
		/>
		<VwcButton label="Button" aria-describedby="tooltip" id="btn" />
	</>
);

export const VwcDataGrid_ = () => (
	<>
		<VwcDataGrid>
			<VwcDataGridRow type="rowheader">
				<VwcDataGridCell>Header 1</VwcDataGridCell>
				<VwcDataGridCell>Header 2</VwcDataGridCell>
			</VwcDataGridRow>
			<VwcDataGridRow>
				<VwcDataGridCell>Row 1 Cell 1</VwcDataGridCell>
				<VwcDataGridCell>Row 1 Cell 2</VwcDataGridCell>
			</VwcDataGridRow>
		</VwcDataGrid>
	</>
);
export default {
	title: 'V3',
	decorators: [
		(story) => {
			const InitVivid = ({ children }) => (
				<div
					ref={(x) => {
						if (!x) {
							return;
						}
						initVivid(x, () => {}, {
							font: 'proprietary',
							theme: 'light',
						});
					}}
				>
					{children}
				</div>
			);
			return <InitVivid>{story()}</InitVivid>;
		},
	],
};
