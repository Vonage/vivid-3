import {
	CollectionSelect,
	type SelectedCollection,
} from '@ui/CollectionSelect';
import { ModesSelect, type SelectedMode } from '@ui/ModeSelector';
import classes from '@ui/styles.module.css';
import { type FunctionComponent, useEffect, useState } from 'react';

export interface SelectTargetProps {
	onChange?: (target: {
		collection: SelectedCollection | undefined;
		mode: SelectedMode | undefined;
	}) => void;
}

export const SelectTarget: FunctionComponent<SelectTargetProps> = ({
	onChange,
}) => {
	const [collection, setCollection] = useState<SelectedCollection>();
	const [mode, setMode] = useState<SelectedMode>();
	const [createMissing, setCreateMissing] = useState<boolean>();

	useEffect(() => {
		if (onChange) {
			onChange({
				collection,
				mode,
			});
		}
	}, [collection, mode]);

	return (
		<div className={classes.form}>
			<CollectionSelect onChange={setCollection} />
			{collection && collection.id !== 'new' && (
				<ModesSelect collection={collection} onChange={setMode} />
			)}
			{/*<div className={classes.formRow}>*/}
			{/*  <Checkbox.Root onChange={(event) => setCreateMissing(event.target.checked)}>*/}
			{/*    <Checkbox.Input/>*/}
			{/*    <Checkbox.Label>Create missing</Checkbox.Label>*/}
			{/*  </Checkbox.Root>*/}
			{/*</div>*/}
		</div>
	);
};
