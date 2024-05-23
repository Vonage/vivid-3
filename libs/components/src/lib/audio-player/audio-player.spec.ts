import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation, MediaSkipBy } from '../enums';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { AudioPlayer } from './audio-player';
import { audioPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-audio-player';

describe('vwc-audio-player', () => {

	function getCurrentTimeElement() {
		return getBaseElement(element).querySelector('.current-time');
	}

	function getTotalTimeElement() {
		return getBaseElement(element).querySelector('.total-time');
	}

	function getSliderElement() {
		return getBaseElement(element).querySelector('.slider') as Slider;
	}

	function getPauseButtonElement() {
		return getBaseElement(element).querySelector('.pause') as Button;
	}
	
	function mockMediaElementPlayAndPause() {
		play = HTMLMediaElement.prototype.play;
		HTMLMediaElement.prototype.play = jest.fn();
		pause = HTMLMediaElement.prototype.pause;
		HTMLMediaElement.prototype.pause = jest.fn();
	}

	let element: AudioPlayer;
	let play: any;
	let pause: any;
	let nativeAudioElement: HTMLAudioElement;

	afterAll(() => {
		HTMLMediaElement.prototype.pause = pause;
		HTMLMediaElement.prototype.play = play;
	});

	const SOURCE = 'https://download.samplelib.com/mp3/sample-6s.mp3';

	beforeEach(async () => {
		mockMediaElementPlayAndPause();

		element = (await fixture(
			`<${COMPONENT_TAG} timestamp src="${SOURCE}"></${COMPONENT_TAG}>`
		)) as AudioPlayer;

		nativeAudioElement = getBaseElement(element).querySelector('audio') as HTMLAudioElement;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-audio-player', async () => {
			expect(audioPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(AudioPlayer);
			expect(element.src).toEqual(
				SOURCE
			);
			expect(element.connotation).toBeUndefined();
			expect(element.notime).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.paused).toEqual(true);
			expect(element.skipBy).toEqual(undefined);
		});
	});

	describe('notime', function () {
		it('should remove the time stamp when true', async function () {
			const currentTimeClassExistsBeforeTheChange = getCurrentTimeElement();
			const totalTimeClassExistsBeforeTheChange = getTotalTimeElement();

			element.notime = true;
			await elementUpdated(element);

			const currentTimeClassExistsAfterTheChange = getCurrentTimeElement();
			const totalTimeClassExistsAfterTheChange = getTotalTimeElement();

			expect(currentTimeClassExistsBeforeTheChange).toBeTruthy();
			expect(totalTimeClassExistsBeforeTheChange).toBeTruthy();

			expect(currentTimeClassExistsAfterTheChange).toBeFalsy();
			expect(totalTimeClassExistsAfterTheChange).toBeFalsy();
		});
	});

	describe('src', function () {
		it('should set the src on audio', async function () {
			const src = 'http://localhost/audio.mp3';
			element.src = src;
			await elementUpdated(element);
			expect(nativeAudioElement.src).toEqual(src);
		});
	});

	describe('connotation', function () {
		it('should initialize without connotation on slider and button', async () => {
			expect(getSliderElement().connotation).toBeUndefined();
			expect(getPauseButtonElement().connotation).toBeUndefined();
		});

		it('should set the connotation class on slider and button', async function () {
			const connotation = Connotation.CTA;
			element.connotation = connotation;
			await elementUpdated(element);

			expect(getSliderElement().connotation).toEqual(connotation);
			expect(getPauseButtonElement().connotation).toEqual(connotation);
		});
	});

	describe('disabled', () => {
		it('should set disabled class on the base element', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains('disabled')
			).toBeTruthy();
		});
	});

	describe('paused', function () {
		it('should pause audio on click', async function () {
			const audioConstructor = jest.spyOn(nativeAudioElement, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);
			const pauseButton = getPauseButtonElement();
			expect(element.paused).toEqual(true);
			pauseButton.click();

			await elementUpdated(element);
			expect(element.paused).toEqual(false);
		});

		it('should change button icon', async function () {
			const audioConstructor = jest.spyOn(nativeAudioElement, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);
			const pauseButton = getPauseButtonElement();
			expect(pauseButton.icon).toEqual('play-solid');

			pauseButton.click();
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('pause-solid');

			pauseButton.click();
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('play-solid');
		});

		it.each(['keyup', 'keydown', 'mousedown'])(
			'should pause audio on %s of the slider',
			async function (eventName) {
				const playButton = getPauseButtonElement();
				playButton.click();
				await elementUpdated(element);
				const audioConstructor = jest.spyOn(nativeAudioElement, 'duration', 'get');
				const mockAudioElement = { duration: 60 };
				audioConstructor.mockImplementation(() => mockAudioElement.duration);

				const event = new Event(eventName, { bubbles: true });
				getSliderElement().dispatchEvent(event);

				await elementUpdated(element);
				expect(element.paused).toEqual(true);
			}
		);

		it('should pause when finished', async function () {
			element.paused = false;
			const audioConstructor = jest.spyOn(nativeAudioElement, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);
			await elementUpdated(element);

			const event = new Event('timeupdate');
			nativeAudioElement.currentTime = nativeAudioElement.duration;
			nativeAudioElement.dispatchEvent(event);

			await elementUpdated(element);
			expect(element.paused).toEqual(true);
		});
	});

	describe('updateProgress', function () {
		it('should call updateProgress when timeupdate', async function () {
			element._updateProgress = jest.fn();

			const event = new Event('timeupdate');
			nativeAudioElement.currentTime = 200;
			nativeAudioElement.dispatchEvent(event);

			await elementUpdated(element);
			expect(element._updateProgress).toHaveBeenCalled();
		});

		it('should update current time when updateProgress is called', async function () {
			const audioConstructor = jest.spyOn(nativeAudioElement, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);

			nativeAudioElement.currentTime = 200;
			await elementUpdated(element);

			element._updateProgress();

			await elementUpdated(element);
			expect(
				getCurrentTimeElement()?.textContent
			).toEqual('3:20');
		});
	});

	describe('updateTotalTime', function () {
		it('should call updateTotalTime when loadedmetadata', async function () {
			element._updateTotalTime = jest.fn();

			const event = new Event('loadedmetadata');
			nativeAudioElement.currentTime = 700;
			nativeAudioElement.dispatchEvent(event);

			await elementUpdated(element);
			expect(element._updateTotalTime).toHaveBeenCalled();
		});

		it('should update total-time when updateTotalTime is called', async function () {
			const audioConstructor = jest.spyOn(nativeAudioElement, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);

			element._updateTotalTime();
			expect(
				getBaseElement(element).querySelector('.total-time')?.textContent
			).toEqual('1:00');
			audioConstructor.mockRestore();
		});
	});

	describe('skip-by', function () {
		const getSkipBackwardButton = () =>
			getBaseElement(element).querySelector('.backward') as Button | null;
		const getSkipForwardButton = () =>
			getBaseElement(element).querySelector('.forward') as Button | null;

		let audio: HTMLAudioElement;
		beforeEach(() => {
			audio = getBaseElement(element).querySelector(
				'audio'
			) as HTMLAudioElement;
			const audioConstructor = jest.spyOn(audio, 'duration', 'get');
			const mockAudioElement = { duration: 60 };
			audioConstructor.mockImplementation(() => mockAudioElement.duration);
		});

		it('should hide skip buttons when skip-by is unset', async function () {
			expect(getSkipBackwardButton()).toBe(null);
			expect(getSkipForwardButton()).toBe(null);
		});

		it('should hide skip buttons when skip-by is set to Zero', async function () {
			element.skipBy = MediaSkipBy.Zero;
			await elementUpdated(element);

			expect(getSkipBackwardButton()).toBe(null);
			expect(getSkipForwardButton()).toBe(null);
		});

		it('should not show skip buttons when skip-by is set to an invalid value', async function () {
			element.skipBy = '33' as MediaSkipBy;
			await elementUpdated(element);

			expect(getSkipBackwardButton()).toBe(null);
			expect(getSkipForwardButton()).toBe(null);
		});

		it('should set buttons when MediaSkipBy not set to Zero', async function () {
			element.skipBy = MediaSkipBy.Ten;
			await elementUpdated(element);

			expect(getSkipBackwardButton()).not.toBe(null);
			expect(getSkipForwardButton()).not.toBe(null);
		});

		it('should skip backwards when clicking backward button according to the skip-by attribute', async () => {
			element.skipBy = MediaSkipBy.Five;
			audio.currentTime = 10;
			await elementUpdated(element);

			getSkipBackwardButton()?.click();

			await elementUpdated(element);
			expect(audio.currentTime).toEqual(5);
		});

		it('should skip forward when clicking forward button according to the skip-by attribute', async () => {
			element.skipBy = MediaSkipBy.Five;
			audio.currentTime = 10;
			await elementUpdated(element);

			getSkipForwardButton()?.click();

			await elementUpdated(element);
			expect(audio.currentTime).toEqual(15);
		});

		it('should pause when skipping to the end', async function () {
			element.skipBy = MediaSkipBy.Five;
			audio.currentTime = 55;
			await elementUpdated(element);

			getSkipForwardButton()?.click();

			await elementUpdated(element);
			expect(audio.paused).toEqual(true);
		});

		it.each([
			[MediaSkipBy.Five, '5-sec-backward-line'],
			[MediaSkipBy.Ten, '10-sec-backward-line'],
			[MediaSkipBy.Thirty, '30-sec-backward-line'],
		])(
			'should change the backward icon accordingly when skipBy is %s',
			async function (skipBy, icon) {
				element.skipBy = skipBy;
				await elementUpdated(element);

				expect(getSkipBackwardButton()!.icon).toEqual(icon);
			}
		);

		it.each([
			[MediaSkipBy.Five, '5-sec-forward-line'],
			[MediaSkipBy.Ten, '10-sec-forward-line'],
			[MediaSkipBy.Thirty, '30-sec-forward-line'],
		])(
			'should change the forward icon accordingly when skipBy is %s',
			async function (skipBy, icon) {
				element.skipBy = skipBy;
				await elementUpdated(element);

				expect(getSkipForwardButton()!.icon).toEqual(icon);
			}
		);
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
