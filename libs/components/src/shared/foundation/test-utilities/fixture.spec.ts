import {
	attr,
	customElement,
	FASTElement,
	html,
	observable,
	Updates,
} from '@microsoft/fast-element';
import { fixture, uniqueElementName } from './fixture';

describe('The fixture helper', () => {
	const name = uniqueElementName();

	const template = html<MyElement>`
		${(x) => x.value}
		<slot></slot>
	`;

	@customElement({
		name,
		template,
	})
	class MyElement extends FASTElement {
		/* eslint-disable-next-line */
		@attr value = 'value';
	}

	class MyModel {
		@observable value = 'different value';
	}

	it('can create a fixture for an element by name', async () => {
		const { element } = await fixture(name);
		expect(element instanceof MyElement).toEqual(true);
	});

	it('can connect an element', async () => {
		const { element, connect } = await fixture(name);

		expect(element.isConnected).toEqual(false);

		await connect();

		expect(element.isConnected).toEqual(true);

		document.body.removeChild(element.parentElement!);
	});

	it('should not throw when connect is called multiple times', async () => {
		const { connect } = await fixture(name);

		await connect();
		await connect();
	});

	it('can disconnect an element', async () => {
		const { element, connect, disconnect } = await fixture(name);

		expect(element.isConnected).toEqual(false);

		await connect();

		expect(element.isConnected).toEqual(true);

		await disconnect();

		expect(element.isConnected).toEqual(false);
	});

	it('can bind an element to data', async () => {
		const source = new MyModel();
		const nameTag = html.partial(name);

		const { element, disconnect } = await fixture<MyElement>(
			html<MyModel>`
    <${nameTag} value=${(x) => x.value}></${nameTag}>
  `,
			{ source }
		);

		expect(element.value).toEqual(source.value);

		source.value = 'something else';

		await Updates.next();

		expect(element.value).toEqual(source.value);

		await disconnect();
	});
});
