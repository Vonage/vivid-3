import { elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { AudioPlayer } from './audio-player';
import { audioPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-audio-player';

describe('vwc-audio-player', () => {
	let element: AudioPlayer;
	// let play: any;
	// let pause: any;

	// global.Audio = jest.fn().mockImplementation(() => ({
	// 	pause: jest.fn(),
	// 	play: jest.fn(),
	// }));

	// beforeEach(() => {
	// 	play = HTMLMediaElement.prototype.play;
	// 	HTMLMediaElement.prototype.play = jest.fn();
	// 	pause = HTMLMediaElement.prototype.pause;
	// 	HTMLMediaElement.prototype.pause = jest.fn();
	// });

	// afterAll(() => {
	// 	HTMLMediaElement.prototype.pause = pause;
	// 	HTMLMediaElement.prototype.play = play;
	// });

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} timestamp src="https://download.samplelib.com/mp3/sample-6s.mp3"></${COMPONENT_TAG}>`
		)) as AudioPlayer;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-audio-player', async () => {
			expect(audioPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(AudioPlayer);
			expect(element.src).toEqual('https://download.samplelib.com/mp3/sample-6s.mp3');
			expect(element.connotation).toBeUndefined();
			expect(element.timestamp).toEqual(true);
			expect(element.noseek).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.paused).toEqual(true);
		});
	});

	describe('timestamp', function () {
		it('should add the timestamp when equal to true', async function () {
			element.timestamp = false;
			await elementUpdated(element);

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
		it('should remove the slider when equal to true', async function () {
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
			const src = 'http://localhost/audio.mp3';
			element.src = src;
			await elementUpdated(element);

			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
			expect(audio.src).toEqual(src);
		});
	});

	// describe('connotation', function () {
	// 	it('should set the connotation class on base', async function () {
	// 		const connotation = Connotation.CTA;
	// 		const connotationClassExistsBeforeTheChange = getBaseElement(element).classList.contains(`connotation-${connotation}`);

	// 		element.connotation = connotation;
	// 		await elementUpdated(element);
	// 		const connotationClassExistsAfterChange = getBaseElement(element).classList.contains(`connotation-${connotation}`);

	// 		expect(connotationClassExistsBeforeTheChange)
	// 			.toEqual(false);
	// 		expect(connotationClassExistsAfterChange)
	// 			.toEqual(true);
	// 	});
	// });

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

			await elementUpdated(element);
			expect(element.paused).toEqual(false);
		});

		it('should change button icon', async function () {
			const pauseButton = getBaseElement(element).querySelector('.pause') as Button;
			expect(pauseButton.icon).toEqual('play-solid');

			pauseButton.click();
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('pause-solid');

			pauseButton.click();
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('play-solid');
		});
	});

	describe('rewind', function () {
		it('should call rewind when the slider is clicked', async function () {
			const slider = getBaseElement(element).querySelector('vwc-slider') as Slider;
			element._rewind = jest.fn();

			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
			const audioConstructor = jest.spyOn(audio, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);

			slider.dispatchEvent(new MouseEvent('mousedown', { clientX: 50 }));
			slider.value = '99';
			await elementUpdated(element);

			expect(element._rewind).toHaveBeenCalled();
		});
	});

	describe('updateProgress', function () {
		it('should call updateProgress when timeupdate', async function () {
			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
			element._updateProgress = jest.fn();

			const event = new Event('timeupdate');
			audio.currentTime = 200;
			audio.dispatchEvent(event);

			await elementUpdated(element);
			expect(element._updateProgress).toHaveBeenCalled();
		});

		it('should update current time when updateProgress is called', async function () {
			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;

			audio.currentTime = 1000;
			await elementUpdated(element);

			element._updateProgress();

			await elementUpdated(element);
			expect(getBaseElement(element).querySelector('.current-time')?.textContent).toEqual('16:40');
		});
	});

	describe('updateTotalTime', function () {
		it('should call updateTotalTime when loadedmetadata', async function () {
			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
			element._updateTotalTime = jest.fn();

			const event = new Event('loadedmetadata');
			audio.currentTime = 700;
			audio.dispatchEvent(event);

			await elementUpdated(element);
			expect(element._updateTotalTime).toHaveBeenCalled();
		});

		it('should update total-time when updateTotalTime is called', async function () {
			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
			const audioConstructor = jest.spyOn(audio, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);

			element._updateTotalTime();
			expect(getBaseElement(element).querySelector('.total-time')?.textContent).toEqual('1:00');
			audioConstructor.mockRestore();
		});

		it('should update total time when updateTotalTime is called', async function () {
			const audio = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
			const audioConstructor = jest.spyOn(audio, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);
			audio.currentTime = 1000;

			const event = new MouseEvent('click', {
				clientX: 50,
			});

			const slider = getBaseElement(element).querySelector('.slider') as HTMLElement;
			Object.defineProperty(slider, 'offsetLeft', { value: 0, writable: false });
			Object.defineProperty(slider, 'offsetWidth', { value: 100, writable: false });
			Object.defineProperty(slider, 'clientWidth', { value: 200, writable: false });

			slider.dispatchEvent(event);

			await elementUpdated(element);
			expect(getBaseElement(element).querySelector('.total-time')?.textContent).toEqual('0:00');
			audioConstructor.mockRestore();
		});
	});
});
