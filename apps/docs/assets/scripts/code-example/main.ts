import '../vivid-components.js';
import '../components/appearance-ui/appearance-ui.js';

const runningInIframe = window.self !== window.top;
if (!runningInIframe) {
	await import('./standalone-example.js');
}
