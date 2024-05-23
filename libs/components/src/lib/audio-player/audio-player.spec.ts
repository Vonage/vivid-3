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
		originalPlay = HTMLMediaElement.prototype.play;
		HTMLMediaElement.prototype.play = jest.fn();
		originalPause = HTMLMediaElement.prototype.pause;
		HTMLMediaElement.prototype.pause = jest.fn();
	}

	function setAudioElementDuration(duration: number) {
		jest.spyOn(nativeAudioElement, 'duration', 'get').mockReturnValue(duration);
	}

	function setAudioElementCurrentTime(time: number) {
		nativeAudioElement.currentTime = time;
		const event = new Event('timeupdate');
		nativeAudioElement.dispatchEvent(event);
	}

	function setAudioTimeToEnd() {
		setAudioElementCurrentTime(nativeAudioElement.duration);
	}

	let element: AudioPlayer;
	let originalPlay: any;
	let originalPause: any;
	let originalAudio: any;
	let nativeAudioElement: HTMLAudioElement;

	beforeAll(() => {
		class AudioMock extends Audio {
			constructor() {
				super();
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				nativeAudioElement = this;
			}
		}
		originalAudio = window.Audio;
		window.Audio = AudioMock;
	});

	afterAll(() => {
		HTMLMediaElement.prototype.pause = originalPause;
		HTMLMediaElement.prototype.play = originalPlay;
		window.Audio = originalAudio;
	});

	const SOURCE = 'https://download.samplelib.com/mp3/sample-6s.mp3';

	beforeEach(async () => {
		mockMediaElementPlayAndPause();

		element = (await fixture(
			`<${COMPONENT_TAG} timestamp src="${SOURCE}"></${COMPONENT_TAG}>`
		)) as AudioPlayer;

	});


	it('should update current time element text', async () => {
		const duration = 60;
		const currentTime = 30;
		const expectedValue = '0:30';

		setAudioElementDuration(duration);
		setAudioElementCurrentTime(currentTime);
		await elementUpdated(element);

		expect(getCurrentTimeElement()?.textContent).toBe(expectedValue);
	});

	it('should update slider value and ariavaluetext on audio progress', async () => {
		const duration = 60;
		const currentTime = 20;
		const expectedValue = '33';
		const expectedAriaValuetext = '0:20';

		setAudioElementDuration(duration);
		setAudioElementCurrentTime(currentTime);
		await elementUpdated(element);

		expect(getSliderElement().value).toEqual(expectedValue);
		expect(getSliderElement().ariaValuetext).toEqual(expectedAriaValuetext);
	});

	it('should update duration on loadmetadata', async function () {
		setAudioElementDuration(800);
		const event = new Event('loadedmetadata');
		nativeAudioElement.currentTime = 700;
		nativeAudioElement.dispatchEvent(event);

		await elementUpdated(element);
		expect(element.duration).toEqual(800);
	});

	it('should update total-time on loadedmetadata', async function () {
		setAudioElementDuration(60);

		nativeAudioElement.currentTime = 50;
		const event = new Event('loadedmetadata');
		nativeAudioElement.dispatchEvent(event);

		expect(getTotalTimeElement()?.textContent).toEqual('1:00');
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
		let pauseButton: Button;
		beforeEach(() => {
			pauseButton = getPauseButtonElement();
		});

		it('should init as true', () => {
			expect(element.paused).toEqual(true);
		});

		it('should toggle pause on click', async function () {
			setAudioElementDuration(60);

			pauseButton.click();
			await elementUpdated(element);

			expect(element.paused).toEqual(false);
		});

		it('should change button icon to "play-solid" when paused is true', async function () {
			setAudioElementDuration(60);

			expect(pauseButton.icon).toEqual('play-solid');
		});

		it('should change button icon to "pause-solid" when paused is false', async function () {
			element.paused = false;
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('pause-solid');
		});

		it.each(['keyup', 'keydown', 'mousedown'])(
			'should pause audio on %s of the slider',
			async function (eventName) {
				element.paused = false;
				await elementUpdated(element);
				setAudioElementDuration(60);

				const event = new Event(eventName, { bubbles: true });
				getSliderElement().dispatchEvent(event);

				await elementUpdated(element);
				expect(element.paused).toEqual(true);
			}
		);

		it('should pause when finished', async function () {
			element.paused = false;
			setAudioElementDuration(60);
			await elementUpdated(element);

			setAudioTimeToEnd();

			await elementUpdated(element);
			expect(element.paused).toEqual(true);
		});

		it('should call native audio play when set to false', async () => {
			element.paused = false;
			expect(nativeAudioElement.play).toHaveBeenCalled();
		});

		it('should call native audio pause when set to true', async () => {
			element.paused = false;
			element.paused = true;
			expect(nativeAudioElement.pause).toHaveBeenCalled();
		});
	});

	describe('skip-by', function () {
		const getSkipBackwardButton = () =>
			getBaseElement(element).querySelector('.backward') as Button | null;
		const getSkipForwardButton = () =>
			getBaseElement(element).querySelector('.forward') as Button | null;

			beforeEach(() => {
				setAudioElementDuration(60);
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
			nativeAudioElement.currentTime = 10;
			await elementUpdated(element);

			getSkipBackwardButton()?.click();

			await elementUpdated(element);
			expect(nativeAudioElement.currentTime).toEqual(5);
		});

		it('should skip forward when clicking forward button according to the skip-by attribute', async () => {
			element.skipBy = MediaSkipBy.Five;
			nativeAudioElement.currentTime = 10;
			await elementUpdated(element);

			getSkipForwardButton()?.click();

			await elementUpdated(element);
			expect(nativeAudioElement.currentTime).toEqual(15);
		});

		it('should pause when skipping to the end', async function () {
			element.skipBy = MediaSkipBy.Five;
			nativeAudioElement.currentTime = 55;
			await elementUpdated(element);

			getSkipForwardButton()?.click();

			await elementUpdated(element);
			expect(nativeAudioElement.paused).toEqual(true);
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
