// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '../../../../dist/libs/styles/tokens/theme-light.css';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '../../../../dist/libs/styles/fonts/spezia-variable.css';
import { VButton, VDateRangePicker, VTextField } from '@vivid-nx/react-wrappers';
import { useRef, useState } from 'react';
import { Button } from '@vonage/vivid';

export function App() {
	const button = useRef<Button>(null);
	const [value, setValue] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	const handleClick = () => {
		console.log('ref', button.current?.connotation);
		console.log('value', value);
		console.log('start', start);
		console.log('end', end);
		setValue('test');
	}

	return (
		<div>
			<VButton label="Hello world" connotation="cta" ref={button} onClick={handleClick} style={{margin: 100}} className="my-class" data-test-id="test-id" id="button">
				<span slot="icon">icon</span>
			</VButton>
			<VTextField label="Hello world" value={value} onInput={(e) => setValue((e.target as HTMLInputElement).value)} errorText="error"/>
			<VDateRangePicker label="Hello world" start={start} end={end} onInputStart={(e: any) => setStart(e.target.start)} onInputEnd={(e: any) => setEnd(e.target.end)} />
		</div>
	);
}

export default App;
