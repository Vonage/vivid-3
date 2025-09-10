import type { Page, Request } from '@playwright/test';

export class InFlightRequests {
	private inFlightRequests: Set<Request> = new Set();

	private addRequest = (request: Request) => {
		console.log(`Request started: ${request.url()}`);
		this.inFlightRequests.add(request);
	};
	private removeRequest = (request: Request) =>
		this.inFlightRequests.delete(request);

	constructor(private page: Page) {
		this.page.on('request', this.addRequest);
		this.page.on('requestfinished', this.removeRequest);
		this.page.on('requestfailed', this.removeRequest);
	}

	destroy() {
		this.page.off('request', this.addRequest);
		this.page.off('requestfinished', this.removeRequest);
		this.page.off('requestfailed', this.removeRequest);
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
