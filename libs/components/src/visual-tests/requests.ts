import type { Page, Request } from '@playwright/test';

export class InFlightRequests {
	private inFlightRequests: Set<Request> = new Set();

	private onRequest = (request: Request) => {
		this.inFlightRequests.add(request);
	};
	private onRequestFinished = (request: Request) => {
		this.inFlightRequests.delete(request);
	};

	private onRequestFailed = (request: Request) => {
		// eslint-disable-next-line no-console
		console.warn(
			`Request failed: ${request.url()} Reason: ${request.failure()}`
		);
		this.inFlightRequests.delete(request);
	};

	constructor(private page: Page) {
		this.page.on('request', this.onRequest);
		this.page.on('requestfinished', this.onRequestFinished);
		this.page.on('requestfailed', this.onRequestFailed);
	}

	destroy() {
		this.page.off('request', this.onRequest);
		this.page.off('requestfinished', this.onRequestFinished);
		this.page.off('requestfailed', this.onRequestFailed);
	}

	noneInFlight(predicate: (request: Request) => boolean = () => true) {
		return new Promise<void>((resolve) => {
			const interval = setInterval(() => {
				if (Array.from(this.inFlightRequests).filter(predicate).length === 0) {
					clearInterval(interval);
					resolve();
				}
			}, 100);
		});
	}
}
