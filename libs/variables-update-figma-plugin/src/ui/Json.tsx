import styles from './styles.module.css';

import { Textarea } from 'figma-kit';
import type { ChangeEvent, FunctionComponent } from 'react';

export interface JsonProps {
	onChange?: (json: string) => void;
}

export const Json: FunctionComponent<JsonProps> = ({ onChange }) => {
	const setJson = (event: ChangeEvent<HTMLTextAreaElement>) => {
		if (!event.target.value) return;

		try {
			if (onChange) {
				onChange(event.target.value);
			}
		} catch {
			return;
		}
	};

	return (
		<div className={styles.formRow}>
			<Textarea minRows={20} maxRows={20} onChange={setJson} />
		</div>
	);
};
