import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation } from '../enums';
import { Button } from '../button/button';
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
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} timestamp src="https://download.samplelib.com/mp3/sample-6s.mp3"></${COMPONENT_TAG}>`
			)) as AudioPlayer;
		});

		it('should pause audio on click', async function () {
			const pauseButton = getBaseElement(element).querySelector('.pause') as HTMLButtonElement;
			expect(element.paused).toEqual(true);
			pauseButton.click();

			await elementUpdated(element);
			expect(element.paused).toEqual(false);
		});

		it('should change button icon', async function () {
			const pauseButton = getBaseElement(element).querySelector('.pause') as Button;
			expect(pauseButton.icon).toEqual('play-solid');

			pauseButton.click();
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('pause-solid');
		});
	});

	describe('rewind', function () {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} timestamp src="https://download.samplelib.com/mp3/sample-6s.mp3"></${COMPONENT_TAG}>`
			)) as AudioPlayer;
		});

		it('should call rewind when the slider is clicked', async function () {
			const slider = getBaseElement(element).querySelector('.slider') as HTMLElement;
			element.rewind = jest.fn();

			const event = new MouseEvent('click', {
				clientX: 100,
			});

			slider.dispatchEvent(event);
			await elementUpdated(element);

			expect(element.rewind).toHaveBeenCalledWith(event);
		});
	});

	describe('updateProgress', function () {
		it('should call updateProgress when timeupdate', () => {
			const audio = element.shadowRoot?.querySelector('audio') as HTMLAudioElement;
			element.updateProgress = jest.fn();

			const event = new Event('timeupdate');
			audio.dispatchEvent(event);

			expect(element.updateProgress).toHaveBeenCalled();
		});
	});

	describe('updateTotalTime', function () {
		it('should call updateTotalTime when loadedmetadata', () => {
			const audio = element.shadowRoot?.querySelector('audio') as HTMLAudioElement;
			element.updateTotalTime = jest.fn();

			const event = new Event('loadedmetadata');
			audio.dispatchEvent(event);

			expect(element.updateTotalTime).toHaveBeenCalled();
		});
	});

	describe('mousedown', function () {
		beforeEach(async () => {
			element = (await fixture(
				`<${COMPONENT_TAG} timestamp src="https://download.samplelib.com/mp3/sample-6s.mp3"></${COMPONENT_TAG}>`
			)) as AudioPlayer;
		});

		it('should call onMouseDown when the pin is mousedown', async function () {
			const pin = getBaseElement(element).querySelector('#progress-pin') as HTMLElement;
			element.onMouseDown = jest.fn();

			const event = new MouseEvent('mousedown', {
				clientX: 100,
			});

			pin.dispatchEvent(event);
			await elementUpdated(element);

			expect(element.onMouseDown).toHaveBeenCalledWith(event);
		});

		it('should call rewind when mousemove', async function () {
			const pin = getBaseElement(element).querySelector('#progress-pin') as HTMLElement;
			element.rewind = jest.fn();

			const downEvent = new MouseEvent('mousedown', {
				clientX: 100,
			});

			pin.dispatchEvent(downEvent);
			await elementUpdated(element);

			const moveEvent = new MouseEvent('mousemove', {
				clientX: 150,
			});

			element.dispatchEvent(moveEvent);
			await elementUpdated(element);

			expect(element.rewind).toHaveBeenCalledWith(downEvent);
		});
	});
});
