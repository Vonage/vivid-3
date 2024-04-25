window._bufferedLoadedIFrames = [];
window.onloadIframe = function (iframe) {
	window._bufferedLoadedIFrames.push(iframe);
};
