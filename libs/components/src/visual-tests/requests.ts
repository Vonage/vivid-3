import type { Page, Request } from '@playwright/test';

export class InFlightRequests {
	private inFlightRequests: Set<Request> = new Set();

	constructor(private page: Page) {
		this.page.on('request', (request) => this.inFlightRequests.add(request));
		this.page.on('requestfinished', (request) =>
			this.inFlightRequests.delete(request)
		);
		this.page.on('requestfailed', (request) =>
			this.inFlightRequests.delete(request)
		);
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
