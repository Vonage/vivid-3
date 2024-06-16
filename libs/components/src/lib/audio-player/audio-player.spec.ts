import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation, MediaSkipBy } from '../enums';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { DEFAULT_PLAYBACK_RATES } from '../video-player/video-player';
import { MenuItem } from '../menu-item/menu-item';
import { audioPlayerDefinition } from './definition';
import { AudioPlayer } from './audio-player';
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

	function getSkipBackwardButton() {
		return getBaseElement(element).querySelector('.backward') as Button | null;
	}

	function getSkipForwardButton() {
		return getBaseElement(element).querySelector('.forward') as Button | null;
	}

	function allSubElementsDisabled() {
		return (
			getBaseElement(element).classList.contains('disabled') &&
			getSliderElement()?.hasAttribute('disabled') &&
			getPauseButtonElement()?.hasAttribute('disabled') &&
			getSkipBackwardButton()?.hasAttribute('disabled') &&
			getSkipForwardButton()?.hasAttribute('disabled')
		);
	}

	let element: AudioPlayer;
	let originalAudio: any;
	let nativeAudioElement: HTMLAudioElement;
	let pauseButton: Button;

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
		window.Audio = originalAudio;
	});

	const SOURCE = 'https://download.samplelib.com/mp3/sample-6s.mp3';

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} timestamp src="${SOURCE}"></${COMPONENT_TAG}>`
		)) as AudioPlayer;

		jest.spyOn(nativeAudioElement, 'play').mockImplementation(() => {
			return new Promise((res) => {
				jest.spyOn(nativeAudioElement, 'paused', 'get').mockReturnValue(false);
				res();
			});
		});
		jest.spyOn(nativeAudioElement, 'pause').mockImplementation(async () => {
			jest.spyOn(nativeAudioElement, 'paused', 'get').mockReturnValue(true);
		});

		pauseButton = getPauseButtonElement();
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
		expect(getSliderElement().getAttribute('ariaValuetext')).toEqual(
			expectedAriaValuetext
		);
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
		await elementUpdated(element);

		expect(getTotalTimeElement()?.textContent).toEqual('1:00');
	});

	it('should set currentTime according to slider value on mouseup', async () => {
		const sliderValue = 50;
		const duration = 100;
		const expectedCurrentTimeAfterMouseUp = (sliderValue * duration) / 100;
		setAudioElementCurrentTime(10);
		setAudioElementDuration(duration);
		getSliderElement().value = `${sliderValue}`;

		document.dispatchEvent(new Event('mouseup'));

		expect(nativeAudioElement.currentTime).toBe(
			expectedCurrentTimeAfterMouseUp
		);
	});

	describe('basic', () => {
		it('should be initialized as a vwc-audio-player', async () => {
			expect(audioPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(AudioPlayer);
			expect(element.src).toEqual(SOURCE);
			expect(element.connotation).toBeUndefined();
			expect(element.notime).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.paused).toEqual(true);
			expect(element.skipBy).toEqual(undefined);
		});
	});

	describe('notime', function () {
		it('should remove "two-lines" class from base if set to true', async () => {
			element.notime = true;
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			element.skipBy = MediaSkipBy.Five;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('two-lines')).toBe(
				false
			);
		});

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

		it('should remove src from the audio if unset', async () => {
			const src = 'http://localhost/audio.mp3';
			element.src = src;
			await elementUpdated(element);
			element.src = undefined;
			await elementUpdated(element);
			expect(nativeAudioElement.src).toEqual('');
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

	describe('duration', () => {
		it('should be readonly', async () => {
			const duration = 60;
			setAudioElementDuration(duration);
			await elementUpdated(element);
			element.duration = 50;
			expect(element.duration).toBe(duration);
		});

		it('should disable elements if duration is falsy', async () => {
			element.disabled = false;
			element.skipBy = MediaSkipBy.Ten;
			setAudioElementDuration(0);
			await elementUpdated(element);

			expect(allSubElementsDisabled()).toBeTruthy();
		});
	});

	describe('currentTime', () => {
		it('should change the native currentTime', async () => {
			const currentTime = 60;
			setAudioElementCurrentTime(currentTime);
			await elementUpdated(element);
			element.currentTime = 50;
			expect(element.currentTime).toBe(nativeAudioElement.currentTime);
		});

		it('should reflect the native currentTime', async () => {
			setAudioElementCurrentTime(60);
			await elementUpdated(element);
			expect(element.currentTime).toBe(nativeAudioElement.currentTime);
		});

		it('should set "current-value" on slider', async () => {
			const duration = 120;
			const currentTime = 30;
			setAudioElementDuration(duration);
			setAudioElementCurrentTime(currentTime);
			await elementUpdated(element);
			expect(getSliderElement().getAttribute('current-value')).toBe((100*currentTime/duration).toString());
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

		it('should disable all elements when set', async () => {
			setAudioElementDuration(60);
			element.disabled = true;
			element.skipBy = MediaSkipBy.Ten;
			await elementUpdated(element);
			expect(allSubElementsDisabled()).toBeTruthy();
		});
	});

	describe('play()', () => {
		it('should call native play', () => {
			element.play();
			expect(nativeAudioElement.play).toHaveBeenCalled();
		});

		it('should toggle paused state to false', async () => {
			await element.play();
			expect(element.paused).toBe(false);
		});

		it('should change button icon to "pause-solid" when played', async function () {
			element.play();
			await elementUpdated(element);
			expect(pauseButton.icon).toEqual('pause-solid');
		});
	});

	describe('pause()', () => {
		it('should call native pause', async () => {
			await element.play();
			element.pause();
			expect(nativeAudioElement.pause).toHaveBeenCalled();
		});

		it('should toggle paused state to false', async () => {
			element.pause();
			expect(element.paused).toBe(true);
		});

		it('should change button icon to "play-solid" when called', async function () {
			element.play();
			await elementUpdated(element);
			element.pause();
			setAudioElementDuration(60);
			await elementUpdated(element);

			expect(pauseButton.icon).toEqual('play-solid');
		});
	});

	describe('paused', function () {
		it('should init as true', () => {
			expect(element.paused).toEqual(true);
		});

		it('should toggle paused on click', async function () {
			setAudioElementDuration(60);

			pauseButton.click();
			await elementUpdated(element);
			const pausedAfterFirstClick = element.paused;
			pauseButton.click();
			await elementUpdated(element);
			const pausedAfterSecondClick = element.paused;

			expect(pausedAfterFirstClick).toEqual(false);
			expect(pausedAfterSecondClick).toEqual(true);
		});

		it.each(['keyup', 'keydown', 'mousedown'])(
			'should pause audio on %s of the slider',
			async function (eventName) {
				await elementUpdated(element);
				setAudioElementDuration(60);

				const event = new Event(eventName, { bubbles: true });
				getSliderElement().dispatchEvent(event);

				await elementUpdated(element);
				expect(element.paused).toEqual(true);
			}
		);

		it.each(['keyup', 'keydown', 'mousedown'])(
			'should remove %s event listener on disconnection',
			async function (eventName) {
				element.play();
				await elementUpdated(element);
				setAudioElementDuration(60);
				element.disconnectedCallback();

				const event = new Event(eventName, { bubbles: true });
				getSliderElement().dispatchEvent(event);

				await elementUpdated(element);
				expect(element.paused).toEqual(false);
			}
		);

		it('should pause when finished', async function () {
			element.play();
			setAudioElementDuration(60);
			await elementUpdated(element);

			setAudioTimeToEnd();

			await elementUpdated(element);
			expect(element.paused).toEqual(true);
		});

		it('should be readonly', () => {
			element.paused = false;
			expect(element.paused).toBe(true);
		});
	});

	describe('playbackRates', () => {
		function getPlaybackRatesMenuElement() {
			return getBaseElement(element).querySelector('.playback-rates');
		}

		function getPlaybackRatesButton() {
			return getBaseElement(element).querySelector(
				'#playback-open-button'
			) as Button;
		}

		it('should default to empty string', () => {
			expect(element.playbackRates).toBe(null);
		});

		it('should hide playbackRates button as default', async () => {
			expect(getPlaybackRatesButton()).toBeNull();
		});

		it('should hide playbackRates button when attribute is removed', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			element.removeAttribute('playback-rates');
			await elementUpdated(element);

			expect(getPlaybackRatesButton()).toBeNull();
		});

		it('should hide playbackRates button when empty', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			element.playbackRates = '';
			await elementUpdated(element);

			expect(getPlaybackRatesButton()).toBeNull();
		});

		it('should set class playback on base when playbackRates is truthy', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('playback')).toBe(true);
		});

		it('should remove class playback on base when playbackRates is falsy', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			element.playbackRates = '';
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('playback')).toBe(
				false
			);
		});

		it('should set class two-lines on base when time is shown and playbackRates is truthy', async () => {
			element.notime = false;
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('two-lines')).toBe(
				true
			);
		});

		it('should remove class two-lines from base when time is shown and playbackRates is empty', async () => {
			element.notime = false;
			element.playbackRates = '';
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('two-lines')).toBe(
				false
			);
		});

		it('should start with a closed menu item', () => {
			expect(getPlaybackRatesMenuElement()?.hasAttribute('open')).toBe(false);
		});

		it('should open the menu on click on the button', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			const playbackOpenButton = getPlaybackRatesButton();

			playbackOpenButton.click();
			await elementUpdated(element);

			expect(getPlaybackRatesMenuElement()?.hasAttribute('open')).toBe(true);
		});

		it('should close the menu on selection', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			const menuItem = getPlaybackRatesMenuElement()?.querySelector(
				'.playback-rate'
			) as MenuItem;
			(getPlaybackRatesMenuElement() as any).open = true;

			menuItem.click();
			await elementUpdated(element);

			expect(getPlaybackRatesMenuElement()?.hasAttribute('open')).toBe(false);
		});

		it('should show menu items according to playback rates', async () => {
			element.playbackRates = '1,2,3,4,5';
			await elementUpdated(element);

			element.playbackRates.split(',').forEach((pbRate) => {
				const element = getPlaybackRatesMenuElement()?.querySelector(
					`.playback-rate[text="${pbRate}"]`
				);
				expect(element).toBeTruthy();
				expect(element?.getAttribute('check-appearance')).toBe('tick-only');
			});
		});

		it('should show only numeric values', async () => {
			element.playbackRates = 'a,b,c,d,1';
			await elementUpdated(element);

			expect(
				getPlaybackRatesMenuElement()?.querySelectorAll(`.playback-rate`).length
			).toBe(1);
			expect(
				getPlaybackRatesMenuElement()
					?.querySelector(`.playback-rate`)
					?.getAttribute('text')
			).toBe('1');
		});

		it('should set playbackRate to the value selected', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			const menuItem = getPlaybackRatesMenuElement()?.querySelector(
				'.playback-rate'
			) as MenuItem;

			menuItem.click();
			await elementUpdated(element);

			expect(element.playbackRate).toBe(Number(menuItem.text));
		});

		it('should add "checked" attribute to the selected playback rate', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			element.playbackRate = 2;
			await elementUpdated(element);

			expect(
				getPlaybackRatesMenuElement()
					?.querySelector(`[text="${element.playbackRate}"]`)
					?.hasAttribute('checked')
			).toBe(true);
		});
	});

	describe('playbackRate', () => {
		it('should default to 1', () => {
			expect(element.playbackRate).toBe(1);
		});

		it('should set playbackRate of native audio', async () => {
			element.playbackRate = 555;
			await elementUpdated(element);
			expect(nativeAudioElement.playbackRate).toBe(element.playbackRate);
		});
	});

	describe('skipBy', function () {
		beforeEach(() => {
			setAudioElementDuration(60);
		});

		it('should set class two-lines on base with time shown and skipBy set', async () => {
			element.notime = false;
			element.skipBy = MediaSkipBy.Five;
			await elementUpdated(element);

			expect(getBaseElement(element).classList.contains('two-lines')).toBe(
				true
			);
		});

		it('should remove class two-lines on base when skipBy is set to false', async () => {
			element.notime = false;
			element.skipBy = MediaSkipBy.Zero;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('two-lines')).toBe(
				false
			);
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

		it('should hide skip buttons when skip-by is set to an invalid value', async function () {
			element.skipBy = '33' as MediaSkipBy;
			await elementUpdated(element);

			expect(getSkipBackwardButton()).toBe(null);
			expect(getSkipForwardButton()).toBe(null);
		});

		it('should show skip buttons when value is a nonzero MediaSkipBy', async function () {
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
			expect(element.paused).toEqual(true);
		});

		it.each([
			['5-sec-backward-line', MediaSkipBy.Five],
			['10-sec-backward-line', MediaSkipBy.Ten],
			['30-sec-backward-line', MediaSkipBy.Thirty],
		])(
			'should change the backward icon to %s when skipBy is %s',
			async function (icon, skipBy) {
				element.skipBy = skipBy;
				await elementUpdated(element);

				expect(getSkipBackwardButton()!.icon).toEqual(icon);
			}
		);

		it.each([
			['5-sec-forward-line', MediaSkipBy.Five],
			['10-sec-forward-line', MediaSkipBy.Ten],
			['30-sec-forward-line', MediaSkipBy.Thirty],
		])(
			'should change the forward icon to %s when skipBy is %s',
			async function (icon, skipBy) {
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
