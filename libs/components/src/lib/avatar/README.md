## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/avatar';
```

or, if you need to use a unique prefix:

```js
import { registerAvatar } from '@vonage/vivid';

registerAvatar('your-prefix');
```

```html preview
<script type="module">
	import { registerAvatar } from '@vonage/vivid';
	registerAvatar('your-prefix');
</script>

<your-prefix-avatar
	><vwc-icon slot="icon" name="user-line" label="User's avatar"></vwc-icon
></your-prefix-avatar>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VAvatar, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VAvatar
		><VIcon slot="icon" name="user-line" label="User's avatar"
	/></VAvatar>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon

Use the `icon` slot to add an icon to the avatar. If set, the `icon` attribute (deprecated) is ignored.

To maintain accessibility, always provide a `label` property for the slotted icon - [read more](/components/icon/accessibility/#informative-vs-decorative-icons) in the Icon component guidelines.

```html preview
<vwc-avatar>
	<vwc-icon
		slot="icon"
		name="assign-user-solid"
		label="Verified User's avatar"
	></vwc-icon>
</vwc-avatar>
```

### Graphic

Use the `graphic` slot to set a graphic media of any kind (e.g. image, illustration etc.) on the Avatar.

```html preview
<vwc-avatar shape="pill" connotation="cta">
	<img
		slot="graphic"
		src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		alt="woman"
	/>
</vwc-avatar>
<vwc-avatar shape="pill" connotation="cta">
	<svg
		slot="graphic"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:cc="http://creativecommons.org/ns#"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		width="349.66"
		height="349.66"
		fill="none"
		version="1.1"
		viewBox="0 0 349.66 349.66"
	>
		<metadata>
			<rdf:RDF>
				<cc:Work rdf:about="">
					<dc:format>image/svg+xml</dc:format>
					<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
					<dc:title />
				</cc:Work>
			</rdf:RDF>
		</metadata>
		<g transform="translate(-.0002231 59.913)">
			<path
				d="m258.65 229.64h-151.92c-16.654 0-35.169-13.505-41.345-30.159l-63.374-169.32c-6.1759-16.654 2.3136-30.159 18.974-30.159h151.91c16.653 0 35.168 13.505 41.344 30.159l63.374 169.32c6.183 16.654-2.307 30.159-18.967 30.159z"
				fill="url(#paint0_linear)"
			/>
			<path
				d="m329.7 44.809h-155.86c-15.565 0-32.869 12.619-38.643 28.183l-47.654 128.46c-5.775 15.564 2.16 28.183 17.731 28.183h155.86c15.564 0 32.868-12.619 38.642-28.183l47.655-128.46c5.774-15.564-2.167-28.183-17.731-28.183z"
				fill="url(#paint1_linear)"
			/>
			<path
				d="m105.78 229.63h153.1c0.934-0.019 1.841-0.081 2.72-0.185 0.054 5e-3 0.109 8e-3 0.166 8e-3 8.922 0 18.311-4.78 22.625-8.285 6.276-5.099 9.997-8.74 14.022-16.253-7.212 12.612-14.68 11.974-20.076-2.868-0.236-0.648-0.497-1.188-0.778-1.626-0.107-0.314-0.219-0.628-0.336-0.944l-56.119-151.28c-0.425-1.146-0.908-2.277-1.446-3.39h-45.819c-15.564 0-32.868 12.619-38.643 28.183l-47.654 128.46c-0.229 0.615-0.435 1.225-0.621 1.831-5.443 13.513-11.951 13.677-19.11 1.287 4.155 7.676 7.997 11.395 14.475 16.605 4.454 3.581 14.147 8.465 23.359 8.465 0.046 0 0.092-2e-3 0.136-5e-3z"
				clip-rule="evenodd"
				fill="url(#paint2_linear)"
				fill-rule="evenodd"
			/>
			<g
				transform="translate(-45,-108)"
				opacity=".4"
				style="mix-blend-mode:hard-light"
			>
				<path
					d="m151.74 337.64h151.92c0.894 0 1.765-0.039 2.611-0.115 0.113 0.028 0.235 0.042 0.365 0.042 8.923 0 18.311-4.78 22.626-8.286 6.275-5.099 9.996-8.739 14.021-16.252-6.853 11.984-13.937 12.005-19.256-0.76-0.33-1.559-0.795-3.159-1.399-4.788l-63.375-169.32c-6.176-16.654-24.691-30.159-41.344-30.159h-151.91c-16.66 0-25.15 13.505-18.974 30.159l63.374 169.32c6.176 16.654 24.691 30.159 41.345 30.159z"
					clip-rule="evenodd"
					fill="url(#paint3_linear)"
					fill-rule="evenodd"
				/>
			</g>
			<g
				transform="translate(-45,-108)"
				opacity=".15"
				style="mix-blend-mode:hard-light"
			>
				<path
					d="m219.03 153h155.86c15.564 0 23.506 12.619 17.731 28.183l-47.654 128.46c-5.775 15.564-23.079 28.183-38.643 28.183h-155.36c-0.044 4e-3 -0.09 6e-3 -0.136 6e-3 -0.182 0-0.364-2e-3 -0.547-6e-3 -2.08-0.013-4.022-0.252-5.812-0.693-7.032-1.478-13.569-5.008-16.999-7.767-6.479-5.209-10.321-8.929-14.476-16.605 7.159 12.39 13.667 12.226 19.11-1.287 0.186-0.605 0.393-1.216 0.621-1.831l47.654-128.46c5.775-15.564 23.079-28.183 38.643-28.183z"
					clip-rule="evenodd"
					fill="url(#paint4_linear)"
					fill-rule="evenodd"
				/>
			</g>
			<path
				d="m330.05 45h-155.86c-15.564 0-32.868 12.619-38.642 28.183l-47.655 128.46c-5.774 15.564 2.161 28.183 17.731 28.183h155.86c15.564 0 32.868-12.619 38.642-28.183l47.655-128.46c5.774-15.564-2.167-28.183-17.731-28.183z"
				fill="url(#paint5_linear)"
				fill-opacity=".2"
			/>
		</g>
		<defs>
			<linearGradient
				id="paint0_linear"
				x1="226"
				x2="45"
				y1="108"
				y2="67.5"
				gradientTransform="translate(-45,-108)"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#A662FF" offset="0" />
				<stop stop-color="#57EDFD" offset="1" />
			</linearGradient>
			<linearGradient
				id="paint1_linear"
				x1="278.5"
				x2="404"
				y1="306"
				y2="157.5"
				gradientTransform="translate(-45,-108)"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#FC27F6" offset="0" />
				<stop stop-color="#FFA694" offset="1" />
			</linearGradient>
			<linearGradient
				id="paint2_linear"
				x1="186.5"
				x2="343"
				y1="153"
				y2="153"
				gradientTransform="translate(-45,-108)"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#7600FF" offset="0" />
				<stop stop-color="#FB2FFB" offset="1" />
			</linearGradient>
			<linearGradient
				id="paint3_linear"
				x1="252.5"
				x2="216"
				y1="112.5"
				y2="127.5"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#fff" offset="0" />
				<stop stop-color="#fff" stop-opacity="0" offset="1" />
			</linearGradient>
			<linearGradient
				id="paint4_linear"
				x1="190"
				x2="210.86"
				y1="165"
				y2="172.66"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#fff" offset="0" />
				<stop stop-color="#fff" stop-opacity="0" offset="1" />
			</linearGradient>
			<linearGradient
				id="paint5_linear"
				x1="372.5"
				x2="346.5"
				y1="249"
				y2="240"
				gradientTransform="translate(-45,-108)"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#fff" offset="0" />
				<stop stop-color="#fff" stop-opacity="0" offset="1" />
			</linearGradient>
		</defs>
	</svg>
</vwc-avatar>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                                    | Type                                                      | Description                                          |
| --------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| **appearance**                          | Enum: `filled` (default), `duotone`, `outlined`, `subtle` | Sets the element's appearance                        |
| **connotation**                         | Enum: `accent` (default), `cta`                           | Sets the element's connotation                       |
| _(deprecated as of 06/25)_<br> **icon** | `string`                                                  | Sets the element's icon                              |
| **initials**                            | `string`                                                  | Sets the initials on the Avatar                      |
| **shape**                               | Enum: `rounded` (default), `pill`                         | Sets the element's shape                             |
| **size**                                | Enum: `condensed`, `normal` (default), `expanded`         | Sets the element's size                              |
| **clickable**                           | `boolean`                                                 | Indicates whether element should be a `<button>`.    |
| **href**                                | `string`                                                  | Sets the element's href, changes card tag to `<a>` . |
| **download**                            | `string`                                                  | Sets the element's download.                         |
| **hreflang**                            | `string`                                                  | Sets the element's hreflang.                         |
| **ping**                                | `string`                                                  | Sets the element's ping.                             |
| **referrerpolicy**                      | `string`                                                  | Sets the element's referrerpolicy.                   |
| **rel**                                 | `string`                                                  | Sets the element's rel.                              |
| **target**                              | _Enum_:<br/>`_self`<br/>`_blank`<br/>`_parent`<br/>`_top` | Sets the target's rel.                               |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| **graphic** | Add graphic element to card. Overrides the icon property |
| **icon**    | Add an icon to the component.                            |

</div>
