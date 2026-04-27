import {
	MockedIntersectionObserver,
	mockIntersectionObserver,
} from './intersection-observer-mock';
import { beforeEach, afterEach, vi } from 'vitest';

describe('mockIntersectionObserver', () => {
	let io: ReturnType<typeof mockIntersectionObserver>;
	let nativeIntersectionObserver: typeof window.IntersectionObserver;

	beforeEach(() => {
		nativeIntersectionObserver = window.IntersectionObserver;
		io = mockIntersectionObserver();
	});

	afterEach(() => {
		io.cleanup();
	});

	it("don't call unobserved nodes, enterNode", () => {
		const node = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback);

		observer.observe(node);

		io.enterNode(node);

		expect(callback).toHaveBeenCalledTimes(1);

		observer.unobserve(node);

		io.enterNode(node);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it("don't call unobserved nodes, leaveNode", () => {
		const node = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback);

		observer.observe(node);

		io.leaveNode(node);

		expect(callback).toHaveBeenCalledTimes(1);

		observer.unobserve(node);

		io.leaveNode(node);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('handles multiple nodes correctly, enterNodes', () => {
		const node1 = document.createElement('div');
		const node2 = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback);

		observer.observe(node1);
		observer.observe(node2);

		io.enterNodes([node1, node2]);

		expect(callback).toHaveBeenCalledTimes(1);

		observer.unobserve(node1);
		observer.unobserve(node2);

		io.enterNodes([node1, node2]);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('handles multiple nodes correctly, leaveNodes', () => {
		const node1 = document.createElement('div');
		const node2 = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback);

		observer.observe(node1);
		observer.observe(node2);

		io.leaveNodes([node1, { node: node2, desc: { intersectionRatio: 0.5 } }]);

		expect(callback).toHaveBeenCalledTimes(1);

		const [entries] = callback.mock.calls[0] as [
			IntersectionObserverEntry[],
			IntersectionObserver,
		];

		expect(entries).toHaveLength(2);
		expect(entries[0].target).toBe(node1);
		expect(entries[0].isIntersecting).toBe(false);
		expect(entries[0].intersectionRatio).toBe(0);

		expect(entries[1].target).toBe(node2);
		expect(entries[1].isIntersecting).toBe(false);
		expect(entries[1].intersectionRatio).toBe(0.5);

		observer.unobserve(node1);
		observer.unobserve(node2);

		io.leaveNodes([node1, node2]);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('handles multiple nodes correctly, enterAll', () => {
		const node1 = document.createElement('div');
		const node2 = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback);

		observer.observe(node1);
		observer.observe(node2);

		io.enterAll();

		expect(callback).toHaveBeenCalledTimes(1);

		observer.unobserve(node1);
		observer.unobserve(node2);

		io.enterAll();

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('handles multiple nodes correctly, leaveAll', () => {
		const node1 = document.createElement('div');
		const node2 = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback);

		observer.observe(node1);
		observer.observe(node2);

		io.leaveAll({ intersectionRatio: 0.25 });

		expect(callback).toHaveBeenCalledTimes(1);

		const [entries] = callback.mock.calls[0] as [
			IntersectionObserverEntry[],
			IntersectionObserver,
		];

		expect(entries).toHaveLength(2);
		expect(entries[0].isIntersecting).toBe(false);
		expect(entries[1].isIntersecting).toBe(false);
		expect(entries[0].intersectionRatio).toBe(0.25);
		expect(entries[1].intersectionRatio).toBe(0.25);

		observer.unobserve(node1);
		observer.unobserve(node2);

		io.leaveAll();

		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('parses options and exposes them on the observer', () => {
		const callback = vi.fn();
		const root = document.createElement('main');

		const observer = new IntersectionObserver(callback, {
			root,
			rootMargin: '10px 20px 30px 40px',
			threshold: [0, 0.5, 1],
		});

		expect(observer).toBeInstanceOf(MockedIntersectionObserver);
		expect(observer.root).toBe(root);
		expect(observer.rootMargin).toBe('10px 20px 30px 40px');
		expect(observer.thresholds).toEqual([0, 0.5, 1]);
	});

	it('supports a single numeric threshold option', () => {
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback, {
			threshold: 0.25,
		});

		expect(observer).toBeInstanceOf(MockedIntersectionObserver);
		expect(observer.thresholds).toEqual([0.25]);
	});

	it('keeps default thresholds when threshold option is omitted', () => {
		const callback = vi.fn();

		const observer = new IntersectionObserver(callback, {
			rootMargin: '1px',
		});

		expect(observer).toBeInstanceOf(MockedIntersectionObserver);
		expect(observer.rootMargin).toBe('1px');
		expect(observer.thresholds).toEqual([0]);
	});

	it('triggerNodes does nothing for empty list', () => {
		const callback = vi.fn();
		const observer = new IntersectionObserver(callback);

		io.triggerNodes([]);

		expect(observer).toBeInstanceOf(MockedIntersectionObserver);
		expect(callback).not.toHaveBeenCalled();
	});

	it('throws when triggering a node that is not observed', () => {
		const node = document.createElement('div');
		const callback = vi.fn();
		const observer = new IntersectionObserver(
			callback
		) as MockedIntersectionObserver;

		expect(observer).toBeInstanceOf(MockedIntersectionObserver);
		expect(() => observer.triggerNode(node, { isIntersecting: true })).toThrow(
			'IntersectionObserver mock: node not found'
		);
	});

	it('cleanup restores the native IntersectionObserver and clears state', () => {
		const callback = vi.fn();
		const node = document.createElement('div');
		const observer = new IntersectionObserver(callback);
		observer.observe(node);

		expect(window.IntersectionObserver).not.toBe(nativeIntersectionObserver);

		io.cleanup();

		expect(window.IntersectionObserver).toBe(nativeIntersectionObserver);

		// state was cleared: nothing should happen
		io.enterAll();
		expect(callback).not.toHaveBeenCalled();
	});

	it('supports environments where HTMLElement is not a constructor (DOM2 isElement path)', () => {
		const originalHTMLElement = globalThis.HTMLElement;

		Object.defineProperty(globalThis, 'HTMLElement', {
			configurable: true,
			value: {
				[Symbol.hasInstance]: () => true,
			},
		});

		try {
			const node = document.createElement('div');
			const callback = vi.fn();

			const observer = new IntersectionObserver(callback);
			observer.observe(node);

			io.enterNodes([node]);

			expect(callback).toHaveBeenCalledTimes(1);
		} finally {
			Object.defineProperty(globalThis, 'HTMLElement', {
				configurable: true,
				value: originalHTMLElement,
			});
		}
	});

	it('takeRecords returns an empty array', () => {
		const callback = vi.fn();
		const observer = new IntersectionObserver(callback);

		expect(observer).toBeInstanceOf(MockedIntersectionObserver);
		expect(observer.takeRecords()).toEqual([]);
	});

	it('triggerNodes triggers only the observers that observe the node', () => {
		const node = document.createElement('div');
		const callback1 = vi.fn();
		const callback2 = vi.fn();

		const observer1 = new IntersectionObserver(callback1);
		const observer2 = new IntersectionObserver(callback2);

		observer1.observe(node);
		observer2.observe(node);

		io.triggerNodes([{ node, desc: { intersectionRatio: 0.75 } }]);

		expect(callback1).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledTimes(1);

		const [entries1] = callback1.mock.calls[0] as [
			IntersectionObserverEntry[],
			IntersectionObserver,
		];
		expect(entries1[0].intersectionRatio).toBe(0.75);
	});

	it('disconnect clears observed nodes', () => {
		const node = document.createElement('div');
		const callback = vi.fn();

		const observer = new IntersectionObserver(
			callback
		) as MockedIntersectionObserver;
		observer.observe(node);

		observer.disconnect();

		io.enterAll();
		expect(callback).not.toHaveBeenCalled();
	});
});
