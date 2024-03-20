<template>
	<div>
		<VAvatar size="condensed" shape="pill" />
		<VAvatar size="normal" shape="pill" />
		<VAvatar size="expanded" shape="pill" />
		<VAvatar size="condensed" shape="pill" initials="john doe" />
		<VAvatar size="normal" shape="pill" initials="john doe" />
		<VAvatar size="expanded" shape="pill" initials="john doe" />
		<VAvatar shape="pill" connotation="cta">
			<svg height="110" width="110">
				<defs>
					<filter id="f1" x="0" y="0">
						<feGaussianBlur in="SourceGraphic" stdDeviation="15" />
					</filter>
				</defs>
				<rect
					width="90"
					height="90"
					stroke="green"
					stroke-width="3"
					fill="yellow"
					filter="url(#f1)"
				/>
				Sorry, your browser does not support inline SVG.
			</svg>
		</VAvatar>
	</div>
</template>

<script setup lang="ts">
import { VAvatar } from '@vonage/vivid-vue';
</script>
