import type { Collection } from '@main/api/get-collections';
import { mainApiClient } from '@ui/ui.api';
import { Input, Select } from 'figma-kit';
import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import styles from './styles.module.css';

export interface SelectedCollection {
	id: string;
	name: string;
}

export interface CollectionSelectProps {
	onChange?: (collectionId: SelectedCollection) => void;
}

export const CollectionSelect: FC<CollectionSelectProps> = ({ onChange }) => {
	const [collectionsOptions, setCollectionOptions] = useState<Collection[]>([]);
	const [newCollection, setNewCollection] = useState<boolean>(false);

	async function loadCollections() {
		const options = await mainApiClient.getCollections();

		setCollectionOptions(options);
	}

	const updateSelection = (value: string) => {
		const selected = collectionsOptions.find((op) => op.id === value);
		if (onChange) {
			onChange({
				id: selected?.id || 'new',
				name: selected?.name || '',
			});
		}

		setNewCollection(value === 'new');
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
		loadCollections();
	}, []);

	return (
		<div className={styles.formRow}>
			<Select.Root
				onValueChange={updateSelection}
				onOpenChange={async () => await loadCollections()}
			>
				<Select.Trigger />
				<Select.Content>
					<Select.Item value="new">Create new collection</Select.Item>
					<Select.Separator />
					{collectionsOptions.map((collection) => (
						<Select.Item key={collection.id} value={collection.id}>
							{collection.name}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>

			{newCollection && (
				<Input
					placeholder="New collection name"
					selectOnClick={true}
					onChange={updateName}
				/>
			)}
		</div>
	);
};
