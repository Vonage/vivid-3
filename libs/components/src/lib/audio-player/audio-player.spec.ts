import { axe, elementUpdated, fixture, getBaseElement } from '@vivid-nx/shared';
import { FoundationElementRegistry } from '@microsoft/fast-foundation';
import { Connotation } from '../enums';
import { Button } from '../button/button';
import { Slider } from '../slider/slider';
import { AudioPlayer } from './audio-player';
import { audioPlayerDefinition } from './definition';
import '.';

const COMPONENT_TAG = 'vwc-audio-player';

let audioElement: any;
class MockAudio extends Audio {
	constructor() {
		super();
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		audioElement = this;
	}
}

window.Audio = MockAudio;

describe('vwc-audio-player', () => {
	let element: AudioPlayer;
	let play: any;
	let pause: any;

	beforeEach(() => {
		play = HTMLMediaElement.prototype.play;
		HTMLMediaElement.prototype.play = jest.fn();
		pause = HTMLMediaElement.prototype.pause;
		HTMLMediaElement.prototype.pause = jest.fn();
	});

	afterAll(() => {
		HTMLMediaElement.prototype.pause = pause;
		HTMLMediaElement.prototype.play = play;
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} timestamp src="./sample-6s.mp3"></${COMPONENT_TAG}>`
		)) as AudioPlayer;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-audio-player', async () => {
			expect(audioPlayerDefinition()).toBeInstanceOf(FoundationElementRegistry);
			expect(element).toBeInstanceOf(AudioPlayer);
			expect(element.src).toEqual('./sample-6s.mp3');
			expect(element.connotation).toBeUndefined();
			expect(element.notime).toEqual(false);
			expect(element.disabled).toEqual(false);
			expect(element.paused).toEqual(true);
		});
	});

	describe('notime', function () {
		it('should show timestamp when false', async () => {
			element.notime = false;
			await elementUpdated(element);

			const controls = getBaseElement(element).querySelector('.controls') as HTMLDivElement;
			const currentTimeClassExists = controls.querySelector('.current-time');
			const totalTimeClassExists = controls.querySelector('.total-time');

			expect(currentTimeClassExists).toBeTruthy();
			expect(totalTimeClassExists).toBeTruthy();
		});

		it('should remove the time stamp when equal to true', async function () {
			element.notime = true;
			await elementUpdated(element);

			const controls = getBaseElement(element).querySelector('.controls') as HTMLDivElement;
			const currentTimeClassExists = controls.querySelector('.current-time');
			const totalTimeClassExists = controls.querySelector('.total-time');

			expect(currentTimeClassExists).toBeFalsy();
			expect(totalTimeClassExists).toBeFalsy();
		});

		it('should update the duration when notime is set to true', async function () {
			const newElement = (await fixture(
				`<${COMPONENT_TAG} notime src="./sample-6s.mp3"></${COMPONENT_TAG}>`)) as AudioPlayer;
			setAudioDuration(60);
			await elementUpdated(newElement);
			expect(newElement.duration).toBe(60);
		});
	});

	describe('src', function () {
		it('should set the src on audio', async function () {
			const src = 'http://localhost/audio.mp3';
			element.src = src;
			await elementUpdated(element);

			expect(audioElement.src).toEqual(src);
		});

		it('should set the source from the element attribute', async function () {
			expect(audioElement.src).toEqual('http://localhost/sample-6s.mp3');
		});
	});

	describe('connotation', function () {
		it('should set the connotation class on base', async function () {
			const connotation = Connotation.CTA;
			const sliderConnotationBefore = (getBaseElement(element).querySelector('.slider') as Slider).connotation;
			const buttonConnotationBefore = (getBaseElement(element).querySelector('.pause') as Button).connotation;

			element.connotation = connotation;
			await elementUpdated(element);
			const sliderConnotationAfter = (getBaseElement(element).querySelector('.slider') as Slider).connotation;
			const buttonConnotationAfter = (getBaseElement(element).querySelector('.pause') as Button).connotation;

			expect(sliderConnotationBefore).toBeUndefined();
			expect(buttonConnotationBefore).toBeUndefined();
			expect(sliderConnotationAfter).toEqual(connotation);
			expect(buttonConnotationAfter).toEqual(connotation);
		});
	});

	describe('disabled', () => {
		it('should set disabled class on the base element when disabled is true', async function () {
			element.disabled = true;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('disabled')).toBeTruthy();
		});

		it('should set disabled class on the base element when duration is not set', async function () {
			element.disabled = false;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('disabled')).toBeTruthy();
		});

		it('should remove disabled class on the base element when disabled is false and duration is set', async function () {
			setAudioDuration(60);
			element.disabled = false;
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('disabled')).toBeFalsy();
		});

		it('should remove disabled class on the base element when disabled is false and duration is zero', async function () {
			setAudioDuration(0);
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('disabled')).toBeFalsy();
		});
	});

	describe('paused', function () {
		it('should change button icon to play when true', async () => {
			element.paused = true;
			await elementUpdated(element);
			const pauseButton = getBaseElement(element).querySelector('.pause') as Button;
			expect(pauseButton.icon).toEqual('play-solid');
		});

		it('should change button icon to pause when false', async function () {
			element.paused = false;
			await elementUpdated(element);
			const pauseButton = getBaseElement(element).querySelector('.pause') as Button;
			expect(pauseButton.icon).toEqual('pause-solid');
		});

		it('should set pause to true when audio finished playing', async function () {
			element.paused = false;
			jest.spyOn(audioElement, 'duration', 'get').mockImplementation(() => 60);
			await elementUpdated(element);

			const event = new Event('timeupdate');
			audioElement.currentTime = audioElement.duration;
			audioElement.dispatchEvent(event);

			await elementUpdated(element);
			expect(element.paused).toEqual(true);
		});

		it('should play the audio when paused is set to false', async function () {
			audioElement.play = jest.fn();
			element.paused = false;
			await elementUpdated(element);
			expect(audioElement.play).toHaveBeenCalled();
		});

		it('should pause the audio when paused is set to true', async function () {
			element.paused = false;
			await elementUpdated(element);
			audioElement.pause = jest.fn();
			element.paused = true;
			await elementUpdated(element);
			expect(audioElement.pause).toHaveBeenCalled();
		});
	});

	describe('play-pause button element', () => {
		it('should toggle paused state on click', () => {
			const playButton = getBaseElement(element).querySelector('.pause') as Button;
			playButton.click();
			const pausedStateAfterFirstClick = element.paused;
			playButton.click();
			const pausedStateAfterSecondClick = element.paused;
			expect(pausedStateAfterFirstClick).toBe(false);
			expect(pausedStateAfterSecondClick).toBe(true);
		});
	});

	function setAudioDuration(duration: number) {
		jest.spyOn(audioElement, 'duration', 'get').mockImplementation(() => {
			return duration;
		});
		audioElement.dispatchEvent(new Event('loadedmetadata'));
	}

	function setAudioTime(time: number) {
		audioElement.currentTime = time;
		audioElement.dispatchEvent(new Event('timeupdate'));
	}

	function getCurrentTimeText() {
		return getBaseElement(element).querySelector('.current-time')?.textContent;
	}

	function getTotalTimeText() {
		return getBaseElement(element).querySelector('.total-time')?.textContent;
	}

	describe('slider element', () => {
		function setSliderValueWithMouse(value: number) {
			slider.dispatchEvent(new Event('mousedown'));
			slider.value = value.toString();
			document.dispatchEvent(new Event('mouseup'));
		}

		let slider: Slider;

		beforeEach(() => {
			slider = getBaseElement(element).querySelector('.slider') as Slider;
		});

		it('should set the slider according to the current time and duration', async () => {
			setAudioDuration(400);
			setAudioTime(200);
			await elementUpdated(element);

			expect(slider.value).toEqual('50');
			expect(slider.ariaValuetext).toEqual('3:20');
		});

		it('should update the slider when current time changes', async () => {
			await setAudioDuration(400);
			await setAudioTime(200);
			await elementUpdated(element);
			await setAudioTime(300);
			await elementUpdated(element);

			expect(slider.value).toEqual('75');
			expect(slider.ariaValuetext).toEqual('5:00');
		});

		it('should update the current time when user uses left key', async () => {

		});

		it('should update the current time when user uses right key', async () => {

		});

		it('should update the current time when user changes the slider position', async () => {
			setAudioDuration(120);
			setAudioTime(60);
			await elementUpdated(element);
			setSliderValueWithMouse(75);

			await elementUpdated(element);
			expect(audioElement.currentTime).toBe(90);
		});

		it('should keep current paused state false when moving the slider', async () => {
			element.paused = false;
			setAudioDuration(400);
			setAudioTime(200);
			await elementUpdated(element);

			setSliderValueWithMouse(75);
			await elementUpdated(element);

			expect(element.paused).toBe(false);
		});

		it('should remove event listener on mouseup after slider is clicked', async () => {
			setAudioDuration(400);
			setAudioTime(200);
			await elementUpdated(element);

			setSliderValueWithMouse(75);
			await elementUpdated(element);

			slider.value = '50';
			document.dispatchEvent(new Event('mouseup'));
			await elementUpdated(element);

			expect(audioElement.currentTime).toBe(300);
		});

		it('should keep current paused state true when moving the slider', async () => {
			element.paused = true;
			setAudioDuration(400);
			setAudioTime(200);
			await elementUpdated(element);

			slider.value = '75';
			await elementUpdated(element);

			expect(element.paused).toBe(true);
		});
	});

	describe('timestamp element', () => {
		it ('should update the timestamp when the current time changes', async () => {
			setAudioDuration(300);
			setAudioTime(200);
			await elementUpdated(element);
			const currentTimeFor200 = getCurrentTimeText();
			setAudioTime(201);
			await elementUpdated(element);
			const currentTimeFor201 = getCurrentTimeText();

			expect(currentTimeFor200).toEqual('3:20');
			expect(currentTimeFor201).toEqual('3:21');
		});

		it('should update the total time when the audio finished loading (loadmetadata)', async () => {
			setAudioDuration(60);
			expect(getTotalTimeText()).toBe('1:00');
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
