import '../vivid-components.js';

const runningInIframe = window.self !== window.top;
if (!runningInIframe) {
	import('./standalone-example.js');
}
