<template>
	<VSideDrawer open>
		<VLayout gutters="small">
			<p>Side Drawer content</p>
		</VLayout>

		<template #app-content>
			<VLayout gutters="small">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</VLayout>
		</template>
	</VSideDrawer>
</template>

<script lang="ts" setup>
import { VSideDrawer, VLayout } from '@vonage/vivid-vue';
</script>
