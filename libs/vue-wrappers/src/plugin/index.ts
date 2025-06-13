import type { App, Plugin } from 'vue3';
import tokensThemeLightCss from '@repo/styles/tokens/theme-light.css?raw';
import tokensThemeDarkCss from '@repo/styles/tokens/theme-dark.css?raw';
import fontsSpeziaVariableCss from '@repo/styles/fonts/spezia-variable.css?raw';
import { setCustomComponentPrefix } from '../init/prefix';
import type { Style } from './styles';

type VividRootTarget = 'root' | 'app' | 'none';
type VividTokens = 'dark' | 'light' | 'none';
type VividFont = 'oss' | 'spezia' | 'none';
type VividConfiguration = {
	tokens?: VividTokens;
	font?: VividFont;
	customComponentPrefix?: string;
	styles?: Style[];
	addRootClassTo?: VividRootTarget;
};

const VividRootClassName = 'vvd-root';

const appendLink = (rel: string, href: string, crossOrigin = false) => {
	const linkElement = document.createElement('link');
	linkElement.setAttribute('rel', rel);
	linkElement.setAttribute('href', href);
	if (crossOrigin) {
		linkElement.setAttribute('crossorigin', '');
	}
	document.head.append(linkElement);
};

const appendStyle = (css: string) => {
	const styleElement = document.createElement('style');
	styleElement.setAttribute('type', 'text/css');
	styleElement.innerHTML = css;
	document.head.append(styleElement);
};

export const vividVue: Plugin<VividConfiguration> = {
	install(app: App, options: VividConfiguration) {
		const addRootClassTo = options.addRootClassTo ?? 'root';
		switch (addRootClassTo) {
			case 'root':
				document.documentElement.classList.add(VividRootClassName);
				break;
			case 'app': {
				// app._container will only be available after the app is mounted
				const interval = setInterval(() => {
					if (app._container) {
						app._container.classList.add(VividRootClassName);
						clearInterval(interval);
					}
				}, 30);
				break;
			}
			case 'none':
				break;
			default:
				throw new Error(`Invalid addRootClassTo option: ${addRootClassTo}`);
		}

		const tokens = options.tokens ?? 'light';
		switch (tokens) {
			case 'light':
				appendStyle(tokensThemeLightCss);
				break;
			case 'dark':
				appendStyle(tokensThemeDarkCss);
				break;
			case 'none':
				break;
			default:
				throw new Error(`Invalid theme option: ${tokens}`);
		}

		const styles = options.styles ?? [];
		for (const style of styles) {
			appendStyle(style.css);
		}

		const font = options.font ?? 'oss';
		switch (font) {
			case 'oss':
				appendLink('preconnect', 'https://fonts.googleapis.com');
				appendLink('preconnect', 'https://fonts.gstatic.com', true);
				appendLink(
					'stylesheet',
					'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Roboto+Mono:wght@400;500&display=swap'
				);
				break;
			case 'spezia':
				appendStyle(fontsSpeziaVariableCss);
				break;
			case 'none':
				break;
			default:
				throw new Error(`Invalid font option: ${font}`);
		}

		if (options.customComponentPrefix) {
			setCustomComponentPrefix(options.customComponentPrefix);
		}
	},
};

/**
 * @deprecated Use vividVue instead.
 */
export const vivid3 = vividVue;

export * from './styles';
