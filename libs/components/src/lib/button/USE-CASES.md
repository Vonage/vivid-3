## Toggle Buttons

Use the `pressed` attribute to create toggle buttons. Always update the `aria-label` (or visible `label`) to reflect the current state so that both sighted and screen reader users understand what action will occur.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 72px
<script setup lang="ts">
import { ref } from 'vue';
import { VButton, VIcon } from '@vonage/vivid-vue';

const muted = ref(false);
const liked = ref(false);
const bookmarked = ref(false);
</script>

<template>
	<div class="container">
		<VButton appearance="ghost" :label="muted ? 'Unmute' : 'Mute'" :pressed="muted" @click="muted = !muted">
			<template #icon>
				<VIcon :name="muted ? 'mic-mute-solid' : 'microphone-line'" />
			</template>
		</VButton>
		<VButton appearance="ghost" connotation="alert" :aria-label="liked ? 'Unlike' : 'Like'" :pressed="liked" @click="liked = !liked">
			<template #icon>
				<VIcon :name="liked ? 'heart-solid' : 'heart-line'" />
			</template>
		</VButton>
		<VButton appearance="filled" :label="bookmarked ? 'Bookmarked' : 'Bookmark'" :aria-label="bookmarked ? 'Remove bookmark' : 'Add bookmark'" :pressed="bookmarked" @click="bookmarked = !bookmarked">
			<template #icon>
				<VIcon :name="bookmarked ? 'bookmark-solid' : 'bookmark-line'" />
			</template>
		</VButton>
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
	align-items: center;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview center 72px
<div class="container">
	<vwc-button id="mute-btn" appearance="ghost" label="Mute">
		<vwc-icon slot="icon" name="microphone-line"></vwc-icon>
	</vwc-button>
	<vwc-button id="like-btn" appearance="ghost" connotation="alert" aria-label="Like">
		<vwc-icon slot="icon" name="heart-line"></vwc-icon>
	</vwc-button>
	<vwc-button id="bookmark-btn" appearance="filled" label="Bookmark" aria-label="Add bookmark">
		<vwc-icon slot="icon" name="bookmark-line"></vwc-icon>
	</vwc-button>
</div>

<script>
	const muteBtn = document.getElementById('mute-btn');
	muteBtn.addEventListener('click', () => {
		const isPressed = muteBtn.hasAttribute('pressed');
		muteBtn.toggleAttribute('pressed', !isPressed);
		muteBtn.label = isPressed ? 'Mute' : 'Unmute';
		muteBtn.querySelector('vwc-icon').name = isPressed ? 'microphone-line' : 'mic-mute-solid';
	});

	const likeBtn = document.getElementById('like-btn');
	likeBtn.addEventListener('click', () => {
		const isPressed = likeBtn.hasAttribute('pressed');
		likeBtn.toggleAttribute('pressed', !isPressed);
		likeBtn.ariaLabel = isPressed ? 'Like' : 'Unlike';
		likeBtn.querySelector('vwc-icon').name = isPressed ? 'heart-line' : 'heart-solid';
	});

	const bookmarkBtn = document.getElementById('bookmark-btn');
	bookmarkBtn.addEventListener('click', () => {
		const isPressed = bookmarkBtn.hasAttribute('pressed');
		bookmarkBtn.toggleAttribute('pressed', !isPressed);
		bookmarkBtn.label = isPressed ? 'Bookmark' : 'Bookmarked';
		bookmarkBtn.ariaLabel = isPressed ? 'Add bookmark' : 'Remove bookmark';
		bookmarkBtn.querySelector('vwc-icon').name = isPressed ? 'bookmark-line' : 'bookmark-solid';
	});
</script>

