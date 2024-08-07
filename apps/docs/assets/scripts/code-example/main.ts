import '../vivid-components.js';
import '../components/appearance-ui/appearance-ui.js';

const runningInIframe = window.self !== window.top;
if (!runningInIframe) {
	import('./standalone-example.js');
}
