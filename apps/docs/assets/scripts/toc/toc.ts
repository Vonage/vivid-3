import './toc.style.scss';

const BANNER_HEIGHT = 60;

let activeAnchor: HTMLAnchorElement | null = null;
let activeAnchorIsLocked = false;
function highlightActiveAnchor(anchor: HTMLAnchorElement, lock = false) {
	if (activeAnchorIsLocked) {
		return;
	}

	if (lock) {
		// Lock anchor for a short period to prevent rapid changes
		activeAnchorIsLocked = true;
		setTimeout(() => (activeAnchorIsLocked = false), 100);
	}

	if (activeAnchor === anchor) {
		return;
	}

	activeAnchor?.removeAttribute('aria-active');
	activeAnchor = anchor;
	activeAnchor.setAttribute('aria-active', '');

	const scrollContainer = document.querySelector('.article-toc')!;
	scrollContainer.scroll({
		top: anchor.offsetTop - scrollContainer.clientHeight / 2,
		behavior: 'smooth',
	});
}

const intersectingTargets = new Set<HTMLElement>();
const intersectionObserver = new IntersectionObserver(
	(entries) => {
		console.log('intersectionObserver', entries);
		for (const entry of entries) {
			if (!entry.isIntersecting) {
				intersectingTargets.delete(entry.target as HTMLElement);
			} else {
				intersectingTargets.add(entry.target as HTMLElement);
			}

			let topmostIntersectingTarget;
			for (const target of intersectingTargets) {
				if (
					!topmostIntersectingTarget ||
					target.offsetTop > topmostIntersectingTarget.offsetTop
				) {
					topmostIntersectingTarget = target;
				}
			}
			console.log(topmostIntersectingTarget);
			if (topmostIntersectingTarget) {
				const anchor = document.querySelector(
					`.article-toc a[href="#${topmostIntersectingTarget.id}"]`
				);
				if (anchor instanceof HTMLAnchorElement) {
					highlightActiveAnchor(anchor);
				}
			}
		}
	},
	{
		rootMargin: '0px 0px -60% 0px',
		threshold: 0,
	}
);

const observedTargets = new Set<HTMLElement>();

function setupToc() {
	intersectingTargets.clear();
	for (const oldTarget of observedTargets) {
		intersectionObserver.unobserve(oldTarget);
	}
	observedTargets.clear();

	const anchors = Array.from(
		document.querySelectorAll('.article-toc a')
	) as HTMLAnchorElement[];

	anchors.forEach((anchor) => {
		const target = document.querySelector(anchor.getAttribute('href')!);
		if (target) {
			intersectionObserver.observe(target);
			observedTargets.add(target as HTMLElement);
		}

		anchor.addEventListener('click', (event) => {
			event.preventDefault();
			window.history.pushState({}, '', anchor.getAttribute('href'));

			const hasBanner = Boolean(document.querySelector('main > .banner'));
			const target = document.querySelector(
				anchor.getAttribute('href')!
			) as HTMLElement;
			window.scrollTo({
				top:
					(target.offsetParent as HTMLElement).offsetTop -
					(hasBanner ? BANNER_HEIGHT : 0),
				behavior: 'instant',
			});
			highlightActiveAnchor(anchor, true);
		});
	});
}

window.addEventListener('DOMContentLoaded', setupToc);
window.addEventListener('htmx:afterSwap', () => setTimeout(setupToc, 100));
