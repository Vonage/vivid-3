import type { Mode } from '@main/api/get-modes';
import type { SelectedCollection } from '@ui/CollectionSelect';
import { mainApiClient } from '@ui/ui.api';
import { Input, Select } from 'figma-kit';
import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import styles from './styles.module.css';

export interface SelectedMode {
	id: string;
	name: string;
}

export interface ModesSelectProps {
	collection?: SelectedCollection;
	onChange?: (mode: SelectedMode) => void;
}

export const ModesSelect: FC<ModesSelectProps> = ({ collection, onChange }) => {
	const [newMode, setNewMode] = useState<boolean>(false);
	const [modesOptions, setModesOptions] = useState<Mode[]>([]);

	async function loadModes(collectionId: string) {
		const options = await mainApiClient.getModes(collectionId);

		setModesOptions(options);
	}

	const updateSelection = (value: string) => {
		const selected = modesOptions.find((option) => option.id === value);

		if (onChange) {
			onChange({
				id: selected?.id || 'new',
				name: selected?.name || '',
			});
		}
		setNewMode(value === 'new');
	};

	const updateName = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange({
				id: 'new',
				name: event.target.value,
			});
		}
	};

	useEffect(() => {
		if (collection && !!collection.id) {
			loadModes(collection.id);
		}
	}, [collection]);

	return (
		<div className={styles.formRow}>
			<Select.Root
				onValueChange={updateSelection}
				onOpenChange={async () => await loadModes(collection?.id)}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="new">Create new mode</Select.Item>
					<Select.Separator />
					{modesOptions.map((mode) => (
						<Select.Item key={mode.id} value={mode.id}>
							{mode.name}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>

			{newMode && (
				<Input
					placeholder="New mode name"
					selectOnClick={true}
					onChange={updateName}
				/>
			)}
		</div>
	);
};