<style>
	.container {
		display: flex;
		gap: 16px;
		align-items: center;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Width

A button's width can be easily customised by attaching styles to the button component directly.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VButton } from '@vonage/vivid-vue';
</script>

<template>
	<VButton appearance="filled" label="Full width button" class="full-width" />
	<br />
	<VButton appearance="outlined" label="Custom width button" class="custom-width" />
</template>

<style>
.full-width {
	display: block;
}

.custom-width {
	width: 160px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-button appearance="filled" label="Full width button" class="full-width"></vwc-button>
<br />
<vwc-button appearance="outlined" label="Custom width button" class="custom-width"></vwc-button>

<style>
	.full-width {
		display: block;
	}

	.custom-width {
		width: 160px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="warning" headline="Use custom width buttons with caution">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

When there is not enough space for the `label` text, the content will be truncated as in the example above.

</vwc-note>

## Toolbars

Toolbars can be created using ghost buttons contained inside an [action-group](/components/action-group) component.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 115px
<script setup lang="ts">
import { ref } from 'vue';
import { VActionGroup, VButton, VIcon, VTooltip } from '@vonage/vivid-vue';

const bold = ref(false);
const italic = ref(true);
const underline = ref(false);
const strikethrough = ref(false);
const alignment = ref('left');
</script>

<template>
	<div class="container">
		<VActionGroup role="region" aria-label="Main toolbar">
			<VButton size="super-condensed" label="File" />
			<VButton size="super-condensed" label="Edit" />
			<VButton size="super-condensed" label="View" />
			<VButton size="super-condensed" label="Help" />
		</VActionGroup>

		<VActionGroup role="region" aria-label="Text formatting">
			<VTooltip text="Bold" placement="bottom-start">
				<template #anchor>
					<VButton size="condensed" aria-label="Bold" :pressed="bold" @click="bold = !bold">
						<template #icon><VIcon name="bold-solid" /></template>
					</VButton>
				</template>
			</VTooltip>
			<VTooltip text="Italic">
				<template #anchor>
					<VButton size="condensed" aria-label="Italic" :pressed="italic" @click="italic = !italic">
						<template #icon><VIcon name="italic-solid" /></template>
					</VButton>
				</template>
			</VTooltip>
			<VTooltip text="Underline">
				<template #anchor>
					<VButton size="condensed" aria-label="Underline" :pressed="underline" @click="underline = !underline">
						<template #icon><VIcon name="underline-solid" /></template>
					</VButton>
				</template>
			</VTooltip>
			<VTooltip text="Strikethrough" placement="bottom-end">
				<template #anchor>
					<VButton size="condensed" aria-label="Strikethrough" :pressed="strikethrough" @click="strikethrough = !strikethrough">
						<template #icon><VIcon name="strikethrough-solid" /></template>
					</VButton>
				</template>
			</VTooltip>
		</VActionGroup>

		<VActionGroup role="toolbar" aria-label="Text alignment">
			<VTooltip text="Align left" placement="bottom-start">
				<template #anchor>
					<VButton size="condensed" aria-label="Align left" :pressed="alignment === 'left'" @click="alignment = 'left'">
						<template #icon><VIcon name="align-left-line" /></template>
					</VButton>
				</template>
			</VTooltip>
			<VTooltip text="Align center">
				<template #anchor>
					<VButton size="condensed" aria-label="Align center" :pressed="alignment === 'center'" @click="alignment = 'center'">
						<template #icon><VIcon name="align-center-line" /></template>
					</VButton>
				</template>
			</VTooltip>
			<VTooltip text="Align right" placement="bottom-end">
				<template #anchor>
					<VButton size="condensed" aria-label="Align right" :pressed="alignment === 'right'" @click="alignment = 'right'">
						<template #icon><VIcon name="align-right-line" /></template>
					</VButton>
				</template>
			</VTooltip>
		</VActionGroup>
	</div>
</template>

<style>
.container {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	align-items: start;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 115px
<div class="container">
	<vwc-action-group role="region" aria-label="Main toolbar">
		<vwc-button size="super-condensed" label="File"></vwc-button>
		<vwc-button size="super-condensed" label="Edit"></vwc-button>
		<vwc-button size="super-condensed" label="View"></vwc-button>
		<vwc-button size="super-condensed" label="Help"></vwc-button>
	</vwc-action-group>

	<vwc-action-group role="region" aria-label="Text formatting">
		<vwc-tooltip text="Bold" placement="bottom-start">
			<vwc-button id="bold-btn" slot="anchor" size="condensed" aria-label="Bold">
				<vwc-icon slot="icon" name="bold-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Italic">
			<vwc-button id="italic-btn" slot="anchor" size="condensed" aria-label="Italic" pressed>
				<vwc-icon slot="icon" name="italic-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Underline">
			<vwc-button id="underline-btn" size="condensed" slot="anchor" aria-label="Underline">
				<vwc-icon slot="icon" name="underline-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Strikethrough" placement="bottom-end">
			<vwc-button id="strikethrough-btn" size="condensed" slot="anchor" aria-label="Strikethrough">
				<vwc-icon slot="icon" name="strikethrough-solid"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
	</vwc-action-group>

	<vwc-action-group role="toolbar" aria-label="Text alignment">
		<vwc-tooltip text="Align left" placement="bottom-start">
			<vwc-button id="align-left-btn" slot="anchor" size="condensed" aria-label="Align left" pressed>
				<vwc-icon slot="icon" name="align-left-line"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Align center">
			<vwc-button id="align-center-btn" slot="anchor" size="condensed" aria-label="Align center">
				<vwc-icon slot="icon" name="align-center-line"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
		<vwc-tooltip text="Align right" placement="bottom-end">
			<vwc-button id="align-right-btn" slot="anchor" size="condensed" aria-label="Align right">
				<vwc-icon slot="icon" name="align-right-line"></vwc-icon>
			</vwc-button>
		</vwc-tooltip>
	</vwc-action-group>
</div>

<script>
	['bold-btn', 'italic-btn', 'underline-btn', 'strikethrough-btn'].forEach((id) => {
		document.getElementById(id).addEventListener('click', () => document.getElementById(id).toggleAttribute('pressed'));
	});

	const alignBtns = ['align-left-btn', 'align-center-btn', 'align-right-btn'].map((id) => document.getElementById(id));
	alignBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			alignBtns.forEach((b) => b.removeAttribute('pressed'));
			btn.setAttribute('pressed', '');
		});
	});
</script>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: start;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
