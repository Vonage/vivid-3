import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation } from '../enums';
import { AudioPlayer } from './audio-player';
import { audioPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-audio-player';

describe('vwc-audio-player', () => {
	let element: AudioPlayer;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as AudioPlayer;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-audio-player', async () => {
			expect(audioPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(AudioPlayer);
			expect(element.src).toBeUndefined();
			expect(element.connotation).toBeUndefined();
			expect(element.timestamp).toEqual(false);
			expect(element.noseek).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.paused).toEqual(true);
		});
	});

	describe('timestamp', function () {
		it('should add the timestamp when equal to true', async function () {
			const controls = getBaseElement(element).querySelector('.controls') as HTMLDivElement;
			const currentTimeClassExistsBeforeTheChange = controls.querySelector('.current-time');
			const totalTimeClassExistsBeforeTheChange = controls.querySelector('.total-time');

			element.timestamp = true;
			await elementUpdated(element);

			const currentTimeClassExistsAfterTheChange = controls.querySelector('.current-time');
			const totalTimeClassExistsAfterTheChange = controls.querySelector('.total-time');

			expect(currentTimeClassExistsBeforeTheChange).toBeFalsy();
			expect(totalTimeClassExistsBeforeTheChange).toBeFalsy();

			expect(currentTimeClassExistsAfterTheChange).toBeTruthy();
			expect(totalTimeClassExistsAfterTheChange).toBeTruthy();
		});
	});

	describe('noseek', function () {
		it('should remove the slider from when equal to true', async function () {
			const controls = getBaseElement(element).querySelector('.controls') as HTMLDivElement;
			const sliderClassExistsBeforeTheChange = controls.querySelector('.slider');

			element.noseek = true;
			await elementUpdated(element);

			const sliderClassExistsAfterTheChange = controls.querySelector('.slider');

			expect(sliderClassExistsBeforeTheChange).toBeTruthy();
			expect(sliderClassExistsAfterTheChange).toBeFalsy();
		});
	});

	describe('src', function () {
		it('should set the src on audio', async function () {
			const src = 'https://download.samplelib.com/mp3/sample-6s.mp3';
			element.src = src;
			await elementUpdated(element);

			const audio = element.shadowRoot?.querySelector('audio') as HTMLAudioElement;
			expect(audio.src).toEqual(src);
		});
	});

	describe('connotation', function () {
		it('should set the connotation class on base', async function () {
			const connotation = Connotation.CTA;
			const connotationClassExistsBeforeTheChange = getBaseElement(element).classList.contains(`connotation-${connotation}`);

			element.connotation = connotation;
			await elementUpdated(element);
			const connotationClassExistsAfterChange = getBaseElement(element).classList.contains(`connotation-${connotation}`);

			expect(connotationClassExistsBeforeTheChange)
				.toEqual(false);
			expect(connotationClassExistsAfterChange)
				.toEqual(true);
		});
	});

	describe('disabled', () => {
		it('should set disabled class on the base element', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('disabled')).toBeTruthy();
		});
	});

	describe('paused', function () {
		it('should pause audio on click', async function () {
			const pauseButton = getBaseElement(element).querySelector('.pause') as HTMLButtonElement;
			expect(element.paused).toEqual(true);
			pauseButton.click();

			elementUpdated(element);
			expect(element.paused).toEqual(false);
		});
	});

	describe('rewind', function () {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} timestamp src="https://download.samplelib.com/mp3/sample-6s.mp3"></${COMPONENT_TAG}>`
			)) as AudioPlayer;
		});

		it('should call rewind when the slider is clicked', () => {
			const slider = getBaseElement(element).querySelector('.slider') as HTMLElement;
			element.rewind = jest.fn();

			const event = new MouseEvent('click', {
				clientX: 100,
			});

			slider.dispatchEvent(event);
			elementUpdated(element);

			expect(element.rewind).toHaveBeenCalledWith(event);
		});
	});

	describe('mousedown', function () {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} timestamp src="https://download.samplelib.com/mp3/sample-6s.mp3"></${COMPONENT_TAG}>`
			)) as AudioPlayer;
		});

		it('should call onMouseDown when the pin is clicked', () => {
			const pin = getBaseElement(element).querySelector('#progress-pin') as HTMLElement;
			element.onMouseDown = jest.fn();

			const event = new MouseEvent('mousedown', {
				clientX: 100,
			});

			pin.dispatchEvent(event);
			elementUpdated(element);

			expect(element.onMouseDown).toHaveBeenCalledWith(event);
		});

	});
});
