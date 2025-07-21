import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import { Connotation, MediaSkipBy } from '../enums';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { DEFAULT_PLAYBACK_RATES } from '../video-player/video-player';
import { MenuItem } from '../menu-item/menu-item';
import type { Menu } from '../menu/menu';
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
		vi.spyOn(nativeAudioElement, 'duration', 'get').mockReturnValue(duration);
	}

	function setAudioElementCurrentTime(time: number) {
		nativeAudioElement.currentTime = time;
		const event = new Event('timeupdate');
		nativeAudioElement.dispatchEvent(event);
	}

	function setAudioTimeToEnd() {
		nativeAudioElement.pause();
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

	function setCurrentTimeAndDuration(currentTime: number, duration: number) {
		setAudioElementDuration(duration);
		setAudioElementCurrentTime(currentTime);
	}

	function dragSliderTo(percent: number) {
		getSliderElement().isDragging = true;
		getSliderElement().value = percent.toString();
	}

	function stopSliderDrag() {
		getSliderElement().isDragging = false;
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

		vi.spyOn(nativeAudioElement, 'play').mockImplementation(() => {
			return new Promise((res) => {
				vi.spyOn(nativeAudioElement, 'paused', 'get').mockReturnValue(false);
				res();
			});
		});
		vi.spyOn(nativeAudioElement, 'pause').mockImplementation(async () => {
			vi.spyOn(nativeAudioElement, 'paused', 'get').mockReturnValue(true);
		});

		pauseButton = getPauseButtonElement();
	});

	describe('basic', () => {
		it('should be initialized as a vwc-audio-player', async () => {
			expect(element).toBeInstanceOf(AudioPlayer);
			expect(element.src).toEqual(SOURCE);
			expect(element.connotation).toBeUndefined();
			expect(element.notime).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.paused).toEqual(true);
			expect(element.skipBy).toEqual(undefined);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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
			setAudioElementDuration(60);
			const event = new Event('loadedmetadata');
			nativeAudioElement.dispatchEvent(event);
			await elementUpdated(element);
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

		it('should prevent display of total time when handling streaming (duration=Infinity)', async () => {
			setAudioElementDuration(Infinity);
			const event = new Event('loadedmetadata');
			nativeAudioElement.dispatchEvent(event);
			await elementUpdated(element);

			expect(
				getBaseElement(element)
					.querySelector('.time-stamp')
					?.textContent?.trim()
			).toBe('0:00');
		});

		describe('when durration-fallback is enabled', () => {
			it('should use fallback duration  when native duration  calculation is not available', async () => {
				// Mock fetch to return a fake ArrayBuffer
				globalThis.fetch = vi.fn().mockResolvedValue({
					arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
				}) as any;

				// Mock AudioContext and decodeAudioData
				const closeMock = vi.fn();
				globalThis.AudioContext = vi.fn().mockImplementation(function () {
					return {
						decodeAudioData: vi.fn().mockResolvedValue({ duration: 42 }),
						close: closeMock,
					};
				});

				element.durationFallback = true;
				// Set src and simulate native duration being unavailable
				setAudioElementDuration(Infinity);
				element.src = 'https://example.com/audio.mp3';
				const event = new Event('loadedmetadata');
				nativeAudioElement.dispatchEvent(event);

				// Wait for the fallback promise to resolve
				await new Promise((resolve) => setTimeout(resolve, 10));

				expect(element.duration).toBe(42);
			});

			it('should not fetch if src is not set', async () => {
				element.durationFallback = true;
				setAudioElementDuration(Infinity);
				element.src = undefined;
				const event = new Event('loadedmetadata');
				nativeAudioElement.dispatchEvent(event);

				const fetchSpy = vi.spyOn(globalThis, 'fetch');
				await elementUpdated(element);
				expect(fetchSpy).not.toHaveBeenCalled();
				fetchSpy.mockRestore();
			});

			it('should handle errors during fetch and clean up the abort controller', async () => {
				element.durationFallback = true;
				setAudioElementDuration(Infinity);
				element.src = 'https://example.com/audio.mp3';

				// Make fetch reject
				globalThis.fetch = vi.fn().mockRejectedValue(new Error('fetch failed'));

				const event = new Event('loadedmetadata');
				nativeAudioElement.dispatchEvent(event);

				// Wait for the promise to settle
				await new Promise((resolve) => setTimeout(resolve, 10));

				// The abort controller should be cleaned up
				expect((element as any).fetchAbortController).toBeUndefined();
			});

			it('should abort ongoing fetch request when a new fetch is initiated on src change', async () => {
				const abortSpy = vi.fn();
				let resolveFetch: any;
				const fetchPromise = new Promise((resolve) => {
					resolveFetch = resolve;
				});
				globalThis.fetch = vi.fn().mockImplementation((_url, { signal }) => {
					if (signal) {
						signal.addEventListener('abort', abortSpy);
					}
					return fetchPromise;
				});

				// Mock AudioContext and decodeAudioData
				const closeMock = vi.fn();
				globalThis.AudioContext = vi.fn().mockImplementation(function () {
					return {
						decodeAudioData: vi.fn().mockResolvedValue({ duration: 42 }),
						close: closeMock,
					};
				});

				element.durationFallback = true;
				setAudioElementDuration(Infinity);
				element.src = 'https://example.com/audio1.mp3';
				const event1 = new Event('loadedmetadata');
				nativeAudioElement.dispatchEvent(event1);

				// Trigger another fetch before the first one resolves
				element.src = 'https://example.com/audio2.mp3';
				const event2 = new Event('loadedmetadata');
				nativeAudioElement.dispatchEvent(event2);

				// Wait a tick for abort to propagate
				await new Promise((resolve) => setTimeout(resolve, 10));

				expect(abortSpy).toHaveBeenCalled();
				// Clean up
				resolveFetch &&
					resolveFetch({
						arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
					});
			});
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
			const duration = 60;
			const currentTime = 20;
			setCurrentTimeAndDuration(currentTime, duration);
			await elementUpdated(element);
			expect(getSliderElement().getAttribute('current-value')).toBe(
				Math.round(100 * (currentTime / duration)).toString()
			);
		});

		it('should prevent slider change handling after currentTime update', async () => {
			const duration = 60;
			const currentTime = 20;
			setCurrentTimeAndDuration(currentTime, duration);
			await elementUpdated(element);
			expect(element.currentTime).toBe(20);
		});

		it('should update current time element text', async () => {
			const duration = 60;
			const currentTime = 30;
			const expectedValue = '0:30';

			setCurrentTimeAndDuration(currentTime, duration);
			await elementUpdated(element);

			expect(getCurrentTimeElement()?.textContent).toBe(expectedValue);
		});

		it('should update slider value and ariavaluetext on audio progress', async () => {
			const duration = 80;
			const currentTime = 20;
			const expectedValue = `${(100 * currentTime) / duration}`;
			const expectedAriaValuetext = '0:20';

			setCurrentTimeAndDuration(currentTime, duration);
			await elementUpdated(element);

			expect(getSliderElement().value).toEqual(expectedValue);
			expect(getSliderElement().getAttribute('aria-valuetext')).toEqual(
				expectedAriaValuetext
			);
		});

		it('should set currentTime according to slider value on slider change', async () => {
			const sliderValue = 50;
			const duration = 100;
			const expectedCurrentTimeAfterMouseUp = (sliderValue * duration) / 100;
			setCurrentTimeAndDuration(10, duration);
			await elementUpdated(element);
			getSliderElement().value = `${sliderValue}`;
			await elementUpdated(element);
			expect(nativeAudioElement.currentTime).toBe(
				expectedCurrentTimeAfterMouseUp
			);
		});

		it('should change button icon to "play-solid" updates to end of audio', async () => {
			setCurrentTimeAndDuration(10, 100);
			element.play();
			await elementUpdated(element);

			setAudioTimeToEnd();
			await elementUpdated(element);

			expect(pauseButton.icon).toEqual('play-solid');
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

		it('should call play only once if dragged twice', async () => {
			setCurrentTimeAndDuration(10, 100);
			element.play();
			await elementUpdated(element);

			dragSliderTo(20);
			dragSliderTo(25);
			await elementUpdated(element);

			const playSpy = vi.spyOn(element, 'play');
			stopSliderDrag();
			getSliderElement().value = '20';
			await elementUpdated(element);

			expect(playSpy).toHaveBeenCalledTimes(1);
		});

		it('should stop playing on disconnectedCallback', async () => {
			setCurrentTimeAndDuration(10, 100);
			element.play();
			await elementUpdated(element);

			element.remove();
			expect(element.paused).toBe(true);
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

		it('should call pause 0 times if already paused while dragging', async () => {
			const duration = 100;
			setCurrentTimeAndDuration(10, duration);
			await elementUpdated(element);

			const pauseSpy = vi.spyOn(element, 'pause');
			dragSliderTo(20);
			await elementUpdated(element);

			expect(pauseSpy).toHaveBeenCalledTimes(0);
		});
	});

	describe('paused', function () {
		it('should init as true', () => {
			expect(element.paused).toEqual(true);
		});

		it('should toggle paused when clicking the pause button', async function () {
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

		it('should keep paused state while changing the slider value', async () => {
			const duration = 100;
			setCurrentTimeAndDuration(10, duration);
			element.play();
			await elementUpdated(element);

			getSliderElement().value = '20';
			await elementUpdated(element);

			expect(element.paused).toBe(false);
		});

		it('should pause while dragging the slider', async () => {
			const duration = 100;
			setCurrentTimeAndDuration(10, duration);
			element.play();
			await elementUpdated(element);

			dragSliderTo(20);
			await elementUpdated(element);

			expect(element.paused).toBe(true);
		});

		it('should keep playing when stop dragging the slider', async () => {
			const duration = 100;
			setCurrentTimeAndDuration(10, duration);
			element.play();
			await elementUpdated(element);

			dragSliderTo(20);
			await elementUpdated(element);

			stopSliderDrag();
			getSliderElement().value = '25';
			await elementUpdated(element);

			expect(element.paused).toBe(false);
		});
	});

	describe('playbackRates', () => {
		function getPlaybackRatesMenuElement() {
			return getBaseElement(element).querySelector('.playback-rates') as Menu;
		}

		function getPlaybackRatesButton() {
			return getBaseElement(element).querySelector(
				'#playback-open-button'
			) as Button;
		}

		it('should default to empty string', () => {
			expect(element.playbackRates).toBe(null);
		});

		it('should hide playbackRates menu as default', async () => {
			expect(getPlaybackRatesMenuElement()).toBeNull();
		});

		it('should hide playbackRates menu when attribute is removed', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			element.removeAttribute('playback-rates');
			await elementUpdated(element);

			expect(getPlaybackRatesMenuElement()).toBeNull();
		});

		it('should hide playbackRates menu when empty', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
			element.playbackRates = '';
			await elementUpdated(element);

			expect(getPlaybackRatesMenuElement()).toBeNull();
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

		it('should start with a closed menu item', async () => {
			element.playbackRates = DEFAULT_PLAYBACK_RATES;
			await elementUpdated(element);
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
			getPlaybackRatesMenuElement().open = true;

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
});
