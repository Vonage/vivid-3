import { html } from '@microsoft/fast-element';

import { classNames } from '@microsoft/fast-web-utilities';
import { renderSvgIcons } from './vivid-video-svg';
import { VideoPlayer } from './video-player';

const getClasses = (_: VideoPlayer) => classNames('control');

export const VideoPlayerTemplate = html<VideoPlayer>`
	<div
		class="${getClasses} video-js vjs-16-9 vjs-working-hover vjs-theme-vivid"
	>
		<div id="no-sources" class="vjs-error-display vjs-modal-dialog vjs-hidden">
			<div class="vjs-modal-dialog-content">
				No compatible source was found for this media.
			</div>
		</div>
		<slot></slot>
		${renderSvgIcons()}
	</div>
`;
